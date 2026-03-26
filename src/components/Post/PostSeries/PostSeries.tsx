import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';
import { PostWithBlur } from '@/types/post';
import PostCard from '../PostCard/PostCard';

interface PostSeriesProps {
  postList: PostWithBlur[];
  seriesList: string[];
  selectedSeries: string;
}

const PostSeries = ({ postList, seriesList, selectedSeries }: PostSeriesProps) => {
  return (
    <>
      <PostSeriesList seriesList={seriesList} selectedSeries={selectedSeries} />
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {postList.map((post, idx) => (
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
