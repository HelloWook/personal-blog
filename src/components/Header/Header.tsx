import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex items-center py-4 mb-8'>
      <Link className='flex-1 text-xl' href={'/'}>
        <h1 className='underline-animation w-fit '>HelloWook.life</h1>
      </Link>
      <div className='flex items-center gap-7'>
        <Link href={'/posts'} className='underline-animation'>
          Posts
        </Link>
        <Link href={'/abouts'} className='underline-animation'>
          Abouts
        </Link>
        <Link href={'/projects'} className='underline-animation'>
          projects
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
