'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function SecretPage() {
  const [keys, setKeys] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key];
      if (newKeys.length > KONAMI_CODE.length) {
        newKeys.shift();
      }
      setKeys(newKeys);

      if (newKeys.join(',') === KONAMI_CODE.join(',')) {
        setUnlocked(true);
        setMessage('🎮 Konami Code Activated! You found the secret!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {unlocked ? '🎉 Secret Unlocked!' : '🤫 Secret Page'}
          </h1>
          
          {!unlocked ? (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This is a secret page! Try using the Konami code to unlock its contents...
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hint: It's a classic gaming cheat code
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <p className="text-green-600 dark:text-green-400 mb-6">{message}</p>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Here's a special message just for you:
                </p>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200 font-mono">
                    Thank you for being curious and exploring! 
                    Sometimes the best discoveries come from trying unexpected things.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="/"
                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Return Home
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 