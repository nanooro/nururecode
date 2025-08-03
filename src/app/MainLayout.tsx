'use client';

import { useTheme } from 'next-themes';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

import { motion } from "framer-motion";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <Header theme={theme || "light"} setTheme={setTheme} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-24"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
