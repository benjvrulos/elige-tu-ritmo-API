import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Experience } from './experience.entity';

@Entity('experience_translation')
@Unique(['experienceId', 'languageCode'])
export class ExperienceTranslation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  experienceId!: number;

  @ManyToOne(() => Experience, (experience) => experience.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experienceId' })
  experience!: Experience;

  @Column({ length: 5 })
  languageCode!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 180 })
  slug!: string;

  @Column({ length: 300 })
  shortDescription!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text', nullable: true })
  included?: string;

  @Column({ type: 'text', nullable: true })
  notIncluded?: string;

  @Column({ type: 'text', nullable: true })
  requirements?: string;

  @Column({ type: 'text', nullable: true })
  recommendations?: string;
}
