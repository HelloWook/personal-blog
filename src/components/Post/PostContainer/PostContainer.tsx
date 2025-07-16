import React from 'react';
import PostList from '../PostList/PostList';

import { Post } from '@/types/post';

interface PostContainerProps {
  posts: Post[];
}

const PostContainer = ({ posts }: PostContainerProps) => {
  return (
    <div className='mt-8'>
      <div className='mb-6'>
        <h2 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>최근 포스트</h2>
        <p className='text-gray-600 dark:text-gray-400'>개발과 관련된 다양한 주제들을 다룹니다</p>
      </div>
      <PostList posts={posts} />
    </div>
  );
};

export default PostContainer;
