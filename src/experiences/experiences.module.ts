import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './providers/experiences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { ExperiencePlace } from './entities/experience-place.entity';
import { ExperienceAcademy } from './entities/experience-academy';
import { ExperienceStyle } from './entities/experience-style.entity';
import { ExperienceSchedule } from './entities/experience-schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Experience,
      ExperiencePlace,
      ExperienceAcademy,
      ExperienceStyle,
      ExperienceSchedule,
    ]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
