import React from 'react';
import PostList from '../PostList/PostList';

import { Post } from '@/types/post';
import SubTitle from '@/components/SubTitle/SubTitle';

interface PostContainerProps {
  posts: Post[];
}

const PostContainer = ({ posts }: PostContainerProps) => {
  return (
    <>
      <SubTitle title='최근 포스트' description='개발과 관련된 다양한 주제들을 다룹니다' />
      <PostList posts={posts} />
    </>
  );
};

export default PostContainer;
