import PostSeries from '@/components/Post/PostSeries/PostSeries';
import { getPostWithBlur, getSeries } from '@/util/file';
import { Suspense } from 'react';

const PostPage = async () => {
  const postList = await getPostWithBlur();
  const seriesList = getSeries('contents/posts');

  return (
    <div className='w-full'>
      <Suspense fallback={<p>Loading...</p>}>
        <PostSeries postList={postList} seriesList={seriesList} />
      </Suspense>
    </div>
  );
};

export default PostPage;
