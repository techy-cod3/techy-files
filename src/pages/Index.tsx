import { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CertificatesSection from "@/components/CertificatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  return (
    <div className="min-h-screen bg-background">
      <Preloader onComplete={handleLoadComplete} />
      <div
        className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
