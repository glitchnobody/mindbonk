'use client';
import { useEffect, useState } from 'react';
import type { MetaData } from '@/components/PostUtil';
import Link from 'next/link';

export default function Home() {
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
    <>
      <section className="mx-auto w-full overflow-hidden">
        <div className="flex flex-col items-end">
          <h1 aria-labelledby="welcome to mindbonk" className="w-full py-2">
            <TextHeading />
          </h1>
          <span className="text-accent text-2xl">By Priyamvada Nile</span>
        </div>
        <hr />
      </section>
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
    </>
  );
}

function TextHeading() {
  return (
    <svg viewBox="0 0 1396 169" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>MINDBONK</title>
      <path
        d="M179.244 166.14H150.462L150.228 57.564L96.408 147.42H82.836L29.016 58.968V166.14H0V2.34H25.038L90.09 110.916L153.972 2.34H179.01L179.244 166.14Z"
        className="fill-heading color_transition"
      />
      <path
        d="M223.488 166.14V2.34H253.908V166.14H223.488Z"
        className="fill-heading color_transition"
      />
      <path
        d="M413.575 2.34H443.761V166.14H418.723L328.399 55.224V166.14H298.213V2.34H323.251L413.575 113.256V2.34Z"
        className="fill-heading color_transition"
      />
      <path
        d="M487.652 166.14V2.34H559.256C612.374 2.34 648.644 35.1 648.644 84.24C648.644 133.38 612.374 166.14 559.256 166.14H487.652ZM518.072 140.4H557.852C594.356 140.4 617.99 118.17 617.99 84.24C617.99 50.31 594.356 28.08 557.852 28.08H518.072V140.4Z"
        className="fill-heading color_transition"
      />
      <path
        d="M797.041 80.964C814.591 86.58 826.525 100.386 826.525 121.68C826.525 149.76 804.529 166.14 762.409 166.14H680.977V2.34H757.729C797.041 2.34 818.101 18.954 818.101 44.928C818.101 61.776 809.677 74.178 797.041 80.964ZM754.453 26.208H711.397V71.37H754.453C775.513 71.37 787.447 63.882 787.447 48.906C787.447 33.696 775.513 26.208 754.453 26.208ZM760.537 142.272C783.469 142.272 795.871 135.018 795.871 118.638C795.871 102.258 783.469 95.004 760.537 95.004H711.397V142.272H760.537Z"
        className="fill-heading color_transition"
      />
      <path
        d="M935.508 168.48C884.73 168.48 847.29 132.678 847.29 84.24C847.29 35.802 884.73 0 935.508 0C986.286 0 1023.73 35.568 1023.73 84.24C1023.73 132.912 986.286 168.48 935.508 168.48ZM935.508 141.804C968.502 141.804 993.072 117.702 993.072 84.24C993.072 50.778 968.502 26.676 935.508 26.676C902.514 26.676 877.944 50.778 877.944 84.24C877.944 117.702 902.514 141.804 935.508 141.804Z"
        className="fill-heading color_transition"
      />
      <path
        d="M1171.33 2.34H1201.52V166.14H1176.48L1086.16 55.224V166.14H1055.97V2.34H1081.01L1171.33 113.256V2.34Z"
        className="fill-heading color_transition"
      />
      <path
        d="M1359.6 166.14L1301.8 97.578L1275.83 124.254V166.14H1245.41V2.34H1275.83V86.346L1356.79 2.34H1390.96L1322.16 75.582L1395.17 166.14H1359.6Z"
        className="fill-heading color_transition"
      />
    </svg>
  );
}
