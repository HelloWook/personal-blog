import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Post } from '@/types/post';

type PostCardProps = Pick<Post, 'title' | 'excerpt' | 'thumbnail' | 'fileName'> & {
  blurDataURL: string;
};

const PostCard = ({ title, excerpt, thumbnail, fileName, blurDataURL }: PostCardProps) => {
  return (
    <Link href={`/posts/${fileName}`} className='theme-shadow-color card-frame'>
      <div className='card'>
        <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl'>
          <Image src={thumbnail} alt='임시 데이터' fill className='object-cover' placeholder='blur' blurDataURL={blurDataURL || ''} />
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
