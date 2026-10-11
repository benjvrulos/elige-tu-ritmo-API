import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ExperiencePlace } from './experience-place.entity';

@Entity('experience_place_translation')
@Unique(['experiencePlaceId', 'languageCode'])
export class ExperiencePlaceTranslation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  experiencePlaceId!: number;

  @ManyToOne(
    () => ExperiencePlace,
    (experiencePlace) => experiencePlace.translations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'experiencePlaceId' })
  experiencePlace!: ExperiencePlace;

  @Column({ length: 5 })
  languageCode!: string;

  @Column({ length: 150, nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
