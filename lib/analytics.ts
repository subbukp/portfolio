import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Types
export interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  referrer: string;
  page: string;
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  device?: string;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: { [page: string]: number };
  referrers: { [referrer: string]: number };
  browsers: { [browser: string]: number };
  os: { [os: string]: number };
  devices: { [device: string]: number };
  countries: { [country: string]: number };
  dailyVisits: { [date: string]: number };
  hourlyDistribution: { [hour: string]: number };
}

// Constants
const LOGS_FILE = path.join(process.cwd(), 'logs', 'visitors.json');
const MAX_LOGS = 10000; // Prevent file from growing too large
const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD || 'admin123'; // Should be in env vars

// For Vercel deployment, we'll use an in-memory store as a fallback
let inMemoryLogs: VisitorLog[] = [];

// Helper functions
export function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

export function parseUserAgent(userAgent: string): { browser: string; os: string; device: string } {
  const browser = detectBrowser(userAgent);
  const os = detectOS(userAgent);
  const device = detectDevice(userAgent);
  
  return { browser, os, device };
}

function detectBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  return 'Other';
}

function detectOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Other';
}

function detectDevice(userAgent: string): string {
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) return 'Mobile';
  if (userAgent.includes('Tablet') || userAgent.includes('iPad')) return 'Tablet';
  return 'Desktop';
}

// Log management functions
export async function readLogs(): Promise<VisitorLog[]> {
  // Check if we're in Vercel environment
  if (process.env.VERCEL) {
    // Use in-memory storage for Vercel
    return inMemoryLogs;
  }
  
  try {
    // Ensure directory exists first
    const logsDir = path.dirname(LOGS_FILE);
    await fs.mkdir(logsDir, { recursive: true });
    
    // Try to read the file
    const data = await fs.readFile(LOGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    // If file doesn't exist, create it with empty array
    if (error.code === 'ENOENT') {
      await fs.writeFile(LOGS_FILE, '[]');
      return [];
    }
    // For any other error, return empty array
    console.error('Error reading logs:', error);
    return [];
  }
}

export async function writeLogs(logs: VisitorLog[]): Promise<void> {
  // Keep only the most recent logs to prevent memory bloat
  const recentLogs = logs.slice(-MAX_LOGS);
  
  // Check if we're in Vercel environment
  if (process.env.VERCEL) {
    // Use in-memory storage for Vercel
    inMemoryLogs = recentLogs;
    return;
  }
  
  try {
    // Ensure directory exists
    const logsDir = path.dirname(LOGS_FILE);
    await fs.mkdir(logsDir, { recursive: true });
    
    await fs.writeFile(LOGS_FILE, JSON.stringify(recentLogs, null, 2));
  } catch (error) {
    console.error('Error writing logs:', error);
    // Fallback to in-memory storage
    inMemoryLogs = recentLogs;
  }
}

export async function addLog(log: Omit<VisitorLog, 'id'>): Promise<void> {
  const logs = await readLogs();
  const newLog: VisitorLog = {
    ...log,
    id: crypto.randomUUID(),
  };
  logs.push(newLog);
  await writeLogs(logs);
}

// Analytics calculations
export async function calculateAnalytics(): Promise<AnalyticsData> {
  const logs = await readLogs();
  
  const analytics: AnalyticsData = {
    totalVisits: logs.length,
    uniqueVisitors: new Set(logs.map(log => log.ip)).size,
    pageViews: {},
    referrers: {},
    browsers: {},
    os: {},
    devices: {},
    countries: {},
    dailyVisits: {},
    hourlyDistribution: {},
  };
  
  // Process each log
  logs.forEach(log => {
    // Page views
    analytics.pageViews[log.page] = (analytics.pageViews[log.page] || 0) + 1;
    
    // Referrers
    const referrer = log.referrer || 'Direct';
    analytics.referrers[referrer] = (analytics.referrers[referrer] || 0) + 1;
    
    // Browser, OS, Device
    if (log.browser) analytics.browsers[log.browser] = (analytics.browsers[log.browser] || 0) + 1;
    if (log.os) analytics.os[log.os] = (analytics.os[log.os] || 0) + 1;
    if (log.device) analytics.devices[log.device] = (analytics.devices[log.device] || 0) + 1;
    
    // Countries
    if (log.country) analytics.countries[log.country] = (analytics.countries[log.country] || 0) + 1;
    
    // Daily visits
    const date = new Date(log.timestamp).toISOString().split('T')[0];
    analytics.dailyVisits[date] = (analytics.dailyVisits[date] || 0) + 1;
    
    // Hourly distribution
    const hour = new Date(log.timestamp).getHours().toString();
    analytics.hourlyDistribution[hour] = (analytics.hourlyDistribution[hour] || 0) + 1;
  });
  
  return analytics;
}

// Authentication
export function verifyAnalyticsPassword(password: string): boolean {
  return password === ANALYTICS_PASSWORD;
}

// IP Geolocation (simplified - in production, use a proper geolocation API)
export async function getLocationFromIP(ip: string): Promise<{ country: string; city: string } | null> {
  // For now, return null. In production, integrate with a geolocation API
  // like ipapi.co, ipgeolocation.io, or MaxMind
  return null;
}

// Clean old logs (optional utility)
export async function cleanOldLogs(daysToKeep: number = 30): Promise<void> {
  const logs = await readLogs();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  
  const recentLogs = logs.filter(log => 
    new Date(log.timestamp) > cutoffDate
  );
  
  await writeLogs(recentLogs);
}