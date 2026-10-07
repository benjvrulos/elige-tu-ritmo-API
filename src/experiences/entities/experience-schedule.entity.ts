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
import { Experience } from './experience.entity';
import { ScheduleStatus } from '../enums/schedule-status.enum';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity('experience_schedule')
export class ExperienceSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  experienceId!: number;

  @ManyToOne(() => Experience, (experience) => experience.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experienceId' })
  experience!: Experience;

  @Column({ type: 'timestamptz' })
  startDateTime!: Date;

  @Column({ type: 'timestamptz' })
  endDateTime!: Date;

  @Column({ type: 'int' })
  capacity!: number;

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
    default: ScheduleStatus.AVAILABLE,
  })
  status!: ScheduleStatus;

  @OneToMany(() => Booking, (booking) => booking.schedule)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
