import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Experience } from './experience.entity';
import { Style } from 'src/styles/style.entity';

@Entity('experience_style')
export class ExperienceStyle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  experienceId!: number;

  @ManyToOne(() => Experience, (experience) => experience.styles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experienceId' })
  experience!: Experience;

  @Column()
  styleId!: number;

  @ManyToOne(() => Style, (style) => style.experiences)
  @JoinColumn({ name: 'styleId' })
  style!: Style;
}
