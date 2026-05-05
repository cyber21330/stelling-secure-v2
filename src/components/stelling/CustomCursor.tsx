import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input[type='submit'], .clickable, label")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      const size = hovering ? 48 : 28;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = hovering ? "#7B4FFF" : "#00E5FF";
        ringRef.current.style.background = hovering ? "rgba(123,79,255,0.1)" : "transparent";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00E5FF",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: "0 0 8px rgba(0,229,255,0.8)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          border: "1.5px solid #00E5FF",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, width, height",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
};