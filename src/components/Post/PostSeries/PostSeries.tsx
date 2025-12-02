'use client';

import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';
import { PostWithBlur } from '@/types/post';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import PostCard from '../PostCard/PostCard';
import {useTranslations} from 'next-intl';

const ALL_SERIES = 'All';

interface PostSeriesProps {
  postList: PostWithBlur[];
  seriesList: string[];
}

const PostSeries = ({ postList, seriesList }: PostSeriesProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('PostPage');

  const defaultSeries = searchParams.get('series') ?? ALL_SERIES;

  const [selectedSeries, setSelectedSeries] = useState<string>(defaultSeries);

  const handleSeriesChange = (series: string) => {
    setSelectedSeries(series);
  };

  const title = selectedSeries === ALL_SERIES 
    ? t('allPosts') 
    : t('seriesPosts', { series: selectedSeries });

  const filtered = postList.filter((post) => {
    if (selectedSeries === ALL_SERIES) return true;
    return post.series === selectedSeries;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedSeries === ALL_SERIES) params.delete('series');
    else params.set('series', selectedSeries);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [selectedSeries, router]);

  return (
    <>
      <h2 className='mb-2 text-3xl text-center'>{title}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{t('postCount', { count: filtered.length })}</p>
      <PostSeriesList seriesList={seriesList} onSeriesChange={handleSeriesChange} />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {filtered.map((post, idx) => (
          <PostCard
            key={idx}
            excerpt={post.excerpt}
            fileName={post.fileName}
            thumbnail={post.thumbnail}
            title={post.title}
            blurDataURL={post.blurDataURL}
          />
        ))}
      </div>
    </>
  );
};

export default PostSeries;
