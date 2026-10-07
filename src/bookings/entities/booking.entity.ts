import { ExperienceSchedule } from 'src/experiences/entities/experience-schedule';
import { User } from 'src/users/user.entity';
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
import { BookingParticipant } from './booking-participant';
import { BookingStatus } from '../enums/bookin-status.enum';
import { BookingPaymentStatus } from '../enums/booking-payment-status';
import { Payment } from 'src/payments/payment.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30, unique: true })
  bookingCode!: string;

  @Column()
  scheduleId!: number;

  @ManyToOne(() => ExperienceSchedule, (schedule) => schedule.bookings)
  @JoinColumn({ name: 'scheduleId' })
  schedule!: ExperienceSchedule;

  @Column({ nullable: true })
  userId?: number;

  @ManyToOne(() => User, (user) => user.bookings, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ length: 150 })
  contactName!: string;

  @Column({ length: 150 })
  contactEmail!: string;

  @Column({ length: 50, nullable: true })
  contactPhone?: string;

  @Column({ type: 'int' })
  peopleCount!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  subtotal!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  discountAmount!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalAmount!: number;

  @Column({ length: 3, default: 'USD' })
  currency!: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  @Column({
    type: 'enum',
    enum: BookingPaymentStatus,
    default: BookingPaymentStatus.PENDING,
  })
  paymentStatus!: BookingPaymentStatus;

  @Column({ type: 'text', nullable: true })
  specialRequests?: string;

  @OneToMany(() => BookingParticipant, (participant) => participant.booking, {
    cascade: true,
  })
  participants!: BookingParticipant[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments!: Payment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
