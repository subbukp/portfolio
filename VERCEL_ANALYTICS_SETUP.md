# Vercel Analytics Setup Guide

Since Vercel doesn't support persistent file storage, you have several options for storing visitor logs:

## Option 1: Vercel KV (Recommended for Vercel)

1. **Install Vercel KV**:
   ```bash
   npm install @vercel/kv
   ```

2. **Create a KV Store**:
   - Go to your Vercel dashboard
   - Navigate to the "Storage" tab
   - Click "Create Database" → "KV"
   - Follow the setup instructions

3. **Update Environment Variables**:
   - Vercel will automatically add the KV environment variables to your project

## Option 2: Use a Free Database Service

### Using Supabase (Free Tier)
1. Sign up at https://supabase.com
2. Create a new project
3. Create a table for visitor logs
4. Use the Supabase client in your API routes

### Using MongoDB Atlas (Free Tier)
1. Sign up at https://www.mongodb.com/atlas
2. Create a free cluster
3. Get your connection string
4. Use MongoDB in your API routes

## Option 3: Use External Analytics Service

### Using Google Analytics
- Already built into most websites
- No server-side storage needed

### Using Plausible Analytics
- Privacy-focused alternative
- Simple integration

## Quick Fix: In-Memory Storage (Current Implementation)

The current implementation uses in-memory storage when deployed on Vercel. This means:
- ✅ Logs will work during the session
- ❌ Logs will be lost when the function cold starts
- ✅ Good for testing and development
- ❌ Not suitable for production

## Implementing Vercel KV Solution

Here's how to update the code for Vercel KV:

```typescript
// lib/analytics-kv.ts
import { kv } from '@vercel/kv';

export async function readLogs(): Promise<VisitorLog[]> {
  try {
    const logs = await kv.get<VisitorLog[]>('visitor_logs');
    return logs || [];
  } catch (error) {
    console.error('Error reading from KV:', error);
    return [];
  }
}

export async function writeLogs(logs: VisitorLog[]): Promise<void> {
  try {
    const recentLogs = logs.slice(-MAX_LOGS);
    await kv.set('visitor_logs', recentLogs);
  } catch (error) {
    console.error('Error writing to KV:', error);
  }
}
```

## For Development (Local)

The file-based storage will continue to work locally. The code automatically detects if it's running on Vercel and switches to in-memory storage.

## Next Steps

1. Choose one of the options above
2. Update the analytics.ts file accordingly
3. Set up the necessary environment variables
4. Deploy to Vercel

For now, your analytics will work but won't persist between deployments. The in-memory solution is enough for testing the analytics dashboard functionality.