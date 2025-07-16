import { MDXRemote } from 'next-mdx-remote/rsc';
import { getStaticpath } from '@/util/getPosts';
import fs from 'fs';
import matter from 'gray-matter';

const parseMdx = (slug: string) => {
  const content = fs.readFileSync(getStaticpath([`contents/posts/${slug}.mdx`]), 'utf-8');
  const { content: mdxContent, data } = matter(content);

  return { mdxContent, data };
};

export default parseMdx;
