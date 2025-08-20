import PostSeries from '@/components/Post/PostSeries/PostSeries';
export const dynamic = 'force-static';
import { getSeries, getPosts } from '@/util/file';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

interface PostPageProps {
  searchParams: SearchParams;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const sp = await searchParams;

  const raw = sp.series ? sp.series : undefined;
  const series = Array.isArray(raw) ? raw[0] : raw ?? 'All';

  const seriesList = getSeries('contents/posts');
  const postList = getPosts('contents/posts');

  return <div className='w-full'>{<PostSeries series={series} postList={postList} seriesList={seriesList} />}</div>;
};

export default PostPage;
