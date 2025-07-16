import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getStaticpath } from '@/util/getPosts';
import matter from 'gray-matter';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const content = fs.readFileSync(getStaticpath([`contents/posts/${params.slug}.mdx`]), 'utf-8');
  const { content: mdxContent, data } = matter(content);

  return (
    <article>
      <MDXRemote source={mdxContent} />
    </article>
  );
}
