import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const Hero = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowArrow(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflowX: "hidden", 
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "100px 20px 60px" : "0 24px",
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,79,255,0.08) 0%, transparent 70%), #050508",
      }}
    >
      <h1 className="sr-only">Desarrollo Web y Seguridad Web para PYMEs en Valencia</h1>

      <div style={{
        maxWidth: 860,
        margin: "0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 14 : 32,
        paddingTop: isMobile ? 0 : 80,
      }}>

        {/* Tag */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", letterSpacing: "0.3em", fontSize: 11, textTransform: "uppercase" }}
        >
          STELLING SECURE · VALENCIA
        </motion.p>

        {/* Headline */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          aria-hidden="true"
          style={{
            fontFamily: "'Dune Rise', sans-serif",
            fontWeight: 400,
            fontSize: isMobile ? "clamp(20px, 6vw, 26px)" : "clamp(40px, 7vw, 72px)",
            lletterSpacing: isMobile ? "0.01em" : "0.05em",
            textTransform: "uppercase",
            lineHeight: isMobile ? 1.15 : 1.02,
            margin: 0,
          }}
        >
          Desarrollo web.
          <br />
          Seguridad{" "}
          <span style={{ background: "linear-gradient(90deg, #7B4FFF, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            digital.
          </span>
        </motion.p>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "rgba(0,229,255,0.7)",
            fontSize: isMobile ? 16 : "clamp(18px, 2.5vw, 26px)",
            fontWeight: 400,
          }}
        >
          Tu negocio, construido y blindado.
        </motion.p>

        {/* Body — oculto en móvil */}
        {!isMobile && (
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B6880", fontSize: 16, maxWidth: 560, lineHeight: 1.75 }}
          >
            Stelling Secure es tu equipo de{" "}
            <strong style={{ color: "#F0EEF8", fontWeight: 500 }}>desarrollo web y seguridad web en Valencia</strong>.
            Construimos{" "}
            <strong style={{ color: "#F0EEF8", fontWeight: 500 }}>páginas web para PYMEs</strong>{" "}
            rápidas, elegantes y seguras desde la base — y nos quedamos para protegerlas.
          </motion.p>
        )}

        {/* Social proof — oculto en móvil */}
        {!isMobile && (
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={3.5}
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 11, letterSpacing: "0.08em" }}
          >
            Más de 50 PYMEs en Valencia confían en Stelling Secure
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 12 : 16,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            onClick={() => scrollTo("services")}
            style={{
              background: "linear-gradient(135deg, #7B4FFF, #00E5FF)",
              color: "#050508",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: isMobile ? 12 : 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: isMobile ? "12px 24px" : "14px 32px",
              borderRadius: 2,
              border: "none",
              width: isMobile ? "100%" : "auto",
              transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Ver servicios
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "transparent",
              border: "1px solid rgba(0,229,255,0.35)",
              color: "#00E5FF",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: isMobile ? 12 : 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: isMobile ? "12px 24px" : "14px 32px",
              borderRadius: 2,
              width: isMobile ? "100%" : "auto",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,229,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Auditoría gratuita →
          </button>
        </motion.div>

        {/* Trust */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={4.5}
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 10, letterSpacing: "0.08em" }}
        >
          Sin compromiso · Respuesta en 24-48h · 100% confidencial
        </motion.p>
      </div>

      {/* Scroll indicator — solo desktop */}
      {!isMobile && (
        <motion.div
          animate={{ opacity: showArrow ? 0.6 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#6B6880",
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.3em" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 32, background: "linear-gradient(180deg, #7B4FFF, #00E5FF)" }}
          />
        </motion.div>
      )}
    </section>
  );
};