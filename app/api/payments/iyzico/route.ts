// app/api/payments/iyzico/route.ts
import { NextResponse } from 'next/server';
import { iyzico } from '@/lib/payments/iyzico';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    // Sipariş kontrolü
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    // Iyzico başlatma
    const result = await iyzico.startPaymentProcess({
      price: Number(order.total),
      orderId: order.id,
      // ... diğer iyzico parametreleri
    });

    // Veritabanına geçici durum kaydı
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: 'awaiting_3ds' }
    });

    return NextResponse.json(result);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
