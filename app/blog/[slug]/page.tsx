import React from 'react';
import { Metadata } from 'next';
import BlogPostContent from '@/components/sections/BlogPostContent';

export const metadata: Metadata = {
  title: 'Blog Post | Your Portfolio',
  description: 'Read about DevOps, SRE, and software engineering insights.'
};

export default function BlogPostPage() {
  return <BlogPostContent />;
} 