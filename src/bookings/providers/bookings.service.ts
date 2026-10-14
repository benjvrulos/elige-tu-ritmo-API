import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { randomBytes } from 'crypto';

import { Booking } from '../entities/booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';

import { Experience } from 'src/experiences/entities/experience.entity';
import { ExperienceSchedule } from 'src/experiences/entities/experience-schedule.entity';
import { BookingStatus } from '../enums/bookin-status.enum';
import { BookingPaymentStatus } from '../enums/booking-payment-status';
import { ScheduleStatus } from 'src/experiences/enums/schedule-status.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    private readonly dataSource: DataSource,
  ) {}

  private generateBookingCode(): string {
    const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');

    const random = randomBytes(3).toString('hex').toUpperCase();

    return `SLH-${date}-${random}`;
  }
  async create(dto: CreateBookingDto, userId?: number) {
    return this.dataSource.transaction(async (manager) => {
      /*
       * 1. Bloqueamos SOLO el schedule.
       *
       * No cargamos relations aquí porque PostgreSQL
       * no permite FOR UPDATE sobre el lado nullable
       * de un LEFT JOIN.
       */
      const schedule = await manager.findOne(ExperienceSchedule, {
        where: {
          id: dto.scheduleId,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      });

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      /*
       * 2. Cargamos la experiencia por separado.
       */
      const experience = await manager.findOne(Experience, {
        where: {
          id: schedule.experienceId,
        },
      });

      if (!experience) {
        throw new NotFoundException('Experience not found');
      }

      /*
       * 3. Validamos disponibilidad del schedule.
       */
      if (schedule.status !== ScheduleStatus.AVAILABLE) {
        throw new BadRequestException('This schedule is not available');
      }

      if (new Date(schedule.startDateTime) <= new Date()) {
        throw new BadRequestException('This schedule has already started');
      }

      /*
       * 4. Marcamos bookings PENDING vencidos.
       */
      await manager
        .createQueryBuilder()
        .update(Booking)
        .set({
          status: BookingStatus.EXPIRED,
        })
        .where('scheduleId = :scheduleId', {
          scheduleId: schedule.id,
        })
        .andWhere('status = :status', {
          status: BookingStatus.PENDING,
        })
        .andWhere('expiresAt <= NOW()')
        .execute();

      /*
       * 5. Calculamos personas que ocupan cupos.
       *
       * CONFIRMED siempre cuenta.
       * PENDING solo cuenta si todavía no expiró.
       */
      const result = await manager
        .createQueryBuilder(Booking, 'booking')
        .select('COALESCE(SUM(booking.peopleCount), 0)', 'reservedPeople')
        .where('booking.scheduleId = :scheduleId', {
          scheduleId: schedule.id,
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
        .getRawOne<{
          reservedPeople: string;
        }>();

      const reservedPeople = Number(result?.reservedPeople ?? 0);

      const availableSpots = schedule.capacity - reservedPeople;

      if (availableSpots <= 0) {
        throw new BadRequestException('This schedule is full');
      }

      if (dto.peopleCount > availableSpots) {
        throw new BadRequestException(
          `Only ${availableSpots} spots are available`,
        );
      }

      /*
       * 6. Precio SIEMPRE calculado por backend.
       */
      const unitPrice = Number(experience.price);

      const subtotal = unitPrice * dto.peopleCount;

      const discountAmount = 0;

      const totalAmount = subtotal - discountAmount;

      /*
       * 7. Retenemos los cupos durante 15 minutos.
       */
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      /*
       * 8. Creamos la reserva.
       */
      const booking = manager.create(Booking, {
        bookingCode: this.generateBookingCode(),

        scheduleId: schedule.id,

        userId,

        contactName: dto.contactName.trim(),

        contactEmail: dto.contactEmail.trim().toLowerCase(),

        contactPhone: dto.contactPhone?.trim() || undefined,

        peopleCount: dto.peopleCount,

        subtotal,

        discountAmount,

        totalAmount,

        currency: experience.currency,

        specialRequests: dto.specialRequests?.trim() || undefined,

        status: BookingStatus.PENDING,

        paymentStatus: BookingPaymentStatus.PENDING,

        expiresAt,
      });

      return manager.save(Booking, booking);
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        schedule: {
          experience: true,
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (
      booking.status === BookingStatus.PENDING &&
      booking.expiresAt &&
      booking.expiresAt <= new Date()
    ) {
      booking.status = BookingStatus.EXPIRED;

      await this.bookingRepository.save(booking);
    }

    return booking;
  }
}
