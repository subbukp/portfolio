export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
  featured?: boolean;
  series?: string;
  seriesOrder?: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface SeriesGroup {
  name: string;
  posts: BlogPost[];
  latestDate: number;
}

export interface SeriesNavigation {
  series: string;
  totalParts: number;
  currentPart?: number;
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}