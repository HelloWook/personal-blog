import PostSeries from '@/components/Post/PostSeries/PostSeries';

const PostPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const series = (await searchParams)?.series || 'All';

  return (
    <div className='w-full'>
      <PostSeries series={series} />
    </div>
  );
};

export default PostPage;
