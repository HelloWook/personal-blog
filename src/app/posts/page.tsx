import PostCard from '@/components/Post/PostCard/PostCard';
import PostSeriesList from '@/components/Post/PostSeriesList/PostSeriesList';
import { getSeries, getPosts } from '@/util/file';
import Albam from '@/asset/알밤.png';
interface PostPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const seriesList = await getSeries('contents/posts');

  const series = (await searchParams).series || 'All';

  const posts = getPosts('contents/posts').filter((post) => {
    if (series === 'All') return true;
    else return post.series === series;
  });

  const title = series ? `${series} Posts` : 'All Posts';

  return (
    <div className='w-full'>
      <h2 className='mb-2 text-3xl text-center'>{title}</h2>
      <p className='mb-6 text-xl text-center text-gray-300'>{posts.length} Posts</p>
      <PostSeriesList seriesList={seriesList} />
      <div className='grid grid-cols-2 gap-8'>
        {posts.map((post, idx) => {
          const { excerpt, fileName, title } = post;
          return <PostCard key={idx} excerpt={excerpt} fileName={fileName} thumbnail={Albam} title={title} />;
        })}
      </div>
    </div>
  );
};

export default PostPage;
