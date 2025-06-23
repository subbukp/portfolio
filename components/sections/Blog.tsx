'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '@/types/blog';
import { blogPosts as staticBlogPosts } from '@/data/blog-posts';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [seriesHighlight, setSeriesHighlight] = useState<any>(null);
  
  useEffect(() => {
    // Load blog data from static source
    const posts = staticBlogPosts;
    setBlogPosts(posts);
    
    // Get featured post (first one that has featured: true, or default to first post)
    const featured = posts.find(post => post.featured) || posts[0];
    setFeaturedPost(featured);
    
    // Get remaining posts
    const remainingPosts = posts
      .filter(post => post !== featured)
      .slice(0, 3);
    
    // Highlight the most complete series
    const seriesMap = new Map<string, BlogPost[]>();
    posts.forEach(post => {
      if (post.series) {
        if (!seriesMap.has(post.series)) {
          seriesMap.set(post.series, []);
        }
        seriesMap.get(post.series)!.push(post);
      }
    });
    
    // Find the series with the most posts
    let maxSeries = { name: '', posts: [] as BlogPost[] };
    seriesMap.forEach((posts, name) => {
      if (posts.length > maxSeries.posts.length) {
        maxSeries = { name, posts: posts.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0)) };
      }
    });
    
    if (maxSeries.name) {
      setSeriesHighlight({
        name: maxSeries.name,
        postsCount: maxSeries.posts.length,
        posts: maxSeries.posts.slice(0, 3)
      });
    }
  }, []);

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

  const getPostIcon = (tags: string[]) => {
    if (tags.some(tag => ['GitOps', 'CI/CD'].includes(tag))) {
      return (
        <svg className="w-20 h-20 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (tags.includes('Kubernetes')) {
      return (
        <svg className="w-20 h-20 text-white opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M12 4.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 19.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM19.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM4.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M14.25 7.75L18 4.5M16.25 16.25L19.5 19.5M7.75 16.25L4.5 19.5M9.75 7.75L6 4.5" />
        </svg>
      );
    }
    if (tags.some(tag => ['Terraform', 'IaC'].includes(tag))) {
      return (
        <svg className="w-20 h-20 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    }
    if (tags.some(tag => ['Cloud', 'AWS', 'Azure'].includes(tag))) {
      return (
        <svg className="w-20 h-20 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      );
    }
    if (tags.includes('Data Engineering')) {
      return (
        <svg className="w-20 h-20 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      );
    }
    return (
      <svg className="w-20 h-20 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
          d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    );
  };

  const getSmallPostIcon = (tags: string[]) => {
    if (tags.some(tag => ['GitOps', 'CI/CD'].includes(tag))) {
      return (
        <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (tags.includes('Kubernetes')) {
      return (
        <svg className="w-16 h-16 text-white opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M12 4.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 19.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM19.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM4.5 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M14.25 7.75L18 4.5M16.25 16.25L19.5 19.5M7.75 16.25L4.5 19.5M9.75 7.75L6 4.5" />
        </svg>
      );
    }
    if (tags.some(tag => ['Terraform', 'IaC'].includes(tag))) {
      return (
        <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    }
    if (tags.some(tag => ['Cloud', 'AWS', 'Azure'].includes(tag))) {
      return (
        <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      );
    }
    if (tags.includes('Data Engineering')) {
      return (
        <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      );
    }
    return (
      <svg className="w-16 h-16 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
          d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    );
  };

  if (!blogPosts.length) {
    return null;
  }

  const remainingPosts = blogPosts
    .filter(post => post !== featuredPost)
    .slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              DevOps & SRE Blog
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Insights and lessons from the infrastructure trenches
            </p>
            <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div variants={itemVariants}>
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="md:flex">
                    <div className="md:w-2/5 relative h-64 md:h-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                        {featuredPost.coverImage ? (
                          <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                            <Image 
                              src={featuredPost.coverImage} 
                              alt={featuredPost.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="(max-width: 768px) 100vw, 40vw"
                              className="mix-blend-overlay opacity-90"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 opacity-20">
                              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                                <defs>
                                  <pattern id="tech-pattern-featured" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                    <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                    <circle cx="20" cy="20" r="2" fill="white" opacity="0.5" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#tech-pattern-featured)" />
                              </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              {getPostIcon(featuredPost.tags)}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="absolute inset-0 opacity-20">
                              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                                <defs>
                                  <pattern id="tech-pattern-featured-fallback" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                    <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                    <circle cx="20" cy="20" r="2" fill="white" opacity="0.5" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#tech-pattern-featured-fallback)" />
                              </svg>
                            </div>
                            {getPostIcon(featuredPost.tags).type === 'svg' && 
                              React.cloneElement(getPostIcon(featuredPost.tags) as React.ReactElement, {
                                className: "w-24 h-24 text-white opacity-50"
                              })
                            }
                          </>
                        )}
                        <div className="absolute top-4 left-4 bg-blue-600 text-white py-1 px-3 rounded-full text-xs font-medium">
                          Featured
                        </div>
                        {featuredPost.series && (
                          <div className="absolute top-4 right-4 bg-indigo-600 text-white py-1 px-3 rounded-full text-xs font-medium flex items-center">
                            <BookOpenIcon className="w-3 h-3 mr-1" />
                            Series
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(featuredPost.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {featuredPost.readingTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {featuredPost.title}
                      </h3>
                      {featuredPost.series && featuredPost.seriesOrder && (
                        <div className="mb-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                          {featuredPost.series} - Part {featuredPost.seriesOrder}
                        </div>
                      )}
                      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                        Read Full Article
                        <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Recent Posts Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {remainingPosts.map((post, idx) => (
              <motion.article
                key={idx}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
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
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 opacity-20">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                              <pattern id={`tech-pattern-${idx}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <circle cx="20" cy="20" r="2" fill="white" opacity="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#tech-pattern-${idx})`} />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {getSmallPostIcon(post.tags)}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                        <div className="absolute inset-0 opacity-20">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                              <pattern id={`tech-pattern-fallback-${idx}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                                <circle cx="20" cy="20" r="2" fill="white" opacity="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#tech-pattern-fallback-${idx})`} />
                          </svg>
                        </div>
                        {getSmallPostIcon(post.tags).type === 'svg' && 
                          React.cloneElement(getSmallPostIcon(post.tags) as React.ReactElement, {
                            className: "w-16 h-16 text-white opacity-50"
                          })
                        }
                      </div>
                    )}
                    {post.series && (
                      <div className="absolute top-4 right-4 bg-indigo-600 text-white py-1 px-2 rounded-full text-xs font-medium flex items-center">
                        <BookOpenIcon className="w-3 h-3 mr-1" />
                        Series
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.series && post.seriesOrder && (
                      <div className="mb-2 text-xs text-indigo-600 dark:text-indigo-400">
                        {post.series} - Part {post.seriesOrder}
                      </div>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm group mt-auto">
                      Read Article
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Series Highlight Section */}
          {seriesHighlight && (
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <BookOpenIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {seriesHighlight.name}
                </h3>
                <span className="ml-3 px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                  {seriesHighlight.postsCount}-part series
                </span>
              </div>
              
              <div className="space-y-4">
                {seriesHighlight.posts.map((post: BlogPost, idx: number) => (
                  <Link 
                    key={idx}
                    href={`/blog/${post.slug}`}
                    className="block p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-sm mr-4">
                        {post.seriesOrder}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                          <span className="mx-2">•</span>
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {post.readingTime}
                        </div>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <Link href={`/blog?series=${encodeURIComponent(seriesHighlight.name)}`} className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  View the complete series
                  <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* View All CTA */}
          <motion.div variants={itemVariants} className="flex justify-center mt-12">
            <Link href="/blog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
              View All Articles
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}