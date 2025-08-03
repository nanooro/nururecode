import { supabase } from "@/lib/supabaseClient";
import ArticleGrid from "@/components/ui/ArticleGrid";
import Hero from "@/components/ui/hero";

export default async function Home() {
  const { data: articles, error } = await supabase
    .from("Nannuru_articles_table")
    .select("*")
    .order("view_count", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <>
      <Hero theme="light" articlesRef={{ current: null }} />
      <div className="p-4 max-w-6xl mx-auto">
        <ArticleGrid articles={articles || []} />
      </div>
    </>
  );
}
