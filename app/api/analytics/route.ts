import { NextRequest, NextResponse } from 'next/server';
import { calculateAnalytics, verifyAnalyticsPassword, readLogs } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }
    
    const password = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!verifyAnalyticsPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 403 }
      );
    }
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const view = searchParams.get('view') || 'analytics';
    
    if (view === 'logs') {
      // Return raw logs (limited to recent 1000)
      const logs = await readLogs();
      const recentLogs = logs.slice(-1000).reverse(); // Most recent first
      
      return NextResponse.json({
        logs: recentLogs,
        total: logs.length,
      });
    } else {
      // Return analytics summary
      const analytics = await calculateAnalytics();
      
      return NextResponse.json(analytics);
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// Prevent other methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}