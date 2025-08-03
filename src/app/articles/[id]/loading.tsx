"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Title Skeleton */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
        {/* Subheading Skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-8 animate-pulse" />

        {/* Image Skeleton */}
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 animate-pulse" />

        {/* Content Skeletons */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
