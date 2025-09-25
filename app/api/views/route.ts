import { NextRequest, NextResponse } from 'next/server';

import { hash } from '@/src/utils/hash';
import { isLocalhost } from '@/src/utils/localhost';
import { prisma } from '@/src/utils/prisma';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { slug } });

  return NextResponse.json({ views: post?.views ?? 0 });
}

export async function POST(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  const ip = request.ip ?? request.headers.get('X-Forwarded-For');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  if (ip && isLocalhost(ip)) {
    return NextResponse.json({}, { status: 200 });
  }

  const views = await prisma.$transaction(async (transaction) => {
    let shouldIncreaseViews = true;

    if (ip) {
      const hashedIP = hash(ip);

      const existingView = await transaction.view.findFirst({
        where: {
          ip: hashedIP,
          slug,
          created_at: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      });

      if (existingView) {
        shouldIncreaseViews = false;
      } else {
        await transaction.view.create({ data: { ip: hashedIP, slug } });
      }
    }

    const updatedPost = await transaction.post.upsert({
      where: { slug },
      update: shouldIncreaseViews ? { views: { increment: 1 } } : {},
      create: { slug, views: 1 },
    });

    return updatedPost.views;
  });

  return NextResponse.json({ views });
}
