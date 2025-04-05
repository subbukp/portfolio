'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Blog post data
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
  }
];

export default function BlogIndex() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            DevOps & SRE Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Insights and experiences from the world of infrastructure and automation
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 bg-blue-600">
                  {post.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    Read more
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 