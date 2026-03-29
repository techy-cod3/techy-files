import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Attach listeners to interactive elements
    const handleHoverElements = () => {
      const elements = document.querySelectorAll("a, button, input, textarea, .glass-card");
      elements.forEach((el) => {
        el.addEventListener("mouseover", () => setIsHovering(true));
        el.addEventListener("mouseout", () => setIsHovering(false));
      });
    };

    addEventListeners();
    
    // Timeout helps ensure DOM is mounted in Index.tsx
    const timeout = setTimeout(handleHoverElements, 500);

    return () => {
      removeEventListeners();
      clearTimeout(timeout);
    };
  }, []);

  // Hide on mobile devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[10000] transition-opacity duration-300 shadow-[0_0_15px_hsl(var(--primary))]"
        style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`, 
            opacity: hidden ? 0 : 1, 
            transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
            transition: 'transform 0.15s ease-out'
        }}
      />
      <div 
        className="fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9999] flex items-center justify-center bg-primary/10 backdrop-blur-[1px]"
        style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`, 
            opacity: hidden ? 0 : 1, 
            width: isHovering ? '60px' : '36px', 
            height: isHovering ? '60px' : '36px',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.3s ease-out, height 0.3s ease-out, top 0.1s ease-out, left 0.1s ease-out'
        }}
      />
    </>
  );
}

export default CustomCursor;
