import { getAllPostFileNames } from '@/utils/file';
import { Metadata } from 'next';
import parseMdx from '@/utils/parseMDX';
import PostDetail from '@/components/Post/PostDetail/PostDetail';
import TOC from '@/components/TOC/TOC';
import { extractHeadings } from '@/utils/extractHeadings';
import { routing } from '@/i18n/routing';
import { cacheLife } from 'next/cache';
import { SITE_URL, OG_LOCALE, buildAlternates } from '@/utils/seo';

interface PostDetailPageProps {
  params: Promise<{ locale: string; fileName: string }>;
}

export async function generateStaticParams() {
  const fileNames = await getAllPostFileNames();
  return routing.locales.flatMap((locale) => fileNames.map((fileName) => ({ locale, fileName })));
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { fileName, locale } = await params;
  const { data } = parseMdx(fileName, locale);

  return {
    title: data.title,
    description: data.excerpt,
    keywords: data.tags,
    authors: [{ name: 'HelloWook' }],
    alternates: buildAlternates(locale, `posts/${fileName}`),
    openGraph: {
      type: 'article',
      locale: OG_LOCALE[locale],
      url: `/${locale}/posts/${fileName}`,
      title: data.title,
      description: data.excerpt,
      siteName: locale === 'ko' ? 'HelloWook 블로그' : 'HelloWook Blog',
      publishedTime: data.date,
      // 썸네일 비율이 글마다 달라 크기는 선언하지 않는다 (크롤러가 직접 측정)
      images: [
        {
          url: data.thumbnail,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.excerpt,
      images: [data.thumbnail],
    },
  };
}

async function CachedPostContent({ fileName, locale }: { fileName: string; locale: string }) {
  'use cache';
  cacheLife('max');

  const { mdxContent, data } = parseMdx(fileName, locale);
  const headings = extractHeadings(mdxContent);

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
            image: `${SITE_URL}${data.thumbnail}`,
            datePublished: data.date,
            dateModified: data.date,
            inLanguage: locale,
            url: `${SITE_URL}/${locale}/posts/${fileName}`,
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
              '@id': `${SITE_URL}/${locale}/posts/${fileName}`,
            },
          }),
        }}
      />
      <TOC headings={headings} />
      <PostDetail mdxContent={mdxContent} />
    </>
  );
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { fileName, locale } = await params;

  return <CachedPostContent fileName={fileName} locale={locale} />;
}
