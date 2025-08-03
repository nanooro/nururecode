"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import ArticleCard from "@ui/articleCard";
import { useEffect, useState } from "react";
import { useArticleStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function ArticlesList() {
  const { setTheme, theme } = useTheme();
  const articles = useArticleStore((s) => s.articles);
  const fetchArticles = useArticleStore((s) => s.fetchArticles);
  const fetchProfiles = useArticleStore((s) => s.fetchProfiles);
  const matchAuthors = useArticleStore((s) => s.matchAuthors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchArticles();
      await fetchProfiles();
      matchAuthors();
      setLoading(false);
    };
    load();
  }, []);

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

  return (
    <div>

      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 justify-items-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : articles.length === 0
            ? <p>No articles found.</p>
            : articles.map((article) => {
                return (
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
                );
              })}
        </motion.div>

        <div className="mt-20 text-center bg-muted/40 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2">Got something to share?</h2>
          <p className="mb-4 text-muted-foreground">
            Create your own articles and get featured on Nannuru.
          </p>
          <a
            href="https://create.nannuru.com"
            target="_blank"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Start Writing →
          </a>
        </div>
      </div>
    </div>
  );
}