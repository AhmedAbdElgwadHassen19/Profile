"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Loader2, ArrowLeft, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projectsAPI } from "@/lib/firebase";
import FadeIn from "@/components/animations/FadeIn";

interface Project {
  _id?: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl: string;
  liveLink: string;
  githubLink: string;
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data as Project[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [projects, searchTerm]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-all group font-medium">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <Code2 className="w-8 h-8 text-indigo-500" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                  Technical <span className="text-indigo-500 italic">Labs.</span>
                </h1>
              </div>
              <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
                Exploring the boundaries of web technology through experimental UI and robust engineering.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search by tech or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin relative" />
            </div>
            <p className="text-zinc-400 text-xl font-medium animate-pulse uppercase tracking-[0.2em]">Synchronizing Data...</p>
          </div>
        ) : (
          <div className="space-y-8" ref={resultsRef}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-zinc-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Results ({filteredProjects.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {currentProjects.map((project, index) => (
                  <FadeIn
                    key={project._id || index}
                    direction="up"
                    delay={index * 0.05}
                    className="h-full"
                  >
                    <motion.div
                      layout
                      className="group relative h-full bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all duration-500 shadow-2xl"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <img
                          src={project.imageUrl || "/project1.jpg"}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                        {/* Floating Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold py-1 px-3 rounded-full">
                            V1.0
                          </Badge>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-zinc-500 text-base line-clamp-2 leading-relaxed mb-8">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl h-14 flex-1 text-base font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                            <a href={project.liveLink} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" /> Live
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:bg-white hover:text-black hover:border-white rounded-2xl h-14 flex-1 text-base font-bold transition-all active:scale-95">
                            <a href={project.githubLink} target="_blank" rel="noreferrer">
                              <FaGithub className="w-5 h-5 mr-2" /> Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-2xl border-slate-800 text-slate-500 hover:bg-slate-900 hover:text-white disabled:opacity-20 transition-all shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-12 h-12 rounded-2xl border text-xs font-black transition-all duration-300 ${currentPage === number
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] scale-110"
                          : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-white"
                        }`}
                    >
                      {String(number).padStart(2, '0')}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-2xl border-slate-800 text-slate-500 hover:bg-slate-900 hover:text-white disabled:opacity-20 transition-all shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {!loading && filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 border border-dashed border-slate-800 rounded-[3rem] bg-slate-900/20 font-mono"
              >
                <p className="text-slate-500 text-2xl mb-4">Search returned 0 clusters.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-indigo-500 hover:underline text-lg"
                >
                  Clear search parameters
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
