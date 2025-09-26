import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { prisma } from '@/src/utils/prisma';
import { stringifyBigIntId } from '@/src/utils/stringify-big-int-id';

export async function GET() {
  const guestbooks = (await prisma.guestbook.findMany())
    .map(stringifyBigIntId)
    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

  return NextResponse.json({ guestbooks });
}

export async function POST(request: NextRequest) {
  const { name, message } = await request.json();

  const guestbook = await prisma.guestbook.create({
    data: {
      name,
      message,
    },
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gunny6026@gmail.com',
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: 'gunny6026@gmail.com',
      to: 'gunny6026@gmail.com',
      subject: '블로그에 방명록이 등록되었습니다.',
      text: `${name}: ${message}`,
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ guestbook: stringifyBigIntId(guestbook) });
}
