"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Search,
  Filter,
  Sparkles
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { blogPosts, BlogPost } from "@/lib/blogData";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredPosts = blogPosts.slice(0, 3);
  
  // Dynamic categories extraction
  const categoriesAr = ["الكل", ...Array.from(new Set(blogPosts.map(post => post.categoryAr)))];

  const filteredPosts = activeCategory === "الكل" 
    ? blogPosts 
    : blogPosts.filter(post => post.categoryAr === activeCategory);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to results
    const element = document.getElementById("blog-listing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 pb-24" dir="rtl">
      
      {/* 1. Featured Slider Section - Reduced Height */}
      <section className="relative h-[60vh] md:h-[65vh] w-full overflow-hidden border-b border-white/5">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image 
              src={featuredPosts[currentSlide].coverImage} 
              alt={featuredPosts[currentSlide].title}
              fill
              className="object-cover opacity-40 grayscale-[0.3]"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container relative z-10 h-full mx-auto px-6 flex flex-col justify-center text-right">
          <div className="max-w-3xl mr-0">
            <FadeIn key={`title-${currentSlide}`} direction="right">
               <div className="flex items-center gap-2 mb-6 justify-start">
                 <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                   مقال مميز
                 </span>
                 <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                   {featuredPosts[currentSlide].categoryAr}
                 </span>
               </div>
               
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                 {featuredPosts[currentSlide].title}
               </h2>
               
               <p className="text-zinc-400 text-base md:text-lg font-light mb-8 line-clamp-2 max-w-2xl italic">
                 {featuredPosts[currentSlide].excerpt}
               </p>

               <div className="flex flex-wrap items-center gap-6">
                 <Button asChild size="lg" className="bg-white text-black hover:bg-indigo-600 hover:text-white rounded-2xl h-12 px-8 font-bold transition-all active:scale-95 shadow-2xl">
                   <Link href={`/blog/${featuredPosts[currentSlide].slug}`}>اقرأ المزيد</Link>
                 </Button>
                 
                 <div className="flex items-center gap-4 border-r border-white/10 pr-6 py-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                        <img src={featuredPosts[currentSlide].author.image} alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-white text-xs font-bold">{featuredPosts[currentSlide].author.name}</p>
                        <p className="text-zinc-500 text-[9px] uppercase tracking-widest">{featuredPosts[currentSlide].author.role}</p>
                    </div>
                 </div>
               </div>
            </FadeIn>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-10 left-6 md:left-12 z-20 flex items-center gap-4">
           {featuredPosts.map((_, idx) => (
             <button 
               key={idx} 
               onClick={() => setCurrentSlide(idx)}
               className={`w-12 h-1 transition-all duration-500 rounded-full ${currentSlide === idx ? 'bg-indigo-500 w-16' : 'bg-white/10'}`}
             />
           ))}
        </div>
      </section>

      {/* 2. Listing & Filters Section */}
      <section id="blog-listing" className="container mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <FadeIn direction="up">
             <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight italic">
               أحدث <span className="text-zinc-500 non-italic">المقالات.</span>
             </h3>
           </FadeIn>

           {/* Categories Filter */}
           <FadeIn direction="up" delay={0.1} className="flex flex-wrap gap-2">
              {categoriesAr.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-bold transition-all border ${
                    activeCategory === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-zinc-900 text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </FadeIn>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {currentPosts.map((post, index) => (
             <FadeIn key={post.slug} direction="up" delay={index * 0.1}>
               <Link href={`/blog/${post.slug}`} className="group block h-full">
                 <div className="relative h-full flex flex-col bg-zinc-900/10 border border-white/5 rounded-[2rem] overflow-hidden hover:bg-zinc-900/30 hover:border-indigo-500/20 transition-all duration-500">
                    
                    {/* Image Area - Reduced height */}
                    <div className="relative h-56 overflow-hidden">
                       <Image 
                         src={post.coverImage} 
                         alt={post.title}
                         fill
                         className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       />
                       <div className="absolute top-4 right-4">
                         <span className="px-3 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
                           {post.categoryAr}
                         </span>
                       </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow text-right">
                       <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-4 justify-start">
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                       </div>

                       <h4 className="text-xl font-black text-white tracking-tight mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                         {post.title}
                       </h4>

                       <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                          {post.excerpt}
                       </p>

                       <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
                          <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
                                <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                             </div>
                             <span className="text-[11px] font-bold text-zinc-400">{post.author.name}</span>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition-all scale-x-[-1]">
                             <ArrowRight size={14} />
                          </div>
                       </div>
                    </div>
                 </div>
               </Link>
             </FadeIn>
           ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-500 hover:bg-white/5 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-12 h-12 rounded-2xl border text-xs font-black transition-all duration-300 ${
                    currentPage === number
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-110"
                      : "border-white/5 text-zinc-500 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {String(number).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-500 hover:bg-white/5 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
      </section>

      {/* 3. Newsletter Section - Translated */}
      <FadeIn direction="up" className="container mx-auto px-6 mt-24 text-right">
        <div className="p-10 md:p-16 rounded-[3rem] bg-zinc-900/30 border border-white/5 relative overflow-hidden text-center group">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
           <Sparkles className="w-10 h-10 text-indigo-500/20 mx-auto mb-6 animate-pulse" />
           <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4 relative z-10">
             هل تريد <span className="text-indigo-400">تطوير</span> مهاراتك؟
           </h3>
           <p className="text-zinc-500 text-base max-w-xl mx-auto mb-8 relative z-10 font-light italic">
             تابع رحلتي في هندسة الويب وتصميم الواجهات الفخمة. لنبني المستقبل سوياً.
           </p>
           <Button className="bg-white text-black hover:bg-indigo-600 hover:text-white rounded-xl h-12 px-10 text-sm font-bold relative z-10 active:scale-95 transition-all shadow-xl">
             استكشاف كافة المصادر
           </Button>
        </div>
      </FadeIn>
    </main>
  );
}
    
