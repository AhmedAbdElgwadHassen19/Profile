"use client";

import FadeIn from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, Code2, Sparkles, Terminal } from "lucide-react";

// 1. تعريف أنواع البيانات
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools";
}

const experiences: Experience[] = [
  {
    company: "H2M - Cairo",
    role: "Front-End Developer",
    period: "Sept 2024 - June 2025",
    description: "Built high-performance web interfaces and optimized user experiences for diverse clients."
  },
  {
    company: "Freelance",
    role: "Software Developer",
    period: "May 2024 - Present",
    description: "Developing custom web solutions, including real estate apps and interactive platforms for global clients."
  }
];

const skills: Skill[] = [
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "Git/GitHub", category: "Tools" },
  { name: "Shadcn UI", category: "Tools" }
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-zinc-950 flex items-center py-16 px-6 overflow-hidden">
      {/* تأثير خلفية مضيئة (Ambient Glow) */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        
        {/* عنوان القسم */}
        <FadeIn direction="up" className="mb-12 md:mb-16">
          <h2 className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4">02. Discovery</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            The Person <span className="text-zinc-500 font-light italic">Behind the Code.</span>
          </h3>
        </FadeIn>

        {/* شبكة Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. السرد القصصي (The Narrative) - واخد 7 أعمدة */}
          <Card className="md:col-span-7 bg-zinc-900/80 border-white/10 p-8 flex flex-col justify-between overflow-hidden relative group backdrop-blur-xl rounded-[2rem] shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Terminal size={20} />
                </div>
                <span className="text-zinc-300 font-bold tracking-wide">My Philosophy</span>
              </div>
              <p className="text-xl md:text-3xl text-zinc-400 leading-relaxed font-light">
                I don&apos;t just write code; I craft <span className="text-white font-bold">digital ecosystems</span>. 
                With over 2 years of experience, I focus on the bridge between 
                <span className="text-indigo-400 italic"> aesthetic design</span> and <span className="text-indigo-400 italic"> technical performance</span>.
              </p>
            </div>
            <div className="mt-10 flex gap-4">
              <div className="text-center p-6 rounded-3xl bg-zinc-950 border border-white/5 flex-1 shadow-inner">
                <p className="text-3xl font-black text-white">2+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-bold">Years Exp.</p>
              </div>
              <div className="text-center p-6 rounded-3xl bg-zinc-950 border border-white/5 flex-1 shadow-inner">
                <p className="text-3xl font-black text-white">15+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-bold">Projects</p>
              </div>
            </div>
          </Card>

          {/* 2. التعليم (Education) - واخد 5 أعمدة */}
          <Card className="md:col-span-5 bg-zinc-900/80 border-white/10 p-8 flex flex-col justify-center text-center group backdrop-blur-xl rounded-[2rem] shadow-2xl">
            <div className="mx-auto w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <h4 className="text-white text-2xl font-bold mb-2">Academic Foundation</h4>
            <p className="text-indigo-400 font-medium text-sm mb-6">Diploma in Software Engineering Essentials</p>
            <div className="h-[1px] w-20 bg-white/10 mx-auto mb-6" />
            <p className="text-zinc-500 text-sm italic font-light leading-relaxed px-4">Continuous learner, always exploring the latest in Computer Science and Web Performance.</p>
          </Card>

          {/* 3. الخبرة العملية (Work History) - واخد 5 أعمدة */}
          <Card className="md:col-span-5 bg-zinc-900/80 border-white/10 p-8 backdrop-blur-xl rounded-[2rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Briefcase size={20} />
              </div>
              <h4 className="text-white font-bold text-xl tracking-wide">Experience</h4>
            </div>
            <div className="space-y-10 relative">
              {/* الخط المنور وراء الخبرات */}
              <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-indigo-500 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
              
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-[-2px] top-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                  <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-2">{exp.period}</p>
                  <h5 className="text-white font-bold text-xl leading-tight mb-1">{exp.role}</h5>
                  <p className="text-zinc-400 text-sm font-medium">{exp.company}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* 4. الـ Tech Stack - واخد 7 أعمدة */}
          <Card className="md:col-span-7 bg-zinc-900/80 border-white/10 p-8 overflow-hidden backdrop-blur-xl rounded-[2rem] shadow-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Code2 size={20} />
              </div>
              <h4 className="text-white font-bold text-xl tracking-wide">Toolkit</h4>
            </div>
            <div className="flex flex-wrap gap-3 flex-1 items-start content-start">
              {skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="px-5 py-2.5 rounded-2xl bg-zinc-950 border border-white/5 text-zinc-300 text-sm font-bold tracking-wide hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white transition-all cursor-default shadow-inner"
                >
                  {skill.name}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase">
                Currently Learning: <br /><span className="text-indigo-400 font-medium lowercase">ai-integrated apps, system design</span>
              </p>
              <p className="text-zinc-500 text-sm sm:text-right italic font-light pt-2 sm:pt-0">Clean code is not an option; it&apos;s a standard.</p>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
