export default function ReadingTime({ readingTime }: { readingTime: number }) {
  return <span className='text-xs text-gray-400'>약 {Math.ceil(readingTime)}분</span>;
}
