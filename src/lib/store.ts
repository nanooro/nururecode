import { create } from 'zustand';
import { supabase } from './supabaseClient';

type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
};

type Article = {
  id: number;
  Heading: string;
  subHeading: string;
  imgUrl: string;
  created_at: string;
  user_id: string;
  view_count: number;
  author?: Profile; // Optional author profile
};

type ArticleStore = {
  articles: Article[];
  profiles: Profile[];
  fetchArticles: () => Promise<void>;
  fetchProfiles: () => Promise<void>;
  matchAuthors: () => void;
};

export const useArticleStore = create<ArticleStore>((set, get) => ({
  articles: [],
  profiles: [],
  fetchArticles: async () => {
    try {
      const { data, error } = await supabase
        .from('Nannuru_articles_table')
        .select('*');

      if (error) {
        console.error("Supabase error fetching articles:", error);
      }

      set({ articles: data || [] });
    } catch (err: any) {
      console.error('❌ Fetching articles failed:', err.message || err);
      set({ articles: [] });
    }
  },
  fetchProfiles: async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) {
        console.error("Supabase error fetching profiles:", error);
      }
      set({ profiles: data || [] });
    } catch (err: any) {
      console.error('❌ Fetching profiles failed:', err.message || err);
    }
  },
  matchAuthors: () => {
    const { articles, profiles } = get();
    const articlesWithAuthors = articles.map((article) => {
      const author = profiles.find((profile) => profile.id === article.user_id);
      return { ...article, author };
    });
    set({ articles: articlesWithAuthors });
  },
}));