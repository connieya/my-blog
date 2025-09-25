import '@/src/styles/globals.css';

import type { Metadata } from 'next';
import { Suspense } from 'react';

import GoogleAnalyticsScript from '@/src/components/google-analytics-script';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  title: '박건희 블로그',
  description: '백엔드 개발자 박건희의 개인 블로그입니다.',
  alternates: {
    canonical: './',
  },
  verification: {
    google: 'Nu1aSKHqgAe8INSfZ5HDrAi2BC3QfpHXTXlpQ9H55_Y',
    other: {
      'naver-site-verification': 'c77e3af6256377ff0343a93fb26812585a2217b7',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='bg-white text-black dark:bg-[#111010] dark:text-white'>
      <body className='mx-auto flex max-w-[704px] pt-6 antialiased'>
        <main className='flex min-w-0 flex-auto flex-col px-4 pt-6'>{children}</main>
        <Suspense>
          <GoogleAnalyticsScript />
        </Suspense>
      </body>
    </html>
  );
}
