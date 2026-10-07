import { Academy } from 'src/academies/academy.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Experience } from './experience.entity';

@Entity('experience_academy')
export class ExperienceAcademy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  experienceId!: number;

  @ManyToOne(() => Experience, (experience) => experience.academies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experienceId' })
  experience!: Experience;

  @Column()
  academyId!: number;

  @ManyToOne(() => Academy, (academy) => academy.experiences)
  @JoinColumn({ name: 'academyId' })
  academy!: Academy;

  @Column({ type: 'int', nullable: true })
  position?: number;

  @Column({ type: 'int', nullable: true })
  durationMinutes?: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
