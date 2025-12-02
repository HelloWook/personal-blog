import PostSeries from '@/components/Post/PostSeries/PostSeries';
import { getPostsWithBlurData, getAllSeries } from '@/utils/file';
import { Suspense } from 'react';
import {getTranslations, getLocale} from 'next-intl/server';

const PostPage = async () => {
  const locale = await getLocale();
  const postList = await getPostsWithBlurData(undefined, locale);
  const seriesList = getAllSeries(undefined, locale);
  const t = await getTranslations('PostPage');

  return (
    <div className='w-full'>
      <Suspense fallback={<p>{t('loading')}</p>}>
        <PostSeries postList={postList} seriesList={seriesList} />
      </Suspense>
    </div>
  );
};

export default PostPage;
