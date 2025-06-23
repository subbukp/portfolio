'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const asciiArt404 = [
    '    ██╗  ██╗ ██████╗ ██╗  ██╗',
    '    ██║  ██║██╔═████╗██║  ██║',
    '    ███████║██║██╔██║███████║',
    '    ╚════██║████╔╝██║╚════██║',
    '         ██║╚██████╔╝     ██║',
    '         ╚═╝ ╚═════╝      ╚═╝',
    '    Page Not Found - But Fun Found!'
  ];

  const cowsay = [
    ' _______________________________',
    '< Oops! This page doesn\'t exist! >',
    ' -------------------------------',
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||'
  ];

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "A QA engineer walks into a bar. Orders 0 beers. Orders 999999999 beers. Orders -1 beers. Orders null beers.",
    "Why did the developer go broke? Because he used up all his cache!",
    "There are only 10 types of people: those who understand binary and those who don't.",
    "Why do Java developers wear glasses? Because they don't C#!",
    "A SQL query walks into a bar, sees two tables and asks: 'Can I join you?'"
  ];

  const matrixRain = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    return Array(50).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newHistory = [...history];
      newHistory.push(`$ ${command}`);

      const cmd = command.toLowerCase().trim();
      const args = cmd.split(' ');
      const mainCmd = args[0];

      switch (mainCmd) {
        case 'help':
          newHistory.push(
            '╔══════════════════════════════════════════════════════════╗',
            '║                    AVAILABLE COMMANDS                      ║',
            '╠══════════════════════════════════════════════════════════╣',
            '║ Navigation:                                                ║',
            '║   cd /         - Go to homepage                           ║',
            '║   cd /blog     - Visit blog                               ║',
            '║   cd /projects - View projects                            ║',
            '║   ls           - List all pages                           ║',
            '║                                                           ║',
            '║ Fun Commands:                                             ║',
            '║   matrix       - Enter the Matrix                         ║',
            '║   glitch       - Enable glitch mode                       ║',
            '║   joke         - Tell me a programmer joke               ║',
            '║   cowsay       - ASCII cow wisdom                         ║',
            '║   hack         - Pretend to be a hacker                  ║',
            '║   game         - Play a mini game                         ║',
            '║   fortune      - Get your tech fortune                    ║',
            '║   ascii        - Show 404 ASCII art                       ║',
            '║                                                           ║',
            '║ System:                                                   ║',
            '║   whoami       - Show current user                        ║',
            '║   date         - Show current date                        ║',
            '║   clear        - Clear terminal                           ║',
            '║   sudo         - Nice try! 😏                            ║',
            '║   exit         - Return to homepage                       ║',
            '╚══════════════════════════════════════════════════════════╝'
          );
          break;

        case 'ls':
          newHistory.push(
            'drwxr-xr-x  2 developer developer 4096 ' + new Date().toDateString() + ' .',
            'drwxr-xr-x  5 developer developer 4096 ' + new Date().toDateString() + ' ..',
            '-rw-r--r--  1 developer developer 2048 ' + new Date().toDateString() + ' index.html',
            '-rw-r--r--  1 developer developer 1024 ' + new Date().toDateString() + ' blog.html',
            '-rw-r--r--  1 developer developer 4096 ' + new Date().toDateString() + ' projects.html',
            '-rw-r--r--  1 developer developer  512 ' + new Date().toDateString() + ' contact.html',
            '-rw-r--r--  1 developer developer  404 ' + new Date().toDateString() + ' [404_THIS_FILE].html'
          );
          break;

        case 'cd':
          if (args[1] === '/') {
            window.location.href = '/';
          } else if (args[1] === '/blog') {
            window.location.href = '/blog';
          } else if (args[1] === '/projects') {
            window.location.href = '/#projects';
          } else {
            newHistory.push(`bash: cd: ${args[1] || 'missing argument'}: No such file or directory`);
          }
          break;

        case 'matrix':
          setShowMatrix(true);
          newHistory.push('Entering the Matrix... Press any key to exit.');
          setTimeout(() => setShowMatrix(false), 5000);
          break;

        case 'glitch':
          setGlitchMode(!glitchMode);
          newHistory.push(glitchMode ? 'Glitch mode disabled' : 'G̸l̷i̶t̴c̵h̷ ̶m̴o̸d̴e̶ ̷e̵n̸a̴b̶l̵e̷d̸!̴');
          break;

        case 'joke':
          const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
          newHistory.push(randomJoke);
          break;

        case 'cowsay':
          newHistory.push(...cowsay);
          break;

        case 'hack':
          setHackerMode(true);
          newHistory.push(
            'INITIALIZING HACK MODE...',
            '[████████████████████████] 100%',
            'ACCESS GRANTED',
            'Just kidding! But you can explore the real projects at /#projects'
          );
          setTimeout(() => setHackerMode(false), 3000);
          break;

        case 'game':
          const randomNum = Math.floor(Math.random() * 10) + 1;
          newHistory.push(
            '🎮 Number Guessing Game!',
            `I'm thinking of a number between 1 and 10.`,
            `Type "guess [number]" to play!`,
            `(Hint: It's ${randomNum} 😉)`
          );
          break;

        case 'guess':
          if (args[1]) {
            newHistory.push(`You guessed ${args[1]}! Great job! 🎉`);
          } else {
            newHistory.push('Usage: guess [number]');
          }
          break;

        case 'fortune':
          const fortunes = [
            '🔮 Your code will compile on the first try today!',
            '🔮 A missing semicolon is in your future.',
            '🔮 You will find the bug on line 42.',
            '🔮 Your next deployment will be on a Friday (brave soul).',
            '🔮 Stack Overflow will have the exact answer you need.',
            '🔮 The bug is not in your code, it\'s a feature!'
          ];
          newHistory.push(fortunes[Math.floor(Math.random() * fortunes.length)]);
          break;

        case 'ascii':
          newHistory.push(...asciiArt404);
          break;

        case 'sudo':
          newHistory.push('[sudo] password for visitor: ');
          newHistory.push('Nice try! You don\'t have sudo privileges in this terminal 😏');
          break;

        case 'clear':
          setHistory([]);
          setCommand('');
          return;

        case 'whoami':
          newHistory.push('visitor@subrahmanya-portfolio');
          break;

        case 'date':
          newHistory.push(new Date().toString());
          break;

        case 'exit':
          window.location.href = '/';
          break;

        case 'vim':
          newHistory.push('Error: Cannot exit vim. You\'re stuck here forever! (Just kidding, type "exit")');
          break;

        case 'rm':
          if (args.includes('-rf') && args.includes('/')) {
            newHistory.push('🚨 WOAH THERE! Let\'s not delete everything! This is just a 404 page, not a real terminal!');
          } else {
            newHistory.push('rm: cannot remove: Permission denied (and it\'s probably for the best)');
          }
          break;

        default:
          if (cmd) {
            newHistory.push(`bash: ${mainCmd}: command not found. Type "help" for available commands.`);
          }
      }

      setHistory(newHistory);
      setCommand('');
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    setHistory([
      ...asciiArt404,
      '',
      'Welcome to the interactive 404 terminal!',
      'Type "help" to see available commands, or "exit" to go home.',
      ''
    ]);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 text-green-500 p-4 sm:p-8 font-mono relative overflow-hidden ${glitchMode ? 'glitch-effect' : ''}`}>
      {showMatrix && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-green-400 text-xs whitespace-pre animate-pulse">
            {Array(20).fill(0).map((_, i) => (
              <div key={i}>{matrixRain()}</div>
            ))}
          </div>
        </div>
      )}

      {hackerMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="text-green-400 text-xs opacity-20 animate-pulse">
            {Array(100).fill(0).map((_, i) => (
              <span key={i} className="inline-block" style={{ 
                position: 'absolute', 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 3 + 2}s linear infinite`
              }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </span>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="terminal-window bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="terminal-header bg-gray-700 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer" onClick={() => window.location.href = '/'}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm">
              visitor@portfolio: ~/404
            </div>
          </div>

          <div 
            ref={terminalRef}
            className="terminal-body p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
          >
            <div className="terminal-output space-y-1">
              {history.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.02 }}
                  className="whitespace-pre-wrap"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <div className="terminal-input mt-2 flex items-center gap-2">
              <span className="text-green-500">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent border-none outline-none text-green-500 flex-1 caret-green-500"
                placeholder="Type a command..."
                autoFocus
              />
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">
            💡 Pro tip: This is a fully interactive terminal! Try commands like "matrix", "joke", or "game"
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
              🏠 Go Home
            </Link>
            <Link href="/#projects" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
              🚀 View Projects
            </Link>
            <button 
              onClick={() => setHistory([...history, '', '✨ Terminal cleared!', ''])} 
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
            >
              🧹 Clear Terminal
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }

        .glitch-effect {
          animation: glitch 0.3s infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 4px;
        }

        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: #1f2937;
        }
      `}</style>
    </div>
  );
};

export default NotFound;