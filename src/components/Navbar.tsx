import { useState, useEffect } from "react";
import gsap from "gsap";
import { X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.5 });

    // Use a small timeout to let the DOM render before selecting sections
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => observer.observe(section));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    }
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <img src="/logo.png" alt="Aryan Gupta Logo" className="h-10 w-10 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm transition-colors duration-300 tracking-wide ${activeSection === item.href || (activeSection === "" && item.href === "#home") ? "text-primary font-semibold drop-shadow-[0_0_8px_hsl(var(--primary))]" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
            
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button
              onClick={() => window.open("https://wa.me/919668227755?text=Hello%20Aryan,%20I%20am%20interested%20in%20hiring%20you%20for%20a%20Role%20or%20Projects", "_blank")}
              className="btn-glow text-sm !px-6 !py-2"
            >
              Hire Me
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className={`md:hidden flex flex-col gap-1.5 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Menu"
          >
            <span className="block w-6 h-0.5 bg-foreground rounded-full" />
            <span className="block w-6 h-0.5 bg-foreground rounded-full" />
            <span className="block w-6 h-0.5 bg-foreground rounded-full" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[55] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors md:hidden"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="absolute top-6 left-6 p-2 text-foreground hover:text-primary transition-colors md:hidden"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={28} /> : <Moon size={28} />}
          </button>
        )}

        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.href)}
            className={`mobile-nav-item text-3xl font-light transition-colors ${activeSection === item.href || (activeSection === "" && item.href === "#home") ? "text-primary font-semibold drop-shadow-[0_0_12px_hsl(var(--primary))]" : "text-foreground hover:text-primary"}`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => {
            setIsOpen(false);
            window.open("https://wa.me/919668227755?text=Hello%20Aryan,%20I%20am%20interested%20in%20hiring%20you%20for%20a%20Role%20or%20Projects", "_blank");
          }}
          className="mobile-nav-item btn-glow mt-4"
        >
          Hire Me
        </button>
      </div>
    </>
  );
};

export default Navbar;
