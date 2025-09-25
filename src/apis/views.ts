const viewsMap = new Map();

export async function getViews(slug: string): Promise<{ views: number }> {
  if (viewsMap.has(slug)) {
    return viewsMap.get(slug);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/views?slug=${slug}`);

  if (!response.ok) {
    throw new Error('Failed to get views');
  }

  viewsMap.set(slug, await response.json());

  return viewsMap.get(slug);
}

export async function increaseViews(slug: string): Promise<{ views: number }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/views?slug=${slug}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to increase view');
  }

  return await response.json();
}
