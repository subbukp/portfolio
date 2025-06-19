'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ServerIcon,
  CogIcon,
  CloudIcon,
  CommandLineIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CircleStackIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const Skills = () => {
  const skillCategories = [
    {
      name: 'CI/CD & Deployment',
      skills: ['Jenkins', 'Azure DevOps', 'AWS DevOps', 'Maven', 'GitLab CI', 'GitHub Actions'],
      icon: <ArrowPathIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Container & Orchestration',
      skills: ['Docker', 'Kubernetes', 'AKS', 'EKS', 'Helm', 'Docker Compose'],
      icon: <ServerIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Infrastructure as Code',
      skills: ['Terraform', 'Ansible', 'CloudFormation', 'ARM Templates', 'Pulumi'],
      icon: <CogIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Cloud Platforms',
      skills: ['AWS', 'Azure', 'EC2/VPC', 'S3/RDS', 'Lambda', 'Azure Functions'],
      icon: <CloudIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'DevOps Tools',
      skills: ['Git', 'SonarQube', 'JIRA', 'Docker Registry/ECR', 'OWASP', 'Nexus'],
      icon: <WrenchScrewdriverIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Monitoring & Observability',
      skills: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'Azure Monitor', 'New Relic'],
      icon: <ShieldCheckIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Operating Systems & Scripting',
      skills: ['Linux', 'Windows', 'Bash', 'PowerShell', 'Python', 'Shell Scripting'],
      icon: <CommandLineIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Databases & Storage',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'S3', 'Azure Blob Storage'],
      icon: <CircleStackIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Security & Compliance',
      skills: ['SAST/DAST', 'Vault', 'IAM', 'SSL/TLS', 'Security Scanning', 'Compliance Tools'],
      icon: <ShieldCheckIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600 dark:text-gray-400">
            Comprehensive expertise in modern DevOps tools, cloud platforms, and infrastructure technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 break-words">{category.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Certifications & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <DocumentTextIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">AZ-900 Azure Fundamentals</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Microsoft Certified</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <CloudIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">AWS Certified Cloud Practitioner</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Amazon Web Services</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Key Strengths</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                Infrastructure Automation
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                Cloud Architecture
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                CI/CD Pipeline Design
              </span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                System Reliability
              </span>
              <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                Security Best Practices
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;