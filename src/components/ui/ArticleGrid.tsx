"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleCard from "@ui/articleCard";

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

export default function ArticleGrid({ articles }: { articles: any[] }) {
  console.log("Articles received in ArticleGrid:", articles);

  if (!articles || articles.length === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 justify-items-center">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
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
      {articles.map((article) => (
        <motion.div
          key={article.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Link href={`/articles/${article.id}`}>
            <ArticleCard article={article} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
