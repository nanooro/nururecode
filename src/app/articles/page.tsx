"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ArticleCard from "@/components/ui/articleCard";
import Link from "next/link";

type Article = {
  id: number;
  Heading: string;
  subHeading: string;
  imgUrl: string;
  created_at: string;
  user_id: string;
  view_count: number;
};

export default function ArticlesList() {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from("Nannuru_articles_table")
          .select("*")
          .order("view_count", { ascending: false });

        if (supabaseError) {
          console.error("Supabase error fetching articles:", supabaseError);
          setError(supabaseError.message);
        } else {
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
      return Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />);
    }

    if (error) {
      return <p className="text-red-500 text-center col-span-full">Error: {error}</p>;
    }

    if (articles.length === 0) {
      return <p className="text-center col-span-full">No articles found.</p>;
    }

    return articles.map((article) => (
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
    ));
  };

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
          {renderContent()}
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
