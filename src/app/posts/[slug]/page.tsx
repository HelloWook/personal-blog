import { MDXRemote } from 'next-mdx-remote/rsc';

import parseMdx from '@/util/parseMDX';
import { use } from 'react';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { mdxContent } = parseMdx(slug);

  return (
    <article>
      <MDXRemote source={mdxContent} />
    </article>
  );
}
