import React from 'react';
import PostCard from '../PostCard/PostCard';
import { Post } from '@/types/post';
import Albam from '@/asset/알밤.png';
import SubTitle from '@/components/SubTitle/SubTitle';

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <>
      <SubTitle title='최근 포스트' description='개발과 관련된 다양한 주제들을 다룹니다' />
      <div className='flex flex-col gap-6'>
        {posts.slice(0, 4).map((post, idx) => (
          <PostCard fileName={post.fileName} key={idx} title={post.title} excerpt={post.excerpt} thumbnail={Albam} />
        ))}
      </div>
    </>
  );
};

export default PostList;
