import { NextRequest, NextResponse } from 'next/server';
import { addLog, parseUserAgent, hashIP, getLocationFromIP } from '@/lib/analytics';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { page, referrer } = body;
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      );
    }
    
    // Get headers
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    
    // Get IP address (handle various proxy headers)
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || request.ip || 'unknown';
    
    // Hash IP for privacy
    const hashedIp = hashIP(ip);
    
    // Parse user agent
    const { browser, os, device } = parseUserAgent(userAgent);
    
    // Get location (optional - returns null for now)
    const location = await getLocationFromIP(ip);
    
    // Create log entry
    await addLog({
      timestamp: new Date().toISOString(),
      ip: hashedIp,
      userAgent: userAgent.substring(0, 200), // Limit length
      referrer: referrer || '',
      page,
      browser,
      os,
      device,
      country: location?.country,
      city: location?.city,
    });
    
    return NextResponse.json({ 
      success: true,
      storage: process.env.VERCEL ? 'in-memory' : 'file',
      message: process.env.VERCEL 
        ? 'Visit logged to in-memory storage (will reset on cold start)' 
        : 'Visit logged to file'
    });
  } catch (error: any) {
    console.error('Error logging visit:', error);
    
    // More detailed error response for debugging
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to log visit: ${error.message}`
      : 'Failed to log visit';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        isVercel: !!process.env.VERCEL,
        message: 'Note: File-based logging does not work on Vercel. Using in-memory storage.'
      },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}