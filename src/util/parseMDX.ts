import { getStaticpath } from '@/util/file';
import fs from 'fs';
import matter from 'gray-matter';

const parseMDX = (fileName: string) => {
  const { content: mdxContent, data } = matter(fs.readFileSync(getStaticpath([`contents/posts/${fileName}.mdx`]), 'utf-8'));

  return { mdxContent, data };
};

export default parseMDX;
