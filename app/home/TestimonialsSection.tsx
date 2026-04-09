"use client"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { useState } from "react";

// 1. تعريف نوع البيانات
interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number; // أضفنا التقييم بالنجوم
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Project Manager, UAE",
    content: "Ahmed delivered a solid React dashboard. There was some back-and-forth on the initial UI, but he was very open to feedback and the end result is stable and exceptionally fast.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Mohammed Al-Rashid",
    role: "Business Owner, KSA",
    content: "Good communication throughout. The website is responsive and professional. A few minor UI polish details were missed initially, but he fixed them immediately without any issues.",
    image: "https://i.pravatar.cc/150?u=mohammed",
    rating: 4
  },
  {
    name: "Ahmad Al-Fawaz",
    role: "Tech Consultant, Bahrain",
    content: "Strong technical knowledge. He migrated our old stack to Next.js successfully. While I would have liked more documentation, his coding standards are clean and reliable.",
    image: "https://i.pravatar.cc/150?u=ahmad",
    rating: 4
  },
  {
    name: "Rami Khalil",
    role: "Startup Founder, Jordan",
    content: "Very professional workflow. Ahmed delivered the core features exactly on time which was our main priority. His commitment to the deadline was impressive.",
    image: "https://i.pravatar.cc/150?u=rami",
    rating: 5
  },
  {
    name: "Ali Al-Jubouri",
    role: "Digital Specialist, Iraq",
    content: "Excellent collaboration! He explained complex technical parts clearly to our non-tech team members. The project execution was smooth and the final product works perfectly.",
    image: "https://i.pravatar.cc/150?u=ali",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="bg-zinc-950 py-20 md:py-24 lg:py-32 flex flex-col justify-center overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/2" />

      <div className="container relative z-10 mx-auto px-6 mb-16 text-center">
        <FadeIn direction="up">
          <h2 className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 text-center">03. Feedback</h2>
          <h3 className="text-3xl md:text-7xl font-black text-white tracking-tighter">
            Real Reviews <span className="text-zinc-500 italic font-light">Real Results.</span>
          </h3>
          <p className="mt-6 text-zinc-500 max-w-lg mx-auto uppercase tracking-widest text-xs font-bold font-mono">
            Constructive feedback from professional collaborations
          </p>
        </FadeIn>
      </div>

      <div className="relative flex flex-col gap-10 z-10">
        <InfiniteMarquee items={testimonials} direction="left" speed={40} />
        <InfiniteMarquee items={[...testimonials].reverse()} direction="right" speed={50} />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-zinc-950 to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-zinc-950 to-transparent z-20"></div>
      </div>
    </section>
  );
}

// ==========================================
// كومبوننت الـ Marquee المتحرك التفاعلي
// ==========================================
interface MarqueeProps {
  items: Testimonial[];
  direction: "left" | "right";
  speed: number;
}

function InfiniteMarquee({ items, direction, speed }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (isHovered || isDragging) return;
    const moveBy = direction === "left" ? -1 : 1;
    const speedMultiplier = 50 / speed;
    baseX.set(baseX.get() + moveBy * speedMultiplier * (delta / 1000));
  });

  return (
    <div className="flex w-full overflow-hidden group cursor-grab active:cursor-grabbing">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPanStart={() => setIsDragging(true)}
        onPanEnd={() => setIsDragging(false)}
        onPan={(e, info) => {
          const deltaPercent = (info.delta.x / window.innerWidth) * 25;
          baseX.set(baseX.get() + deltaPercent);
        }}
        style={{ x }}
        className="flex flex-nowrap gap-6 pr-6 w-max"
      >
        {[...items, ...items, ...items, ...items].map((t, idx) => (
          <Card
            key={idx}
            className="w-[300px] md:w-[360px] shrink-0 bg-zinc-900/80 border-white/10 p-6 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all duration-500 group/card backdrop-blur-xl rounded-[1.8rem] shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] select-none flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <Quote className="w-6 h-6 text-indigo-500/20 group-hover/card:text-indigo-500/50 transition-colors duration-500" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={`${i < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-700'}`} 
                  />
                ))}
              </div>
            </div>
            
            <p className="text-zinc-300 text-[15px] leading-relaxed mb-4 font-light cursor-text">
              &quot;{t.content}&quot;
            </p>
            
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10 pointer-events-none">
                <img src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide pointer-events-none">{t.name}</h4>
                <p className="text-zinc-500 text-[10px] font-medium tracking-widest uppercase mt-0.5 pointer-events-none">{t.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
