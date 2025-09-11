import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';
import { getBlurLocalImg } from './blurImg';

const getPosts = (directory: string) => extractPostContent(directory);

const getStaticpath = (urls: string[]) => path.join(process.cwd(), ...urls);

const getFile = (directory: string) => fs.readdirSync(getStaticpath([directory]));

const getSeries = (directory: string) => {
  const posts = extractPostContent(directory);
  return Array.from(new Set(posts.flatMap((post) => post.series)))
    .slice()
    .sort();
};

const getFileNames = (directory: string) => {
  const posts = extractPostContent(directory);
  return Array.from(new Set(posts.flatMap((post) => post.fileName)))
    .slice()
    .sort();
};

const extractPostContent = (directory: string): Post[] => {
  const files = getFile(directory);
  return files.map((file) => {
    const fileContent = fs.readFileSync(getStaticpath([directory, file, 'index.mdx']), 'utf-8');
    const data = matter(fileContent);
    return {
      title: data.data.title as string,
      date: data.data.date as string,
      tags: data.data.tags as string[],
      slug: data.data.slug as string,
      content: data.content,
      excerpt: data.data.excerpt || data.content.slice(0, 100),
      thumbnail: data.data.thumbnail,
      fileName: file.replace('.mdx', ''),
      series: data.data.series as string,
    };
  });
};

const extract = (file: string) => {
  const fileContent = fs.readFileSync(getStaticpath(['contents/posts', file, 'index.mdx']), 'utf-8');
  const data = matter(fileContent);
  return {
    title: data.data.title as string,
    date: data.data.date as string,
    tags: data.data.tags as string[],
    slug: data.data.slug as string,
    content: data.content,
    excerpt: data.data.excerpt || data.content.slice(0, 100),
    thumbnail: data.data.thumbnail,
    fileName: file.replace('.mdx', ''),
    series: data.data.series as string,
  };
};

const getPostWithBlur = async () => {
  const posts = getPosts('/contents/posts');

  return await Promise.all(
    posts.map(async (p) => ({
      ...p,
      blurDataURL: await getBlurLocalImg(p.thumbnail),
    }))
  );
};

export { getPosts, getStaticpath, getFile, extractPostContent, getSeries, getFileNames, extract, getPostWithBlur };
