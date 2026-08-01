import { Module } from '@nestjs/common';
import { Region } from './region.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsService } from './providers/regions.service';
import { RegionsController } from './regions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionsService],
  controllers: [RegionsController],
})
export class RegionsModule {}
