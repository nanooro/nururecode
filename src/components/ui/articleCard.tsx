"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="group bg-card dark:bg-neutral-900 w-[250px] rounded-xl shadow transition-all duration-300 hover:shadow-2xl dark:hover:shadow-none hover:-translate-y-1 m-4 flex-shrink-0"
      aria-label="card-overlay-v3"
    >
      <div className="w-full rounded-t-xl h-[250px] flex-shrink-0 relative overflow-hidden">
        {article.imgUrl ? (
          <Image
            src={article.imgUrl}
            alt="Article card"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-t-xl" />
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="pb-5 mb-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold line-clamp-2 h-[3em] overflow-hidden dark:text-white">
            {article.Heading}
          </h3>
          <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {article.subHeading}
          </span>
        </div>
        <div className="flex items-center justify-between w-full mt-auto">
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-300">
            {article.author?.avatar_url ? (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={article.author.avatar_url}
                  alt={article.author.full_name || "Author Avatar"}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
            )}
            <span>{article.author?.full_name || 'Nannuru'} - {article.date}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-bold text-black dark:text-white">
              {article.view_counter || 0}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}