// app/api/shipping/track/route.ts
import { NextResponse } from 'next/server';
import { yurtici } from '@/lib/shipping/carriers/yurtici';
import { mng } from '@/lib/shipping/carriers/mng';
import { hepsijet } from '@/lib/shipping/carriers/hepsijet';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trackingNumber = searchParams.get('code');
  const carrier = searchParams.get('carrier');

  if (!trackingNumber || !carrier) {
    return NextResponse.json({ error: 'Missing tracking number or carrier' }, { status: 400 });
  }

  try {
    let result;

    switch (carrier.toLowerCase()) {
      case 'yurtici':
        result = await yurtici.trackShipment(trackingNumber);
        break;
      case 'mng':
        result = await mng.trackShipment(trackingNumber);
        break;
      case 'hepsijet':
        result = await hepsijet.trackShipment(trackingNumber);
        break;
      default:
        return NextResponse.json({ error: 'Invalid carrier' }, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
