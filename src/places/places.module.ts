import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './providers/places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceTranslation } from './entities/place-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, PlaceTranslation])],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
