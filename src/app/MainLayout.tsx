'use client';

import { useTheme } from 'next-themes';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </div>
  );
}
