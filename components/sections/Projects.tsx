'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBone,
  faXRay, 
  faBrain,
  faUpload,
  faDigitalTachograph,
  faTrafficLight
} from '@fortawesome/free-solid-svg-icons';

interface ProjectLink {
  github?: string;
  demo?: string;
  blog?: string;
  docs?: string;
}

interface Project {
  icon: any;
  iconColor?: string;
  name: string;
  company?: string;
  stack: string[];
  problem: string;
  actions: string[];
  outcomes: string[];
  links?: ProjectLink;
}

const projects: Project[] = [
  {
    icon: faBone,
    iconColor: "text-red-600 dark:text-red-400",
    name: "AutoRECIST - Automated Tumor Response Evaluation",
    company: "Qure.ai",
    stack: ["Django", "AWS", "EC2", "S3", "RDS", "PostgreSQL", "Docker", "Terraform"],
    problem: "Healthcare providers needed automated tumor response evaluation to streamline oncology workflows and reduce manual assessment time.",
    actions: [
      "Contributed to backend development using Django framework for automated tumor response evaluation logic",
      "Managed AutoRECIST infrastructure on AWS ensuring high availability and scalability",
      "Conducted hands-on training sessions for client teams on deployment across varied environments",
      "Automated key deployment steps to minimize manual overhead and reduce deployment time"
    ],
    outcomes: [
      "Reduced deployment time from hours to minutes through automation",
      "Successfully trained multiple client teams on deployment procedures",
      "Achieved high availability with zero downtime during critical evaluations",
      "Streamlined oncology workflow efficiency",
      "Easy access to check nodule growth in each visit"
    ]
  },
  {
    icon: faXRay,
    iconColor: "text-blue-600 dark:text-blue-400",
    name: "qXR - AI-Powered Chest X-ray Analysis",
    company: "Qure.ai",
    stack: ["Django", "AWS", "EC2", "S3", "IAM", "RDS", "NGINX", "Docker", "DICOM", "Datadog", "Grafana", "PostgreSQL"],
    problem: "Manual chest X-ray analysis was time-consuming and needed automation to improve diagnostic speed while maintaining accuracy across diverse infrastructure environments.",
    actions: [
      "Built automated installer for Linux devices reducing deployment TAT from hours to minutes",
      "Spearheaded on-site troubleshooting resolving critical production issues",
      "Deployed qXR across analog systems, AWS cloud, and on-premise infrastructure",
      "Served as Technical POC for multiple clients with 24/7 support during rotational shifts",
      "Established end-to-end monitoring using Datadog and Grafana for improved observability",
      "Architected scalable, fault-tolerant infrastructure using AWS services and NGINX",
      "Integrated with hospital PACS using DICOM protocol for automated image retrieval"
    ],
    outcomes: [
      "3× productivity boost for client's qXR workflow through optimization",
      "Deployment time reduced from hours to minutes with automated installer",
      "Improved incident response time by 60% with monitoring infrastructure",
      "Successfully deployed in regulatory-compliant environments (Vietnam, Dubai)",
      "Zero critical incidents during 24/7 support periods"
    ]
  },
  {
    icon: faBrain,
    iconColor: "text-purple-600 dark:text-purple-400",
    name: "qCT - CT Scan Analysis Platform",
    company: "Qure.ai",
    stack: ["Django", "PostgreSQL", "AWS", "EC2", "S3", "RDS", "NGINX", "REST API", "Python", "Docker"],
    problem: "Manual report generation for CT scans was a high-frequency task taking hours, creating bottlenecks in the diagnostic pipeline.",
    actions: [
      "Built internal report generation tool using Django automating high-frequency tasks",
      "Designed secure, scalable cloud infrastructure using AWS services",
      "Developed RESTful APIs and backend pipelines for healthcare system integration",
      "Participated in Agile Scrum sprints using Jira for task tracking",
      "Performed code reviews and maintained code quality through pull requests",
      "Collaborated with University of Calgary on benchmarking across 1,500 patient cases"
    ],
    outcomes: [
      "Report generation time reduced from hours to minutes",
      "Validated product performance across 1,500 patient cases",
      "100% API uptime for external healthcare system integrations",
      "Improved team velocity by 25% through Agile practices"
    ]
  },
  {
    icon: faUpload,
    iconColor: "text-green-600 dark:text-green-400",
    name: "Gateway - Healthcare Interoperability Platform",
    company: "Qure.ai",
    stack: ["Django", "PostgreSQL", "DICOM", "Docker", "AWS", "Python", "REST API"],
    problem: "Healthcare facilities needed seamless integration between different imaging systems and lack of interoperability was causing workflow inefficiencies.",
    actions: [
      "Worked extensively with DICOM protocol for healthcare interoperability",
      "Developed features and maintained backend functionality using Django",
      "Deployed Gateway application at multiple client sites",
      "Automated deployment steps to reduce setup time and manual intervention",
      "Implemented secure data transfer protocols for sensitive medical data"
    ],
    outcomes: [
      "Reduced deployment time by 70% through automation",
      "Successfully integrated with 5+ different PACS systems",
      "Zero security incidents with medical data transfers",
      "Improved imaging workflow efficiency by 50%"
    ]
  },
  {
    icon: faDigitalTachograph,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    name: "IFF Digital Twin",
    company: "TCS (Client: Intel)",
    stack: ["Context Broker", "Kubernetes", "Docker", "Helm", "Git", "AWS", "Linux", "Postman", "MQTT", "Kafka"],
    problem: "Need to create a scalable, maintainable digital twin platform for Intel",
    actions: [
      // "Built continuous integration & continuous deployment pipeline using Jenkins",
      "Created API's using REST framework",
      "Wrote Docker files for application deployment",
      "Managed source code repository using Git",
      "Implemented POD management in Kubernetes Cluster",
      // "Integrated code quality tools like SonarQube",
      // "Integrated security analysis tools like OWASP Dependency check",
      "Prepared high level documentation explaining Installation & Configuration",
      "Used snyk tool to check vulnarability in images",
      "Utilized MQTT and Kafka for efficient messaging and real-time data streaming within the platform."
      // "Created GitLab webhooks for automating Jenkins jobs",
      // "Used JIRA tool for ticket tracking"
    ],
    outcomes: [
      "Achieved 99% platform uptime leveraging Kubernetes for resilient deployments",
      "Improved security posture by addressing vulnerabilities, including Log4j, through automated scanning",
      "Reduced deployment effort by 30% with Helm-based automation",
      "Accelerated team onboarding by 40% through clear, high-level technical documentation"
      //"Improved secutiry of images against Log4j issue",
      //"Achieving 99% system uptime and high availability",
      // "Reduced deployment time by 65% through CI/CD automation",
      // "Improved code quality scores by 30% with SonarQube integration",
      // "Enhanced security compliance through automated OWASP scanning",
      // "Zero production incidents due to automated testing pipeline"
    ]
  },
  {
    icon: faTrafficLight,
    iconColor: "text-amber-600 dark:text-amber-400",
    name: "Intelligent Traffic Management",
    company: "TCS (Client: Intel)",
    stack: ["Kubernetes", "Docker", "Grafana"],
    problem: "Needed to provision and deploy a traffic management system with infrastructure as code principles, automated security scanning, and scalable architecture.",
    actions: [
      "Used Maven for building the projects",
      // "Integrated tools like SonarQube and OWASP Dependency Check",
      // "Added Linux VM as an agent for running pipelines",
      // "Provisioned AWS VMs using Terraform",
      // "Built CI/CD pipeline using Jenkins",
      // "Implemented GitLab webhooks for automating Jenkins jobs",
      "Managed POD deployment in Kubernetes Cluster"
      //"Created comprehensive documentation for installation and configuration"
    ],
    outcomes: [
      "Successfully deployed traffic management system in production",
      "Achieved scalable architecture using Kubernetes orchestration"
      //"Infrastructure provisioning time reduced by 80% with Terraform",
      //"Zero security vulnerabilities in production through OWASP integration",
      //"Improved development team productivity by 40% with automated workflows",
      //"Successfully scaled to handle 10x traffic increase"
    ]
  }
];

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Debug: List all project names
  console.log('All projects:', projects.map(p => p.name));
  console.log('Total count:', projects.length);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>
            <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Key projects and initiatives from my work at Qure.ai and other organizations, showcasing impact on healthcare AI and infrastructure automation.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Showing {showAllProjects ? projects.length : Math.min(4, projects.length)} of {projects.length} projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {(showAllProjects ? projects : projects.slice(0, 4)).map((project, idx) => (
              <motion.div
                key={project.name}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6 space-y-4">
                  {/* Project Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <FontAwesomeIcon 
                        icon={project.icon} 
                        className={`w-8 h-8 ${project.iconColor || 'text-blue-600 dark:text-blue-400'}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 break-words">
                        {project.name}
                      </h3>
                      {project.company && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">@ {project.company}</p>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🔧 Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm mb-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Problem Statement */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      💡 Problem
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.problem}
                    </p>
                  </div>

                  {/* Actions Taken */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      ⚙️ What I Did
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {project.actions.map((action, actionIdx) => (
                        <li key={actionIdx}>{action}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📈 Outcome
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {project.outcomes.map((outcome, outcomeIdx) => (
                        <li key={outcomeIdx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Links - if available */}
                  {project.links && (
                    <div className="flex gap-4 pt-4">
                      {project.links.github && (
                        <Link
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          [GitHub]
                        </Link>
                      )}
                      {project.links.demo && (
                        <Link
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          [Live Demo]
                        </Link>
                      )}
                      {project.links.blog && (
                        <Link
                          href={project.links.blog}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          [Blog Write-up]
                        </Link>
                      )}
                      {project.links.docs && (
                        <Link
                          href={project.links.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          [Documentation]
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {projects.length > 4 && (
            <motion.div variants={itemVariants} className="text-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {showAllProjects ? 'Show Less' : 'Show More Projects'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllProjects ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Additional Contributions Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Additional Technical Contributions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🛠️ Tools & Technologies</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Gained hands-on experience with Cursor, Claude Code, LightLLM, Make.com, and MCP</li>
                  <li>• Remote system management using Teleport, Endpoint Central, and Countly</li>
                  <li>• Proficient in Agile-Scrum methodologies and Jira-based project tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🚀 Key Achievements</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Designed Django-based automation for recurring internal requests</li>
                  <li>• Developed and maintained multiple REST APIs for integration pipelines</li>
                  <li>• Delivered 24/7 client support through rotational shifts and weekend availability</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}