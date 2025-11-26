// app/api/payments/paytr/route.ts
import { NextResponse } from 'next/server';
import { paytr } from '@/lib/payments/paytr';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, userIp } = body;

    const order = await prisma.order.findUnique({ 
      where: { id: orderId },
      include: { user: true, items: true } 
    });
    
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const basket = order.items.map(item => [item.name, item.price, item.quantity]);

    // PayTR Token oluştur
    const result = await paytr.generateToken(
      userIp || '127.0.0.1',
      order.id,
      order.user?.email || 'guest@example.com',
      Number(order.totalAmount),
      basket
    );

    return NextResponse.json(result);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
