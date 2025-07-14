'use client';
import React from 'react';
import { ReactTyped } from 'react-typed';

const IntroMessage = () => {
  return (
    <div className='text-3xl'>
      <p> 안녕하세요!</p>
      <span>
        <ReactTyped
          strings={['FrontEnd', 'Typescript', 'Hamster']}
          typeSpeed={60}
          backSpeed={80}
          loop={true}
          className='font-bold'
        />
        를 좋아하는
      </span>
      <br />
      <span>
        개발자
        <ReactTyped
          strings={['남정욱', 'HelloWook']}
          typeSpeed={60}
          backSpeed={80}
          loop={true}
          className='font-bold'
        />
      </span>
      입니다.
    </div>
  );
};

export default IntroMessage;
