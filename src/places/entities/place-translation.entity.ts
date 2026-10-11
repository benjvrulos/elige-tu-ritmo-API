// src/places/entities/place-translation.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Place } from './place.entity';

@Entity('place_translation')
@Unique(['placeId', 'languageCode'])
export class PlaceTranslation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  placeId!: number;

  @ManyToOne(() => Place, (place) => place.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'placeId' })
  place!: Place;

  @Column({ length: 5 })
  languageCode!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 300, nullable: true })
  shortDescription?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
