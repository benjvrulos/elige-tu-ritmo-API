import { Upload } from 'src/uploads/upload.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExperienceType } from '../enums/experience-type.enum';
import { ExperiencePlace } from './experience-place.entity';
import { ExperienceStyle } from './experience-style.entity';
import { ExperienceAcademy } from './experience-academy.entity';
import { ExperienceSchedule } from './experience-schedule.entity';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  coverImageId?: number;

  @ManyToOne(() => Upload, (upload) => upload.experiences, {
    nullable: true,
  })
  @JoinColumn({ name: 'coverImageId' })
  coverImage?: Upload;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 180, unique: true })
  slug!: string;

  @Column({ length: 300 })
  shortDescription!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'enum',
    enum: ExperienceType,
  })
  type!: ExperienceType;

  @Column({ type: 'int' })
  durationMinutes!: number;

  @Column({ type: 'int', default: 1 })
  minPeople!: number;

  @Column({ type: 'int' })
  maxPeople!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({ length: 3, default: 'USD' })
  currency!: string;

  @Column({ length: 255, nullable: true })
  meetingPoint?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  meetingLatitude?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  meetingLongitude?: number;

  @Column({ type: 'text', nullable: true })
  included?: string;

  @Column({ type: 'text', nullable: true })
  notIncluded?: string;

  @Column({ type: 'text', nullable: true })
  requirements?: string;

  @Column({ type: 'text', nullable: true })
  recommendations?: string;

  @Column({ default: false })
  isPrivateAvailable!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(
    () => ExperiencePlace,
    (experiencePlace) => experiencePlace.experience,
  )
  places!: ExperiencePlace[];

  @OneToMany(
    () => ExperienceAcademy,
    (experienceAcademy) => experienceAcademy.experience,
  )
  academies!: ExperienceAcademy[];

  @OneToMany(
    () => ExperienceStyle,
    (experienceStyle) => experienceStyle.experience,
  )
  styles!: ExperienceStyle[];

  @OneToMany(() => ExperienceSchedule, (schedule) => schedule.experience)
  schedules!: ExperienceSchedule[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
