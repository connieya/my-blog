'use client';

import { useEffect, useState } from 'react';

import { getViews, increaseViews } from '../apis/views';

export function Views({ slug, increase = false }: { slug: string; increase?: boolean }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    getViews(slug).then(({ views }) => {
      setViews(views);
    });

    if (increase) increaseViews(slug);
  }, [increase, slug]);

  if (views == null) return <Skeleton />;

  return <span className='text-xs text-gray-400'>{views?.toLocaleString('ko-KR')} 조회</span>;
}

function Skeleton() {
  return (
    <div className='flex animate-pulse self-stretch items-center gap-1'>
      <span className='w-2 h-4 rounded bg-slate-200' />
      <span className='text-xs text-gray-400'>조회</span>
    </div>
  );
}
