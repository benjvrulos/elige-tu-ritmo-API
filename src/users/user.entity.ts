import { Exclude } from 'class-transformer';
import { Academy } from 'src/academies/academy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './enum/user-role.enum';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName!: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  email?: string;

  @Exclude()
  @Column({ type: 'varchar', length: 96, nullable: true })
  password?: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  nationality?: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  preferredLanguage?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
    nullable: false,
  })
  role!: UserRole;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive!: boolean;

  @OneToMany(() => Academy, (academy) => academy.user)
  academies!: Academy[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
