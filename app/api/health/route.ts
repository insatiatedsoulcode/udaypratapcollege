// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/database';

export async function GET() {
  try {
    // Check database connection
    const healthCheck = db.prepare('SELECT 1 as health').get() as { health: number };
    
    if (healthCheck.health !== 1) {
      return NextResponse.json(
        { status: 'error', message: 'Database connection failed' },
        { status: 503 }
      );
    }

    // Get basic system info
    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      database: 'connected',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}
