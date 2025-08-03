import { supabase } from "@/lib/supabaseClient";
import ArticleGrid from "@/components/ui/ArticleGrid";

export default async function ArticlesList() {
  const { data: articles } = await supabase
    .from("Nannuru_articles_table")
    .select("*")
    .order("view_count", { ascending: false });

  return (
    <div>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
        <ArticleGrid articles={articles || []} />
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
