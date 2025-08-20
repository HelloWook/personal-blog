import PostSeries from '@/components/Post/PostSeries/PostSeries';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

interface PostPageProps {
  searchParams: SearchParams;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const sp = await searchParams;
  const raw = sp.series ? sp.series : undefined;
  const series = Array.isArray(raw) ? raw[0] : raw ?? 'All';

  console.log(series);

  return <div className='w-full'>{<PostSeries series={series} />}</div>;
};

export default PostPage;
