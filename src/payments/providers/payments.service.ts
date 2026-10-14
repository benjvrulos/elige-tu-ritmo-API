import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import Stripe from 'stripe';

import { Payment } from '../payment.entity';
import { PaymentProvider } from '../enums/payment-provider.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

import { Booking } from 'src/bookings/entities/booking.entity';
import { BookingStatus } from 'src/bookings/enums/bookin-status.enum';
import { BookingPaymentStatus } from 'src/bookings/enums/booking-payment-status';

import { StripeProvider } from './stripe.provider';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly stripeProvider: StripeProvider,
  ) {}

  async createStripeCheckout(bookingId: number) {
    /*
     * 1. Validamos Booking y creamos Payment.
     *
     * Esta transacción termina ANTES de llamar
     * a Stripe para no mantener una transacción
     * de PostgreSQL abierta mientras esperamos
     * una API externa.
     */
    const payment = await this.dataSource.transaction(async (manager) => {
      /*
       * Bloqueamos solamente Booking.
       *
       * No cargamos relaciones aquí para evitar
       * nuevamente el problema de PostgreSQL:
       *
       * FOR UPDATE cannot be applied to the
       * nullable side of an outer join
       */
      const booking = await manager.findOne(Booking, {
        where: {
          id: bookingId,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      /*
       * La reserva debe seguir pendiente.
       */
      if (booking.status !== BookingStatus.PENDING) {
        throw new BadRequestException('Booking is not pending');
      }

      /*
       * No permitir pagar nuevamente
       * una reserva pagada.
       */
      if (booking.paymentStatus === BookingPaymentStatus.PAID) {
        throw new BadRequestException('Booking is already paid');
      }

      /*
       * Verificar expiración.
       */
      if (booking.expiresAt && booking.expiresAt <= new Date()) {
        booking.status = BookingStatus.EXPIRED;

        await manager.save(Booking, booking);

        throw new BadRequestException('Booking has expired');
      }

      /*
       * Si ya existe un Payment PENDING
       * de Stripe con una sesión creada,
       * podemos reutilizarlo.
       */
      const existingPayment = await manager.findOne(Payment, {
        where: {
          bookingId: booking.id,
          provider: PaymentProvider.STRIPE,
          status: PaymentStatus.PENDING,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (
        existingPayment &&
        existingPayment.providerPaymentId &&
        existingPayment.metadata?.checkoutUrl
      ) {
        return existingPayment;
      }

      /*
       * Crear intento de pago.
       */
      const newPayment = manager.create(Payment, {
        bookingId: booking.id,

        provider: PaymentProvider.STRIPE,

        status: PaymentStatus.PENDING,

        amount: Number(booking.totalAmount),

        currency: booking.currency,

        refundedAmount: 0,
      });

      return manager.save(Payment, newPayment);
    });

    /*
     * Si este Payment ya tenía Checkout,
     * simplemente devolvemos la URL.
     */
    if (payment.providerPaymentId && payment.metadata?.checkoutUrl) {
      return {
        bookingId: payment.bookingId,

        paymentId: payment.id,

        checkoutSessionId: payment.providerPaymentId,

        checkoutUrl: payment.metadata.checkoutUrl,
      };
    }

    /*
     * 2. Cargar Booking + Experience.
     *
     * Ya fuera de la transacción.
     */
    const booking = await this.dataSource.getRepository(Booking).findOne({
      where: {
        id: bookingId,
      },

      relations: {
        schedule: {
          experience: true,
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    /*
     * 3. Crear Checkout Session en Stripe.
     */
    let session: Stripe.Checkout.Session;

    try {
      session = await this.stripeProvider.createCheckoutSession({
        bookingId: booking.id,

        bookingCode: booking.bookingCode,

        paymentId: payment.id,

        customerEmail: booking.contactEmail,

        experienceName: booking.schedule.experience.name,

        amount: Number(booking.totalAmount),

        currency: booking.currency,
      });
    } catch {
      /*
       * Si Stripe falla, dejamos trazabilidad
       * del intento.
       */
      await this.dataSource.getRepository(Payment).update(payment.id, {
        status: PaymentStatus.FAILED,
      });

      throw new BadRequestException('Could not create Stripe Checkout session');
    }

    /*
     * 4. Guardar referencia de Stripe.
     */
    payment.providerPaymentId = session.id;

    payment.metadata = {
      ...payment.metadata,

      checkoutUrl: session.url,

      bookingCode: booking.bookingCode,
    };

    await this.dataSource.getRepository(Payment).save(payment);

    /*
     * 5. Lo que recibe React.
     */
    return {
      bookingId: booking.id,

      bookingCode: booking.bookingCode,

      paymentId: payment.id,

      amount: Number(payment.amount),

      currency: payment.currency,

      checkoutSessionId: session.id,

      checkoutUrl: session.url,

      expiresAt: booking.expiresAt,
    };
  }

  async handleStripeEvent(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed': {
        await this.handleCheckoutCompleted(event.data.object);

        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        await this.handleCheckoutCompleted(event.data.object);

        break;
      }

      case 'checkout.session.async_payment_failed': {
        await this.handleCheckoutFailed(event.data.object);

        break;
      }

      default:
        break;
    }
  }

  private async handleCheckoutCompleted(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    /*
     * No confirmamos si Stripe no informa
     * realmente el pago.
     */
    if (session.payment_status !== 'paid') {
      return;
    }

    await this.dataSource.transaction(async (manager) => {
      /*
       * Stripe lleva nuestro paymentId
       * dentro de metadata.
       */
      const paymentId = Number(session.metadata?.paymentId);

      if (!Number.isInteger(paymentId) || paymentId <= 0) {
        throw new BadRequestException('Stripe paymentId is missing');
      }

      /*
       * Bloqueamos Payment.
       */
      const payment = await manager.findOne(Payment, {
        where: {
          id: paymentId,
        },

        lock: {
          mode: 'pessimistic_write',
        },
      });

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      /*
       * El webhook puede llegar más de una vez.
       *
       * Si ya fue procesado, terminamos.
       */
      if (payment.status === PaymentStatus.PAID) {
        return;
      }

      /*
       * Comprobar que realmente pertenece
       * a Stripe y a esta Checkout Session.
       */
      if (payment.provider !== PaymentProvider.STRIPE) {
        throw new BadRequestException('Invalid payment provider');
      }

      if (payment.providerPaymentId !== session.id) {
        throw new BadRequestException('Stripe session does not match payment');
      }

      /*
       * Bloquear Booking.
       */
      const booking = await manager.findOne(Booking, {
        where: {
          id: payment.bookingId,
        },

        lock: {
          mode: 'pessimistic_write',
        },
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      /*
       * Verificar bookingId que enviamos
       * originalmente a Stripe.
       */
      const stripeBookingId = Number(session.metadata?.bookingId);

      if (stripeBookingId !== booking.id) {
        throw new BadRequestException(
          'Stripe booking does not match local booking',
        );
      }

      /*
       * =========================
       * PAYMENT
       * =========================
       */

      payment.status = PaymentStatus.PAID;

      payment.paidAt = new Date();

      payment.transactionId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id;

      payment.paymentMethod = 'STRIPE_CHECKOUT';

      payment.metadata = {
        ...payment.metadata,

        stripePaymentStatus: session.payment_status,

        stripeCustomer:
          typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id,
      };

      /*
       * =========================
       * BOOKING
       * =========================
       */

      booking.status = BookingStatus.CONFIRMED;

      booking.paymentStatus = BookingPaymentStatus.PAID;

      /*
       * Ya no puede expirar porque
       * el cliente pagó.
       */
      booking.expiresAt = null;

      /*
       * Guardamos ambos dentro de la misma
       * transacción.
       */
      await manager.save(Payment, payment);

      await manager.save(Booking, booking);
    });
  }

  private async handleCheckoutFailed(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    const paymentId = Number(session.metadata?.paymentId);

    if (!Number.isInteger(paymentId) || paymentId <= 0) {
      return;
    }

    await this.dataSource.getRepository(Payment).update(
      {
        id: paymentId,
        provider: PaymentProvider.STRIPE,
      },
      {
        status: PaymentStatus.FAILED,
      },
    );
  }

  async findAll() {
    return this.dataSource.getRepository(Payment).find({
      relations: {
        booking: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.dataSource.getRepository(Payment).findOne({
      where: {
        id,
      },
      relations: {
        booking: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async findByBooking(bookingId: number) {
    return this.dataSource.getRepository(Payment).find({
      where: {
        bookingId,
      },

      select: {
        id: true,
        bookingId: true,
        provider: true,
        status: true,
        amount: true,
        currency: true,
        providerPaymentId: true,
        transactionId: true,
        paymentMethod: true,
        paidAt: true,
        refundedAmount: true,
        refundedAt: true,
        createdAt: true,
        updatedAt: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }
}
