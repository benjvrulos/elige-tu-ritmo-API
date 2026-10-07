import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Experience } from './experience.entity';
import { Place } from 'src/places/place.entity';

@Entity('experience_place')
export class ExperiencePlace {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  experienceId!: number;

  @ManyToOne(() => Experience, (experience) => experience.places, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experienceId' })
  experience!: Experience;

  @Column()
  placeId!: number;

  @ManyToOne(() => Place, (place) => place.experiences)
  @JoinColumn({ name: 'placeId' })
  place!: Place;

  @Column({ type: 'int' })
  position!: number;

  @Column({ type: 'int', nullable: true })
  startOffsetMinutes?: number;

  @Column({ type: 'int', nullable: true })
  durationMinutes?: number;

  @Column({ length: 150, nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
