import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 });

      tl.fromTo(
        ".hero-tag",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".hero-heading",
          { opacity: 0, y: 50, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .fromTo(
          ".hero-spline",
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.8"
        );

      // Floating orbs
      gsap.to(".hero-orb-1", { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.to(".hero-orb-2", { y: 15, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 1 });
      gsap.to(".hero-orb-3", { y: -12, x: 10, duration: 5, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Spline background */}
      <div className="hero-spline absolute inset-0 opacity-0 overflow-hidden">
        <iframe
          src="https://my.spline.design/orb-L1XqjDs57GUGvfhEVLMSqGF5/"
          frameBorder="0"
          className="absolute w-[110vw] h-[110vh] -top-[5vh] -left-[5vw]"
          style={{ pointerEvents: "none" }}
          title="3D Background"
        />
      </div>

      {/* Floating orbs */}
      <div className="hero-orb-1 floating-orb w-72 h-72 -top-20 -left-20" />
      <div className="hero-orb-2 floating-orb w-96 h-96 bottom-0 right-0" style={{ background: "radial-gradient(circle, hsl(260 80% 60% / 0.2), transparent 70%)" }} />
      <div className="hero-orb-3 floating-orb w-48 h-48 top-1/3 right-1/4" style={{ background: "radial-gradient(circle, hsl(280 80% 55% / 0.15), transparent 70%)" }} />

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-3xl">
          <span className="hero-tag inline-block text-primary text-sm tracking-[0.3em] uppercase mb-6 opacity-0">
            ✦ Cloud/DevOps
          </span>

          <h1 className="hero-heading section-heading !text-5xl md:!text-7xl lg:!text-8xl mb-6 opacity-0">
            Hi, I'm{" "}
            <span className="gradient-text">Aryan Gupta</span>
          </h1>

          <p className="hero-sub section-subtext mb-10 opacity-0">
            Tech enthusiast with strong problem-solving skills and a passion for
            building innovative solutions. Experienced in cloud, networking, and
            full-stack development with proven leadership and management
            abilities.
          </p>

          <div className="hero-cta flex gap-4 opacity-0">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-glow"
            >
              Hire Me
            </button>
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-full font-semibold border border-border text-foreground hover:border-primary/50 transition-all duration-300"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
