import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <div className='flex items-center gap-6'>
        <h1 className='text-4xl font-extralight'>404</h1>
        <span className='self-stretch border-r border-gray-500 dark:border-white'></span>
        <p className='text-sm'>
          페이지가 존재하지 않습니다.
        </p>
      </div>
      <Link href='/' className='text-sm underline'>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
