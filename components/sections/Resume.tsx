'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  BuildingOfficeIcon,
  CommandLineIcon,
  ServerIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Resume = () => {
  const experiences = [
    {
      title: 'Site Reliability Engineer',
      company: 'Qure.ai',
      duration: 'Oct 2024 - Present',
      role: 'SRE',
      description: 'Working on infrastructure reliability, automating operations, and implementing SRE practices to maintain and improve system availability and performance.'
    },
    {
      title: 'Management Trainee',
      company: 'Rashtriya Chemical and Fertilizers (PSU)',
      duration: 'Jun 2024 - Oct 2024',
      role: '.Net Developer and DevOps Engineer',
      description: 'Worked on .Net development and implementing DevOps practices in a government public sector undertaking.'
    },
    {
      title: 'Systems Engineer',
      company: 'Tata Consultancy Services',
      duration: 'Aug 2021 - Jun 2024',
      role: 'DevOps Engineer',
      description: 'Designed and implemented automated deployment pipelines and configuration management systems. Collaborated with development teams to implement agile methodology and performance tuning procedures, resulting in a 30% reduction in security incidents and a 25% improvement in system performance.'
    }
  ];

  const projects = [
    {
      title: 'IFF Digital Twin',
      client: 'Intel',
      organization: 'TCS',
      tools: ['Kubernetes', 'Docker', 'Helm', 'Jenkins', 'Git', 'AWS', 'Sonarqube', 'Linux', 'Docker', 'Postman'],
      responsibilities: [
        'Built continuous integration & continuous deployment pipeline using Jenkins',
        'Wrote Docker files for docker images to be used for application deployment',
        'Managed source code repository using GIT',
        'Deployments using Docker repo',
        'POD Management in Kubernetes Cluster',
        'Integrated Code quality tools like Sonarqube',
        'Integrated security analysis tools like OWASP Dependency check',
        'Prepared high level documentation explaining Installation & Configuration',
        'Created Gitlab webhooks for automating Jenkins jobs',
        'Used JIRA tool for ticket tracking'
      ]
    },
    {
      title: 'Intelligent Traffic Management',
      client: 'Intel',
      organization: 'TCS',
      tools: ['Kubernetes', 'Docker', 'Helm', 'Jenkins', 'Git', 'AWS', 'Sonarqube', 'Linux', 'Docker', 'Postman', 'Terraform'],
      responsibilities: [
        'Used maven for building the projects',
        'Integration of tools like Sonarqube, Owasp Dependency Check',
        'Added Linux VM as an agent for running pipelines',
        'Provisioned AWS VMs Using Terraform',
        'Built continuous integration & continuous deployment pipeline using Jenkins',
        'Wrote Docker files for docker images to be used for application deployment',
        'Managed source code repository using GIT',
        'Deployments using Docker repo',
        'POD Management in Kubernetes Cluster',
        'Integrated security analysis tools like OWASP Dependency check',
        'Prepared high level documentation explaining Installation & Configuration',
        'Created Gitlab webhooks for automating Jenkins jobs'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.E',
      institution: 'Dr. Ambedkar Institute of Technology, Bengaluru',
      duration: 'Aug 2017 – June 2021'
    },
    {
      degree: '12th (CBSE Board)',
      institution: 'Jawahar Navodaya Vidyalaya',
      duration: '2016'
    },
    {
      degree: '10th (CBSE Board)',
      institution: 'Jawahar Navodaya Vidyalaya',
      duration: '2014'
    }
  ];

  const awards = [
    {
      title: 'Customer Delight',
      description: 'Received for doing multiple POCs and getting good feedback, appreciation from engagements'
    },
    {
      title: 'Hero Of The Cluster',
      description: 'Received for good work performance in the project'
    }
  ];

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <div className="flex justify-center mt-6">
            <Link 
              href="/Subrahmanya_K_P.pdf" 
              target="_blank"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download Resume
            </Link>
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <BriefcaseIcon className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Work Experience
          </h3>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-8 border-l-2 border-blue-600 dark:border-blue-500"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">{exp.title}</h4>
                    <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mt-1 sm:mt-0">
                      {exp.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center mb-4 text-gray-600 dark:text-gray-400">
                    <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                    <span>{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{exp.role}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <CommandLineIcon className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Key Projects
          </h3>

          <div className="space-y-10">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 md:mb-0">{project.title}</h4>
                  <div className="mt-1 md:mt-0 flex flex-wrap items-center text-gray-600 dark:text-gray-400">
                    <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                    <span>{project.organization}</span>
                    <span className="mx-2">•</span>
                    <span>Client: {project.client}</span>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Responsibilities:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {project.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <AcademicCapIcon className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Education
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{edu.degree}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-1">{edu.institution}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <ServerIcon className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Awards & Recognition
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{award.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume; 