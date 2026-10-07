import { Academy } from 'src/academies/academy.entity';
import { ExperienceStyle } from 'src/experiences/entities/experience-style.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  style_id!: number;

  @Column({ type: 'varchar', length: 256 })
  name!: string;
  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  slug!: string | null;

  @Column({ type: 'varchar', length: 1024 })
  description!: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToMany(() => Academy, (academy) => academy.styles)
  academies!: Academy[];

  @OneToMany(() => ExperienceStyle, (experienceStyle) => experienceStyle.style)
  experiences!: ExperienceStyle[];
}
