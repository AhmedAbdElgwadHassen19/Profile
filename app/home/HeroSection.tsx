"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"; // مسار Shadcn
import { Badge } from "@/components/ui/badge";   // مسار Shadcn (أضف هذا المكون)
import { ArrowRight, Zap, ExternalLink, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

// أيقونات التكنولوجيا للشريط المتحرك
const techStack = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI", "Node.js", "Git"
];

// ==========================================
// 1. كومبوننت للكروت التفاعلية (Tilt Effect)
// ==========================================
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  hasGlow?: boolean; // خاصية جديدة لتفعيل التوهج الخلفي وراء الكارت
}

function BentoCard({ children, className = "", hasGlow = false }: BentoCardProps) {
  // قيم لحركة الماوس
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // تحويل حركة الماوس لزوايا دوران خفيفة (Tilt)
  const rotateX = useTransform(y, [-300, 300], [7, -7]);
  const rotateY = useTransform(x, [-300, 300], [-7, 7]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className={`relative ${className}`}>
      {/* النور اللي وراء الديف (يظهر فقط إذا كان hasGlow مفعل) */}
      {hasGlow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl -z-10 rounded-[3rem]" />
      )}

      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          perspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full h-full rounded-[2.5rem] border border-white/10 bg-zinc-950/80 p-6 md:p-10 shadow-2xl overflow-hidden group backdrop-blur-xl"
      >
        {/* تأثير ضوئي خفيف يتبع الماوس داخل البوكس */}
        <div className="absolute inset-0 bg-[radial-gradient(500px_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// 2. الكومبوننت الأساسي للهيرو سيكشن
// ==========================================
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-zinc-950 text-slate-300 px-6 py-20 md:py-32 overflow-hidden">

      {/* تأثير خلفية Glow عام هادي جداً */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* حاوية الـ Bento Grid */}
      <div className="container relative z-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto max-w-7xl">

        {/* المربع الأول - الاسم والوظيفة (توهج مفعل) */}
        <BentoCard className="md:col-span-2" hasGlow={true}>
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:gap-10">
            <FadeIn direction="down" delay={0.1}>
              <p className="text-indigo-400 text-xs md:text-base font-semibold tracking-widest uppercase flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Building the Future of the Web
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-[80px] font-black tracking-tighter text-white leading-[1.1] flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
                <span>Ahmed</span> <span>Abdelgwad</span>
              </h1>
              <h2 className="text-xl md:text-4xl font-medium text-zinc-400">
                Frontend & <span className="text-white font-semibold italic">React Specialist</span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-zinc-400 max-w-xl text-sm md:text-xl leading-relaxed font-light">
                I transform complex ideas into seamless digital experiences. Highly focused on building fast, responsive, and interactive web applications with clean code.
              </p>
            </FadeIn>
          </div>
        </BentoCard>

        {/* المربع التاني - الصورة الشخصية (بدون توهج خارجي عشان ما يكونش أوفر) */}
        <BentoCard className="md:aspect-auto">
          <FadeIn direction="none" delay={0.4} className="relative w-full h-full flex flex-col items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full" />

            <div className="relative w-48 h-48 md:w-64 md:h-64 bg-zinc-900 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/my.jpg"
                alt="Ahmed Abdelgwad"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </FadeIn>
        </BentoCard>

        {/* المربع التالت - الحالة والخبرة */}
        <BentoCard>
          <div className="flex flex-col justify-center items-center text-center gap-6 h-full min-h-[250px]">
            <FadeIn direction="up" delay={0.5} className="flex flex-col items-center gap-4">
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Available for new projects
              </Badge>
            </FadeIn>

            <FadeIn direction="up" delay={0.6} className="space-y-1">
              <div className="text-7xl font-black tracking-tighter text-white">2+</div>
              <div className="text-base text-zinc-400 font-medium">Years of Professional<br /> Experience</div>
            </FadeIn>
          </div>
        </BentoCard>

        {/* المربع الرابع - الأفعال والتكنولوجيا (توهج مفعل) */}
        <BentoCard className="md:col-span-2" hasGlow={true}>
          <div className="flex flex-col justify-between gap-8 h-full">
            <FadeIn direction="none" delay={0.7} className="w-full relative overflow-hidden group-hover:opacity-80 transition-opacity">
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950/80 to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950/80 to-transparent z-10" />

              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="flex items-center gap-10 whitespace-nowrap pt-2"
              >
                {[...techStack, ...techStack].map((tech, index) => (
                  <span key={index} className="text-sm font-bold tracking-widest uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </FadeIn>

            <FadeIn direction="up" delay={0.8} className="mt-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-20">
                <Button size="lg" className="w-full sm:w-auto bg-white text-zinc-950 hover:bg-zinc-200 group text-base font-bold px-8 h-14 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                  <Link href="/projects">View My Projects</Link>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white bg-transparent text-base font-semibold px-8 h-14 rounded-2xl group transition-all">
                  <Link href="/cv" target="_blank">
                    <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    View CV
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
