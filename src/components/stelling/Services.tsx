import { motion } from "framer-motion";
import { Code2, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const cards = [
  {
    accent: "#7B4FFF",
    accentDim: "rgba(123,79,255,0.08)",
    accentBorder: "rgba(123,79,255,0.4)",
    Icon: Code2,
    title: "Desarrollo Web para PYMEs",
    tag: "[ web · performance · seo ]",
    desc: "Diseñamos y desarrollamos webs rápidas, elegantes y optimizadas para convertir. Sin plantillas. Código limpio, estructura sólida y resultados medibles desde el primer día.",
    items: [
      "Diseño UI/UX a medida",
      "Desarrollo React / Next.js",
      "SEO técnico desde la base",
      "CMS integrado (si lo necesitas)",
      "Rendimiento y Core Web Vitals",
    ],
  },
  {
    accent: "#00E5FF",
    accentDim: "rgba(0,229,255,0.06)",
    accentBorder: "rgba(0,229,255,0.35)",
    Icon: ShieldCheck,
    title: "Auditoría y Seguridad Web",
    tag: "[ audit · hardening · monitoring ]",
    desc: "Auditamos, reforzamos y monitorizamos tu presencia digital. No esperamos a que ocurra un incidente: identificamos vulnerabilidades antes de que alguien las explote.",
    items: [
      "Auditoría de seguridad web completa",
      "Hardening de servidores y CMS",
      "Protección contra malware y ataques",
      "Certificados SSL y configuración HTTPS",
      "Informes técnicos detallados",
    ],
  },
];

export const Services = () => (
  <section id="services" style={{ padding: "128px 24px", background: "#050508" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal x={-20} y={0}>
        <div className="slabel">01 · Servicios</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F0EEF8", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 80 }}>
  Servicios de Desarrollo Web y Seguridad Web
</h2>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}
      >
        {cards.map((c, i) => (
          <motion.article
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
            style={{
              background: "#09090F",
              border: "1px solid rgba(240,238,248,0.07)",
              borderRadius: 3,
              padding: 40,
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.accentBorder;
              e.currentTarget.style.boxShadow = `0 0 40px ${c.accentDim}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,238,248,0.07)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.accent }} />
            <c.Icon size={32} color={c.accent} strokeWidth={1.5} />
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#F0EEF8", fontWeight: 600, fontSize: 32, lineHeight: 1.1, marginTop: 24, marginBottom: 8 }}>
              {c.title}
            </h3>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: c.accent, fontSize: 11, marginBottom: 24 }}>
              {c.tag}
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B6880", fontSize: 14, lineHeight: 1.75, marginBottom: 32 }}>
              {c.desc}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.items.map((it) => (
                <li key={it} style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 12, display: "flex", gap: 8 }}>
                  <span style={{ color: c.accent }}>→</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);