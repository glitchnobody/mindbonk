'use client';
import { useEffect, useState } from 'react';
import type { MetaData } from '@/components/PostUtil';
import Link from 'next/link';

export default function Page() {
  const [posts, setPosts] = useState<MetaData[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <div>
      <section>
        {posts.map((post) => (
          <div key={post.slug} className="flex flex-col gap-2 py-4">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-bold">{post.title}</h2>
            </Link>
            <p className="text-lg">{post.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-accent">By {post.author}</span>
              <span>•</span>
              <span>{post.timeToRead} min read</span>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-accent text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
