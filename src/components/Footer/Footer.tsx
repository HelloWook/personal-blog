'use client';
import { Link } from '@/i18n/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

  const year = new Date().getFullYear();

  return (
    <footer className='p-4 mt-8 footer sm:footer-horizontal footer-center bg-base-300 text-base-content'>
      <aside>
        <p>
          {t('copyright', { year })}{' '}
          <Link href={'https://github.com/HelloWook'} className='underline-animation' rel='noopener noreferrer' target='_blank'>
            HelloWook
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
