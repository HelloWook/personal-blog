import { getAllPostFileNames } from '@/util/file';

import { Metadata } from 'next';
import parseMdx from '@/util/parseMDX';
import PostDetail from '@/components/Post/PostDetail/PostDetail';

interface PostDetailPageProps {
  params: Promise<{ fileName: string }>;
}
export async function generateStaticParams() {
  const fileNames = await getAllPostFileNames();
  return fileNames.map((fileName) => ({ fileName }));
}

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

  return <PostDetail mdxContent={mdxContent} />;
}
