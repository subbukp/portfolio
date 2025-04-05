'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CloudArrowUpIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

const projects = [
  {
    icon: CloudArrowUpIcon,
    name: "GitOps-Driven Cloud Infrastructure",
    stack: ["AWS", "ArgoCD", "Terraform", "Kubernetes", "GitHub Actions"],
    problem: "Needed a scalable, self-healing infrastructure with automated deployments and drift detection",
    actions: [
      "Implemented GitOps workflow using ArgoCD for Kubernetes deployments",
      "Created modular Terraform codebase with remote state management",
      "Set up multi-stage CI/CD pipelines with security scanning",
      "Automated infrastructure validation and compliance checks"
    ],
    outcomes: [
      "Reduced deployment time by 70%",
      "Infrastructure drift detected and corrected automatically",
      "100% audit compliance achieved"
    ],
    links: {
      github: "https://github.com/yourusername/gitops-infrastructure",
      demo: "https://demo.yoursite.com",
      blog: "https://dev.to/yourusername/gitops-journey"
    }
  },
  {
    icon: ShieldCheckIcon,
    name: "Zero-Trust Kubernetes Platform",
    stack: ["GCP", "Kubernetes", "Vault", "Istio", "Terraform"],
    problem: "Required highly secure, zero-trust Kubernetes environment for financial services",
    actions: [
      "Designed network policies and service mesh with Istio",
      "Implemented secret management with HashiCorp Vault",
      "Set up pod security policies and OPA/Gatekeeper",
      "Created automated security compliance reporting"
    ],
    outcomes: [
      "Achieved SOC2 compliance certification",
      "Zero security incidents in 6 months",
      "Reduced secret rotation time by 90%"
    ],
    links: {
      github: "https://github.com/yourusername/secure-k8s",
      blog: "https://medium.com/@yourusername/zero-trust-k8s"
    }
  },
  {
    icon: ChartBarIcon,
    name: "Cloud-Native Observability Platform",
    stack: ["AWS", "Prometheus", "Grafana", "OpenTelemetry", "Terraform"],
    problem: "Lacked comprehensive monitoring and alerting for microservices architecture",
    actions: [
      "Built centralized monitoring with Prometheus and Grafana",
      "Implemented distributed tracing with OpenTelemetry",
      "Created custom dashboards and alert rules",
      "Automated metric collection and retention policies"
    ],
    outcomes: [
      "MTTR reduced from 45min to 10min",
      "Alert noise reduced by 60%",
      "99.99% monitoring system uptime"
    ],
    links: {
      github: "https://github.com/yourusername/observability-stack",
      demo: "https://grafana.yoursite.com",
      blog: "https://dev.to/yourusername/observability"
    }
  },
  {
    icon: RocketLaunchIcon,
    name: "Infrastructure as Code Pipeline",
    stack: ["Azure", "Terraform", "GitHub Actions", "Sentinel", "Terratest"],
    problem: "Manual infrastructure changes leading to inconsistencies and errors",
    actions: [
      "Developed reusable Terraform modules for common infrastructure",
      "Implemented policy-as-code with Sentinel",
      "Created automated testing with Terratest",
      "Set up cost estimation and optimization workflows"
    ],
    outcomes: [
      "Infrastructure deployment time ↓ by 80%",
      "Cost savings of 30% through optimization",
      "Zero production incidents from IaC changes"
    ],
    links: {
      github: "https://github.com/yourusername/terraform-pipeline",
      blog: "https://medium.com/@yourusername/iac-pipeline"
    }
  },
  {
    icon: CommandLineIcon,
    name: "DevOps Automation Toolkit",
    stack: ["Python", "Bash", "Docker", "AWS CLI", "kubectl"],
    problem: "Repetitive operational tasks consuming significant engineer time",
    actions: [
      "Created library of automation scripts for common tasks",
      "Built Docker containers for consistent script execution",
      "Implemented error handling and logging",
      "Added CI/CD for script testing and deployment"
    ],
    outcomes: [
      "Saved 20+ hours/week of manual work",
      "100% adoption by DevOps team",
      "Script execution time ↓ by 40%"
    ],
    links: {
      github: "https://github.com/yourusername/devops-toolkit",
      docs: "https://docs.yoursite.com/toolkit"
    }
  }
];

export default function Projects() {
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
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {/* Project Header */}
                  <div className="flex items-center gap-3">
                    <project.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      📁 {project.name}
                    </h3>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🔧 Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
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

                  {/* Links */}
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
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
