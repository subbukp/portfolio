'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';

interface BlogPost {
  title: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  content: string;
}

interface BlogPosts {
  [key: string]: BlogPost;
}

// This would typically come from your data source
const blogPosts: BlogPosts = {
  'gitops-setup-with-argocd': {
    title: "How I Set Up GitOps with ArgoCD in 10 Steps",
    date: "2024-04-01",
    readingTime: "15 min read",
    author: "Your Name",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "DevOps"],
    content: `
# How I Set Up GitOps with ArgoCD in 10 Steps

GitOps is revolutionizing the way we handle deployments in Kubernetes. In this guide, I'll walk you through my journey of setting up a GitOps workflow using ArgoCD, sharing both the victories and challenges along the way.

## Prerequisites
- A Kubernetes cluster
- kubectl CLI tool
- Git repository
- Basic understanding of Kubernetes concepts

## Step 1: Install ArgoCD
First, we'll create a namespace for ArgoCD and install it using the official manifests:

\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
\`\`\`

## Step 2: Access the ArgoCD UI
We'll need to expose the ArgoCD API server:

\`\`\`bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
\`\`\`

## Step 3: Configure Git Repository
Set up your Git repository with the following structure:

\`\`\`
├── apps/
│   ├── app1/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── app2/
│       ├── deployment.yaml
│       └── service.yaml
└── README.md
\`\`\`

## Step 4: Create Application Manifests
Example application manifest:

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourusername/your-repo.git
    targetRevision: HEAD
    path: apps/app1
  destination:
    server: https://kubernetes.default.svc
    namespace: my-app
\`\`\`

## Step 5: Configure Auto-Sync
Enable auto-sync in your ArgoCD application:

\`\`\`yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

## Step 6: Set Up Notifications
Configure ArgoCD notifications for deployment status:

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: "deployments"
\`\`\`

## Step 7: Implement Health Checks
Add health check annotations to your resources:

\`\`\`yaml
annotations:
  argocd.argoproj.io/hook: PreSync
  argocd.argoproj.io/hook-delete-policy: HookSucceeded
\`\`\`

## Step 8: Set Up RBAC
Configure role-based access control:

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.csv: |
    p, role:developer, applications, get, */*, allow
    p, role:developer, applications, sync, */*, allow
\`\`\`

## Step 9: Configure Monitoring
Set up Prometheus and Grafana for monitoring:

\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
\`\`\`

## Step 10: Implement Disaster Recovery
Back up ArgoCD configurations:

\`\`\`bash
kubectl -n argocd get secret argocd-secret -o yaml > argocd-secret.yaml
kubectl -n argocd get configmap argocd-cm -o yaml > argocd-cm.yaml
\`\`\`

## Conclusion
With these steps completed, you now have a robust GitOps workflow using ArgoCD. Remember to:
- Regularly update ArgoCD to get the latest features and security patches
- Monitor your Git repository for changes
- Keep your manifests versioned and documented
- Implement proper security measures

Happy GitOps-ing! 🚀
    `
  },
  'securing-cicd-pipelines': {
    title: "Securing CI/CD Pipelines: A DevOps Checklist",
    date: "2024-03-25",
    readingTime: "12 min read",
    author: "Your Name",
    tags: ["Security", "CI/CD", "DevOps", "Best Practices"],
    content: "Content for CI/CD security blog post..."
  },
  'zero-downtime-kubernetes-deployments': {
    title: "Zero Downtime Deployments with Kubernetes",
    date: "2024-03-18",
    readingTime: "18 min read",
    author: "Your Name",
    tags: ["Kubernetes", "DevOps", "Deployment", "SRE"],
    content: "Content for zero downtime deployments blog post..."
  }
};

export default function BlogPostContent() {
  const { slug } = useParams();
  const post = blogPosts[slug as keyof typeof blogPosts];
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (post) {
      marked.setOptions({
        gfm: true,
        breaks: true
      });
      const html = marked.parse(post.content);
      setHtmlContent(typeof html === 'string' ? html : '');
    }
  }, [post]);

  useEffect(() => {
    if (htmlContent) {
      Prism.highlightAll();
    }
  }, [htmlContent]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Post not found
            </h1>
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              Return to blog
            </Link>
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
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>
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
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </motion.article>
    </div>
  );
} 