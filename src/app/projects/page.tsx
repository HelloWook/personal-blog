import Image from 'next/image';
import React from 'react';

const Post = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex-1 h-20 shadow-sm card bg-base-100'>
          <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl '>
            <Image src='/알밤.png' alt='Shoes' fill className='object-cover' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>
              Card Title
              <div className='badge badge-secondary'>NEW</div>
            </h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className='justify-end card-actions'>
              <div className='badge badge-outline'>Fashion</div>
              <div className='badge badge-outline'>Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
