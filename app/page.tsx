import AboutSection from "./about/page";
import HeroSection from "./home/HeroSection";
import ProjectsSection from "./home/ProjectsSection";
import TestimonialsSection from "./home/TestimonialsSection";
import ServicesSection from "./home/ServicesSection";
import { WhyMeSection } from "./home/WhyChooseMe";

export default function Home() {
  return (
    <>
    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <AboutSection />
    <TestimonialsSection />
    <WhyMeSection /> 
    </>
  );
}
