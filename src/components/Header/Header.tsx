import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link';
import DrawButton from '../Drawer/DrawButton';
import { headers } from 'next/headers';
import { Theme } from '@/util/tokenManger';

const Header = async () => {
  const h = await headers();
  const theme = (h.get('x-theme') ?? 'pastel') as Theme;

  return (
    <header className='flex items-center w-full py-4 mb-4'>
      <Link className='justify-center flex-1 text-xl' href={'/'}>
        <h1 className='underline-animation w-fit'>HelloWook.life</h1>
      </Link>
      <div className='items-center hidden gap-7 sm:flex'>
        <Link href={'/posts'} className='underline-animation'>
          Posts
        </Link>
        <Link href={'/abouts'} className='underline-animation'>
          Abouts
        </Link>
        <Link href={'/projects'} className='underline-animation'>
          Projects
        </Link>
        <ThemeToggle defaultTheme={theme} />
      </div>
      <DrawButton />
    </header>
  );
};

export default Header;
