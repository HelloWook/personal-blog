import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='navbar'>
      <div className='flex-1'>
        <Link className='text-xl btn btn-ghost' href={'/'}>
          HelloWook.life
        </Link>
      </div>
      <div className='flex-none'>
        <Link className='btn btn-ghost' href={'/posts'}>
          Posts
        </Link>
        <Link className='btn btn-ghost' href={'/abouts'}>
          Abouts
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
