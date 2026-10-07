import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './providers/places.service';
import { Place } from './place.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
