import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const getPosts = (directory: string) => extractPostContent(getFile(directory), directory);

const getStaticpath = (urls: string[]) => path.join(process.cwd(), ...urls);

const getFile = (directory: string) => fs.readdirSync(getStaticpath([directory]));

const extractPostContent = (files: string[], directory: string): Post[] => {
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const fileContent = fs.readFileSync(getStaticpath([directory, file]), 'utf-8');
      const data = matter(fileContent);
      return {
        title: data.data.title as string,
        date: data.data.date as string,
        tags: data.data.tags as string[],
        slug: file.replace('.mdx', ''),
        content: data.content,
        excerpt: data.data.excerpt || data.content.slice(0, 100),
        thumbnail: data.data.thumbnail,
      };
    });
};

export { getPosts, getStaticpath, getFile, extractPostContent };
