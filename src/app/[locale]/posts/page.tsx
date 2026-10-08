import PostSeries from '@/components/Post/PostSeries/PostSeries';
import { getPostsWithBlurData, getAllSeries } from '@/utils/file';
import {getTranslations, getLocale} from 'next-intl/server';
import {getStaticLocaleParams} from '@/utils/staticParams';
import { Metadata } from 'next';
import { buildAlternates } from '@/utils/seo';

export const generateStaticParams = getStaticLocaleParams;

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PostPage' });
  const meta = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: t('allPosts'),
    description: meta('postsDescription'),
    alternates: buildAlternates(locale, 'posts'),
    openGraph: {
      url: `/${locale}/posts`,
      title: t('allPosts'),
      description: meta('postsDescription'),
    },
  };
}

const PostPage = async () => {
  const locale = await getLocale();
  const postList = await getPostsWithBlurData(undefined, locale);
  const seriesList = getAllSeries(undefined, locale);
  const t = await getTranslations('PostPage');

  return (
    <div className='w-full'>
      <h2 className='mb-2 text-3xl text-center'>{t('allPosts')}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{t('postCount', { count: postList.length })}</p>
      <PostSeries postList={postList} seriesList={seriesList} />
    </div>
  );
};

export default PostPage;
