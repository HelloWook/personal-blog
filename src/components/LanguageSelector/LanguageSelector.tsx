'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import {useParams} from 'next/navigation';
import { useEffect } from 'react';

const LanguageSelector = () => {
const pathname = usePathname();
const router = useRouter();

const params = useParams();
  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === params.locale) || languages[0];

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp('(?:^|; )' + name + '=([^;]*)')
      );
      return match ? decodeURIComponent(match[1]) : null;
    };

    const theme = getCookie('theme');
    if (theme) {
      const currentTheme = theme === 'synthwave' ? 'synthwave' : 'pastel';
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [params.locale]);

  const handleLanguageChange = (newLocale: string) => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    router.replace(pathname, { locale: newLocale });
    if (currentTheme) {
      
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
      }, 0);
    }
   };
  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-ghost btn-sm'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
          />
        </svg>
        <span className='hidden sm:inline ml-1'>{currentLanguage.label}</span>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-200 rounded-box z-[1] w-40 p-2 shadow-lg border border-base-300'
      >
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => handleLanguageChange(lang.code)}
              className={`${params.locale === lang.code ? 'active' : ''}`}
            >
              {lang.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;

