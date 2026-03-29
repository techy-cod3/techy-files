import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1,
          scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-input",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".social-icon",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".social-icons", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const whatsappText = `Hello Aryan, I am reaching out from your portfolio.

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject || "No Subject"}

*Message:*
${message}`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/919668227755?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    e.currentTarget.reset();

    gsap.fromTo(
      ".submit-btn",
      { scale: 1 },
      { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
    );
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
      <div className="floating-orb w-72 h-72 right-0 top-20" />
      <div className="floating-orb w-56 h-56 -left-28 bottom-20" style={{ background: "radial-gradient(circle, hsl(280 80% 55% / 0.15), transparent 70%)" }} />

      <div className="container mx-auto px-6 max-w-2xl">
        <div className="contact-heading text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h2 className="section-heading">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtext mx-auto mt-4">
            Have a project in mind or just want to say hello? Drop me a message.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            📍 Bhubaneswar, Odisha &nbsp;•&nbsp; 📞 +91 96682 27755
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="contact-input glass-input w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="contact-input glass-input w-full"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="contact-input glass-input w-full"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="contact-input glass-input w-full resize-none"
          />
          <button
            type="submit"
            className="submit-btn btn-glow w-full !py-4 text-base"
          >
            {submitted ? "Message Sent! ✦" : "Send Message"}
          </button>
        </form>

        <div className="social-icons flex justify-center gap-6 mt-12">
          <a
            href="https://github.com/techy-cod3/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon glass-card p-4 hover:glow-border transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/aryan-gupta-boi"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon glass-card p-4 hover:glow-border transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
