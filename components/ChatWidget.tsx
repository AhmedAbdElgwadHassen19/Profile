"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "model" | "system";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize chat from localStorage or add welcome message
  useEffect(() => {
    const savedMessages = localStorage.getItem("portfolio_chat_history");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse chat history:", e);
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []);

  // Save chat to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("portfolio_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  // Show a notification animation if a new message arrives and chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "model") {
        setHasUnread(true);
      }
    }
  }, [messages, isOpen]);

  const initializeWelcomeMessage = () => {
    setMessages([
      {
        role: "model",
        content: "أهلاً بك! أنا المساعد الذكي للمطور أحمد عبد الجواد. كيف يمكنني مساعدتك اليوم؟ سواء كنت تستفسر عن خدماته، مشاريعه، أو ترغب في التواصل معه وتوظيفه، سأكون سعيداً بإجابتك! 🚀",
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            // Send the history including the new message
            messages: newMessages,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("API network response was not ok");
      }

      const result = await response.json();
      
      if (result && result.result) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: result.result.text,
          },
        ]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error communicating with chat API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقاً، أو التواصل مباشرة مع المطور أحمد عبر البريد الإلكتروني أو الواتساب الموضحين في صفحة اتصل بنا.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("portfolio_chat_history");
    initializeWelcomeMessage();
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[110] font-sans">
      {/* 1. Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[520px] bg-zinc-900/95 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl z-[120]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-indigo-950/50 to-zinc-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Bot size={22} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                    مساعد أحمد الذكي
                    <Sparkles size={12} className="text-indigo-400" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-medium">نشط الآن للرد بذكاء</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="مسح المحادثة"
                  className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold px-2 py-1 rounded bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  مسح
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 text-right custom-scrollbar"
              dir="rtl"
            >
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? "justify-start" : "justify-end"} w-full`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.3rem] px-4 py-3 text-[15px] leading-relaxed ${
                        isUser
                          ? "bg-indigo-600 text-white rounded-br-none font-medium"
                          : "bg-zinc-800 text-zinc-50 border border-white/10 rounded-bl-none font-normal"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-end w-full">
                  <div className="bg-zinc-800 text-zinc-300 border border-white/10 rounded-[1.3rem] rounded-bl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-indigo-400" />
                    <span className="text-sm font-normal">جاري التفكير...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-white/5 bg-zinc-950/50 flex gap-2 items-center"
              dir="rtl"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسألني عن مهارات أحمد أو خدماته..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
              >
                <Send size={16} className="rotate-180" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl border border-white/10 z-[130] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
        aria-label="Chat with Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Glow pulsing effect */}
        <div className="absolute -z-10 h-full w-full rounded-full bg-indigo-500/30 blur-md animate-ping opacity-60" />
        
        {/* Unread dot indicator */}
        {hasUnread && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-zinc-950 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          </span>
        )}
      </motion.button>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a; /* zinc-800 */
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46; /* zinc-700 */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #27272a transparent;
        }
      `}</style>
    </div>
  );
}
