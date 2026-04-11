"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[100]">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgb(79, 70, 229)" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/80 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" strokeWidth={3} />
            
            {/* Ambient Glow behind button */}
            <div className="absolute -z-10 h-full w-full rounded-full bg-indigo-500/40 blur-xl animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
