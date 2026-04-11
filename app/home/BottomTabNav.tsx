"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User, Briefcase, BookOpen, Layers } from "lucide-react";

const navItems = [
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Services", href: "/services", icon: Layers },
];

export default function BottomTabNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-8 pb-6 pointer-events-none">
      <div className="mx-auto max-w-sm h-14 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.4)] flex items-center justify-around px-2 pointer-events-auto relative">
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative flex-1 flex justify-center items-center h-full">
              <div className="flex flex-col items-center justify-center">
                {isActive && (
                  <div className="relative flex flex-col items-center">
                    {/* Subtle Glow background */}
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -top-4 w-10 h-10 bg-indigo-500/10 blur-md rounded-full"
                    />
                    
                    <motion.div
                      layoutId="activeTabIcon"
                      className="relative z-10 -mt-8 flex flex-col items-center"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-xl">
                        <Icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <motion.span 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[8px] font-bold text-indigo-400 mt-1 uppercase tracking-widest"
                      >
                        {item.name}
                      </motion.span>
                    </motion.div>
                  </div>
                )}
                
                {!isActive && (
                  <motion.div 
                    whileTap={{ scale: 0.9 }}
                    className="p-2 opacity-30"
                  >
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </motion.div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
