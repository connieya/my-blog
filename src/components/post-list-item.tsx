import Link from 'next/link';

import Bullet from '@/src/components/bullet';
import ReadingTime from '@/src/components/reading-time';
import Summary from '@/src/components/summary';
import Time from '@/src/components/time';
import Title from '@/src/components/title';
import { Views } from '@/src/components/view';
import { Item } from '@/src/types/contents/shared/item';
import { Meta } from '@/src/types/contents/shared/meta';
import { cn } from '@/src/utils/class-name';

export function ListItem({
  item: {
    slug,
    meta: { title, summary, createdAt },
    readingTime,
  },
  href,
}: {
  item: Item<Meta>;
  href: string;
}) {
  return (
    <li className='flex items-start gap-10'>
      <Link href={href}>
        <div className={cn('flex flex-col items-start', summary ? 'gap-2' : 'gap-1')}>
          <div className='flex flex-col items-start gap-2'>
            <Title>{title}</Title>
          </div>
          <div className='flex flex-col items-start gap-1'>
            {summary && <Summary>{summary}</Summary>}
            <div className='flex items-center gap-2'>
              <Time date={createdAt} />
              <Bullet />
              <ReadingTime readingTime={readingTime} />
              <Bullet />
              <Views slug={slug} />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
