import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ExperiencesService } from './providers/experiences.service';
import { CreateExperienceDto } from './dtos/create-experience.dto';
import { AddExperiencePlaceDto } from './dtos/add-experience-place.dto';
import { AddExperienceAcademyDto } from './dtos/add-experience-academy.dto';
import { AddExperienceStyleDto } from './dtos/add-experience-style.dto';
import { CreateExperienceScheduleDto } from './dtos/add-experience-schedule.dto';

@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto);
  }

  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.experiencesService.findOne(id);
  }

  @Post(':id/places')
  addPlace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddExperiencePlaceDto,
  ) {
    return this.experiencesService.addPlace(id, dto);
  }

  @Post(':id/academies')
  addAcademy(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddExperienceAcademyDto,
  ) {
    return this.experiencesService.addAcademy(id, dto);
  }

  @Post(':id/styles')
  addStyle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddExperienceStyleDto,
  ) {
    return this.experiencesService.addStyle(id, dto);
  }

  @Post(':id/schedules')
  createSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateExperienceScheduleDto,
  ) {
    return this.experiencesService.createSchedule(id, dto);
  }
}
