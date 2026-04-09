"use client";

import FadeIn from "@/components/animations/FadeIn";
import { Zap, ShieldCheck, Headset } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const values: Value[] = [
  {
    title: "Performance & Quality",
    description: "I build lightning-fast, SEO-optimized applications using clean, scalable, and maintainable code architecture.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "User-Centric Design",
    description: "I bridge the gap between complex logic and intuitive UI to ensure the most engaging experience for your users.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Full Source Ownership",
    description: "You receive the complete source code and all assets, professionally documented for full transparency and future growth.",
    icon: <FaGithub className="w-6 h-6 text-indigo-400" />
  },
  {
    title: "Technical Support",
    description: "Dedicated post-launch support to keep your project running smoothly and handle any future technical needs.",
    icon: <Headset className="w-6 h-6 text-purple-400" />
  }
];

export function WhyMeSection() {
  return (
    <section id="why" className="bg-zinc-950 py-20 md:py-24 lg:py-32 overflow-hidden relative flex flex-col justify-center">
      
      {/* تأثير خلفية مضيئة (Ambient Glow) */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/2" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4">04. Strategy</h2>
          <h3 className="text-3xl md:text-7xl font-black text-white tracking-tighter">
            Why Work <span className="text-zinc-500 italic font-light">With Me?</span>
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {values.map((val, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up" className="h-full">
              <div className="p-8 rounded-[2rem] bg-zinc-900/80 border border-white/10 hover:border-indigo-500/50 hover:bg-zinc-900 transition-all duration-300 group backdrop-blur-xl shadow-[0_0_25px_rgba(99,102,241,0.08)] md:shadow-2xl flex flex-col h-full md:hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 shadow-inner flex items-center justify-center mb-6 max-md:scale-110 max-md:shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                  {val.icon}
                </div>
                <h4 className="text-white font-bold text-xl mb-4 tracking-wide">{val.title}</h4>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light mt-auto">
                  {val.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
