import { Module } from '@nestjs/common';
import { Payment } from './payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Payment])] })
export class PaymentsModule {}
