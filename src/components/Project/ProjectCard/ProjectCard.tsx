import React from 'react';
import type { Project, Release } from '@/datas/project';
import Image from 'next/image';
import Link from 'next/link';
import { getBlurLocalImg } from '@/utils/blurImg';

const ProjectCard = async ({ title, thumbnail, description, url, type, role, skill }: Project) => {
  const releaseMap: Record<Release, React.ReactNode> = {
    '개발 중': <span className='badge badge-warning'>개발 중</span>,
    '운영 중': <span className='badge badge-success'>운영 중</span>,
    '운영 종료': <span className='badge badge-error'>운영 종료</span>,
  } as const;

  const redirectUrl = url;
  const blurDataURL = await getBlurLocalImg(thumbnail);

  return (
    <Link href={redirectUrl} className='card-frame theme-shadow-color'>
      <figure className='relative w-full h-40 overflow-hidden rounded-t-2xl '>
        <Image src={thumbnail} alt='임시 데이터' fill className='object-cover' blurDataURL={blurDataURL} placeholder='blur' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='line-clamp-1 overflow-ellipsis text'>{description}</p>
        <div className='flex flex-wrap gap-1 '>
          {releaseMap[type]}
          {role.map((r, index) => (
            <span key={index} className='badge badge-primary'>
              {r}
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
