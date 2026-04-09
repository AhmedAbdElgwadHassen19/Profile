"use client";

import { useParams } from "next/navigation";
import { blogPosts, BlogPost } from "@/lib/blogData";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Share2, 
  MessageCircle, 
  ChevronLeft,
  BookOpen,
  Link as LinkIcon,
  Check
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
        <Button asChild><Link href="/blog">العودة للمدونة</Link></Button>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 pb-24 relative" dir="rtl">
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-[100] origin-right"
        style={{ scaleX }}
      />

      {/* Hero Header - Reduced Height */}
      <section className="relative h-[55vh] md:h-[60vh] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover opacity-60 grayscale-[0.2]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </motion.div>

        <div className="container relative z-10 h-full mx-auto px-6 flex flex-col justify-end pb-12 text-right">
          <FadeIn direction="up">
            <Link href="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors group">
                <ChevronLeft className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform scale-x-[-1]" /> العودة للمدونة
            </Link>
            
            <div className="flex items-center gap-3 mb-4 justify-start">
                <span className="px-3 py-1 rounded-full bg-indigo-500 text-[10px] font-black uppercase tracking-widest text-white">
                    {post.categoryAr}
                </span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">
                    {post.readTime}
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight max-w-4xl leading-tight mb-6">
                {post.title}
            </h1>
            
            <div className="flex items-center gap-6 justify-start">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 ring-4 ring-indigo-500/10">
                      <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="text-right">
                      <p className="text-white text-xs font-bold">{post.author.name}</p>
                      <p className="text-zinc-500 text-[9px] uppercase tracking-widest">{post.date}</p>
                   </div>
                </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        
        {/* Sidebar: Social & Stats (Right in RTL) */}
        <aside className="hidden lg:block lg:col-span-1 border-l border-white/5 pl-8">
           <div className="sticky top-32 flex flex-col gap-6 items-center">
              <a href="https://github.com/AhmedAbdElgwadHassen19" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-95">
                 <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/ahmed-abd-elgwad" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-95">
                 <FaLinkedin size={18} />
              </a>
              <button 
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-95 relative"
              >
                 {copied ? <Check size={18} className="text-emerald-500" /> : <LinkIcon size={18} />}
                 {copied && <span className="absolute -top-10 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded">تم النسخ</span>}
              </button>
           </div>
        </aside>

        {/* Article Body (Middle) */}
        <article className="lg:col-span-8 text-right">
           <FadeIn direction="up">
              <div className="prose prose-invert prose-zinc max-w-none">
                 <p className="text-lg leading-relaxed text-zinc-300 font-light mb-10 italic border-r-4 border-indigo-500 pr-8">
                    {post.excerpt}
                 </p>
                 
                 <div className="text-zinc-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap space-y-6 font-light">
                    {post.content}
                 </div>
              </div>

              {/* Tags Area */}
              <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">المصادر:</span>
                    <a href="#" className="text-xs font-bold text-indigo-400 hover:underline">المدونة الرسمية</a>
                    <span className="text-zinc-800">•</span>
                    <a href="#" className="text-xs font-bold text-indigo-400 hover:underline">التوثيق التقني</a>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-lg bg-zinc-900 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">تطوير</span>
                    <span className="px-3 py-1 rounded-lg bg-zinc-900 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">ويب</span>
                 </div>
              </div>
           </FadeIn>
        </article>

        {/* Sidebar: Author & Services (Left in RTL) */}
        <aside className="lg:col-span-3">
           <div className="sticky top-32 space-y-8">
              {/* Author Card */}
              <div className="p-6 rounded-[2rem] bg-zinc-900/20 border border-white/5 shadow-xl backdrop-blur-xl text-center">
                 <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 border border-indigo-500/20 shadow-lg -rotate-2">
                       <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                    </div>
                    <h5 className="text-white font-black tracking-tight text-lg mb-1">{post.author.name}</h5>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-4">{post.author.role}</p>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6">
                        شغوف ببناء واجهات مستخدم بكسل-برفكت ومعماريات تقنية قوية.
                    </p>
                    <Button asChild className="w-full h-11 bg-white text-black hover:bg-emerald-500 hover:text-white rounded-xl font-bold transition-all shadow-lg active:scale-95">
                        <Link href="/contact">تواصل معي</Link>
                    </Button>
                 </div>
              </div>

              {/* Recommended Service Card - Replaces Newsletter */}
              <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 group hover:border-indigo-500/40 transition-all">
                 <h6 className="text-white font-bold mb-3 flex items-center gap-2 text-sm justify-center">
                    <Sparkles size={16} className="text-indigo-400" /> خدمة مقترحة
                 </h6>
                 <p className="text-zinc-400 text-[11px] font-light leading-relaxed mb-5 text-center">
                    هل تبحث عن بناء تطبيق ويب فخم مثل هذا؟ يمكنني مساعدتك في تحويل فكرتك إلى واقع.
                 </p>
                 <Button asChild variant="outline" className="w-full border-white/10 hover:bg-indigo-500/10 hover:border-indigo-500/30 text-[11px] font-bold rounded-xl h-10">
                    <Link href="/services">طلب خدمة مخصصة</Link>
                 </Button>
              </div>
           </div>
        </aside>
      </div>

      {/* Suggested Reading */}
      <section className="container mx-auto px-6 mt-24 text-right">
         <div className="flex justify-between items-end mb-10">
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2">استمر في القراءة</h4>
               <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">قد يعجبك <span className="text-zinc-500 italic font-light">أيضاً.</span></h3>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-xs font-bold text-zinc-500 hover:text-white transition-colors group">
                كل المقالات <ArrowRight size={14} className="mr-2 group-hover:-translate-x-1 transition-transform scale-x-[-1]" />
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rPost, idx) => (
              <FadeIn key={rPost.slug} direction="up" delay={idx * 0.1}>
                 <Link href={`/blog/${rPost.slug}`} className="group block">
                    <div className="bg-zinc-900/10 border border-white/5 rounded-[1.5rem] overflow-hidden hover:bg-zinc-900/20 hover:border-indigo-500/20 transition-all duration-500">
                       <div className="relative h-44 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                          <Image src={rPost.coverImage} alt={rPost.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                       </div>
                       <div className="p-6">
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-2 block">{rPost.categoryAr}</span>
                          <h5 className="text-white font-bold group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug text-sm">{rPost.title}</h5>
                       </div>
                    </div>
                 </Link>
              </FadeIn>
            ))}
         </div>
      </section>
    </main>
  );
}

import { Sparkles } from "lucide-react";
