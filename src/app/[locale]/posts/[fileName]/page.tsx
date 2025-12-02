import { getAllPostFileNames } from '@/utils/file';

import { Metadata } from 'next';
import parseMdx from '@/utils/parseMDX';
import PostDetail from '@/components/Post/PostDetail/PostDetail';
import {getLocale} from 'next-intl/server';

interface PostDetailPageProps {
  params: Promise<{ fileName: string }>;
}
export async function generateStaticParams() {
  const fileNames = await getAllPostFileNames();
  return fileNames.map((fileName) => ({ fileName }));
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { fileName } = await params;
  const locale = await getLocale();
  const { data } = parseMdx(fileName, locale);

  return {
    title: data.title,
    description: data.excerpt,
    keywords: data.tags,
    authors: [{ name: 'HelloWook' }],
    openGraph: {
      type: 'article',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: `https://www.hellowook.com/${locale}/posts/${fileName}`,
      title: data.title,
      description: data.excerpt,
      siteName: locale === 'ko' ? 'HelloWook 블로그' : 'HelloWook Blog',
      publishedTime: data.date,
      images: [
        {
          url: data.thumbnail,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { fileName } = await params;
  const locale = await getLocale();
  const { mdxContent, data } = parseMdx(fileName, locale);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: data.title,
            description: data.excerpt,
            image: data.thumbnail,
            datePublished: data.date,
            dateModified: data.date,
            author: {
              '@type': 'Person',
              name: 'HelloWook',
            },
            publisher: {
              '@type': 'Person',
              name: 'HelloWook',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://hellowook.dev/${locale}/posts/${fileName}`,
            },
          }),
        }}
      />
      <PostDetail mdxContent={mdxContent} />
    </>
  );
}
