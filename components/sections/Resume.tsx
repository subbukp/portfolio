'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  BuildingOfficeIcon,
  ServerIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const Resume = () => {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const experiences = [
    {
      title: 'Site Reliability Engineer',
      company: 'Qure.ai',
      duration: 'Oct 2024 - Present',
      role: 'Developer & SRE',
      description: 'Leading deployment and infrastructure management for healthcare AI products including AutoRECIST, qXR, qCT, and Gateway. Built automated installers reducing deployment time from hours to minutes, achieving 3× productivity boost. Developed Django-based backend features and REST APIs while ensuring 99.99% uptime. Serve as Technical POC for multiple clients with 24/7 support, successfully deploying in regulatory-compliant regions like Vietnam and Dubai. Established comprehensive monitoring using Datadog and Grafana, reducing MTTR by 60%.',
      highlights: [
        'Built automated deployment tools reducing TAT from hours to minutes',
        'Managed healthcare AI infrastructure across AWS cloud and on-premise',
        'Integrated with hospital PACS using DICOM protocol',
        'Technical POC providing 24/7 client support'
      ]
    },
    {
      title: 'Management Trainee',
      company: 'Rashtriya Chemical and Fertilizers (PSU)',
      duration: 'Jun 2024 - Oct 2024',
      role: '.NET Developer & DevOps Engineer',
      description: 'Developed .NET applications and implemented DevOps practices in a government public sector undertaking. Worked on modernizing legacy systems and introducing automation practices.',
      highlights: [
        'Developed backend features using .NET framework',
        'Introduced DevOps practices to traditional workflows',
        'Collaborated with government stakeholders'
      ]
    },
    {
      title: 'Systems Engineer',
      company: 'Tata Consultancy Services',
      duration: 'Aug 2021 - Jun 2024',
      role: 'Developer & DevOps Engineer',
      description: 'Worked on Intel projects including IFF Digital Twin and Intelligent Traffic Management. Created REST APIs using context broker framework and managed Kubernetes deployments. Implemented MQTT and Kafka for real-time data streaming. Used Snyk for vulnerability scanning, addressing critical issues including Log4j. Achieved 99% platform uptime and reduced deployment effort by 30% using Helm automation.',
      highlights: [
        'Developed APIs for Digital Twin platform using REST framework',
        'Managed POD deployments in Kubernetes clusters',
        'Implemented real-time messaging with MQTT and Kafka',
        'Improved security posture through automated vulnerability scanning'
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
      title: 'Star Team Award',
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
            {(showAllExperience ? experiences : experiences.slice(0, 1)).map((exp, index) => (
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
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                  {exp.highlights && (
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {experiences.length > 1 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {showAllExperience ? (
                  <>
                    Show Less
                    <ChevronUpIcon className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Show More Experience
                    <ChevronDownIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
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