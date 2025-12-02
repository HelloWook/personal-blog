import PostSeries from '@/components/Post/PostSeries/PostSeries';
import { getPostsWithBlurData, getAllSeries } from '@/utils/file';
import { Suspense } from 'react';

const PostPage = async () => {
  const postList = await getPostsWithBlurData();
  const seriesList = getAllSeries();

  return (
    <div className='w-full'>
      <Suspense fallback={<p>Loading...</p>}>
        <PostSeries postList={postList} seriesList={seriesList} />
      </Suspense>
    </div>
  );
};

export default PostPage;
