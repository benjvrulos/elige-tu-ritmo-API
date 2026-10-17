import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  type RawBodyRequest,
  Req,
  Query,
} from '@nestjs/common';
import { Request } from 'express';

import { PaymentsService } from './providers/payments.service';
import { StripeProvider } from './providers/stripe.provider';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

// Ajusta esta ruta si tu decorador Public está en otro lugar.
// Si no tienes guard global, puedes eliminar @Public().

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeProvider: StripeProvider,
  ) {}

  @Get('booking/:bookingId')
  findByBooking(
    @Param('bookingId', ParseIntPipe)
    bookingId: number,
  ) {
    return this.paymentsService.findByBooking(bookingId);
  }

  @Auth(AuthType.None)
  @Post('stripe/checkout/:bookingId')
  async createStripeCheckout(
    @Param('bookingId', ParseIntPipe)
    bookingId: number,
  ) {
    return this.paymentsService.createStripeCheckout(bookingId);
  }

  @HttpCode(200)
  @Auth(AuthType.None)
  @Post('stripe/webhook')
  async stripeWebhook(
    @Req()
    request: RawBodyRequest<Request>,

    @Headers('stripe-signature')
    signature?: string,
  ) {
    if (!signature) {
      throw new BadRequestException('Stripe signature is missing');
    }

    if (!request.rawBody) {
      throw new BadRequestException('Stripe raw body is missing');
    }

    const event = this.stripeProvider.constructWebhookEvent(
      request.rawBody,
      signature,
    );

    await this.paymentsService.handleStripeEvent(event);

    return {
      received: true,
    };
  }

  @Auth(AuthType.None)
  @Get('checkout/:bookingId')
  getCheckoutPayment(
    @Param('bookingId', ParseIntPipe)
    bookingId: number,

    @Query('session_id')
    sessionId?: string,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Stripe session ID is required');
    }

    return this.paymentsService.getCheckoutPayment(bookingId, sessionId);
  }

  /*
   * Endpoints protegidos.
   */

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.paymentsService.findOne(id);
  }
}
