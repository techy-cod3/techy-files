import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "GSAP", icon: "🎬" },
  { name: "TypeScript", icon: "📘" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
        { opacity: 0, filter: "blur(8px)", y: 40 },
        {
          opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".about-content", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-image",
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".about-image", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".skill-icon",
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-80 h-80 -right-40 top-20" style={{ background: "radial-gradient(circle, hsl(260 80% 60% / 0.15), transparent 70%)" }} />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="about-image flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/20 glow-box group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                <img src={profileImg} alt="Milad" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">About Me</span>
            <h2 className="section-heading !text-4xl md:!text-5xl mb-6">
              Hi There, I'm <span className="gradient-text">Milad</span>
            </h2>
            <p className="section-subtext mb-8">
              I specialize in frontend development, crafting dynamic, visually
              engaging, and highly responsive websites that provide seamless user
              experiences. With a strong foundation in HTML, CSS, and JavaScript,
              I focus on building modern web interfaces that are not only
              aesthetically appealing but also optimized for performance and
              accessibility.
            </p>

            <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Tech Stack</h3>
            <div className="skills-grid grid grid-cols-3 sm:grid-cols-6 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-icon glass-card p-3 flex flex-col items-center gap-2 hover:glow-border transition-all duration-300 cursor-default"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-xs text-muted-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
