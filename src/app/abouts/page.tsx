import Introduce from '@/components/Introduce/Introduce';
import TimeLine from '@/components/TimeLine/TimeLine';
import React from 'react';
import { Activities } from '@/Data/activity';
import SubTitle from '@/components/SubTitle/SubTitle';

const About = () => {
  return (
    <div className='w-full'>
      <Introduce />
      <SubTitle title='나의 지난 날들' description='저의 발자취 입니다.' />
      <TimeLine activities={Activities} />
    </div>
  );
};

export default About;
