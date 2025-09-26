'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { getGuestbooks } from '@/src/apis/guestbooks';

import { GuestbookForm } from './_components/guestbook-form';

export default function GuestbookPage() {
  const [guestbooks, setGuestbooks] = useState<{ id: number; name: string; message: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuestbooks().then(({ guestbooks }) => {
      setGuestbooks(guestbooks);
      setLoading(false);
    });
  }, []);

  return (
    <section className='flex flex-col gap-6'>
      <GuestbookForm
        guestbooks={guestbooks}
        onSubmitSuccess={() => getGuestbooks().then(({ guestbooks }) => setGuestbooks(guestbooks))}
      />
      {loading ? (
        <ul className='flex flex-col gap-6'>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <li key={index} className='flex animate-pulse items-start gap-4'>
              <div className='flex flex-col gap-2'>
                <div className='h-4 w-20 rounded bg-gray-200' />
                <div className='h-3 w-16 rounded bg-gray-200' />
              </div>
              <div className='h-4 flex-1 rounded bg-gray-200' />
            </li>
          ))}
        </ul>
      ) : (
        <ul className='flex flex-col gap-6'>
          {guestbooks.map(({ id, name, message, created_at }) => (
            <li key={id} className='flex items-start gap-4'>
              <div className='flex flex-col gap-1'>
                <span className='whitespace-nowrap text-sm font-bold text-gray-500'>{name} </span>
                <time dateTime={created_at} className='text-[0.5rem] text-gray-500'>
                  {format(new Date(created_at), 'yyyy-MM-dd HH:mm')}
                </time>
              </div>
              <p className='text-sm'>{message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
