import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  // Hide on touch/mobile devices
  const isTouchDevice =
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const animate = useCallback(() => {
    // Smooth follow for outer ring (lerp)
    ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Hover detection via CSS class instead of state
    const onOverInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "60px";
        ringRef.current.style.height = "60px";
      }
      if (dotRef.current) dotRef.current.style.transform += " scale(0)";
    };

    const onOutInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
      }
    };

    const timer = setTimeout(() => {
      document.querySelectorAll("a, button, input, textarea, .glass-card").forEach((el) => {
        el.addEventListener("mouseover", onOverInteractive);
        el.addEventListener("mouseout", onOutInteractive);
      });
    }, 500);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
      clearTimeout(timer);
    };
  }, [animate, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[10000] shadow-[0_0_15px_hsl(var(--primary))]"
        style={{ willChange: "transform", transition: "opacity 0.3s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9999] bg-primary/10 backdrop-blur-[1px]"
        style={{
          width: "36px",
          height: "36px",
          willChange: "transform, width, height",
          transition: "width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s",
        }}
      />
    </>
  );
};

export default CustomCursor;
