import React from 'react';
import { Metadata } from 'next';
import BlogIndex from '@/components/sections/BlogIndex';

export const metadata: Metadata = {
  title: 'DevOps & SRE Blog | Subrahmanya K P',
  description: 'Technical articles and insights about DevOps, SRE, Kubernetes, CI/CD, cloud architecture, and infrastructure automation from a Site Reliability Engineer.',
  keywords: 'DevOps, SRE, Kubernetes, Docker, CI/CD, GitOps, Terraform, AWS, Cloud, Infrastructure as Code',
  openGraph: {
    title: 'DevOps & SRE Blog | Subrahmanya K P',
    description: 'Technical articles and insights about DevOps, SRE, and infrastructure automation.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}