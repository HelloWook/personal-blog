import PostSeries from '@/components/Post/PostSeries/PostSeries';

interface PostPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const PostPage = async ({ searchParams }: PostPageProps) => {
  const series = (await searchParams)?.series || 'All';

  return (
    <div className='w-full'>
      <PostSeries series={series} />
    </div>
  );
};

export default PostPage;
