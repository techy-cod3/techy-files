import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";
import project6 from "@/assets/project-6.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { img: project1, title: "3D Interactive Web", desc: "A stunning 3D landing page with Spline integration and React.", tags: ["React", "Spline", "GSAP"] },
  { img: project2, title: "Gaming UI Platform", desc: "Next-level gaming dashboard with immersive 3D character selection.", tags: ["React", "Three.js", "Tailwind"] },
  { img: project3, title: "3D Portfolio", desc: "A creative developer portfolio with glassmorphic design and 3D elements.", tags: ["HTML", "CSS", "JavaScript"] },
  { img: project4, title: "Gaming Website", desc: "Vibrant gaming website with anime-inspired design and animations.", tags: ["React", "GSAP", "Tailwind"] },
  { img: project5, title: "Animation Showcase", desc: "Portfolio featuring advanced web animations and Spline 3D models.", tags: ["React", "Spline", "GSAP"] },
  { img: project6, title: "Animated Portfolio", desc: "Step-by-step animated portfolio with smooth parallax scrolling.", tags: ["CSS", "JS", "GSAP"] },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1,
          scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-96 h-96 -left-48 bottom-0 animate-pulse-glow" />

      <div className="container mx-auto px-6">
        <div className="projects-heading text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
          <h2 className="section-heading">
            My <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Desktop: horizontal scroll area */}
        <div
          ref={scrollRef}
          className="projects-grid flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card glass-card min-w-[300px] md:min-w-0 snap-center group cursor-pointer overflow-hidden hover:glow-border transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
