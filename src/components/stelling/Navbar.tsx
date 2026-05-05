import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { id: "services", label: "Servicios" },
  { id: "process", label: "Proceso" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contacto" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          zIndex: 100,
          background: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(240,238,248,0.07)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none" }}
            aria-label="Stelling Secure — inicio"
          >
            <Logo size={28} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "#F0EEF8",
            }}>
              STELLING <span style={{ background: "linear-gradient(90deg, #7B4FFF, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>SECURE</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 40 }} className="hidden md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleClick(l.id)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: active === l.id ? "#00E5FF" : "#6B6880",
                  background: "none",
                  border: "none",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => { if (active !== l.id) e.currentTarget.style.color = "#F0EEF8"; }}
                onMouseLeave={(e) => { if (active !== l.id) e.currentTarget.style.color = "#6B6880"; }}
              >
                {l.label}
              </button>
            ))}

            <motion.button
              animate={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
              transition={{ duration: 0.4 }}
              onClick={() => handleClick("contact")}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "1px solid rgba(0,229,255,0.3)",
                color: "#00E5FF",
                background: "transparent",
                padding: "8px 20px",
                borderRadius: 2,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,229,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Consulta gratuita
            </motion.button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            style={{ background: "none", border: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: 40, height: 40, gap: 5 }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  open
                    ? i === 0 ? { rotate: 45, y: 10 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -10 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{ width: 22, height: 1.5, background: "#F0EEF8", display: "block" }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "#050508",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
            className="md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                onClick={() => handleClick(l.id)}
                style={{
                  fontFamily: "'Dune Rise', sans-serif",
                  fontSize: 36,
                  color: "#F0EEF8",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "none",
                  border: "none",
                }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};