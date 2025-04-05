'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newHistory = [...history];
      newHistory.push(`$ ${command}`);

      switch (command.toLowerCase()) {
        case 'help':
          setShowHelp(true);
          newHistory.push(
            'Available commands:',
            '  help     - Show this help message',
            '  ls       - List available pages',
            '  cd /     - Go to homepage',
            '  clear    - Clear terminal',
            '  whoami   - Show current user',
            '  date     - Show current date'
          );
          break;
        case 'ls':
          newHistory.push(
            'Available pages:',
            '  /             Homepage',
            '  /blog         Blog posts',
            '  /projects     Project showcase',
            '  /status       System status',
            '  /contact      Contact information'
          );
          break;
        case 'cd /':
          window.location.href = '/';
          break;
        case 'clear':
          setHistory([]);
          setShowHelp(false);
          setCommand('');
          return;
        case 'whoami':
          newHistory.push('visitor@portfolio');
          break;
        case 'date':
          newHistory.push(new Date().toString());
          break;
        default:
          newHistory.push(`bash: command not found: ${command}`);
      }

      setHistory(newHistory);
      setCommand('');
    }
  };

  useEffect(() => {
    setHistory([
      'bash: error: page not found (404)',
      'Type "help" for available commands'
    ]);
  }, []);

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
            <span className="text-green-500">visitor@portfolio</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-500">~/404</span>
            <span className="text-gray-500">$</span>
          </div>
        </div>

        <div className="terminal-output space-y-2">
          {history.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {line}
            </motion.div>
          ))}
        </div>

        <div className="terminal-input mt-4 flex items-center gap-2">
          <span className="text-green-500">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-green-500 flex-1"
            autoFocus
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>Pro tip: Use the "cd /" command to return to the homepage</p>
          <p>
            Or click here to{' '}
            <Link href="/" className="text-blue-500 hover:underline">
              return home
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound; 