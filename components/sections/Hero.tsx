'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { CommandLineIcon as Terminal, CloudIcon as Cloud, ShieldCheckIcon as Shield, CogIcon as Cog } from '@heroicons/react/24/outline';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <section className="min-h-screen pt-24 md:pt-16 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500/5 dark:bg-blue-400/10 rounded-full"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Subrahmanya K P
              <span className="block text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl md:text-4xl mt-2">
                Site Reliability Engineer
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-lg"
          >
            Designing reliable infrastructure, automating operations, and ensuring system resilience with a focus on observability and performance at Qure.ai.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button href="#projects" className="flex items-center gap-2 w-full sm:w-auto">
              <Terminal className="w-5 h-5" />
              Explore My Work
            </Button>
            <Button href="#contact" variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Cloud className="w-5 h-5" />
              Let's Talk Infrastructure
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            {[
              { icon: Cloud, label: "AWS & Azure" },
              { icon: Cog, label: "CI/CD Pipelines" },
              { icon: Shield, label: "Kubernetes" },
              { icon: Terminal, label: "Infrastructure as Code" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2"
                variants={iconVariants}
                whileHover="hover"
              >
                <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 p-1">
            <div className="absolute inset-0 bg-black/80 rounded-2xl">
              <div className="p-4 font-mono text-sm text-green-400">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-blue-400">$</span> kubectl get pods<br />
                  <span className="text-gray-400">NAME                     READY   STATUS    RESTARTS   AGE</span><br />
                  <span>portfolio-app-849d6989c4-x7zk9   1/1     Running   0          24h</span><br />
                  <span className="text-blue-400">$</span> docker ps<br />
                  <span>CONTAINER ID   IMAGE          STATUS   PORTS</span><br />
                  <span>a8d9f3b2c1    portfolio:v1   Up       80:80</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
