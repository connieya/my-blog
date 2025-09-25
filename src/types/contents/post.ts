import { Item } from '@/src/types/contents/shared/item';
import { Meta } from '@/src/types/contents/shared/meta';

export type PostMeta = Required<Meta>;

export type Post = Item<PostMeta>;
