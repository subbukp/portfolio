import React from 'react';
import { Metadata } from 'next';
import BlogIndex from '@/components/sections/BlogIndex';

export const metadata: Metadata = {
  title: 'Blog | Your Portfolio',
  description: 'Technical articles and insights about DevOps, SRE, and software engineering.'
};

export default function BlogPage() {
  return <BlogIndex />;
} 