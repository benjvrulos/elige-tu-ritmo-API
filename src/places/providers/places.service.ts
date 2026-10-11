import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from '../dtos/create-place.dto';
import { Place } from '../entities/place.entity';
import slugify from 'slugify';
import { UpdatePlaceDto } from '../dtos/update-place.dto';
import { PlaceTranslation } from '../entities/place-translation.entity';
import { CreatePlaceTranslationDto } from '../dtos/create-place-translation.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,

    @InjectRepository(PlaceTranslation)
    private readonly placeTranslationRepository: Repository<PlaceTranslation>,
  ) {}

  async create(dto: CreatePlaceDto) {
    const place = this.placeRepository.create({
      ...dto,
      slug: slugify(dto.name, {
        lower: true,
        strict: true,
        locale: 'es',
      }),
    });

    return this.placeRepository.save(place);
  }

  findAll() {
    return this.placeRepository.find({
      relations: ['comuna', 'image'],
    });
  }

  async findOne(id: number) {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: ['comuna', 'image'],
    });

    if (!place) {
      throw new NotFoundException('Lugar no encontrado');
    }

    return place;
  }

  async update(id: number, dto: UpdatePlaceDto) {
    const place = await this.findOne(id);

    if (dto.name) {
      place.slug = slugify(dto.name, {
        lower: true,
        strict: true,
        locale: 'es',
      });
    }

    Object.assign(place, dto);

    return this.placeRepository.save(place);
  }

  async remove(id: number) {
    const place = await this.findOne(id);

    place.isActive = false;

    return this.placeRepository.save(place);
  }

  async addTranslation(placeId: number, dto: CreatePlaceTranslationDto) {
    const place = await this.placeRepository.findOne({
      where: { id: placeId },
    });

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    const translation = this.placeTranslationRepository.create({
      ...dto,
      placeId,
    });

    return this.placeTranslationRepository.save(translation);
  }
}
