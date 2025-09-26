import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Bullet from '@/src/components/bullet';
import { MDX } from '@/src/components/mdx';
import ReadingTime from '@/src/components/reading-time';
import Summary from '@/src/components/summary';
import Time from '@/src/components/time';
import { Views } from '@/src/components/view';
import { getPosts } from '@/src/utils/contents/post';
import { serialize } from '@/src/utils/mdx';

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) return {};

  const { title, summary, categories } = post.meta;

  return {
    title,
    description: summary,
    keywords: categories,
    openGraph: {
      title,
      description: summary,
      url: `${process.env.SITE_URL}/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) notFound();

  const { readingTime, content } = post;
  const { title, summary, createdAt } = post.meta;

  const { compiledSource } = await serialize(content);

  return (
    <div className='w-full max-w-3xl'>
      <article className='prose prose-neutral w-full max-w-none break-all dark:prose-invert'>
        <h1 className='m-0 py-4'>{title}</h1>
        <div className='flex flex-col items-start gap-1'>
          <Summary>{summary}</Summary>
          <div className='flex items-center justify-start gap-2'>
            <Time date={createdAt} />
            <Bullet />
            <ReadingTime readingTime={readingTime} />
            <Bullet />
            <Views slug={slug} increase />
          </div>
        </div>
        <div className='w-full py-8'>
          <MDX compiledSource={compiledSource} frontmatter={post.meta} />
        </div>
      </article>
    </div>
  );
}
