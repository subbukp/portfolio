'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GitHubStats {
  repos: number;
  followers: number;
  contributions: number;
  stars: number;
}

interface GitHubActivity {
  type: string;
  repo: string;
  date: string;
  description: string;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [activity, setActivity] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your GitHub username
    const username = 'yourusername';
    
    // Fetch GitHub stats
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        setStats({
          repos: data.public_repos,
          followers: data.followers,
          contributions: 0, // This requires GitHub GraphQL API
          stars: 0 // This requires additional API calls
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    // Fetch recent activity
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const data = await response.json();
        
        const formattedActivity = data.slice(0, 5).map((event: any) => ({
          type: event.type,
          repo: event.repo.name,
          date: new Date(event.created_at).toLocaleDateString(),
          description: event.type === 'PushEvent' 
            ? `Pushed ${event.payload.commits?.length || 0} commits`
            : event.type === 'CreateEvent'
            ? `Created ${event.payload.ref_type}`
            : event.type === 'IssuesEvent'
            ? `${event.payload.action} issue`
            : event.type
        }));

        setActivity(formattedActivity);
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
      }
    };

    Promise.all([fetchStats(), fetchActivity()]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-green-500 p-6 rounded-lg font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal-header mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">github@portfolio</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-500">~/stats</span>
            <span className="text-gray-500">$</span>
            <span className="ml-2">fetch-github-stats --live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl mb-4 border-b border-green-500 pb-2">GitHub Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Public Repositories:</span>
                <span className="text-blue-500">{stats?.repos}</span>
              </div>
              <div className="flex justify-between">
                <span>Followers:</span>
                <span className="text-blue-500">{stats?.followers}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Contributions:</span>
                <span className="text-blue-500">{stats?.contributions}</span>
              </div>
              <div className="flex justify-between">
                <span>Repository Stars:</span>
                <span className="text-blue-500">{stats?.stars}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl mb-4 border-b border-green-500 pb-2">Recent Activity</h2>
            <div className="space-y-3">
              {activity.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 + 0.4 }}
                  className="text-sm"
                >
                  <div className="flex justify-between text-gray-400">
                    <span>{event.date}</span>
                    <span>{event.type}</span>
                  </div>
                  <div className="text-green-400">{event.repo}</div>
                  <div className="text-gray-500">{event.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-sm text-gray-500"
        >
          Last updated: {new Date().toLocaleString()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GitHubStats; 