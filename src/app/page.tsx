"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import Menu from "./menu";
import Link from "next/link";
import Hero from "./hero"; // make sure this exists or update the path

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 h-auto z-50 w-[95vw]">
      <div className="flex items-center justify-start h-full px-0 relative">
        <div className="h-full flex justify-between items-center z-50 bg-white/60 dark:bg-black/60 backdrop-blur-md shadow-lg dark:shadow-sm dark:shadow-white/10 rounded-[2rem] w-full px-4 sm:px-6">
          <Link href="/">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl py-4">Nannuru</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 4.636"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                  />
                </svg>
              )}
            </Button>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}