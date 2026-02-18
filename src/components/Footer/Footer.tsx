'use client';
import { Link } from '@/i18n/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

  // 서버 렌더링 시에는 현재 시간을 읽지 않고, 브라우저에서만 동적으로 year를 계산
  const year = typeof window !== 'undefined' ? new Date().getFullYear() : 2025;

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
