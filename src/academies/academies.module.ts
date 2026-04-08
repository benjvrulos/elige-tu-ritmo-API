import { Module } from '@nestjs/common';
import { AcademiesController } from './academies.controller';
import { Academy } from './academy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiesService } from './providers/academies.service';
import { UsersModule } from 'src/users/users.module';
import { ComunasModule } from 'src/comunas/comunas.module';
import { StylesModule } from 'src/styles/styles.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateAcademyProvider } from './providers/create-academy.provider';

@Module({
  controllers: [AcademiesController],
  imports: [
    TypeOrmModule.forFeature([Academy]),
    UsersModule,
    ComunasModule,
    StylesModule,
    PaginationModule,
  ],
  providers: [AcademiesService, CreateAcademyProvider],
})
export class AcademiesModule {}
