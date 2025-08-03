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
  const articlesRef = useRef<HTMLDivElement>(null);

  const articles = [
    {
      id: 1,
      Heading: "ಒಂದೆ ವಧುವನ್ನು ವರಿಸಿದ ಸಹೋದರರು",
      subHeading: "ಹಿಮಾಚಲ ಪ್ರದೇಶದ ಒಂದು ಬುಡಕಟ್ಟು ಜನಾಂಗದಲ್ಲಿ ಇಂದಿಗೂ ಈ ವಿಚಿತ್ರ ಪದ್ಧತಿ ಜಾರಿಯಲ್ಲಿದೆ.",
      imgUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      created_at: "2025-07-21T12:00:00Z",
      user_id: "1",
      view_count: 100,
    },
    {
      id: 2,
      Heading: "ನೀರು ಕುಡಿಸಲು ಹೋದ ಕುರಿಗಾಹಿಗಳ ಮೇಲೆ ಹಲ್ಲೆ...?",
      subHeading: "ಕೊಪ್ಪಳದಲ್ಲಿ ಜಾನುವಾರುಗಳಿಗೆ ನೀರು ಕುಡಿಸಲು ಹೋದ ಕುರಿಗಾಹಿಗಳ ಮೇಲೆ ಕಂಪನಿಯ ಸಿಬ್ಬಂದಿ ಹಲ್ಲೆ ನಡೆಸಿದ್ದಾರೆ ಎಂದು ಆರೋಪಿಸಲಾಗಿದೆ.",
      imgUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      created_at: "2025-07-26T12:00:00Z",
      user_id: "2",
      view_count: 150,
    },
  ];

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
        </motion.div>
      </div>
    </>
  );
}
