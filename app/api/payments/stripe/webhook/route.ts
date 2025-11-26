// app/api/payments/stripe/webhook/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    // Webhook imza doğrulama
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // Olayları işle
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        if (orderId) {
          // Sipariş durumunu güncelle
          await prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'PAID', // Veya PROCESSING
              paymentStatus: 'succeeded',
              updatedAt: new Date(),
            },
          });
          
          // Stok düşme, fatura oluşturma vs. burada tetiklenebilir
          // await inventoryService.decreaseStock(orderId);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        const failedOrderId = failedIntent.metadata.orderId;
        
        if (failedOrderId) {
          await prisma.order.update({
            where: { id: failedOrderId },
            data: {
              paymentStatus: 'failed',
            },
          });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Webhook handler failed:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
