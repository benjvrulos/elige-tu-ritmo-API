import { Module } from '@nestjs/common';
import { BookingsService } from './providers/bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingParticipant } from './entities/booking-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingParticipant])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
