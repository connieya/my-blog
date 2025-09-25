import { Item } from '@/src/types/contents/shared/item';
import { Meta } from '@/src/types/contents/shared/meta';

import { ListItem } from './post-list-item';

export function List({ items, baseUrl }: { items: Item<Meta>[]; baseUrl: string }) {
  return (
    <ul className='flex flex-col gap-14'>
      {items.map((item) => (
        <ListItem item={item} key={item.slug} href={`${baseUrl}/${item.slug}`} />
      ))}
    </ul>
  );
}
