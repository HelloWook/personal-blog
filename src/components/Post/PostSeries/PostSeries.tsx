import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';
import { Post } from '@/types/post';
import PostCard from '../PostCard/PostCard';

interface PostSeriesProps {
  series: string;
  postList: Post[];
  seriesList: string[];
}

const PostSeries = ({ series, postList, seriesList }: PostSeriesProps) => {
  const title = series ? `${series} Posts` : 'All Posts';

  return (
    <>
      <h2 className='mb-2 text-3xl text-center'>{title}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{postList.length} Posts</p>
      <PostSeriesList seriesList={seriesList} />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {postList.map((post, idx) => (
          <PostCard key={idx} excerpt={post.excerpt} fileName={post.fileName} thumbnail={'/알밤.png'} title={post.title} />
        ))}
      </div>
    </>
  );
};

export default PostSeries;
