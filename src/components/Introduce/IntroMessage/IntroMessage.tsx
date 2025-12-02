'use client';
import React from 'react';
import { ReactTyped } from 'react-typed';
import { useTranslations } from 'next-intl';

const IntroMessage = () => {
  const t = useTranslations('Introduce');
  return (
    <div className='text-3xl'>
      <p> {t('hello')}</p>
      <span>
        <ReactTyped
          strings={['FrontEnd', 'Typescript', 'Hamster']}
          typeSpeed={60}
          backSpeed={80}
          loop={true}
          className='font-bold'
        />
        {t('like')}
      </span>
      <br />
      <span>
        {t('developer')}
        <ReactTyped
          strings={[t('name'), 'HelloWook']}
          typeSpeed={60}
          backSpeed={80}
          loop={true}
          className='font-bold'
        />
      </span>
      {t('dot')}
    </div>
  );
};

export default IntroMessage;
