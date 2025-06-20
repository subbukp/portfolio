import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog-posts';

export async function GET() {
  try {
    const series = Array.from(new Set(blogPosts.filter(post => post.series).map(post => post.series!))).sort();
    return NextResponse.json(series);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch series' },
      { status: 500 }
    );
  }
}