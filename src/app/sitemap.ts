import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hellowook.com';

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/abouts`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // 블로그 포스트들
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
  const postSlugs = fs.readdirSync(postsDirectory);

  const postPages = postSlugs.map((slug) => {
    const postPath = path.join(postsDirectory, slug, 'index.mdx');
    const fileContents = fs.readFileSync(postPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      url: `${baseUrl}/posts/${slug}`,
      lastModified: new Date(data.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...postPages];
}
