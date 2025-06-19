import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/sections/BlogPostPage';
import { getPostBySlug, getAllPosts, getRelatedPosts, getPostsBySeries } from '@/lib/blog';
import { serializeMDX } from '@/lib/mdx';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Subrahmanya K P`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPageWrapper({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Serialize MDX content on the server
  const mdxSource = await serializeMDX(post.content);
  
  // Get related posts
  const relatedPosts = getRelatedPosts(post.slug, 3);
  
  // Get series navigation if applicable
  let seriesNavigation = null;
  if (post.series) {
    const seriesPosts = getPostsBySeries(post.series);
    const currentIndex = seriesPosts.findIndex(p => p.slug === post.slug);
    
    seriesNavigation = {
      series: post.series,
      totalParts: seriesPosts.length,
      currentPart: post.seriesOrder,
      previousPost: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
      nextPost: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
    };
  }

  return (
    <BlogPostPage 
      post={post} 
      mdxSource={mdxSource}
      relatedPosts={relatedPosts}
      seriesNavigation={seriesNavigation}
    />
  );
}