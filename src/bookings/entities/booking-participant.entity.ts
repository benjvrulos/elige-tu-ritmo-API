import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

@Entity('booking_participant')
export class BookingParticipant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bookingId!: number;

  @ManyToOne(() => Booking, (booking) => booking.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookingId' })
  booking!: Booking;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100, nullable: true })
  lastName?: string;

  @Column({ length: 100, nullable: true })
  nationality?: string;

  @Column({ length: 150, nullable: true })
  email?: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
