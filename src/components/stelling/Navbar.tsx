import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

type NavItem =
  | { kind: "anchor"; id: string; label: string; href: string }
  | { kind: "dropdown"; label: string; items: { label: string; href: string }[] };

const navItems: NavItem[] = [
  { kind: "anchor", id: "services", label: "Servicios", href: "/#services" },
  {
    kind: "dropdown",
    label: "Empresa",
    items: [
      { label: "Quiénes Somos", href: "/empresa/quienes-somos/" },
      { label: "Cómo Trabajamos", href: "/empresa/como-trabajamos/" },
      { label: "Nuestro Compromiso", href: "/empresa/nuestro-compromiso/" },
    ],
  },
  { kind: "anchor", id: "contact", label: "Contacto", href: "/#contact" },
];

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const [empresaMobileOpen, setEmpresaMobileOpen] = useState(false);
  const [isEmpresaRoute, setIsEmpresaRoute] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsEmpresaRoute(window.location.pathname.startsWith("/empresa/"));
  }, []);

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
    navItems.forEach((item) => {
      if (item.kind === "anchor") {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    setOpen(false);
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", textDecoration: "none" }}
            aria-label="Stelling Secure — inicio"
          >
            <Logo size={28} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", color: "var(--text)" }}>
              STELLING <span className="grad-text">SECURE</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: 40 }}>
            {navItems.map((item) => {
              if (item.kind === "dropdown") {
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setEmpresaOpen(true)}
                    onMouseLeave={() => setEmpresaOpen(false)}
                    onFocus={() => setEmpresaOpen(true)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setEmpresaOpen(false);
                    }}
                    style={{ position: "relative" }}
                  >
                    <span
                      aria-haspopup="true"
                      aria-expanded={empresaOpen}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: isEmpresaRoute || empresaOpen ? "var(--cyan)" : "var(--muted)",
                        cursor: "default",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {item.label}
                    </span>
                    <motion.div
                      animate={{ opacity: empresaOpen ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: 16,
                        pointerEvents: empresaOpen ? "auto" : "none",
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(9,9,15,0.98)",
                          border: "1px solid rgba(240,238,248,0.08)",
                          borderRadius: 4,
                          padding: "8px 0",
                          minWidth: 200,
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        {item.items.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            style={{
                              display: "block",
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 11,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "var(--muted)",
                              padding: "10px 20px",
                              whiteSpace: "nowrap",
                              transition: "color 0.2s ease",
                              textDecoration: "none",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: active === item.id ? "var(--cyan)" : "var(--muted)",
                    background: "none",
                    border: "none",
                    transition: "color 0.25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { if (active !== item.id) e.currentTarget.style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { if (active !== item.id) e.currentTarget.style.color = "var(--muted)"; }}
                >
                  {item.label}
                </a>
              );
            })}
            <motion.a
              href="/#contact"
              animate={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
              transition={{ duration: 0.4 }}
              onClick={(e) => handleAnchorClick(e, "contact")}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                // Texto largo ("Solicitar Diagnóstico Ejecutivo") + nav
                // compacto entre ~768-878px (justo antes del hamburguesa):
                // fontSize y padding se reducen de forma fluida con clamp()
                // en ese rango y saturan a los valores originales (11px /
                // 8px 20px) a partir de ~1050px — en desktop no cambia nada.
                fontSize: "clamp(9px, calc(0.71vw + 3.55px), 11px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                border: "1px solid rgba(0,229,255,0.3)",
                color: "var(--cyan)",
                background: "transparent",
                padding: "8px clamp(10px, calc(3.55vw - 17.24px), 20px)",
                borderRadius: 2,
                transition: "all 0.25s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,229,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Solicitar Diagnóstico Ejecutivo
            </motion.a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            style={{ display: isMobile ? "flex" : "none", background: "none", border: "none", flexDirection: "column", justifyContent: "center", alignItems: "center", width: 40, height: 40, gap: 5 }}
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
                style={{ width: 22, height: 1.5, background: "var(--text)", display: "block" }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              overflowY: "auto",
              padding: "80px 24px",
            }}
          >
            {navItems.map((item, i) => {
              if (item.kind === "dropdown") {
                return (
                  <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                      onClick={() => setEmpresaMobileOpen((o) => !o)}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 32,
                        color: isEmpresaRoute ? "var(--cyan)" : "var(--text)",
                        fontWeight: 300,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        background: "none",
                        border: "none",
                      }}
                    >
                      {item.label}
                    </motion.button>
                    <AnimatePresence>
                      {empresaMobileOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, overflow: "hidden" }}
                        >
                          {item.items.map((sub) => (
                            <a
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 16,
                                color: "var(--muted)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                textDecoration: "none",
                              }}
                            >
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 32,
                    color: "var(--text)",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    background: "none",
                    border: "none",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
