type Guestbook = {
  id: number;
  created_at: string;
  name: string;
  message: string;
};

export async function getGuestbooks(): Promise<{ guestbooks: Guestbook[] }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guestbooks`);

  if (!response.ok) {
    throw new Error('Failed to get guestbooks');
  }

  return await response.json();
}

export async function createGuestbook({ name, message }: { name: string; message: string }): Promise<Guestbook> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guestbooks`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create a guestbook');
  }

  return await response.json();
}
