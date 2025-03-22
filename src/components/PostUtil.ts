import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type MetaData = {
  title: string;
  publishedAt: string;
  cover: string;
  author: string;
  tags: string[];
  timeToRead: number;
  description: string;
  slug: string;
};

export async function getAllPosts(): Promise<MetaData[]> {
  const articlesDirectory = path.join(process.cwd(), 'src', 'app', 'posts');
  const posts: MetaData[] = [];

  try {
    // Get all subdirectories in the articles directory
    const allFiles = await fs.readdir(articlesDirectory);
    const directories = [];

    for (const file of allFiles) {
      const stat = await fs.stat(path.join(articlesDirectory, file));
      if (stat.isDirectory()) {
        directories.push(file);
      }
    }

    // Process each directory
    for (const dir of directories) {
      const mdxPath = path.join(articlesDirectory, dir, 'page.mdx');

      try {
        const fileContents = await fs.readFile(mdxPath, 'utf8');
        const { data } = matter(fileContents);

        posts.push({
          title: data.title || '',
          publishedAt: data.publishedAt || '',
          cover: data.cover || '',
          author: data.author || '',
          tags: data.tags || [],
          timeToRead: data.timeToRead || 0,
          description: data.description || '',
          slug: dir,
        });
      } catch (error) {
        console.warn(`Could not process ${mdxPath}:`, error);
      }
    }

    // Sort posts by date (newest first)
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}
