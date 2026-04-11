"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User, Briefcase, BookOpen, Layers } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Services", href: "/services", icon: Layers },
];

export default function BottomTabNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-6 pb-6 pointer-events-none">
      <div className="mx-auto max-w-sm h-16 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-center justify-around px-2 pointer-events-auto relative">
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative flex-1 flex justify-center items-center h-full">
              <div className="flex flex-col items-center justify-center transition-all duration-300">
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      layoutId="activeTabGlow"
                      className="w-10 h-10 bg-indigo-500/20 blur-xl rounded-full"
                    />
                    <motion.div
                      layoutId="activeTabIcon"
                      className="absolute -top-8 flex flex-col items-center"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* The Raised Icon with a solid border and shadow */}
                      <div className="w-14 h-14 bg-zinc-900 border-[3px] border-indigo-500 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(79,70,229,0.3)] relative overflow-hidden group">
                         <div className="absolute inset-0 bg-indigo-500 opacity-10 group-active:opacity-20 transition-opacity" />
                         <Icon className="w-6 h-6 text-indigo-400" />
                      </div>
                      
                      {/* Label under the raised icon */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-black text-indigo-400 mt-2 uppercase tracking-[0.1em]"
                      >
                        {item.name}
                      </motion.span>
                    </motion.div>
                  </div>
                )}
                
                {!isActive && (
                  <motion.div 
                    whileTap={{ scale: 0.9 }}
                    className="p-3 opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <Icon className="w-6 h-6 text-zinc-400" />
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
