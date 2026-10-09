import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './providers/experiences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { ExperiencePlace } from './entities/experience-place.entity';
import { ExperienceAcademy } from './entities/experience-academy.entity';
import { ExperienceStyle } from './entities/experience-style.entity';
import { ExperienceSchedule } from './entities/experience-schedule.entity';
import { ExperienceTranslation } from './entities/experience-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Experience,
      ExperiencePlace,
      ExperienceAcademy,
      ExperienceStyle,
      ExperienceSchedule,
      ExperienceTranslation,
    ]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
