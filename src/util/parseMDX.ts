import { buildPath } from '@/util/file';
import fs from 'fs';
import matter from 'gray-matter';

const parseMDX = (fileName: string) => {
  const { content: mdxContent, data, language } = matter(fs.readFileSync(buildPath(`contents/posts/${fileName}/index.mdx`), 'utf-8'));

  return { mdxContent, data, language };
};

export default parseMDX;
