'use client';

import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import Link from 'next/link';

import { Tooltip } from './tooltip';

const LINKS = [
  {
    name: 'Github',
    href: 'https://github.com/connieya',
    icon: <GithubIcon size={16} className='text-gray-400' />,
  },
  // {
  //   name: 'LinkedIn',
  //   href: 'https://www.linkedin.com/in/%EC%8A%B9%EC%A4%80-%EC%8B%A0-73602420a/',
  //   icon: <LinkedinIcon size={16} className='text-gray-400' />,
  // },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='mb-12 mt-40 flex w-full flex-col items-end gap-8'>
      <hr className='w-full border-t border-gray-100' />
      <div className='flex w-full flex-col items-end gap-4'>
        <div className='flex w-full  justify-end pt-4'>
          <Tooltip
            text='gunny6026@naver.com'
            onClick={() => {
              navigator.clipboard.writeText('gunny6026@naver.com');
              alert('이메일이 복사되었습니다.');
            }}>
            <span className='inline-block cursor-pointer px-2 py-1'>
              <Mail size={16} className='text-gray-400' />
            </span>
          </Tooltip>
          {LINKS.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className='px-2 py-1'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={name}>
              {icon}
            </Link>
          ))}
        </div>
        <span className='text-xs text-gray-400'>© 박건희 {year}</span>
      </div>
    </footer>
  );
}
