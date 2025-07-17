import { getStaticpath } from '@/util/file';
import fs from 'fs';
import matter from 'gray-matter';

const parseMDX = (slug: string) => {
  const { content: mdxContent, data } = matter(fs.readFileSync(getStaticpath([`contents/posts/${slug}.mdx`]), 'utf-8'));

  return { mdxContent, data };
};

export default parseMDX;
