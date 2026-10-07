import { Booking } from 'src/bookings/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentProvider } from './enums/payment-provider.enum';
import { PaymentStatus } from './enums/payment-status.enum';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bookingId!: number;

  @ManyToOne(() => Booking, (booking) => booking.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookingId' })
  booking!: Booking;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
  })
  provider!: PaymentProvider;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount!: number;

  @Column({ length: 3, default: 'USD' })
  currency!: string;

  @Column({ length: 255, nullable: true })
  providerPaymentId?: string;

  @Column({ length: 255, nullable: true })
  transactionId?: string;

  @Column({ length: 100, nullable: true })
  paymentMethod?: string;

  @Column({ type: 'timestamptz', nullable: true })
  paidAt?: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  refundedAmount!: number;

  @Column({ type: 'timestamptz', nullable: true })
  refundedAt?: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
