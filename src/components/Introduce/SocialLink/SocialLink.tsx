'use client';
import { Link } from '@/i18n/navigation';
import React from 'react';

import socialLinks from '@/datas/socialLinks';
const SocialLink = () => {
  return (
    <div className='flex gap-3 mt-4'>
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
          className={`
            flex items-center justify-center
            w-10 h-10 
            rounded-full 
            transition-all duration-300 ease-in-out
            transform hover:scale-110
            ${link.color} ${link.bgColor}
            border border-gray-200 dark:border-gray-700
            hover:border-current
            hover:shadow-md
            group
          `}
          title={link.name}
        >
          <span className='transition-transform duration-300 group-hover:scale-110'>{link.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialLink;
