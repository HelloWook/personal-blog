import Introduce from '@/components/Introduce/Introduce';
import PostCard from '@/components/Post/PostCard/PostCard';
import { getPostsWithBlurData } from '@/utils/file';
import SubTitle from '@/components/SubTitle/SubTitle';
import { getTranslations, getLocale } from 'next-intl/server';
import { getStaticLocaleParams } from '@/utils/staticParams';
import { Metadata } from 'next';
import { buildAlternates } from '@/utils/seo';

export const generateStaticParams = getStaticLocaleParams;

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: buildAlternates(locale),
    openGraph: {
      url: `/${locale}`,
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('HomePage');
  const posts = await getPostsWithBlurData(undefined, locale);

  return (
    <>
      <Introduce />
      <SubTitle title={t('recentPosts')} description={t('description')} />
      <div className='flex flex-col gap-6'>
        {posts.slice(0, 4).map((post, idx) => (
          <PostCard
            key={idx}
            fileName={post.fileName}
            title={post.title}
            excerpt={post.excerpt}
            thumbnail={post.thumbnail}
            blurDataURL={post.blurDataURL}
          />
        ))}
      </div>
    </>
  );
}
