import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

type PostCardProps = Pick<Post, 'title' | 'excerpt' | 'thumbnail' | 'fileName'>;

const PostCard = ({ title, excerpt, thumbnail, fileName }: PostCardProps) => {
  return (
    <Link href={`/posts/${fileName}`} className='w-full duration-300 shadow-sm group hover:scale-105 rounded-2xl theme-shadow-color '>
      <div className='card'>
        <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl '>
          <Image src={thumbnail} alt='임시 데이터' fill className='object-cover transition-transform duration-300 group-hover:scale-110' />
        </figure>
        <div className='p-4 card-body'>
          <h3>{title}</h3>
          <p className='line-clamp-2 '>{excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
