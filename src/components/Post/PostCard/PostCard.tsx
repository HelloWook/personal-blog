import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

const PostCard = ({ title, excerpt, date, thumbnail, slug }: Post) => {
  return (
    <Link
      href={`/posts/${slug}`}
      className='w-full duration-300 shadow-sm group hover:scale-105 rounded-2xl theme-shadow-color '
    >
      <div className='card'>
        <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl '>
          <Image
            src={thumbnail}
            alt='임시 데이터'
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-110'
          />
        </figure>
        <div className='p-4 card-body'>
          <h2>{title}</h2>
          <p className='overflow-hidden text-ellipsis'>{excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
