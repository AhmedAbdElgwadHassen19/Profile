"use client";

import { motion } from "framer-motion";
import { Download, FileText, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";

export default function ResumePage() {
  const resumeUrl = "/Ahmed_Next&Reactjs.pdf";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 py-24 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container max-w-5xl relative z-10 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <FadeIn direction="left">
            <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              My <span className="text-indigo-500 italic">Resume.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-md font-light">
              Professional summary and technical expertise. Available for new opportunities.
            </p>
          </FadeIn>

          <FadeIn direction="right" className="flex gap-4 w-full md:w-auto">
            <Button asChild className="flex-1 md:flex-none h-14 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-white rounded-2xl px-8 font-bold gap-3 shadow-xl active:scale-95 transition-all">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} className="text-indigo-400" /> Full View
              </a>
            </Button>
            <Button asChild className="flex-1 md:flex-none h-14 bg-white text-zinc-950 hover:bg-indigo-600 hover:text-white rounded-2xl px-8 font-bold gap-3 shadow-xl active:scale-95 transition-all group">
              <a href={resumeUrl} download="Ahmed_Abdelgwad_CV.pdf">
                <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> Download
              </a>
            </Button>
          </FadeIn>
        </div>

        {/* Viewer Container */}
        <FadeIn direction="up" delay={0.2} className="relative group">
          {/* Decorative frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden aspect-[1/1.414] md:aspect-auto md:h-[1100px] shadow-2xl">
            
            {/* Mobile View Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center md:hidden bg-zinc-950/60 z-10 backdrop-blur-sm">
                <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                    <FileText className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Preview on Mobile</h3>
                <p className="text-zinc-500 mb-8 max-w-xs leading-relaxed font-light text-sm">
                    Most mobile browsers don&apos;t support direct PDF embedding. Click below for a perfect viewing experience.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Button asChild className="h-14 bg-indigo-600 text-white rounded-2xl font-bold active:scale-95 transition-transform shadow-lg shadow-indigo-600/20">
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                            View Full PDF
                        </a>
                    </Button>
                    <Button asChild className="h-14 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-bold active:scale-95 transition-transform">
                        <a href={resumeUrl} download>
                            Download Direct
                        </a>
                    </Button>
                </div>
            </div>

            {/* Desktop Iframe */}
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="hidden md:block w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
              title="Ahmed Abdelgwad CV"
            />
          </div>
        </FadeIn>

        {/* Bottom Badge */}
        <FadeIn direction="up" delay={0.4} className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <Sparkles size={12} className="text-indigo-500" />
                Last updated: April 2024
            </div>
        </FadeIn>
      </div>
    </main>
  );
}
