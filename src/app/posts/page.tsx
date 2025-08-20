import PostSeries from '@/components/Post/PostSeries/PostSeries';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

interface PostPageProps {
  searchParams: SearchParams;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const sp = await searchParams;
  const raw = sp.series;
  const series = Array.isArray(raw) ? raw[0] : raw ?? 'All';

  return (
    <div className='w-full'>
      <PostSeries series={series} />
    </div>
  );
};

export default PostPage;
