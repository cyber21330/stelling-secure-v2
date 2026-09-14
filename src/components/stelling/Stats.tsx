import { motion } from "framer-motion";

// SUSPENDIDO — fuera del render de Home por decisión de Estrategia
// (resolución, punto 1): estas cifras (3 proyectos, 100%, 0 incidentes)
// no tienen evidencia empresarial verificable/gobernada detrás y no
// representan Trust. No es una eliminación: no reactivar este
// componente ni sustituir las métricas por otras hasta que exista esa
// evidencia gobernada (ver criterio de evidenceStatus en
// docs/arquitectura-fase2-v4.md). Componente sin dependientes (ver
// análisis de sesión) — seguro de mantener sin importar en ningún sitio.
const stats = [
  { value: "3", label: "Proyectos entregados" },
  { value: "100%", label: "Clientes satisfechos" },
  { value: "< 48h", label: "Tiempo de respuesta" },
  { value: "0", label: "Incidentes post-auditoría" },
];

export const Stats = () => (
  <section style={{
    padding: "80px 24px",
    background: "var(--bg2)",
    borderTop: "1px solid rgba(240,238,248,0.05)",
    borderBottom: "1px solid rgba(240,238,248,0.05)",
  }}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}
          style={{
            textAlign: "center",
            padding: "24px 16px",
            borderRight: i < stats.length - 1 ? "1px solid rgba(240,238,248,0.06)" : "none",
          }}
        >
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 5vw, 56px)",
            lineHeight: 1,
            background: "var(--grad-main)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {s.value}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "var(--muted)",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: 12,
          }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);