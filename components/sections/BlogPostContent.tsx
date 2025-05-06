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
    title: "My Production-Grade GitOps Journey with ArgoCD: Lessons & Pitfalls",
    date: "2024-04-01",
    readingTime: "15 min read",
    author: "Subrahmanya K P",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "DevOps"],
    content: `
# My Production-Grade GitOps Journey with ArgoCD: Lessons & Pitfalls

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
    title: "The Incident That Changed Our CI/CD Security Approach Forever",
    date: "2024-03-25",
    readingTime: "12 min read",
    author: "Subrahmanya K P",
    tags: ["Security", "CI/CD", "DevOps", "Best Practices"],
    content: `
# The Incident That Changed Our CI/CD Security Approach Forever

Last year, what started as a routine Monday morning quickly turned into a security nightmare. Our CI/CD pipeline had been compromised over the weekend, and we discovered it only after suspicious deployments had already reached production.

## The Breach

Our team noticed unusual deployment patterns early Monday at 8:30 AM. Investigation revealed that an attacker had:

1. Exploited an outdated Jenkins plugin
2. Obtained access to our CI/CD pipeline credentials
3. Injected malicious code into our container builds
4. Deployed vulnerable artifacts to production

## Our 12-Point Security Framework

After containing the breach, we developed this security framework:

### 1. Secret Management

