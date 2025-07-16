import { MDXRemote } from 'next-mdx-remote/rsc';

import parseMdx from '@/util/parseMDX';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { mdxContent, data } = parseMdx(params.slug);
  console.log('Post data:', data);
  console.log('MDX Content:', mdxContent);
  return (
    <article>
      <MDXRemote source={mdxContent} />
    </article>
  );
}
