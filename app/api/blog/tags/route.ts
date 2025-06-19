import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog-posts';

export async function GET() {
  try {
    const tags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}