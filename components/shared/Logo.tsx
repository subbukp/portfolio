'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export default function Logo({ className = '', animate = true }: LogoProps) {
  // Get first letter of your name for the monogram
  const letter = 'Y'; // Change this to your initial

  const pathVariants = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(59, 130, 246, 0)',
    },
    visible: {
      pathLength: 1,
      fill: 'rgba(59, 130, 246, 1)',
      transition: {
        duration: 2,
        ease: 'easeInOut',
        fill: {
          delay: 1.5,
          duration: 0.5,
        },
      },
    },
  };

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className={`${className} text-blue-500`}
      initial={animate ? 'hidden' : 'visible'}
      animate="visible"
    >
      <motion.circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        variants={pathVariants}
      />
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xl font-bold"
        fill="currentColor"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {letter}
      </motion.text>
    </motion.svg>
  );
} 