'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import MDXComponents from '@/components/MDXComponents';
import { BlogPost } from '@/types/blog';
import { getRelatedPosts, getPostsBySeries } from '@/lib/blog';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const [mdxSource, setMdxSource] = React.useState<any>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);
  const [seriesNavigation, setSeriesNavigation] = React.useState<any>(null);

  React.useEffect(() => {
    // Serialize MDX content
    const prepareMDX = async () => {
      const serialized = await serialize(post.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm] as any[],
          rehypePlugins: [
            [rehypePrism, { ignoreMissing: true }]
          ] as any[],
        },
      });
      setMdxSource(serialized);
    };
    
    prepareMDX();
    
    // Get related posts
    const related = getRelatedPosts(post.slug);
    setRelatedPosts(related);
    
    // Setup series navigation if applicable
    if (post.series) {
      const seriesPosts = getPostsBySeries(post.series);
      const currentIndex = seriesPosts.findIndex(p => p.slug === post.slug);
      
      setSeriesNavigation({
        series: post.series,
        totalParts: seriesPosts.length,
        currentPart: post.seriesOrder,
        previousPost: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
        nextPost: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
      });
    }
  }, [post]);

  if (!mdxSource) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime}
            </span>
            <span>by {post.author}</span>
          </div>
          
          {/* Series indicator */}
          {post.series && (
            <div className="mt-3 flex items-center">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                {post.series} - Part {post.seriesOrder} of {seriesNavigation?.totalParts}
              </span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
        
        {/* Series navigation */}
        {seriesNavigation && (seriesNavigation.previousPost || seriesNavigation.nextPost) && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Continue reading the {seriesNavigation.series}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous article in series */}
              {seriesNavigation.previousPost && (
                <Link 
                  href={`/blog/${seriesNavigation.previousPost.slug}`}
                  className="flex flex-col p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    ← Previous in series
                  </div>
                  <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {seriesNavigation.previousPost.title}
                  </div>
                  <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
                    Part {seriesNavigation.previousPost.seriesOrder}
                  </div>
                </Link>
              )}
              
              {/* Next article in series */}
              {seriesNavigation.nextPost && (
                <Link 
                  href={`/blog/${seriesNavigation.nextPost.slug}`}
                  className="flex flex-col p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-right"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Next in series →
                  </div>
                  <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {seriesNavigation.nextPost.title}
                  </div>
                  <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
                    Part {seriesNavigation.nextPost.seriesOrder}
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Related Articles
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                    {new Date(relatedPost.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
}