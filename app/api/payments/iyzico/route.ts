import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import iyzico from "@/lib/payments/iyzico"; // kendi iyzico SDK dosyan
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ❗❗ DÜZELTİLEN SATIR
    const price = Number(order.total);

    const result = await iyzico.startPaymentProcess({
      price,
      orderId: order.id,
      currency: order.currency || "TRY",
      userId: order.userId,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Iyzico Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
