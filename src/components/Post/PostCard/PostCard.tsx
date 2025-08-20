import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';
import { getBlurLocalImg } from '@/util/blurImg';

type PostCardProps = Pick<Post, 'title' | 'excerpt' | 'thumbnail' | 'fileName'>;

const PostCard = async ({ title, excerpt, thumbnail, fileName }: PostCardProps) => {
  const blurDataURL = await getBlurLocalImg('/알밤.png');

  return (
    <Link href={`/posts/${fileName}`} className='theme-shadow-color card-frame'>
      <div className='card'>
        <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl '>
          <Image src={thumbnail} alt='임시 데이터' fill className='object-cover' blurDataURL={blurDataURL} placeholder='blur' />
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