\`\`\`bash
# Before: Hardcoded secrets in pipeline scripts
API_KEY="abcd1234"

# After: Using a secret management service
API_KEY=$(vault kv get -field=api_key secrets/ci)
\`\`\`

### 2. Pipeline Isolation

We established strict boundaries between environments:

\`\`\`yaml
# Separate pipeline roles
- name: dev-pipeline
  permissions:
    - deploy:dev
- name: prod-pipeline
  permissions:
    - deploy:prod
\`\`\`

### 3. Container Scanning

Integrated vulnerability scanning:

\`\`\`bash
# Scan before deployment
trivy image my-app:latest
if [ $? -ne 0 ]; then
  echo "Vulnerabilities detected, failing build"
  exit 1
fi
\`\`\`

### 4. Infrastructure as Code Validation

\`\`\`bash
# Validate Terraform before apply
terraform plan
terraform apply -auto-approve
\`\`\`

### 5. Immutable Artifacts

### 6. RBAC Implementation

### 7. Audit Logging

### 8. Pipeline Security Gates

### 9. Signed Commits

### 10. Dependency Scanning

### 11. Regular Security Assessments

### 12. Incident Response Plan

## Conclusion

The breach was painful but transformed our security approach. By implementing this framework, we've prevented several potential incidents and significantly improved our security posture.

Remember: In CI/CD security, prevention is much easier than recovery.
    `
  },
  'zero-downtime-kubernetes-deployments': {
    title: "How We Achieved Zero Downtime Kubernetes Deployments After 5 Failed Attempts",
    date: "2024-03-18",
    readingTime: "18 min read",
    author: "Subrahmanya K P",
    tags: ["Kubernetes", "DevOps", "Deployment", "SRE"],
    content: `
# How We Achieved Zero Downtime Kubernetes Deployments After 5 Failed Attempts

Achieving truly zero-downtime deployments in Kubernetes took our team five attempts and countless hours of debugging. Here's the journey, including all the hard lessons learned.

## Attempt 1: Basic Rolling Updates (Failed)

We started with the standard approach:

\`\`\`yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
\`\`\`

**What went wrong:** Connection draining wasn't properly handled, causing dropped connections during pod termination.

## Attempt 2: Readiness Probes (Failed)

We added readiness probes:

\`\`\`yaml
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

**What went wrong:** Probes passed too early before the application was truly ready to serve traffic.

## Attempt 3: Pod Lifecycle Hooks (Failed)

We implemented preStop hooks:

\`\`\`yaml
lifecycle:
  preStop:
    exec:
      command: ["sh", "-c", "sleep 10"]
\`\`\`

**What went wrong:** The sleep time wasn't sufficient for all in-flight requests.

## Attempt 4: Service Mesh (Failed)

Added Istio service mesh for traffic management:

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
  - my-service
  http:
  - route:
    - destination:
        host: my-service
        subset: v1
\`\`\`

**What went wrong:** The mesh added complexity that caused its own issues with retry storms.

## Attempt 5: Blue-Green with Feature Flags (Success!)

The final solution combined:

1. Blue-Green deployments
2. Feature flags for gradual rollout
3. Proper connection draining
4. Advanced health checks

\`\`\`yaml
# Service targeting the active deployment
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
    version: v2  # Switch this between deployments
  ports:
  - port: 80
    targetPort: 8080
\`\`\`

## Key Lessons

1. **Connection draining is crucial** - Give adequate time for connections to complete
2. **Health checks must be comprehensive** - Test actual functionality, not just if the app responds
3. **Monitor during deployments** - Watch error rates, not just availability
4. **Test with real traffic patterns** - Synthetic tests aren't enough
5. **Prepare rollback procedures** - Sometimes rolling forward isn't the best option

In the end, our zero-downtime deployment strategy required a combination of technical patterns and operational discipline. The payoff was worth it - we now deploy multiple times daily without users ever noticing.
    `
  },
  'terraform-workspaces-guide': {
    title: "Terraform at Scale: How We Manage 150+ Environments Without Losing Our Minds",
    date: "2024-03-10",
    readingTime: "14 min read",
    author: "Subrahmanya K P",
    tags: ["Terraform", "IaC", "DevOps", "Cloud"],
    content: `
# Terraform at Scale: How We Manage 150+ Environments Without Losing Our Minds

When our infrastructure grew to support 150+ environments across multiple cloud providers, our Terraform workflow collapsed under its own weight. Here's how we rebuilt it from scratch.

## The Breaking Point

We hit the wall when:
- Plan/apply cycles took 45+ minutes
- State file locking caused constant pipeline queues
- Engineers routinely overwrote each other's changes
- Rollbacks became nearly impossible

## Our Solution: Workspace Architecture

### 1. Modular Structure

\`\`\`
├── modules/
│   ├── networking/
│   ├── databases/
│   ├── compute/
│   └── security/
├── environments/
│   ├── prod/
│   ├── staging/
│   └── dev/
└── workspaces/
    ├── client-a/
    ├── client-b/
    └── client-c/
\`\`\`

### 2. Workspace Strategy

\`\`\`bash
# Creating environment-specific workspaces
terraform workspace new client-a-prod
terraform workspace new client-a-dev

# Selecting workspace
terraform workspace select client-a-prod
\`\`\`

### 3. Variables by Workspace

\`\`\`hcl
locals {
  environment_config = {
    client-a-prod = {
      instance_size = "large"
      replica_count = 3
      region        = "us-west-2"
    }
    client-a-dev = {
      instance_size = "small"
      replica_count = 1
      region        = "us-west-2"
    }
  }

  # Select the right config based on workspace
  config = local.environment_config[terraform.workspace]
}

# Use the config
resource "aws_instance" "app" {
  instance_type = local.config.instance_size
  count         = local.config.replica_count
}
\`\`\`

### 4. State Management

We split state files by:
- Client
- Environment type
- Functional area

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "terraform-states"
    key            = "client-a/prod/network.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"
  }
}
\`\`\`

### 5. CI/CD Integration

\`\`\`yaml
# Simplified CI pipeline
stages:
  - plan
  - approve
  - apply

plan:
  script:
    - terraform workspace select \${CLIENT}-\${ENV}
    - terraform plan -out=plan.tfplan

apply:
  script:
    - terraform workspace select \${CLIENT}-\${ENV}
    - terraform apply plan.tfplan
\`\`\`

## Results & Lessons Learned

After implementing this architecture:
- Plan/apply cycles reduced to ~5 minutes
- Parallel deployments became possible with no conflicts
- Engineers gained environment isolation
- Rollbacks became straightforward
- Onboarding new clients now takes hours instead of days

### Key Takeaways

1. **Split state early** - Monolithic state doesn't scale
2. **Automate everything** - Human terraform applies lead to errors
3. **Use workspace variables** - DRY code across environments
4. **Version your modules** - Pin to specific versions to prevent surprises
5. **Implement drift detection** - Regular terraform plan runs to catch manual changes

With this approach, we now manage over 150 client environments with a team of just 5 engineers. The system has scaled well and continues to handle our growth without added complexity.
    `
  },
  'cloud-cost-monitoring': {
    title: "The Monitoring Stack That Detected a $40K/Month AWS Billing Issue Before It Happened",
    date: "2024-03-02",
    readingTime: "17 min read",
    author: "Subrahmanya K P",
    tags: ["Cloud", "AWS", "Cost Optimization", "Monitoring"],
    content: `
# The Monitoring Stack That Detected a $40K/Month AWS Billing Issue Before It Happened

Our cloud bill was steadily climbing $5K every month with no clear cause. This post outlines the monitoring solution we built that not only identified the problem but predicted and prevented a potential $40K/month disaster.

## The Warning Signs

Our monthly AWS bill progression:
- January: $15,000
- February: $20,200
- March: $25,800
- April: $30,100

Despite no major releases or customer growth, costs were accelerating.

## Building the Monitoring Stack

### 1. Cost Explorer API Integration

\`\`\`python
import boto3

client = boto3.client('ce')

response = client.get_cost_and_usage(
    TimePeriod={
        'Start': '2024-01-01',
        'End': '2024-05-01'
    },
    Granularity='MONTHLY',
    Metrics=['UnblendedCost'],
    GroupBy=[
        {
            'Type': 'DIMENSION',
            'Key': 'SERVICE'
        }
    ]
)

for result in response['ResultsByTime']:
    print(f"Period: {result['TimePeriod']['Start']} to {result['TimePeriod']['End']}")
    for group in result['Groups']:
        print(f"  {group['Keys'][0]}: \${float(group['Metrics']['UnblendedCost']['Amount']):.2f}")
\`\`\`

### 2. Resource Tagging Strategy

\`\`\`bash
# Tag all resources
aws ec2 create-tags \
    --resources i-1234567890abcdef0 \
    --tags Key=Project,Value=DataLake Key=Environment,Value=Production
\`\`\`

### 3. Custom CloudWatch Dashboard

\`\`\`yaml
widgets:
  - type: metric
    properties:
      metrics:
        - [ "AWS/ECS", "CPUUtilization", "ServiceName", "data-processing" ]
      period: 300
      stat: "Average"
      region: "us-west-2"
      title: "ECS CPU Utilization"
\`\`\`

### 4. Predictive Analytics

We built a simple time-series model to forecast costs:

\`\`\`python
from statsmodels.tsa.arima.model import ARIMA

# Fit model
model = ARIMA(cost_data, order=(1, 1, 1))
model_fit = model.fit()

# Forecast
forecast = model_fit.forecast(steps=3)
print(f"Predicted costs for next 3 months: {forecast}")
\`\`\`

## The Discovery

Our monitoring identified several issues:

1. **Orphaned EBS volumes** - 23TB of unused storage
2. **Overprovisioned RDS instances** - 12 instances at 10-15% utilization
3. **Runaway Lambda executions** - A recursive function calling itself
4. **NAT Gateway data transfer** - Cross-AZ traffic routing inefficiency

The forecasting model predicted we would reach $70K/month within 90 days!

## The Fix

1. **Implemented AWS Budgets alerts**
2. **Created a resource cleanup automation**:

\`\`\`python
def cleanup_orphaned_volumes():
    ec2 = boto3.client('ec2')
    volumes = ec2.describe_volumes(
        Filters=[{'Name': 'status', 'Values': ['available']}]
    )
    
    for volume in volumes['Volumes']:
        if not volume.get('Attachments'):
            creation_date = volume['CreateTime']
            age_days = (datetime.now(creation_date.tzinfo) - creation_date).days
            
            if age_days > 7:
                print(f"Deleting volume {volume['VolumeId']}")
                ec2.delete_volume(VolumeId=volume['VolumeId'])
\`\`\`

3. **Rightsized instances using AWS Compute Optimizer**
4. **Fixed Lambda recursion with proper exit conditions**

## Results

After implementing the monitoring stack and fixes:
- Monthly bill dropped from $30,100 to $18,400
- Prevented projected $40K/month increase
- Annual savings: $380,000+
- ROI on engineering time: 1,500%

## Monitoring Stack Architecture

The complete stack includes:
- AWS Cost Explorer data collection
- Grafana dashboards
- Prometheus metrics
- Custom Python forecasting
- Slack alerting
- Automated remediation

## Lessons Learned

1. **Monitor trends, not point-in-time values**
2. **Tag everything meticulously**
3. **Set up guardrails before you need them**
4. **Cloud architecture and cost optimization go hand-in-hand**
5. **Automate cleanup tasks - humans forget**

This monitoring stack now runs continuously, catching potential cost issues before they become problems. The predictive component has been particularly valuable, giving us weeks of advance notice for potential spending increases.
    `
  },
  'snowflake-migration-lessons': {
    title: "We Moved Our Data Lake to Snowflake: The Good, Bad and Ugly Truth",
    date: "2024-02-22",
    readingTime: "21 min read",
    author: "Subrahmanya K P",
    tags: ["Data Engineering", "Snowflake", "Performance", "Architecture"],
    content: `
# We Moved Our Data Lake to Snowflake: The Good, Bad and Ugly Truth

After 3 months migrating our 20TB data lake to Snowflake, we've learned painful lessons about performance, cost optimization, and architectural pitfalls. This is our honest assessment of what worked, what didn't, and what we'd do differently.

## The Migration Plan

Our initial plan seemed straightforward:

1. Export data from our existing Hadoop/S3 data lake
2. Transform and load into Snowflake staging
3. Build new processing pipelines
4. Cut over analytics workloads
5. Decommission old infrastructure

We allocated 8 weeks. It took 14.

## What Went Well

### 1. Query Performance

Queries that took minutes now complete in seconds:

**Before (Presto):**
\`\`\`sql
-- 267 seconds
SELECT 
  date_trunc('month', event_date) as month,
  count(distinct user_id) as monthly_active_users
FROM events
WHERE event_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY 1
ORDER BY 1;
\`\`\`

**After (Snowflake):**
\`\`\`sql
-- 3.4 seconds
SELECT 
  date_trunc('month', event_date) as month,
  count(distinct user_id) as monthly_active_users
FROM events
WHERE event_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY 1
ORDER BY 1;
\`\`\`

### 2. Separation of Storage and Compute

Scaling compute resources independently:

\`\`\`sql
-- Scale up for big reports
ALTER WAREHOUSE reporting_wh SET warehouse_size = 'LARGE';

-- Scale down for maintenance
ALTER WAREHOUSE reporting_wh SET warehouse_size = 'SMALL';
\`\`\`

### 3. Time Travel & Zero-Copy Clones

Development environments with production data:

\`\`\`sql
-- Create test database with current production data
CREATE DATABASE test_db CLONE production_db;

-- Revert bad data load
CREATE OR REPLACE TABLE transactions AS
  SELECT * FROM transactions AT(OFFSET => -60*60);
\`\`\`

## What Could Have Been Better

### 1. Cost Management

Unexpected costs appeared quickly:

\`\`\`sql
-- Query costs would have been <$1 on our old platform
SELECT *
FROM large_table
WHERE date > '2020-01-01';
-- Used 458 credits ($458) due to full table scan
\`\`\`

### 2. Data Loading Complexity

Data loading challenges:

\`\`\`sql
-- Loading data with proper clustering
COPY INTO customers
FROM @s3_stage
FILE_FORMAT = (TYPE = 'CSV')
ON_ERROR = 'CONTINUE'
PATTERN = '.*customers.*[.]csv'
VALIDATION_MODE = RETURN_ERRORS;

-- Required many iterations to optimize
\`\`\`

### 3. Schema Evolution

Schema changes became more complicated:

\`\`\`sql
-- Add column with default
ALTER TABLE users ADD COLUMN preferences VARIANT DEFAULT {};

-- Backfill existing data - unexpectedly expensive
UPDATE users SET preferences = {} WHERE preferences IS NULL;
\`\`\`

## The Ugly Truth

### 1. Migration Complexity

\`\`\`python
# We underestimated the complexity of data transformation
def transform_legacy_data(source_data):
    # What should have been simple became a 700-line function
    # with dozens of edge cases
    pass
\`\`\`

### 2. Credit Consumption Surprises

\`\`\`sql
-- Dev testing a single query
SELECT * FROM events WHERE DATE > '2020-01-01' LIMIT 10;
-- Consumed 15 credits due to poor clustering
\`\`\`

### 3. Learning Curve for the Team

\`\`\`sql
-- Common anti-pattern our team kept repeating
SELECT id, MAX(update_time) 
FROM transactions
GROUP BY id;
-- Should have used QUALIFY or window functions
\`\`\`

## What We'd Do Differently

1. **Start with a proof-of-concept** - Test real workloads, not just sample queries
2. **Focus on data modeling first** - Cluster keys and micro-partitions need careful design
3. **Build cost guardrails early** - Resource monitors and query tagging from day one
4. **Train the team thoroughly** - SQL patterns that work elsewhere can be inefficient
5. **Optimize incrementally** - Migrate data first, then optimize, rather than both simultaneously

## Conclusion

Was it worth it? Yes, but the journey was harder than vendor presentations suggested. Our analytics are faster, more flexible, and more powerful—but we paid for these benefits in engineering hours and lessons learned the hard way.

For anyone considering a similar migration, go in with eyes open. The technology is powerful, but successful migration requires careful planning and expertise.
    `
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