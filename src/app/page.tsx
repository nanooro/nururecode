"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useArticleStore } from "@/lib/store";
import ArticleCard from "@/components/ui/articleCard";
import Link from "next/link";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import Footer from "@/components/ui/footer";

export default function Home() {
  const { setTheme, theme } = useTheme();
  const articles = useArticleStore((s) => s.articles);
  const fetchArticles = useArticleStore((s) => s.fetchArticles);
  const [loading, setLoading] = useState(true);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      if (articles.length === 0) await fetchArticles();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <>
      <Hero theme={theme || "light"} articlesRef={articlesRef} />
      <div className="p-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          ref={articlesRef}
        >
          <motion.div
            className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : articles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link href={`/articles/${article.id}`}>
                      <ArticleCard
                        article={article}
                      />
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

const SkeletonCard = () => (
  <div className="bg-white dark:bg-neutral-900 w-[250px] rounded-xl shadow-md m-4 animate-pulse">
    <div className="h-[250px] bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
    <div className="p-5">
      <div className="pb-5 mb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);