"use client";

import { 
  ArrowLeft, 
  ShoppingCart, 
  GraduationCap, 
  Home as HomeIcon, 
  LayoutDashboard, 
  Globe, 
  Users,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";

const detailedServices = [
  {
    title: "E-Commerce Platforms",
    subtitle: "High-conversion online stores",
    description: "Developing robust e-commerce solutions with custom cart systems, payment gateways, and inventory management.",
    icon: <ShoppingCart className="w-10 h-10 text-orange-500" />,
    features: ["Secure Checkout", "Inventory Sync", "Mobile-first Design"],
    popular: true
  },
  {
    title: "E-Learning Systems",
    subtitle: "Scalable educational hubs",
    description: "Building interactive dashboards for instructors and students, including progress tracking and video integration.",
    icon: <GraduationCap className="w-10 h-10 text-blue-500" />,
    features: ["Course Management", "User Progress", "Quiz Modules"],
    popular: true
  },
  {
    title: "Real Estate Portals",
    subtitle: "Modern property management",
    description: "Clean, filterable platforms for property listings with advanced search and map integrations.",
    icon: <HomeIcon className="w-10 h-10 text-emerald-500" />,
    features: ["Advanced Filters", "Map Integration", "Lead Gen Forms"],
    popular: false
  },
  {
    title: "SaaS & Admin Panels",
    subtitle: "Data-driven dashboards",
    description: "Creating complex administrative interfaces with data visualization and user management systems.",
    icon: <LayoutDashboard className="w-10 h-10 text-purple-500" />,
    features: ["Dynamic Charts", "Role-based Access", "Fast Performance"],
    popular: true
  },
  {
    title: "Corporate Landing Pages",
    subtitle: "Premium brand experiences",
    description: "Crafting high-end landing pages that tell your story and convert visitors into loyal clients.",
    icon: <Globe className="w-10 h-10 text-indigo-500" />,
    features: ["SEO Optimized", "GSAP Animations", "Perfect UI"],
    popular: false
  },
  {
    title: "Community & Social",
    subtitle: "Interactive user platforms",
    description: "Building networking sites with user profiles, feeds, and real-time interaction capabilities.",
    icon: <Users className="w-10 h-10 text-pink-500" />,
    features: ["User Profiles", "Real-time Chat", "Media Sharing"],
    popular: false
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn direction="up">
          <Link href="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-12 transition-all group font-medium">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
          
          <div className="mb-14">
            <h1 className="text-4xl md:text-4xl font-black text-white tracking-tighter mb-6 italic">
              Specialized  
              <span className="text-zinc-500 non-italic text-4xl md:text-4xl"> Solutions.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed font-light">
              Focused development services for high-demand sectors, prioritizing performance and exceptional UX.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedServices.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1} direction="up">
              <div className="relative group transition-all duration-700 h-full">
                <div className="h-full p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900/50 transition-all duration-500 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden">
                  
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-6 right-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                      <Sparkles size={10} className="animate-pulse" /> Popular
                    </div>
                  )}

                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
                    {service.icon}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-white font-extrabold text-2xl mb-1 group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-zinc-400 text-base leading-relaxed mb-8 flex-grow font-light">
                    {service.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        <CheckCircle2 size={14} className="text-indigo-500/40 group-hover:text-indigo-500" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-10">
                    <Button asChild className="w-full h-12 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg">
                      <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>Inquire Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Closing Banner */}
        <FadeIn direction="up" delay={0.4} className="mt-20 relative px-4">
          {/* خلفية مضيئة خلف البانر (Light behind) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
          
          <div className="p-12 md:p-20 rounded-[3rem] bg-zinc-900/40 border border-white/5 text-center relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.05)] group backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 relative z-10">
              NEED A <span className="text-indigo-400">CUSTOM</span> SOLUTION?
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-10 relative z-10 font-light italic">
              Let&apos;s build something unique tailored to your specific business logic and design vision.
            </p>
            
            <Button asChild size="lg" className="bg-white text-black hover:bg-indigo-600 hover:text-white rounded-xl h-16 px-12 text-lg font-black relative z-10 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]">
              <Link href="/contact?service=Custom%20Project">LET&apos;S DISCUSS</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
