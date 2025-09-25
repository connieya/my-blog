import '@/src/styles/globals.css';

import { Footer } from '@/src/components/footer';
import { GNB } from '@/src/components/gnb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      {children}
      <Footer />
    </>
  );
}
