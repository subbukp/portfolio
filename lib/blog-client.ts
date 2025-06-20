// Client-safe blog utilities (no fs module)
import { BlogPost } from '@/types/blog';

// This would typically fetch from an API endpoint
export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/api/blog/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/posts/${slug}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function fetchAllTags(): Promise<string[]> {
  try {
    const response = await fetch('/api/blog/tags');
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function fetchAllSeries(): Promise<string[]> {
  try {
    const response = await fetch('/api/blog/series');
    if (!response.ok) throw new Error('Failed to fetch series');
    return response.json();
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
}