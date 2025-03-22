import { getAllPosts } from '@/components/PostUtil';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  const posts = await getAllPosts();
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query),
  );
  return NextResponse.json(filteredPosts);
}
