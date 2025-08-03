import type { Metadata } from "next";
import { redirect } from 'next/navigation';
import ArticleRead from "@/components/ui/articleRead";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = await props;

  const { data: article } = await supabase
    .from("Nannuru_articles_table")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article) return { title: "Not Found" };

  const authorName = "Nannuru Team";
  const title = `${article.Heading} by ${authorName}`;

  return {
    title,
    openGraph: {
      title,
      description: article.subHeading || article.Heading,
      url: `https://nannuru.com/articles/${params.id}`,
      images: [
        {
          url: article.imgUrl,
          width: 800,
          height: 400,
          alt: article.Heading,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [article.imgUrl],
    },
  };
}

export default async function Page(props: any) {
  const { params } = await props;

  const { data: article } = await supabase
    .from("Nannuru_articles_table")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: moreArticles } = await supabase
    .from("Nannuru_articles_table")
    .select("id, Heading, imgUrl, date, rating")
    .neq("id", params.id) 

  if (!article) {
    redirect('/articles');
  }

  const incrementView = async (articleId: string) => {
    const { data, error } = await supabase
      .from("Nannuru_articles_table")
      .select("view_count")
      .eq("id", articleId)
      .single();

    if (error) {
      console.error("Error fetching view count:", error);
      return;
    }

    const newViewCount = (data?.view_count || 0) + 1;

    await supabase
      .from("Nannuru_articles_table")
      .update({ view_counter: newViewCount })
      .eq("id", articleId);
  };

  await incrementView(params.id);

  return <ArticleRead id={params.id} more={moreArticles || []} article={article} />;
}
