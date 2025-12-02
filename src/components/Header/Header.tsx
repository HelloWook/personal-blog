import React from 'react';
import Link from 'next/link';
import DrawButton from '../Drawer/DrawButton';
import ThemeContainer from '../ThemeToggle/ThemeContainer';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Header = () => {
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
        <div>
        <ThemeContainer />
        <LanguageSelector />
        </div>
      </div>
      <DrawButton />
    </header>
  );
};

export default Header;
