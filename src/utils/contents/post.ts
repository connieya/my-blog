import path from 'path';

import { PostMeta } from '@/src/types/contents/post';

import { getContents } from '../file';

const CONTENTS_PATH = path.join(process.cwd(), 'src/contents/posts');

export function getPosts() {
  return getContents<PostMeta>(CONTENTS_PATH).sort(
    (a, b) => new Date(b.meta.updatedAt).getTime() - new Date(a.meta.updatedAt).getTime(),
  );
}
