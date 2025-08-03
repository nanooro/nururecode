import { motion } from "framer-motion";

export default function Hero({
  theme,
  articlesRef,
}: {
  theme: string;
  articlesRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handleScroll = () => {
    if (articlesRef.current) {
      articlesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)] py-0 relative">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold">
        News and{" "}
        <span className="inline-block">
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            entertainment
          </span>
          <span className="block h-2 bg-gradient-to-r from-pink-500 to-yellow-500 mt-2"></span>
        </span>
      </h1>
    </div>
  );
}
