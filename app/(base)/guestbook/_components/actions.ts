'use server';

import { revalidatePath } from 'next/cache';

import { createGuestbook } from '@/src/apis/guestbooks';

export async function createGuestbookAction({ name, message }: { name: string; message: string }) {
  await createGuestbook({ name, message });
  revalidatePath('/guestbook');
}
