import React from 'react';
import PostCard from '../PostCard/PostCard';
import { Post } from '@/types/post';
import Albam from '@/asset/알밤.png';

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className='flex flex-col gap-6'>
      {posts.slice(0, 3).map((post, idx) => (
        <PostCard
          key={idx}
          title={post.title}
          excerpt={post.excerpt}
          date={post.date}
          thumbnail={Albam}
          tags={post.tags}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default PostList;
