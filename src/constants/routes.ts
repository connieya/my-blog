export const routes = {
  home: '/',
  posts: {
    root: '/posts',
    detail: (slug: string) => `${routes.posts.root}/${slug}`,
  },
  books: {
    root: '/books',
  },
  logs: {
    root: '/logs',
  },
  guestbook: {
    root: '/guestbook',
  },
};
