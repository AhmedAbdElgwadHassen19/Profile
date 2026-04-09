"use client";

import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-28 pb-12 px-6 relative overflow-hidden">

      {/* تأثير الإضاءة السفلية (Bottom Glow) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[150px] rounded-t-full pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[200px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-16 md:gap-8 mb-24">

          {/* Brand & Mission */}
          <div className="space-y-6 md:col-span-5">
            <h2 className="text-4xl font-black text-white tracking-tighter">
              ENG / Ahmed<span className="text-emerald-500">.</span>
            </h2>
            <p className="text-zinc-400 max-w-sm text-base md:text-lg leading-relaxed font-light">
              Crafting premium, high-performance web applications. I bridge the gap between complex logic and stunning visual aesthetics.
            </p>
            <div className="pt-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-300 text-sm font-medium tracking-wide">Available for freelance opportunities</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-5 md:col-span-3 lg:col-span-4 md:pl-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">Explore</h3>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-zinc-300 hover:text-emerald-400 transition-colors text-sm font-medium w-fit flex items-center gap-3 group/link">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/link:border-emerald-500/30 transition-colors">
                  <span className="text-[10px]">🏠</span>
                </span>
                Home Space
              </Link>
              <Link href="/projects" className="text-zinc-300 hover:text-emerald-400 transition-colors text-sm font-medium w-fit flex items-center gap-3 group/link">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/link:border-emerald-500/30 transition-colors">
                  <span className="text-[10px]">💼</span>
                </span>
                Selected Works
              </Link>
              <Link href="/about" className="text-zinc-300 hover:text-emerald-400 transition-colors text-sm font-medium w-fit flex items-center gap-3 group/link">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/link:border-emerald-500/30 transition-colors">
                  <span className="text-[10px]">👤</span>
                </span>
                My Journey
              </Link>
              <Link href="/contact" className="text-zinc-300 hover:text-emerald-400 transition-colors text-sm font-medium w-fit flex items-center gap-3 group/link">
                <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/link:border-emerald-500/30 transition-colors">
                  <span className="text-[10px]">📩</span>
                </span>
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Connect & Social */}
          <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-3 items-start md:items-end">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold align-right">Connect</h3>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href="https://github.com/AhmedAbdElgwadHassen19" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ahmed-abd-elgwad" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="https://wa.me/201201302871" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                <MessageCircle size={20} />
              </a>
              <a href="mailto:aa1019914@gmail.com"
                className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300">
                <Mail size={20} />
              </a>
            </div>

            {/* زرار خمسات مخصص مع إضاءة دائمة */}
            <a href="https://khamsat.com/programming/custom-website-development/2959182" target="_blank" rel="noopener noreferrer"
              className="mt-2 group flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500">
              <span className="text-emerald-400 font-bold text-sm tracking-wide transition-colors">Hire me on Khamsat</span>
              <ExternalLink size={16} className="text-emerald-500/60 group-hover:text-emerald-400 transition-colors" />
            </a>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-zinc-300 text-sm font-bold tracking-wide">
              © {currentYear} Ahmed Abdelgwad.
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Based in Egypt <span className="mx-2 text-zinc-700">•</span> Building globally.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <p className="text-emerald-500/80 text-[10px] uppercase tracking-[0.3em] font-bold">
              Premium UI/UX
            </p>
            <div className="h-1 w-1 rounded-full bg-zinc-800" />
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-medium">
              Next.js
            </p>
            <div className="h-1 w-1 rounded-full bg-zinc-800" />
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-medium">
              Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
