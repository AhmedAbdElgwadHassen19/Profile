"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // اللينكات الأساسية للموقع
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/services" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    // الحاوية الخارجية: ثابتة فوق، وتتوسط الشاشة
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-[100] hidden md:flex justify-center px-4 pointer-events-none"
    >
      <div className="w-full max-w-2xl relative">
        {/* النافبار نفسه: واخد عرض محدد، حواف دائرية، وشفافية */}
        <nav className="pointer-events-auto relative z-[101] w-full rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl px-6 py-3 flex items-center justify-between transition-all duration-300">
          
          {/* اللوجو أو الاسم */}
          <Link href="/" className="text-slate-100 font-bold text-lg tracking-wider flex items-center gap-1 group">
            Eng/Ahmed
          </Link>

          {/* لينكات التصفح (على الديسكتوب) */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
             {/* زرار الموبايل (Hamburger) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white pointer-events-auto transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* زرار التواصل السريع (على الديسكتوب فقط) */}
            <Link
              href="/contact"
              className="hidden md:block text-xs font-bold uppercase tracking-widest text-zinc-950 bg-white px-6 py-2.5 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/5 active:scale-95"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </nav>

        {/* المنيو الخاصة بالموبايل */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 pointer-events-auto md:hidden"
            >
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-lg font-bold text-zinc-200 transition-all active:scale-[0.98]"
                      >
                        {link.name}
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-6 border-t border-white/5"
                >
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="flex items-center justify-center p-4 rounded-2xl bg-indigo-500 text-zinc-200 text-base font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-[0.95] shadow-xl shadow-white/10"
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
