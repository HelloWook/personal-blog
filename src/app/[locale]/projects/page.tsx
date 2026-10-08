import ProjectList from '@/components/Project/ProjectList/ProjectList';
import SubTitle from '@/components/SubTitle/SubTitle';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getStaticLocaleParams } from '@/utils/staticParams';
import { Metadata } from 'next';
import { buildAlternates } from '@/utils/seo';

export const generateStaticParams = getStaticLocaleParams;

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, 'projects'),
    openGraph: {
      url: `/${locale}/projects`,
      title: t('title'),
      description: t('description'),
    },
  };
}

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
