import { getSeries } from '@/util/file';
import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';

interface PostSeriesProps {
  series: string;
}

const PostSeries = async ({ series }: PostSeriesProps) => {
  const seriesList = getSeries('contents/posts');

  // const posts = getPosts('contents/posts').filter((post) => {
  //   if (series === 'All') return true;
  //   else return post.series === series;
  // });

  const title = series ? `${series} Posts` : 'All Posts';

  return (
    <>
      <h2 className='mb-2 text-3xl text-center'>{title}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{seriesList.length} Posts</p>
      <PostSeriesList seriesList={seriesList} />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2' />
    </>
  );
};

export default PostSeries;
