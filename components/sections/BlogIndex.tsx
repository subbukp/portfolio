'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Blog post data - synced with Blog.tsx
const blogPosts = [
  {
    title: "My Production-Grade GitOps Journey with ArgoCD: Lessons & Pitfalls",
    slug: "gitops-setup-with-argocd",
    excerpt: "From broken deployments to 99.9% reliability—discover my hard-won lessons implementing GitOps with ArgoCD at scale. Learn the exact configurations that saved our team countless hours and prevented critical outages.",
    date: "2024-04-01",
    readingTime: "15 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "DevOps"],
    coverImage: "/blog/gitops-argocd.png",
    featured: true
  },
  {
    title: "The Incident That Changed Our CI/CD Security Approach Forever",
    slug: "securing-cicd-pipelines",
    excerpt: "When our CI pipeline was compromised, we had to rebuild our entire security model. This detailed breakdown covers how we detected the breach, our incident response, and the 12-point security framework we developed to prevent it from happening again.",
    date: "2024-03-25",
    readingTime: "12 min read",
    tags: ["Security", "CI/CD", "DevOps", "Best Practices"],
    coverImage: "/blog/secure-cicd.png"
  },
  {
    title: "How We Achieved Zero Downtime Kubernetes Deployments After 5 Failed Attempts",
    slug: "zero-downtime-kubernetes-deployments",
    excerpt: "Our journey to zero-downtime deployments wasn't straightforward. After five costly failures impacting customers, we finally cracked the code. I share the exact strategies, configurations, and lesson from each failure that led to our current bulletproof approach.",
    date: "2024-03-18",
    readingTime: "18 min read",
    tags: ["Kubernetes", "DevOps", "Deployment", "SRE"],
    coverImage: "/blog/k8s-deployment.png"
  },
  {
    title: "Terraform at Scale: How We Manage 150+ Environments Without Losing Our Minds",
    slug: "terraform-workspaces-guide",
    excerpt: "When our infrastructure grew to support 150+ environments across multiple cloud providers, our Terraform workflow broke down completely. Here's our journey to sanity—featuring custom workflows, modular design patterns, and automation that saved us 30+ hours weekly.",
    date: "2024-03-10",
    readingTime: "14 min read",
    tags: ["Terraform", "IaC", "DevOps", "Cloud"],
    coverImage: "/blog/terraform-workspaces.png"
  },
  {
    title: "The Monitoring Stack That Detected a $40K/Month AWS Billing Issue Before It Happened",
    slug: "cloud-cost-monitoring",
    excerpt: "Our cloud bill was climbing $5K every month with no clear cause. I'll walk you through building the exact observability stack that helped us identify inefficient resource allocation patterns, saving us from a potential $40K/month cloud spending disaster.",
    date: "2024-03-02",
    readingTime: "17 min read",
    tags: ["Cloud", "AWS", "Cost Optimization", "Monitoring"],
    coverImage: "/blog/cloud-cost.png"
  },
  {
    title: "We Moved Our Data Lake to Snowflake: The Good, Bad and Ugly Truth",
    slug: "snowflake-migration-lessons",
    excerpt: "After 3 months migrating our 20TB data lake to Snowflake, we learned painful lessons about performance, cost optimization, and architectural pitfalls. This detailed analysis covers what worked, what didn't, and what we'd do differently next time.",
    date: "2024-02-22",
    readingTime: "21 min read",
    tags: ["Data Engineering", "Snowflake", "Performance", "Architecture"],
    coverImage: "/blog/snowflake-migration.png"
  }
];

// All unique tags from blog posts
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export default function BlogIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

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
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            DevOps & SRE Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Insights and experiences from the world of infrastructure, automation, and site reliability engineering
          </p>
        </motion.div>

        {/* Search and filter section */}
        <motion.div 
          variants={itemVariants} 
          className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedTag 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Topics
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results message */}
        {(searchTerm || selectedTag) && (
          <motion.p 
            variants={itemVariants}
            className="mb-6 text-gray-600 dark:text-gray-400"
          >
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
            {selectedTag && <span> for tag <span className="font-medium text-blue-600 dark:text-blue-400">{selectedTag}</span></span>}
            {searchTerm && <span> matching <span className="font-medium text-blue-600 dark:text-blue-400">"{searchTerm}"</span></span>}
          </motion.p>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
                    {post.coverImage ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                        <Image 
                          src={post.coverImage} 
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="mix-blend-overlay opacity-90"
                          onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        {/* Add tech-themed overlay pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                              <pattern id="tech-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <circle cx="20" cy="20" r="2" fill="white" opacity="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#tech-pattern)" />
                          </svg>
                        </div>
                        {/* Add post icon based on tag */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {post.tags.includes('GitOps') || post.tags.includes('CI/CD') ? (
                            <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          ) : post.tags.includes('Kubernetes') ? (
                            <svg className="w-16 h-16 text-white opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M12 4.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M12 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M12 19.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M19.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M4.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M14.25 7.75 18 4.5" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M16.25 16.25 19.5 19.5" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M7.75 16.25 4.5 19.5" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M9.75 7.75 6 4.5" />
                            </svg>
                          ) : post.tags.includes('Terraform') || post.tags.includes('IaC') ? (
                            <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                          ) : post.tags.includes('Cloud') || post.tags.includes('AWS') ? (
                            <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                            </svg>
                          ) : post.tags.includes('Data') ? (
                            <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                          ) : (
                            <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                        {/* Add tech-themed pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                              <pattern id="tech-pattern-fallback" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <circle cx="20" cy="20" r="2" fill="white" opacity="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#tech-pattern-fallback)" />
                          </svg>
                        </div>
                        
                        {/* Add post icon based on tag */}
                        {post.tags.includes('GitOps') || post.tags.includes('CI/CD') ? (
                          <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        ) : post.tags.includes('Kubernetes') ? (
                          <svg className="w-16 h-16 text-white opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M12 4.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M12 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M12 19.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M19.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M4.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M14.25 7.75 18 4.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M16.25 16.25 19.5 19.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M7.75 16.25 4.5 19.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M9.75 7.75 6 4.5" />
                          </svg>
                        ) : post.tags.includes('Terraform') || post.tags.includes('IaC') ? (
                          <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        ) : post.tags.includes('Cloud') || post.tags.includes('AWS') ? (
                          <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                          </svg>
                        ) : post.tags.includes('Data') ? (
                          <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                          </svg>
                        ) : (
                          <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                          </svg>
                        )}
                      </div>
                    )}
                    {post.featured && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white py-1 px-3 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group mt-auto">
                      Read Article
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow"
          >
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No posts found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 