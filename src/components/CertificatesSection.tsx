import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: "Data Science Analyst",
    issuer: "TATA",
    icon: "📊",
    description: "Data analysis, visualization, and business intelligence fundamentals.",
  },
  {
    title: "Management & Leadership",
    issuer: "Coursera",
    icon: "🎯",
    description: "Strategic management principles and effective team leadership.",
  },
  {
    title: "Salesforce Certified Administrator",
    issuer: "GeeksforGeeks",
    icon: "☁️",
    description: "Salesforce platform administration, configuration, and management.",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "AWS",
    icon: "🌐",
    description: "Cloud computing concepts, AWS services, security, and architecture.",
  },
];

const CertificatesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-heading",
        { opacity: 0, filter: "blur(8px)", y: 40 },
        {
          opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".cert-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".cert-grid", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certificates" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-72 h-72 -left-36 bottom-20" style={{ background: "radial-gradient(circle, hsl(195 100% 50% / 0.12), transparent 70%)" }} />

      <div className="container mx-auto px-6">
        <div className="cert-heading text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Achievements</span>
          <h2 className="section-heading !text-4xl md:!text-5xl">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtext max-w-2xl mx-auto mt-4">
            Professional certifications that validate my expertise across cloud, data, and management domains.
          </p>
        </div>

        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="cert-card glass-card p-6 flex flex-col items-center text-center gap-4 hover:glow-border transition-all duration-500 group cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                {cert.icon}
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm mb-1">{cert.title}</h3>
                <span className="text-primary text-xs tracking-wider uppercase">{cert.issuer}</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
