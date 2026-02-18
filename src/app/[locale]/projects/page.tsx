import ProjectList from '@/components/Project/ProjectList/ProjectList';
import SubTitle from '@/components/SubTitle/SubTitle';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getStaticLocaleParams } from '@/utils/staticParams';

export const generateStaticParams = getStaticLocaleParams;

const Post = async () => {
  const t = await getTranslations('ProjectsPage');
  return (
    <>
      <SubTitle title={t('title')} description={t('description')} />
      <ProjectList />
    </>
  );
};

export default Post;
