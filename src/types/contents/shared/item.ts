import { Meta } from './meta';

export type Item<T extends Meta> = {
  slug: string;
  content: string;
  readingTime: number;
  meta: T;
};
