import Link from 'next/link';

import { routes } from '../constants/routes';

const LINKS = {
  개발: routes.posts.root,
  '읽은 책': routes.books.root,
  기록: routes.logs.root,
  방명록: routes.guestbook.root,
} as const;

export function GNB() {
  return (
    <aside className='mb-16 tracking-tight'>
      <nav className='flex flex-row items-center gap-4'>
        <Link href={routes.home} className='text-xl font-semibold'>
          박건희
        </Link>
        <div className='flex flex-row items-center gap-2'>
          {Object.entries(LINKS).map(([name, path]) => (
            <Link key={path} href={path} className='flex px-2 opacity-50'>
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
