import { MDXRemote } from 'next-mdx-remote/rsc';
import { getFileNames } from '@/util/file';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import { Metadata } from 'next';
import parseMdx from '@/util/parseMDX';
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

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { fileName } = await params;
  const { data } = parseMdx(fileName);
  return {
    title: data.title,
    description: data.excerpt,
    // 차후에 url 설정
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: data.thumbnail,
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { fileName } = await params;
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
