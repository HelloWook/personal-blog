import { MDXRemote } from 'next-mdx-remote/rsc';

import parseMdx from '@/util/parseMdx';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { mdxContent } = parseMdx(params.slug);
  return (
    <article>
      <MDXRemote source={mdxContent} />
    </article>
  );
}
