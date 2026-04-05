import { Module } from '@nestjs/common';
import { AcademiesController } from './academies.controller';
import { Academy } from './academy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiesService } from './providers/academies.service';
import { UsersModule } from 'src/users/users.module';
import { ComunasModule } from 'src/comunas/comunas.module';
import { StylesModule } from 'src/styles/styles.module';

@Module({
  controllers: [AcademiesController],
  imports: [
    TypeOrmModule.forFeature([Academy]),
    UsersModule,
    ComunasModule,
    StylesModule,
  ],
  providers: [AcademiesService],
})
export class AcademiesModule {}
