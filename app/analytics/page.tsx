'use client';

import { useState, useEffect } from 'react';
import { AnalyticsData, VisitorLog } from '@/lib/analytics';

interface AuthModalProps {
  onAuth: (password: string) => void;
}

function AuthModal({ onAuth }: AuthModalProps) {
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(password);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Analytics Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Simple bar chart component
interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
}

function SimpleBarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
            <span className="text-gray-800 dark:text-gray-200">{item.value}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [view, setView] = useState<'dashboard' | 'logs'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  
  const fetchData = async (token: string, dataView: 'analytics' | 'logs' = 'analytics') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/analytics?view=${dataView}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setIsAuthenticated(false);
          setError('Authentication failed. Please try again.');
          return;
        }
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      
      if (dataView === 'logs') {
        setLogs(data.logs);
      } else {
        setAnalytics(data);
      }
    } catch (err) {
      setError('Failed to load analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAuth = async (password: string) => {
    setAuthToken(password);
    setIsAuthenticated(true);
    await fetchData(password);
  };
  
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchData(authToken, view === 'logs' ? 'logs' : 'analytics');
    }
  }, [view, isAuthenticated, authToken]);
  
  if (!isAuthenticated) {
    return <AuthModal onAuth={handleAuth} />;
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading analytics...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }
  
  // Prepare data for charts
  const getTopItems = (data: { [key: string]: number }, limit: number = 5) => {
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([label, value]) => ({ label, value }));
  };
  
  const getRecentDailyVisits = () => {
    if (!analytics) return [];
    
    const sortedDates = Object.keys(analytics.dailyVisits).sort();
    const last7Days = sortedDates.slice(-7);
    
    return last7Days.map(date => ({
      label: new Date(date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }),
      value: analytics.dailyVisits[date],
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Portfolio Analytics
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-md transition-colors ${
                view === 'dashboard'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setView('logs')}
              className={`px-4 py-2 rounded-md transition-colors ${
                view === 'logs'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Logs
            </button>
          </div>
        </div>
        
        {view === 'dashboard' && analytics && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Visits</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {analytics.totalVisits.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Unique Visitors</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {analytics.uniqueVisitors.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Most Visited Page</h3>
                <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">
                  {Object.entries(analytics.pageViews).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Referrer</h3>
                <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">
                  {Object.entries(analytics.referrers).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Direct'}
                </p>
              </div>
            </div>
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Visits */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Daily Visits (Last 7 Days)
                </h3>
                <SimpleBarChart data={getRecentDailyVisits()} />
              </div>
              
              {/* Top Pages */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Top Pages
                </h3>
                <SimpleBarChart data={getTopItems(analytics.pageViews)} />
              </div>
              
              {/* Browser Distribution */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Browser Distribution
                </h3>
                <SimpleBarChart data={getTopItems(analytics.browsers)} />
              </div>
              
              {/* Device Distribution */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Device Distribution
                </h3>
                <SimpleBarChart data={getTopItems(analytics.devices)} />
              </div>
              
              {/* OS Distribution */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Operating Systems
                </h3>
                <SimpleBarChart data={getTopItems(analytics.os)} />
              </div>
              
              {/* Top Referrers */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Top Referrers
                </h3>
                <SimpleBarChart data={getTopItems(analytics.referrers)} />
              </div>
            </div>
            
            {/* Hourly Distribution */}
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Hourly Visit Distribution
              </h3>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 24 }, (_, hour) => {
                  const visits = analytics.hourlyDistribution[hour.toString()] || 0;
                  const maxHourlyVisits = Math.max(...Object.values(analytics.hourlyDistribution));
                  const height = maxHourlyVisits > 0 ? (visits / maxHourlyVisits) * 100 : 0;
                  
                  return (
                    <div key={hour} className="flex flex-col items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative" style={{ height: '100px' }}>
                        <div
                          className="absolute bottom-0 w-full bg-green-500 rounded-t transition-all duration-500"
                          style={{ height: `${height}%` }}
                          title={`${hour}:00 - ${visits} visits`}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {hour % 2 === 0 ? hour : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-xs text-gray-600 dark:text-gray-400 mt-2">
                Hour of Day (24h format)
              </div>
            </div>
            
            {/* Page Views Table */}
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                All Page Views
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400">Page</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-400">Views</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-400">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(analytics.pageViews)
                      .sort((a, b) => b[1] - a[1])
                      .map(([page, views]) => (
                        <tr key={page} className="border-b dark:border-gray-700">
                          <td className="py-2 text-gray-800 dark:text-gray-200">{page}</td>
                          <td className="py-2 text-right text-gray-800 dark:text-gray-200">{views}</td>
                          <td className="py-2 text-right text-gray-800 dark:text-gray-200">
                            {((views / analytics.totalVisits) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        
        {view === 'logs' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Recent Visitor Logs ({logs.length} shown)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Timestamp</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Page</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Browser</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">OS</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Device</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-2 text-gray-800 dark:text-gray-200">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">{log.page}</td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">{log.browser || 'Unknown'}</td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">{log.os || 'Unknown'}</td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">{log.device || 'Unknown'}</td>
                      <td className="py-2 text-gray-800 dark:text-gray-200 truncate max-w-xs">
                        {log.referrer || 'Direct'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}