// app/api/shipping/calculate/route.ts
import { NextResponse } from 'next/server';
import { yurtici } from '@/lib/shipping/carriers/yurtici';
import { mng } from '@/lib/shipping/carriers/mng';
import { hepsijet } from '@/lib/shipping/carriers/hepsijet';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, city } = body;

    // Desi hesaplama (Mock)
    // Gerçek senaryoda product boyutlarından hesaplanır: (En x Boy x Yükseklik) / 3000
    const totalDesi = items.reduce((acc: number, item: any) => acc + (item.quantity * 2), 0); // Varsayılan 2 desi/ürün

    // Tüm kargo firmalarından fiyat al
    const [yurticiPrice, mngPrice, hepsijetPrice] = await Promise.all([
      yurtici.calculatePrice(totalDesi, city),
      mng.calculatePrice(totalDesi, city),
      hepsijet.calculatePrice(totalDesi, city)
    ]);

    // En uygun fiyatı veya tüm seçenekleri dön
    return NextResponse.json({
      desi: totalDesi,
      options: [
        { carrier: 'yurtici', price: yurticiPrice, estimatedDays: '1-3 Gün' },
        { carrier: 'mng', price: mngPrice, estimatedDays: '2-4 Gün' },
        { carrier: 'hepsijet', price: hepsijetPrice, estimatedDays: '1 Gün (Büyükşehir)' }
      ]
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
