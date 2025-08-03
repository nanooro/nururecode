"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import ArticleCard from "@/components/ui/articleCard";
import Link from "next/link";
import Hero from "@/components/ui/hero";

type Article = {
  id: number;
  Heading: string;
  subHeading: string;
  imgUrl: string;
  created_at: string;
  user_id: string;
  view_count: number;
};

export default function Home() {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from("Nannuru_articles_table")
          .select("*")
          .order("view_counter", { ascending: false });

        if (supabaseError) {
          console.error("Supabase error fetching articles:", supabaseError);
          setError(supabaseError.message);
        } else {
          console.log("Fetched articles:", data);
          setArticles(data || []);
        }
      } catch (err: any) {
        console.error("Error fetching articles:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />);
    }

    if (error) {
      return <p className="text-red-500 text-center col-span-full">Error: {error}</p>;
    }

    if (articles.length === 0) {
      return <p className="text-center col-span-full">No articles found.</p>;
    }

    return articles.map((article) => (
      <div key={article.id}>
        <Link href={`/articles/${article.id}`}>
          <ArticleCard article={article} />
        </Link>
      </div>
    ));
  };

  return (
    <>
      <Hero theme={theme || "light"} articlesRef={articlesRef} />
      <div className="p-4 max-w-6xl mx-auto">
        <div ref={articlesRef}>
          <motion.div
            className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 justify-items-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {renderContent()}
          </motion.div>
        </div>
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
