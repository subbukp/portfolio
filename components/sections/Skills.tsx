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
      skills: [
        { name: 'Jenkins', level: 90 },
        { name: 'Azure DevOps', level: 85 },
        { name: 'AWS DevOps', level: 80 },
        { name: 'Maven', level: 85 },
        { name: 'GitLab CI', level: 75 },
      ],
      icon: <ArrowPathIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Container & Orchestration',
      skills: [
        { name: 'Docker', level: 95 },
        { name: 'Kubernetes', level: 90 },
        { name: 'AKS', level: 85 },
        { name: 'EKS', level: 80 },
        { name: 'Helm', level: 75 },
      ],
      icon: <ServerIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Infrastructure as Code',
      skills: [
        { name: 'Terraform', level: 85 },
        { name: 'Ansible', level: 80 },
        { name: 'CloudFormation', level: 70 },
        { name: 'ARM Templates', level: 65 },
      ],
      icon: <CogIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Cloud Platforms',
      skills: [
        { name: 'AWS', level: 85 },
        { name: 'Azure', level: 90 },
        { name: 'EC2/VPC', level: 80 },
        { name: 'S3/RDS', level: 75 },
      ],
      icon: <CloudIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'DevOps Tools',
      skills: [
        { name: 'Git', level: 95 },
        { name: 'SonarQube', level: 85 },
        { name: 'JIRA', level: 90 },
        { name: 'Docker Registry/ECR', level: 80 },
        { name: 'OWASP', level: 75 },
      ],
      icon: <WrenchScrewdriverIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Operating Systems',
      skills: [
        { name: 'Linux', level: 90 },
        { name: 'Windows', level: 85 },
        { name: 'Bash Scripting', level: 80 },
        { name: 'PowerShell', level: 70 },
      ],
      icon: <CommandLineIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600 dark:text-gray-400">
            My expertise in DevOps tools and technologies that I've mastered throughout my professional journey.
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

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-blue-600 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
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
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <DocumentTextIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">AZ-900 Azure Fundamentals</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Microsoft Certified</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <CloudIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">AWS Certified Cloud Practitioner</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Amazon Web Services</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
