import { MDXRemote } from 'next-mdx-remote/rsc';
import { getFileNames } from '@/util/file';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';

import parseMdx from '@/util/parseMDX';
import { use } from 'react';
import Pre from '@/components/Pre/Pre';

interface PostDetailPageProps {
  params: Promise<{ fileName: string }>;
}
export async function generateStaticParams() {
  const fileNames = await getFileNames('contents/posts');
  return fileNames.map((fileName) => ({ fileName }));
}
const prettyCodeOptions: Options = {
  theme: {
    light: 'nord',
    dark: 'night-owl',
  },
  transformers: [],
};

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { fileName } = use(params);
  const { mdxContent } = parseMdx(fileName);

  return (
    <article>
      <MDXRemote
        source={mdxContent}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        components={{
          pre: Pre,
        }}
      />
    </article>
  );
}
