import Introduce from '@/components/Introduce/Introduce';
import PostCard from '@/components/Post/PostCard/PostCard';
import { getPostsWithBlurData } from '@/utils/file';
import SubTitle from '@/components/SubTitle/SubTitle';

export default async function Home() {
  const posts = await getPostsWithBlurData();

  return (
    <>
      <Introduce />
      <SubTitle title='최근 포스트' description='개발과 관련된 다양한 주제들을 다룹니다' />
      <div className='flex flex-col gap-6'>
        {posts
          .slice(0, 4)
          .reverse()
          .map((post, idx) => (
            <PostCard
              key={idx}
              fileName={post.fileName}
              title={post.title}
              excerpt={post.excerpt}
              thumbnail={post.thumbnail}
              blurDataURL={post.blurDataURL}
            />
          ))}
      </div>
    </>
  );
}
