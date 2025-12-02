import React from 'react';
import type { Project, Release } from '@/datas/project';
import Image from 'next/image';
import Link from 'next/link';
import { getBlurLocalImg } from '@/utils/blurImg';
import {getTranslations} from 'next-intl/server';

const ProjectCard = async ({ title, thumbnail, descriptionKey, url, type, roleKeys, skill }: Project) => {
  const t = await getTranslations('ProjectCard');
  const tCommon = await getTranslations();
  
  const releaseMap: Record<Release, React.ReactNode> = {
    '개발 중': <span className='badge badge-warning'>{t('inDevelopment')}</span>,
    '운영 중': <span className='badge badge-success'>{t('inOperation')}</span>,
    '운영 종료': <span className='badge badge-error'>{t('operationEnded')}</span>,
  } as const;

  const redirectUrl = url;
  const blurDataURL = await getBlurLocalImg(thumbnail);

  return (
    <Link href={redirectUrl} className='card-frame theme-shadow-color'>
      <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl '>
        <Image src={thumbnail} alt={t('tempData')} fill className='object-cover' blurDataURL={blurDataURL} placeholder='blur' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='line-clamp-1 overflow-ellipsis text'>{tCommon(descriptionKey)}</p>
        <div className='flex flex-wrap gap-1 '>
          {releaseMap[type]}
          {roleKeys.map((roleKey, index) => (
            <span key={index} className='badge badge-primary'>
              {tCommon(roleKey)}
            </span>
          ))}
          {skill.map((s, index) => (
            <span key={index} className='badge badge-secondary'>
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
