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

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experiencesRepository: Repository<Experience>,

    @InjectRepository(ExperiencePlace)
    private readonly experiencePlaceRepository: Repository<ExperiencePlace>,

    @InjectRepository(ExperienceAcademy)
    private readonly experienceAcademyRepository: Repository<ExperienceAcademy>,

    @InjectRepository(ExperienceStyle)
    private readonly experienceStyleRepository: Repository<ExperienceStyle>,

    @InjectRepository(ExperienceSchedule)
    private readonly scheduleRepository: Repository<ExperienceSchedule>,
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

  findAll() {
    return this.experiencesRepository.find({
      where: { isActive: true },
      relations: [
        'coverImage',
        'places',
        'places.place',
        'academies',
        'academies.academy',
        'styles',
        'styles.style',
        'schedules',
      ],
    });
  }

  async findOne(id: number) {
    const experience = await this.experiencesRepository.findOne({
      where: { id },
      relations: [
        'coverImage',
        'places',
        'places.place',
        'academies',
        'academies.academy',
        'styles',
        'styles.style',
        'schedules',
      ],
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
}
