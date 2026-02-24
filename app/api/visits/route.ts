import { NextResponse } from 'next/server';
import { getVisitorCount, incrementVisitorCount } from '@/lib/database';

export async function GET() {
  try {
    const count = await getVisitorCount();
    return NextResponse.json({ success: true, visits: count });
  } catch (error) {
    // DB unavailable — return safe fallback instead of crashing the client
    console.error('Error fetching visitor count:', error);
    return NextResponse.json({ success: true, visits: 0 });
  }
}

export async function POST() {
  try {
    const count = await incrementVisitorCount();
    return NextResponse.json({ success: true, visits: count });
  } catch (error) {
    // DB unavailable — return safe fallback instead of crashing the client
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json({ success: true, visits: 0 });
  }
}
