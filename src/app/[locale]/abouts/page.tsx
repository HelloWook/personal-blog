import Introduce from '@/components/Introduce/Introduce';
import TimeLine from '@/components/TimeLine/TimeLine';
import React from 'react';
import { Activities } from '@/datas/activity';
import SubTitle from '@/components/SubTitle/SubTitle';
import {getTranslations} from 'next-intl/server';

const About = async () => {
  const t = await getTranslations('AboutsPage');
  return (
    <div className='w-full'>
      <Introduce />
      <SubTitle title={t('title')} description={t('description')} />
      <TimeLine activities={Activities} />
    </div>
  );
};

export default About;
