import Introduce from '@/components/Introduce/Introduce';
import PostContainer from '@/components/Post/PostContainer/PostContainer';
import { getPosts } from '@/util/file';

export default function Home() {
  const post = getPosts('contents/posts');

  return (
    <div>
      <Introduce />
      <PostContainer posts={post} />
    </div>
  );
}
