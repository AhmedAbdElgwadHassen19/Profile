"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code2, Loader2 } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { projectsAPI } from "@/lib/firebase";
import { FaGithub } from "react-icons/fa";

// 1. تعريف شكل بيانات المشروع
interface Project {
  _id?: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl: string;
  liveLink: string;
  githubLink: string;
  color?: string;
}

// 2. تعريف الـ Props بتاعة الكارت
interface ProjectCardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function ProjectCard({ project, index, progress, range, targetScale }: ProjectCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        style={{ scale, top: `calc(-5% + ${index * 25}px)` }}
        className={`relative w-full max-w-5xl h-[550px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl ${project.color || 'bg-[#1a1a1a]'} flex flex-col md:flex-row`}
      >
        <div className="relative w-full md:w-1/2 h-2/5 md:h-full overflow-hidden group">
          <img
            src={project.imageUrl || "/project1.jpg"}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          {/* تظليل سفلي ناعم على الصورة عشان تندمج مع الكلام */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        </div>

        <div className="flex-1 p-6 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 border-none px-3 py-1">
                  {tag}
                </Badge>
              )) || (
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-none px-3 py-1">
                  Featured
                </Badge>
              )}
            </div>

            <h3 className="text-3xl md:text-5xl font-bold text-slate-300 tracking-tight leading-tight">
              {project.title}
            </h3>

            <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <Button asChild className="bg-white text-black hover:bg-indigo-500 hover:text-white rounded-xl px-6 font-bold shadow-lg shadow-white/5 transition-all duration-300">
              <a href={project.liveLink} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
              </a>
            </Button>
            <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:bg-white hover:text-black hover:border-white rounded-xl px-6 font-bold transition-all duration-300">
              <a href={project.githubLink} target="_blank" rel="noreferrer">
                <FaGithub className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        const allProjects = response.data as Project[];
        
        // المبدأ: هناخد أول 3 مشاريع، لكن هنخلي المشروع التاني هو "Flowers Brand"
        let featured = allProjects.slice(0, 3);
        
        // البحث عن مشروع Flowers Brand (سواء بالاسم أو لو هو رقم 6 في القائمة)
        const flowersProject = allProjects.find(p => p.title.toLowerCase().includes('flowers')) || allProjects[5];
        
        if (flowersProject && featured.length >= 2) {
          // استبدال المشروع الثاني بمشروع Flowers
          featured[1] = flowersProject;
        }
        
        setProjects(featured);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" ref={container} className="relative bg-slate-950 py-16">
      <div className="container mx-auto px-6 text-center md:text-left">
        <FadeIn direction="up">
          <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4 flex items-center justify-center md:justify-start gap-2">
            <Code2 className="w-5 h-5" /> Featured Work
          </h2>
          <h3 className="text-5xl md:text-7xl font-extrabold text-slate-300 tracking-tighter">
            Selected Projects.
          </h3>
        </FadeIn>
      </div>

      <div className="relative mt-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-400">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project, index) => {
            const targetScale = 1 - (projects.length - index) * 0.05;
            return (
              <ProjectCard
                key={project._id || index}
                index={index}
                project={project}
                progress={scrollYProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500">No projects found. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}
