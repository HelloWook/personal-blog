import React from 'react';
import Profile from './Profile/Profile';
import IntroMessage from './IntroMessage/IntroMessage';

const Introduce = () => {
  return (
    <div className='flex items-center justify-between'>
      <IntroMessage />
      <Profile />
    </div>
  );
};

export default Introduce;
