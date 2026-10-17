import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';
import { Repository } from 'typeorm';
import { ExperiencePlace } from '../entities/experience-place.entity';
import { ExperienceAcademy } from '../entities/experience-academy.entity';
import { ExperienceStyle } from '../entities/experience-style.entity';
import { ExperienceSchedule } from '../entities/experience-schedule.entity';
import slugify from 'slugify';
import { CreateExperienceDto } from '../dtos/create-experience.dto';
import { AddExperiencePlaceDto } from '../dtos/add-experience-place.dto';
import { AddExperienceAcademyDto } from '../dtos/add-experience-academy.dto';
import { AddExperienceStyleDto } from '../dtos/add-experience-style.dto';
import { CreateExperienceScheduleDto } from '../dtos/add-experience-schedule.dto';
import { ExperienceTranslation } from '../entities/experience-translation.entity';
import { CreateExperienceTranslationDto } from '../dtos/create-experience-translation.dto';
import { ExperiencePlaceTranslation } from '../entities/experience-place-translation.entity';
import { CreateExperiencePlaceTranslationDto } from '../dtos/create-experience-place-translation.dto';

import { DataSource } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { BookingStatus } from 'src/bookings/enums/bookin-status.enum';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experiencesRepository: Repository<Experience>,

    private readonly dataSource: DataSource,
    @InjectRepository(ExperiencePlace)
    private readonly experiencePlaceRepository: Repository<ExperiencePlace>,

    @InjectRepository(ExperienceAcademy)
    private readonly experienceAcademyRepository: Repository<ExperienceAcademy>,

    @InjectRepository(ExperienceStyle)
    private readonly experienceStyleRepository: Repository<ExperienceStyle>,

    @InjectRepository(ExperienceSchedule)
    private readonly scheduleRepository: Repository<ExperienceSchedule>,

    @InjectRepository(ExperienceTranslation)
    private readonly translationRepository: Repository<ExperienceTranslation>,

    @InjectRepository(ExperiencePlaceTranslation)
    private readonly experiencePlaceTranslationRepository: Repository<ExperiencePlaceTranslation>,
  ) {}

  async create(dto: CreateExperienceDto) {
    const experience = this.experiencesRepository.create({
      ...dto,
      slug: slugify(dto.name, {
        lower: true,
        strict: true,
        locale: 'es',
      }),
      currency: dto.currency ?? 'CLP',
    });

    return this.experiencesRepository.save(experience);
  }

  async findAll() {
    const experiences = await this.experiencesRepository.find({
      relations: {
        coverImage: true,
        places: {
          place: true,
        },
        academies: true,
        styles: {
          style: true,
        },
        schedules: true,
        translations: true,
      },
    });

    const scheduleIds = experiences.flatMap((experience) =>
      experience.schedules.map((schedule) => schedule.id),
    );

    if (scheduleIds.length === 0) {
      return experiences;
    }

    const reservedRows = await this.dataSource
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .select('booking.scheduleId', 'scheduleId')
      .addSelect('COALESCE(SUM(booking.peopleCount), 0)', 'reservedPeople')
      .where('booking.scheduleId IN (:...scheduleIds)', {
        scheduleIds,
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
      .groupBy('booking.scheduleId')
      .getRawMany<{
        scheduleId: string;
        reservedPeople: string;
      }>();

    const reservedBySchedule = new Map<number, number>();

    for (const row of reservedRows) {
      reservedBySchedule.set(
        Number(row.scheduleId),
        Number(row.reservedPeople),
      );
    }

    return experiences.map((experience) => ({
      ...experience,

      schedules: experience.schedules.map((schedule) => {
        const reservedPeople = reservedBySchedule.get(schedule.id) ?? 0;

        return {
          ...schedule,

          availableSpots: Math.max(0, schedule.capacity - reservedPeople),
        };
      }),
    }));
  }

  async findOne(id: number) {
    const experience = await this.experiencesRepository.findOne({
      where: { id },

      relations: [
        'coverImage',
        'translations',
        'places',
        'places.place',
        'academies',
        'academies.academy',
        'styles',
        'styles.style',
        'schedules',
      ],

      order: {
        places: {
          position: 'ASC',
        },
        schedules: {
          startDateTime: 'ASC',
        },
      },
    });

    if (!experience) {
      throw new NotFoundException('Experiencia no encontrada');
    }

    return experience;
  }

  async addPlace(experienceId: number, dto: AddExperiencePlaceDto) {
    await this.findOne(experienceId);

    const relation = this.experiencePlaceRepository.create({
      experienceId,
      ...dto,
    });

    return this.experiencePlaceRepository.save(relation);
  }

  async addAcademy(experienceId: number, dto: AddExperienceAcademyDto) {
    await this.findOne(experienceId);

    const relation = this.experienceAcademyRepository.create({
      experienceId,
      ...dto,
    });

    return this.experienceAcademyRepository.save(relation);
  }

  async addStyle(experienceId: number, dto: AddExperienceStyleDto) {
    await this.findOne(experienceId);

    const relation = this.experienceStyleRepository.create({
      experienceId,
      styleId: dto.styleId,
    });

    return this.experienceStyleRepository.save(relation);
  }

  async createSchedule(experienceId: number, dto: CreateExperienceScheduleDto) {
    await this.findOne(experienceId);

    const schedule = this.scheduleRepository.create({
      experienceId,
      startDateTime: new Date(dto.startDateTime),
      endDateTime: new Date(dto.endDateTime),
      capacity: dto.capacity,
    });

    return this.scheduleRepository.save(schedule);
  }

  async updateCoverImage(experienceId: number, coverImageId: number) {
    const experience = await this.experiencesRepository.findOneBy({
      id: experienceId,
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    experience.coverImageId = coverImageId;

    return this.experiencesRepository.save(experience);
  }

  async addTranslation(
    experienceId: number,
    dto: CreateExperienceTranslationDto,
  ) {
    const experience = await this.experiencesRepository.findOneBy({
      id: experienceId,
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    const translation = this.translationRepository.create({
      experienceId,
      ...dto,
    });

    return this.translationRepository.save(translation);
  }

  async findBySlug(slug: string) {
    const match = await this.experiencesRepository
      .createQueryBuilder('experience')
      .leftJoin('experience.translations', 'translation')
      .where('experience.slug = :slug', { slug })
      .orWhere('translation.slug = :slug', { slug })
      .select('experience.id')
      .getOne();

    if (!match) {
      throw new NotFoundException('Experience not found');
    }

    const experience = await this.experiencesRepository.findOne({
      where: {
        id: match.id,
      },
      relations: [
        'coverImage',
        'places',
        'places.translations',
        'places.place',
        'places.place.translations',
        'styles',
        'styles.style',
        'academies',
        'academies.academy',
        'schedules',
        'translations',
      ],
      order: {
        places: {
          position: 'ASC',
        },
        schedules: {
          startDateTime: 'ASC',
        },
      },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    const scheduleIds = experience.schedules.map((schedule) => schedule.id);

    if (scheduleIds.length === 0) {
      return {
        ...experience,
        schedules: [],
      };
    }

    const reservedRows = await this.dataSource
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .select('booking.scheduleId', 'scheduleId')
      .addSelect('COALESCE(SUM(booking.peopleCount), 0)', 'reservedPeople')
      .where('booking.scheduleId IN (:...scheduleIds)', {
        scheduleIds,
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
      .groupBy('booking.scheduleId')
      .getRawMany<{
        scheduleId: string;
        reservedPeople: string;
      }>();

    const reservedBySchedule = new Map<number, number>();

    for (const row of reservedRows) {
      reservedBySchedule.set(
        Number(row.scheduleId),
        Number(row.reservedPeople),
      );
    }

    return {
      ...experience,

      schedules: experience.schedules.map((schedule) => {
        const reservedPeople = reservedBySchedule.get(schedule.id) ?? 0;

        const availableSpots = Math.max(0, schedule.capacity - reservedPeople);

        return {
          ...schedule,
          availableSpots,
        };
      }),
    };
  }

  async addPlaceTranslation(
    experienceId: number,
    experiencePlaceId: number,
    dto: CreateExperiencePlaceTranslationDto,
  ) {
    const experiencePlace = await this.experiencePlaceRepository.findOne({
      where: {
        id: experiencePlaceId,
        experienceId,
      },
    });

    if (!experiencePlace) {
      throw new NotFoundException('Experience place not found');
    }

    const translation = this.experiencePlaceTranslationRepository.create({
      ...dto,
      experiencePlaceId,
    });

    return this.experiencePlaceTranslationRepository.save(translation);
  }
}
