import { NextResponse } from 'next/server';
import { readLogs, addLog } from '@/lib/analytics';

export async function GET() {
  try {
    // Try to add a test log
    await addLog({
      timestamp: new Date().toISOString(),
      ip: 'test-ip-hash',
      userAgent: 'Test User Agent',
      referrer: 'test-referrer',
      page: '/test',
      browser: 'Test Browser',
      os: 'Test OS',
      device: 'Test Device',
    });
    
    // Read logs
    const logs = await readLogs();
    
    return NextResponse.json({
      success: true,
      logsCount: logs.length,
      lastLog: logs[logs.length - 1] || null,
      message: 'Test log added successfully'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}