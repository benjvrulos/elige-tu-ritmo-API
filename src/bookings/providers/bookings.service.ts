import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { randomBytes } from 'crypto';

import { Booking } from '../entities/booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';

import { Experience } from 'src/experiences/entities/experience.entity';
import { ExperienceSchedule } from 'src/experiences/entities/experience-schedule.entity';
import { BookingStatus } from '../enums/bookin-status.enum';
import { BookingPaymentStatus } from '../enums/booking-payment-status';
import { ScheduleStatus } from 'src/experiences/enums/schedule-status.enum';
import { UpdatePendingBookingDto } from '../dtos/update-pending-book.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateBookingDto, userId?: number) {
    return this.dataSource.transaction(async (manager) => {
      const schedule = await this.getLockedSchedule(manager, dto.scheduleId);

      const experience = await this.getExperience(
        manager,
        schedule.experienceId,
      );

      this.validateSchedule(schedule);

      this.validatePeopleCount(dto.peopleCount);

      await this.expirePendingBookings(manager, schedule.id);

      const normalizedEmail = dto.contactEmail.trim().toLowerCase();

      await this.ensureNoActiveBooking(manager, schedule.id, normalizedEmail);

      const reservedPeople = await this.getReservedPeople(manager, schedule.id);

      const availableSpots = schedule.capacity - reservedPeople;

      if (dto.peopleCount > availableSpots) {
        throw new BadRequestException(
          `Only ${availableSpots} spots are available`,
        );
      }

      const { subtotal, discountAmount, totalAmount } = this.calculateAmounts(
        Number(experience.price),
        dto.peopleCount,
      );

      const booking = manager.create(Booking, {
        bookingCode: this.generateBookingCode(),

        scheduleId: schedule.id,

        userId,

        contactName: dto.contactName.trim(),

        contactEmail: normalizedEmail,

        contactPhone: dto.contactPhone?.trim() || undefined,

        peopleCount: dto.peopleCount,

        subtotal,

        discountAmount,

        totalAmount,

        currency: experience.currency,

        specialRequests: dto.specialRequests?.trim() || undefined,

        status: BookingStatus.PENDING,

        paymentStatus: BookingPaymentStatus.PENDING,

        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      return manager.save(Booking, booking);
    });
  }
  async findOne(id: number) {
    const booking = await this.bookingsRepository.findOne({
      where: {
        id,
      },
      relations: ['schedule', 'schedule.experience', 'user', 'payments'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (
      booking.status === BookingStatus.PENDING &&
      booking.expiresAt &&
      booking.expiresAt.getTime() <= Date.now()
    ) {
      booking.status = BookingStatus.EXPIRED;

      await this.bookingsRepository.save(booking);
    }

    return this.withRemainingTime(booking);
  }

  async updatePending(bookingId: number, dto: UpdatePendingBookingDto) {
    return this.dataSource.transaction(async (manager) => {
      const bookingRepository = manager.getRepository(Booking);

      const booking = await bookingRepository.findOne({
        where: { id: bookingId },
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      if (booking.status !== BookingStatus.PENDING) {
        throw new BadRequestException('Only pending bookings can be modified');
      }

      if (!booking.expiresAt || booking.expiresAt.getTime() <= Date.now()) {
        booking.status = BookingStatus.EXPIRED;

        await bookingRepository.save(booking);

        throw new BadRequestException('Booking has expired');
      }

      const schedule = await this.getLockedSchedule(
        manager,
        booking.scheduleId,
      );

      const experience = await this.getExperience(
        manager,
        schedule.experienceId,
      );

      const newPeopleCount = dto.peopleCount ?? booking.peopleCount;

      this.validatePeopleCount(newPeopleCount);

      const reservedByOthers = await this.getReservedPeople(
        manager,
        schedule.id,
        booking.id,
      );

      const availableForThisBooking = schedule.capacity - reservedByOthers;

      if (newPeopleCount > availableForThisBooking) {
        throw new BadRequestException(
          `Only ${availableForThisBooking} spots are available`,
        );
      }

      const { subtotal, discountAmount, totalAmount } = this.calculateAmounts(
        Number(experience.price),
        newPeopleCount,
      );

      booking.peopleCount = newPeopleCount;

      booking.subtotal = subtotal;

      booking.discountAmount = discountAmount;

      booking.totalAmount = totalAmount;

      if (dto.contactName !== undefined) {
        booking.contactName = dto.contactName.trim();
      }

      if (dto.contactEmail !== undefined) {
        booking.contactEmail = dto.contactEmail.trim().toLowerCase();
      }

      if (dto.contactPhone !== undefined) {
        booking.contactPhone = dto.contactPhone.trim();
      }

      if (dto.specialRequests !== undefined) {
        booking.specialRequests = dto.specialRequests.trim();
      }

      const saved = await bookingRepository.save(booking);

      return this.withRemainingTime(saved);
    });
  }

  // Check there is a Schedule from ExperienceSchedule
  private async getLockedSchedule(manager: EntityManager, scheduleId: number) {
    const schedule = await manager.findOne(ExperienceSchedule, {
      where: { id: scheduleId },
      lock: { mode: 'pessimistic_write' },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  // Get the Experience
  private async getExperience(manager: EntityManager, experienceId: number) {
    const experience = await manager.findOne(Experience, {
      where: { id: experienceId },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return experience;
  }

  // Validate is ExperienceSchedule is available
  private validateSchedule(schedule: ExperienceSchedule) {
    if (schedule.status !== ScheduleStatus.AVAILABLE) {
      throw new BadRequestException('This schedule is not available');
    }

    if (new Date(schedule.startDateTime) <= new Date()) {
      throw new BadRequestException('This schedule has already started');
    }
  }

  // Validate there are max 5 guests
  private validatePeopleCount(peopleCount: number) {
    if (peopleCount < 1 || peopleCount > 5) {
      throw new BadRequestException(
        'Between 1 and 5 guests are allowed per booking',
      );
    }
  }

  // Check if the booking is expired
  private async expirePendingBookings(
    manager: EntityManager,
    scheduleId: number,
  ) {
    await manager
      .createQueryBuilder()
      .update(Booking)
      .set({
        status: BookingStatus.EXPIRED,
      })
      .where('scheduleId = :scheduleId', { scheduleId })
      .andWhere('status = :status', {
        status: BookingStatus.PENDING,
      })
      .andWhere('expiresAt <= NOW()')
      .execute();
  }

  // Check if the user has an active booking
  private async ensureNoActiveBooking(
    manager: EntityManager,
    scheduleId: number,
    email: string,
  ) {
    const existingBooking = await manager
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .where('booking.scheduleId = :scheduleId', { scheduleId })
      .andWhere('LOWER(booking.contactEmail) = :email', {
        email: email.trim().toLowerCase(),
      })
      .andWhere(
        `
      (
        booking.status = :confirmed
        OR
        (
          booking.status = :pending
          AND booking.expiresAt > NOW()
        )
      )
      `,
        {
          confirmed: BookingStatus.CONFIRMED,
          pending: BookingStatus.PENDING,
        },
      )
      .getOne();

    if (existingBooking) {
      throw new ConflictException(
        'You already have an active booking for this schedule',
      );
    }
  }

  // Calculate total of spots
  private async getReservedPeople(
    manager: EntityManager,
    scheduleId: number,
    excludeBookingId?: number,
  ) {
    const query = manager
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .select('COALESCE(SUM(booking.peopleCount), 0)', 'reservedPeople')
      .where('booking.scheduleId = :scheduleId', { scheduleId })
      .andWhere(
        `
      (
        booking.status = :confirmed
        OR
        (
          booking.status = :pending
          AND booking.expiresAt > NOW()
        )
      )
      `,
        {
          confirmed: BookingStatus.CONFIRMED,
          pending: BookingStatus.PENDING,
        },
      );

    if (excludeBookingId) {
      query.andWhere('booking.id != :excludeBookingId', { excludeBookingId });
    }

    const result = await query.getRawOne<{
      reservedPeople: string;
    }>();

    return Number(result?.reservedPeople ?? 0);
  }

  // Calculate booking price
  private calculateAmounts(unitPrice: number, peopleCount: number) {
    const subtotal = unitPrice * peopleCount;

    const discountAmount = 0;

    return {
      subtotal,
      discountAmount,
      totalAmount: subtotal - discountAmount,
    };
  }

  // Generate Booking Code
  private generateBookingCode(): string {
    const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');

    const random = randomBytes(3).toString('hex').toUpperCase();

    return `SLH-${date}-${random}`;
  }

  // Calculate remaining time of expiring
  private withRemainingTime(booking: Booking) {
    const remainingSeconds =
      booking.status === BookingStatus.PENDING && booking.expiresAt
        ? Math.max(
            0,
            Math.floor((booking.expiresAt.getTime() - Date.now()) / 1000),
          )
        : 0;

    return {
      ...booking,

      remainingSeconds,

      remainingMinutes: Math.ceil(remainingSeconds / 60),
    };
  }
}
