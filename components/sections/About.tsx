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
    url: "https://github.com/yourusername",
    className: "hover:text-gray-900 dark:hover:text-gray-100"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    className: "hover:text-blue-600 dark:hover:text-blue-400"
  },
  {
    platform: "Dev.to",
    url: "https://dev.to/yourusername",
    className: "hover:text-purple-600 dark:hover:text-purple-400"
  }
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              About Me
            </h2>
            <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Experience Description */}
          <motion.div 
            variants={itemVariants}
            className="prose prose-lg dark:prose-invert mx-auto"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              With extensive experience in Site Reliability Engineering and DevOps practices, 
              I specialize in building and maintaining highly available, scalable, and secure 
              infrastructure. My expertise spans across cloud platforms, containerization, 
              automation, and implementing robust security measures.
            </p>
          </motion.div>

          {/* Core Principles Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <principle.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Highlights */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Technical Proficiencies
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>🔹 <strong>Cloud Platforms:</strong> AWS, GCP, Azure</p>
              <p>🔹 <strong>Container Orchestration:</strong> Kubernetes, Docker Swarm</p>
              <p>🔹 <strong>CI/CD:</strong> Jenkins, GitLab CI, GitHub Actions</p>
              <p>🔹 <strong>Infrastructure as Code:</strong> Terraform, CloudFormation, Ansible</p>
              <p>🔹 <strong>Monitoring & Observability:</strong> Prometheus, Grafana, ELK Stack</p>
              <p>🔹 <strong>Security Tools:</strong> HashiCorp Vault, SonarQube, OWASP Tools</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-6 mt-8"
          >
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 ${link.className} transition-colors duration-200`}
              >
                {link.platform}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
