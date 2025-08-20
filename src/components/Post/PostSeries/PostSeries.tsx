import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';
import { Post } from '@/types/post';

interface PostSeriesProps {
  series: string;
  postList: Post[];
  seriesList: string[];
}

const PostSeries = ({ series, postList, seriesList }: PostSeriesProps) => {
  const posts = postList.filter((post) => {
    if (series === 'All') return true;
    else return post.series === series;
  });

  const title = series ? `${series} Posts` : 'All Posts';

  return (
    <>
      <h2 className='mb-2 text-3xl text-center'>{title}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{posts.length} Posts</p>
      <PostSeriesList seriesList={seriesList} />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'></div>
    </>
  );
};

export default PostSeries;
