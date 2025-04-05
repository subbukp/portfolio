'use client';

import { motion } from 'framer-motion';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

interface SystemMetric {
  name: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

const services: ServiceStatus[] = [
  {
    name: 'API Gateway',
    status: 'operational',
    uptime: '99.99%',
    latency: '45ms'
  },
  {
    name: 'Auth Service',
    status: 'operational',
    uptime: '99.95%',
    latency: '87ms'
  },
  {
    name: 'Database Cluster',
    status: 'operational',
    uptime: '99.99%',
    latency: '12ms'
  },
  {
    name: 'Cache Layer',
    status: 'degraded',
    uptime: '99.85%',
    latency: '156ms'
  },
  {
    name: 'Message Queue',
    status: 'operational',
    uptime: '99.97%',
    latency: '34ms'
  }
];

const metrics: SystemMetric[] = [
  {
    name: 'CPU Usage',
    value: '42%',
    trend: 'stable'
  },
  {
    name: 'Memory Usage',
    value: '67%',
    trend: 'up'
  },
  {
    name: 'Disk I/O',
    value: '23MB/s',
    trend: 'down'
  },
  {
    name: 'Network Traffic',
    value: '1.2GB/s',
    trend: 'up'
  }
];

const StatusPage = () => {
  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: SystemMetric['trend']) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      case 'stable':
        return '→';
      default:
        return '-';
    }
  };

  const getTrendColor = (trend: SystemMetric['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-yellow-500';
      case 'down':
        return 'text-green-500';
      case 'stable':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 p-8 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal-header mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">root@portfolio</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-500">~/status</span>
            <span className="text-gray-500">$</span>
            <span className="ml-2">system_status --watch</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="service-status"
          >
            <h2 className="text-xl mb-4 border-b border-green-500 pb-2">Service Status</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span>{service.name}</span>
                  <div className="flex items-center gap-4">
                    <span className={getStatusColor(service.status)}>{service.status}</span>
                    <span>{service.uptime}</span>
                    <span>{service.latency}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="system-metrics"
          >
            <h2 className="text-xl mb-4 border-b border-green-500 pb-2">System Metrics</h2>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                  className="flex items-center justify-between"
                >
                  <span>{metric.name}</span>
                  <div className="flex items-center gap-4">
                    <span>{metric.value}</span>
                    <span className={getTrendColor(metric.trend)}>{getTrendIcon(metric.trend)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-xl mb-4 border-b border-green-500 pb-2">Recent Events</h2>
          <div className="space-y-2 text-sm">
            <div>[2024-03-29 15:42:03] Cache layer performance degraded - investigating</div>
            <div>[2024-03-29 15:30:00] Automated backup completed successfully</div>
            <div>[2024-03-29 15:15:22] Security patches applied to all services</div>
            <div>[2024-03-29 15:00:00] System health check passed</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-sm text-gray-500"
        >
          Last updated: {new Date().toLocaleString()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StatusPage; 