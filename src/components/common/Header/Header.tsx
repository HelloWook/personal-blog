import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  return (
    <div className='navbar'>
      <div className='flex-1'>
        <a className='text-xl btn btn-ghost'>daisyUI</a>
      </div>
      <div className='flex-none'>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
