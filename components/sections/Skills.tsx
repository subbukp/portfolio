'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  CloudIcon,
  CogIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

const skillCategories = [
  {
    icon: CloudIcon,
    title: "Cloud & Platforms",
    emoji: "🌐",
    skills: [
      {
        name: "AWS",
        logo: "/logos/aws.svg",
        level: "Expert"
      },
      {
        name: "GCP",
        logo: "/logos/gcp.svg",
        level: "Advanced"
      },
      {
        name: "Azure",
        logo: "/logos/azure.svg",
        level: "Advanced"
      },
      {
        name: "Kubernetes",
        logo: "/logos/kubernetes.svg",
        level: "Expert"
      },
      {
        name: "Docker",
        logo: "/logos/docker.svg",
        level: "Expert"
      },
      {
        name: "Terraform",
        logo: "/logos/terraform.svg",
        level: "Expert"
      },
      {
        name: "Pulumi",
        logo: "/logos/pulumi.svg",
        level: "Advanced"
      }
    ]
  },
  {
    icon: CogIcon,
    title: "CI/CD & Automation",
    emoji: "⚙️",
    skills: [
      {
        name: "GitHub Actions",
        logo: "/logos/github-actions.svg",
        level: "Expert"
      },
      {
        name: "Jenkins",
        logo: "/logos/jenkins.svg",
        level: "Expert"
      },
      {
        name: "GitLab CI",
        logo: "/logos/gitlab.svg",
        level: "Advanced"
      },
      {
        name: "ArgoCD",
        logo: "/logos/argo.svg",
        level: "Advanced"
      },
      {
        name: "Flux",
        logo: "/logos/flux.svg",
        level: "Advanced"
      },
      {
        name: "Spinnaker",
        logo: "/logos/spinnaker.svg",
        level: "Intermediate"
      },
      {
        name: "Ansible",
        logo: "/logos/ansible.svg",
        level: "Expert"
      },
      {
        name: "Helm",
        logo: "/logos/helm.svg",
        level: "Expert"
      }
    ]
  },
  {
    icon: ChartBarIcon,
    title: "Monitoring & Observability",
    emoji: "📊",
    skills: [
      {
        name: "Prometheus",
        logo: "/logos/prometheus.svg",
        level: "Expert"
      },
      {
        name: "Grafana",
        logo: "/logos/grafana.svg",
        level: "Expert"
      },
      {
        name: "ELK Stack",
        logo: "/logos/elastic.svg",
        level: "Advanced"
      },
      {
        name: "EFK Stack",
        logo: "/logos/fluentd.svg",
        level: "Advanced"
      },
      {
        name: "Datadog",
        logo: "/logos/datadog.svg",
        level: "Advanced"
      },
      {
        name: "New Relic",
        logo: "/logos/newrelic.svg",
        level: "Advanced"
      }
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: "Security",
    emoji: "🔒",
    skills: [
      {
        name: "HashiCorp Vault",
        logo: "/logos/vault.svg",
        level: "Expert"
      },
      {
        name: "SOPS",
        logo: "/logos/sops.svg",
        level: "Advanced"
      },
      {
        name: "Snyk",
        logo: "/logos/snyk.svg",
        level: "Advanced"
      },
      {
        name: "Trivy",
        logo: "/logos/trivy.svg",
        level: "Advanced"
      },
      {
        name: "IAM",
        logo: "/logos/iam.svg",
        level: "Expert"
      }
    ]
  },
  {
    icon: CommandLineIcon,
    title: "Dev & Scripting",
    emoji: "💻",
    skills: [
      {
        name: "Bash",
        logo: "/logos/bash.svg",
        level: "Expert"
      },
      {
        name: "Python",
        logo: "/logos/python.svg",
        level: "Expert"
      },
      {
        name: "Go",
        logo: "/logos/go.svg",
        level: "Advanced"
      },
      {
        name: "Node.js",
        logo: "/logos/nodejs.svg",
        level: "Advanced"
      },
      {
        name: "Git",
        logo: "/logos/git.svg",
        level: "Expert"
      },
      {
        name: "REST APIs",
        logo: "/logos/api.svg",
        level: "Expert"
      }
    ]
  }
];

export default function Skills() {
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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              Key Skills & Tools
            </h2>
            <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.emoji}</span>
                    <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {category.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        className="flex flex-col items-center group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative w-12 h-12 mb-2">
                          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors" />
                          <div className="relative w-full h-full flex items-center justify-center p-2">
                            <Image
                              src={skill.logo}
                              alt={skill.name}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <span className="text-xs text-center text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Progress bar indicating overall category expertise */}
                <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left scale-x-75" />
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mt-8"
          >
            Continuously learning and exploring new technologies in the DevOps & Cloud Native ecosystem.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
