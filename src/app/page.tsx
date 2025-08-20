import Introduce from '@/components/Introduce/Introduce';
import PostList from '@/components/Post/PostList/PostList';
import { getPosts } from '@/util/file';

export default function Home() {
  const post = getPosts('contents/posts');

  return (
    <>
      <Introduce />
      <PostList posts={post} />
    </>
  );
}
