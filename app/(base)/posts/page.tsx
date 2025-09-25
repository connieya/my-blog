import { routes } from '@/src/constants/routes';
import { getPosts } from '@/src/utils/contents/post';

import { List } from '../../../src/components/post-list';

export default function PostsPage() {
  const posts = getPosts();

  return (
    <section>
      <List items={posts} baseUrl={routes.posts.root} />
    </section>
  );
}
