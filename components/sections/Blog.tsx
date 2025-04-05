'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const blogPosts = [
  {
    title: "How I Set Up GitOps with ArgoCD in 10 Steps",
    slug: "gitops-setup-with-argocd",
    excerpt: "A practical guide to implementing GitOps using ArgoCD, from initial setup to advanced deployment strategies. Learn how to automate your Kubernetes deployments and maintain infrastructure as code.",
    date: "2024-04-01",
    readingTime: "15 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "DevOps"],
    coverImage: "/blog/gitops-argocd.png"
  },
  {
    title: "Securing CI/CD Pipelines: A DevOps Checklist",
    slug: "securing-cicd-pipelines",
    excerpt: "Essential security practices for your CI/CD pipelines. From secrets management to container scanning, learn how to build and maintain secure deployment pipelines.",
    date: "2024-03-25",
    readingTime: "12 min read",
    tags: ["Security", "CI/CD", "DevOps", "Best Practices"],
    coverImage: "/blog/secure-cicd.png"
  },
  {
    title: "Zero Downtime Deployments with Kubernetes",
    slug: "zero-downtime-kubernetes-deployments",
    excerpt: "Implement zero-downtime deployments in Kubernetes using rolling updates, blue-green deployments, and canary releases. Includes real-world examples and best practices.",
    date: "2024-03-18",
    readingTime: "18 min read",
    tags: ["Kubernetes", "DevOps", "Deployment", "SRE"],
    coverImage: "/blog/k8s-deployment.png"
  },
  {
    title: "Using Terraform Workspaces for Multi-Env Management",
    slug: "terraform-workspaces-guide",
    excerpt: "Master Terraform workspaces to manage multiple environments efficiently. Learn how to structure your code, handle state files, and implement best practices for environment isolation.",
    date: "2024-03-10",
    readingTime: "14 min read",
    tags: ["Terraform", "IaC", "DevOps", "Cloud"],
    coverImage: "/blog/terraform-workspaces.png"
  }
];

export default function Blog() {
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
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              Technical Write-ups
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Sharing knowledge and experiences from the DevOps trenches
            </p>
            <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={idx}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 bg-blue-100 dark:bg-blue-900/30">
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg
                        className="w-16 h-16 opacity-20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12 12 0 01.665 6.479A11.94 11.94 0 0112 20.001a11.94 11.94 0 01-6.825-2.944 12 12 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 group">
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
