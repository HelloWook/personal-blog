import { MDXRemote } from 'next-mdx-remote/rsc';
import { getFileNames } from '@/util/file';

import parseMdx from '@/util/parseMDX';
import { use } from 'react';

interface PostDetailPageProps {
  params: Promise<{ fileName: string }>;
}
export async function generateStaticParams() {
  const fileNames = await getFileNames('contents/posts');
  return fileNames.map((fileName) => ({ fileName }));
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { fileName } = use(params);
  const { mdxContent } = parseMdx(fileName);

  return (
    <article>
      <MDXRemote source={mdxContent} />
    </article>
  );
}
