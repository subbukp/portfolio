'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, ShieldCheckIcon, ChartBarIcon, CommandLineIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const principles = [
  {
    icon: CodeBracketIcon,
    title: "Infrastructure as Code",
    description: "Automating infrastructure deployment using Terraform, CloudFormation, and Ansible"
  },
  {
    icon: ShieldCheckIcon,
    title: "Shift-Left Security",
    description: "Embedding security practices early in the development lifecycle"
  },
  {
    icon: ChartBarIcon,
    title: "Observability-First",
    description: "Implementing comprehensive monitoring, logging, and tracing solutions"
  },
  {
    icon: CommandLineIcon,
    title: "Automation-Driven",
    description: "Building robust CI/CD pipelines and automated workflows"
  },
  {
    icon: CloudArrowUpIcon,
    title: "Cloud Native",
    description: "Leveraging cloud-native technologies and containerization"
  },
  {
    icon: LockClosedIcon,
    title: "Security Best Practices",
    description: "Following DevSecOps principles and security standards"
  }
];

const socialLinks = [
  {
    platform: "GitHub",
    url: "https://github.com/subbukp",
    className: "hover:text-gray-900 dark:hover:text-gray-100"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/subrahmanya-k-p-964733184/",
    className: "hover:text-blue-600 dark:hover:text-blue-400"
  },
  {
    platform: "X(FormerlyTwitter)",
    url: "https://x.com/subrahmanya11",
    className: "hover:text-purple-600 dark:hover:text-purple-400"
  },
  {
    platform: "Dev.to",
    url: "https://dev.to/subbukp",
    className: "hover:text-purple-600 dark:hover:text-purple-400"
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="prose dark:prose-invert max-w-none"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Developer & Site Reliability Engineer</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A versatile technology professional with 3+ years of experience bridging development and operations. I combine strong backend 
              development skills in Django, Python, and .NET with deep expertise in DevOps practices, infrastructure automation, and site reliability engineering.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Currently working as a Site Reliability Engineer at Qure.ai, where I wear multiple hats - developing backend features, building 
              automation tools, and ensuring infrastructure reliability. I've successfully developed Django-based applications, REST APIs, and 
              deployment automation tools while managing critical healthcare products like AutoRECIST, qXR, qCT, and Gateway across diverse 
              cloud and on-premise environments.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              My unique blend of development and SRE expertise has resulted in building automated installers that reduced deployment time from 
              hours to minutes, creating internal tools that boosted productivity by 3×, and maintaining 99.99% uptime for critical systems. 
              I thrive at the intersection of code and infrastructure, whether it's developing Django applications, automating with Python, 
              or architecting scalable cloud solutions.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-2">
                Django & Python
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-2">
                Backend Development
              </span>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium mb-2">
                DevOps & SRE
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium mb-2">
                AWS & Azure
              </span>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium mb-2">
                Kubernetes & Docker
              </span>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium mb-2">
                Infrastructure as Code
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <CodeBracketIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Backend Development</h3>
              <p className="text-gray-600 dark:text-gray-400">Built Django applications, REST APIs, and automation tools for healthcare AI products.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <CloudArrowUpIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Infrastructure & Deployment</h3>
              <p className="text-gray-600 dark:text-gray-400">Architected scalable solutions across AWS/Azure, reducing deployment time by 90%.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <CommandLineIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Automation & Tooling</h3>
              <p className="text-gray-600 dark:text-gray-400">Developed Python scripts and tools that achieved 3× productivity improvements.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <ShieldCheckIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Site Reliability</h3>
              <p className="text-gray-600 dark:text-gray-400">Maintained 99.99% uptime with comprehensive monitoring and 60% MTTR reduction.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
