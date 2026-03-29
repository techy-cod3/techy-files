import { useState, useEffect } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <img src="/logo.png" alt="Aryan Gupta Logo" className="h-10 w-10 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
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

        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.href)}
            className="mobile-nav-item text-3xl font-light text-foreground hover:text-primary transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick("#contact")}
          className="mobile-nav-item btn-glow mt-4"
        >
          Hire Me
        </button>
      </div>
    </>
  );
};

export default Navbar;
