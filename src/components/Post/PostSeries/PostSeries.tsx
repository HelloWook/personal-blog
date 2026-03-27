'use client';

import { useState } from 'react';
import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';
import { PostWithBlur } from '@/types/post';
import PostCard from '../PostCard/PostCard';

const ALL_SERIES = 'All';

interface PostSeriesProps {
  postList: PostWithBlur[];
  seriesList: string[];
}

const PostSeries = ({ postList, seriesList }: PostSeriesProps) => {
  const [selectedSeries, setSelectedSeries] = useState(ALL_SERIES);

  const filtered = selectedSeries === ALL_SERIES
    ? postList
    : postList.filter((post) => post.series === selectedSeries);

  return (
    <>
      <PostSeriesList
        seriesList={seriesList}
        selectedSeries={selectedSeries}
        onSelect={setSelectedSeries}
      />
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
