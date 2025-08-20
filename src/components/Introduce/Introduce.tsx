import React from 'react';
import Profile from './Profile/Profile';
import IntroMessage from './IntroMessage/IntroMessage';
import SocialLink from './SocialLink/SocialLink';

const Introduce = () => {
  return (
    <div className='flex items-center justify-between h-[240px]'>
      <div className='flex flex-col'>
        <IntroMessage />
        <SocialLink />
      </div>
      <Profile />
    </div>
  );
};

export default Introduce;
