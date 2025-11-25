// lib/payments/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Kullandığınız API versiyonuna göre güncelleyin
  typescript: true,
});
