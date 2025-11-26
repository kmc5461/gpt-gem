// app/api/payments/bank-transfer/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) return NextResponse.json({ error: 'Order ID required' }, { status: 400 });

    // Havale/EFT ile ödemede siparişi beklemeye alıyoruz
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'AWAITING_PAYMENT',
        paymentStatus: 'pending_manual_approval', // Admin onayı bekler
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Sipariş alındı. Ödeme onayı bekleniyor.',
      bankDetails: {
        bankName: 'X Bankası',
        iban: 'TR00 0000 0000 0000 0000 0000 00',
        recipient: 'Archetype Ltd. Şti.',
        reference: updatedOrder.orderNumber // Havale açıklamasında kullanılacak
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
