"use client";

import FadeIn from "@/components/animations/FadeIn";
import ContactForm from "@/components/ContactForm";
import { Mail, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-10 lg:space-y-12">
            <FadeIn direction="left">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
                Let's Work <span className="text-indigo-400 italic">Together.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg max-w-lg leading-relaxed font-light">
                Have a project idea? Let's bring it to life! I provide custom web development and premium frontend solutions tailored for your needs.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <FadeIn direction="up" delay={0.2}>
                <a href="mailto:aa1019914@gmail.com" className="block p-6 rounded-3xl bg-zinc-900/80 border border-white/5 hover:border-indigo-500/30 transition-colors duration-300 group h-full">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg">
                    <Mail size={22} />
                  </div>
                  <h4 className="text-white font-bold text-lg tracking-wide mb-1">Email directly</h4>
                  <p className="text-zinc-500 text-sm">aa1019914@gmail.com</p>
                </a>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <a href="https://wa.me/201201302871" target="_blank" rel="noreferrer" className="block p-6 rounded-3xl bg-zinc-900/80 border border-white/5 hover:border-emerald-500/30 transition-colors duration-300 group h-full">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                    <MessageSquare size={22} />
                  </div>
                  <h4 className="text-white font-bold text-lg tracking-wide mb-1">Live Chat</h4>
                  <p className="text-zinc-500 text-sm">Available on WhatsApp</p>
                </a>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.4} className="pt-4">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase mb-4">Find Me On</p>
              <div className="flex gap-4">
               <a href="https://github.com/AhmedAbdElgwadHassen19" target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                 <FaGithub size={22} />
               </a>
               <a href="https://www.linkedin.com/in/ahmed-abd-elgwad" target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-[#0A66C2] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] transition-all duration-300">
                 <FaLinkedin size={22} />
               </a>
               <a href="https://khamsat.com/programming/custom-website-development/2959182" target="_blank" rel="noreferrer" title="Khamsat" className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-[#1dbfa0] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(29,191,160,0.5)] transition-all duration-300 group overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,191,160,0.4)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="font-extrabold text-2xl group-hover:scale-110 transition-transform relative z-10 font-sans">5</span>
               </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="right" delay={0.2} className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl -z-10 rounded-[3rem]" />
            <div className="bg-zinc-950/80 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative backdrop-blur-xl">
              <ContactForm />
            </div>
          </FadeIn>

        </div>
      </div>
    </main>
  );
}
