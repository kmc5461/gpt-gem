// app/api/notify/push/route.ts
import { NextResponse } from 'next/server';

const SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:50055';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const response = await fetch(`${SERVICE_URL}/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Service Error');

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
