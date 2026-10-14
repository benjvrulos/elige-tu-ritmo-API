import { Module } from '@nestjs/common';
import { PaymentsService } from './providers/payments.service';
import { PaymentsController } from './payments.controller';
import { StripeProvider } from './providers/stripe.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Booking])],
  providers: [PaymentsService, StripeProvider],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
