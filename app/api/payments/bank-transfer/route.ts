// app/api/payments/bank-transfer/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client"; // ✅ EKLENDİ

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID gerekli." },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.PENDING, // ✔ ENUM doğru
        paymentStatus: "pending_manual_approval",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Banka havalesi için sipariş güncellendi.",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
