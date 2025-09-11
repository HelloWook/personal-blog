import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='p-4 mt-8 footer sm:footer-horizontal footer-center bg-base-300 text-base-content'>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{' '}
          <Link href={'https://github.com/HelloWook'} className='underline-animation' rel='noopener noreferrer' target='_blank'>
            HelloWook
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
