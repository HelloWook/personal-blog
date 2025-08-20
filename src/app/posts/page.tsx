import PostSeries from '@/components/Post/PostSeries/PostSeries';
import { Suspense } from 'react';

const PostPage = () => {
  return (
    <div className='w-full'>
      <Suspense fallback={<div className='text-2xl text-center'>Loading...</div>}>
        <PostSeries />
      </Suspense>
    </div>
  );
};

export default PostPage;
