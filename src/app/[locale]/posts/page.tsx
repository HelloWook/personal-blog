import PostSeries from '@/components/Post/PostSeries/PostSeries';
import { getPostsWithBlurData, getAllSeries } from '@/utils/file';
import {getTranslations, getLocale} from 'next-intl/server';
import {getStaticLocaleParams} from '@/utils/staticParams';

export const generateStaticParams = getStaticLocaleParams;

const ALL_SERIES = 'All';

interface PostPageProps {
  searchParams: Promise<{ series?: string }>;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const { series } = await searchParams;
  const selectedSeries = series ?? ALL_SERIES;

  const locale = await getLocale();
  const postList = await getPostsWithBlurData(undefined, locale);
  const seriesList = getAllSeries(undefined, locale);
  const t = await getTranslations('PostPage');

  const filtered = selectedSeries === ALL_SERIES
    ? postList
    : postList.filter((post) => post.series === selectedSeries);

  const title = selectedSeries === ALL_SERIES
    ? t('allPosts')
    : t('seriesPosts', { series: selectedSeries });

  return (
    <div className='w-full'>
      <h2 className='mb-2 text-3xl text-center'>{title}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{t('postCount', { count: filtered.length })}</p>
      <PostSeries postList={filtered} seriesList={seriesList} selectedSeries={selectedSeries} />
    </div>
  );
};

export default PostPage;
