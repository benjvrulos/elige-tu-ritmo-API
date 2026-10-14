import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeProvider {
  private readonly stripe: Stripe;
  private readonly webhookSecret: string;
  private readonly frontendUrl: string;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    const nodeEnv = this.configService.get<string>('NODE_ENV');

    const frontendUrl =
      nodeEnv === 'production'
        ? this.configService.get<string>('FRONTEND_PROD_URL')
        : this.configService.get<string>('FRONTEND_DEV_URL');

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    if (!frontendUrl) {
      throw new Error('Frontend URL is not configured');
    }

    this.stripe = new Stripe(secretKey);

    this.webhookSecret = webhookSecret;

    this.frontendUrl = frontendUrl;
  }

  async createCheckoutSession(params: {
    bookingId: number;
    bookingCode: string;
    paymentId: number;

    customerEmail: string;

    experienceName: string;

    amount: number;
    currency: string;
  }): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create({
      mode: 'payment',

      customer_email: params.customerEmail,

      client_reference_id: params.bookingCode,

      metadata: {
        bookingId: params.bookingId.toString(),

        bookingCode: params.bookingCode,

        paymentId: params.paymentId.toString(),
      },

      payment_intent_data: {
        metadata: {
          bookingId: params.bookingId.toString(),

          bookingCode: params.bookingCode,

          paymentId: params.paymentId.toString(),
        },
      },

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: params.currency.toLowerCase(),

            unit_amount: Math.round(params.amount),

            product_data: {
              name: params.experienceName,
            },
          },
        },
      ],

      success_url: `${this.frontendUrl}/checkout/${params.bookingId}?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${this.frontendUrl}`,
    });
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    try {
      return this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.webhookSecret,
      );
    } catch {
      throw new BadRequestException('Invalid Stripe webhook signature');
    }
  }
}
