import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border overflow-hidden">
      {/* Floating particles */}
      <div className="floating-orb w-32 h-32 left-1/4 top-0 opacity-30" />
      <div className="floating-orb w-24 h-24 right-1/3 bottom-0 opacity-20" style={{ background: "radial-gradient(circle, hsl(260 80% 60% / 0.3), transparent 70%)" }} />

      <div className="footer-content container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <img src="/logo.png" alt="Aryan Gupta Logo" className="h-10 w-10 rounded-xl" />

          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            {["#home", "#about", "#projects", "#contact"].map((href) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 Aryan Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
