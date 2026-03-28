import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    const counter = { val: 0 };

    tl.to(counter, {
      val: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(counter.val);
        setPercent(rounded);
      },
    })
      .to(
        progressBarRef.current,
        { width: "100%", duration: 2.5, ease: "power2.out" },
        0
      )
      .to(".preloader-content", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "power2.in",
      })
      .to(preloaderRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = "none";
          }
          onComplete();
        },
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Background orbs */}
      <div className="floating-orb w-64 h-64 top-1/4 left-1/4 animate-pulse-glow" />
      <div className="floating-orb w-48 h-48 bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: "1s", background: "radial-gradient(circle, hsl(260 80% 60% / 0.3), transparent 70%)" }} />

      <div className="preloader-content relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          <span className="gradient-text">Aryan Gupta</span>
        </h1>
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
          Web Developer
        </p>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-[2px] bg-muted rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(195 100% 50%), hsl(260 80% 60%))",
            }}
          />
        </div>

        <span ref={percentRef} className="text-muted-foreground text-sm font-light tabular-nums">
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
