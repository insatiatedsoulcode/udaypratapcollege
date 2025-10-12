import { NextRequest, NextResponse } from 'next/server';
import { getVisitorCount, incrementVisitorCount } from '../../../lib/database';

export async function GET() {
  try {
    const count = getVisitorCount();
    return NextResponse.json({
      success: true,
      visits: count
    });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch visitor count' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const count = incrementVisitorCount();
    return NextResponse.json({
      success: true,
      visits: count
    });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update visitor count' },
      { status: 500 }
    );
  }
}
