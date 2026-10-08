import Introduce from '@/components/Introduce/Introduce';
import TimeLine from '@/components/TimeLine/TimeLine';
import React from 'react';
import { Activities } from '@/datas/activity';
import SubTitle from '@/components/SubTitle/SubTitle';
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
  const t = await getTranslations({ locale, namespace: 'AboutsPage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, 'abouts'),
    openGraph: {
      url: `/${locale}/abouts`,
      title: t('title'),
      description: t('description'),
    },
  };
}

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
