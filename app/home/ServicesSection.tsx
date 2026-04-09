"use client";

import { motion } from "framer-motion";
import { Laptop, Layout, Gauge, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

const services = [
  {
    title: "Web Development",
    description: "Building fast, SEO-friendly websites using modern frameworks like Next.js and React.",
    icon: <Laptop className="w-8 h-8 text-indigo-500" />,
    features: ["Next.js 15", "TypeScript", "Vercel Deployment"]
  },
  {
    title: "UI/UX to Code",
    description: "Transforming high-fidelity designs into pixel-perfect, responsive web interfaces.",
    icon: <Layout className="w-8 h-8 text-emerald-500" />,
    features: ["Tailwind CSS", "Framer Motion", "Pixel Perfect"]
  },
  {
    title: "Performance Optimization",
    description: "Optimizing website speed and Core Web Vitals to ensure the best user experience.",
    icon: <Gauge className="w-8 h-8 text-purple-500" />,
    features: ["Lighthouse 100", "Image Optimization", "Clean Code"]
  },
  {
    title: "E-commerce Solutions",
    description: "Developing secure and scalable online stores with seamless payment integrations.",
    icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
    features: ["Stripe Integration", "Product CMS", "Inventory Tracking"]
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-zinc-950 py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-20">
          <FadeIn direction="up">
            <h2 className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-4">02. Services</h2>
            <h3 className="text-3xl md:text-7xl font-black text-white tracking-tighter mb-6">
              Core <span className="text-zinc-500 italic font-light">Solutions.</span>
            </h3>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light">
              Specialized in delivering high-end digital products with a focus on clean architecture and stunning design.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" className="h-full">
              <div className="group h-full p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900/80 transition-all duration-500 backdrop-blur-xl flex flex-col items-start shadow-2xl">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                  {service.icon}
                </div>
                
                <h4 className="text-white font-bold text-2xl mb-4 group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h4>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 w-full">
                  {service.features.map((feat) => (
                    <span key={feat} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 text-zinc-500 group-hover:text-indigo-300 transition-colors">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-20 text-center">
          <FadeIn direction="up" delay={0.4}>
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95 group"
            >
              Explore All Services
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
