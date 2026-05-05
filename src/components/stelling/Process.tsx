import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const steps = [
  { num: "01", title: "Diagnóstico", text: "Analizamos tu situación actual: web, seguridad, necesidades y objetivos. Sin compromiso." },
  { num: "02", title: "Propuesta", text: "Presentamos un plan detallado con alcance, plazos y presupuesto claro. Nada de letra pequeña." },
  { num: "03", title: "Ejecución", text: "Desarrollamos y/o auditamos con comunicación constante. Tú siempre sabes en qué punto estamos." },
  { num: "04", title: "Entrega y soporte", text: "Lanzamos, documentamos todo y nos quedamos disponibles. No desaparecemos tras la entrega." },
];

export const Process = () => (
  <section id="process" style={{ padding: "128px 24px", background: "#050508" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal x={-20} y={0}>
        <div className="slabel">03 · Proceso</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F0EEF8", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 80 }}>
  Servicios de Desarrollo Web y Seguridad Web
</h2>
      </Reveal>

      <div style={{ position: "relative" }}>
        <div style={{
          display: "none",
          position: "absolute",
          top: 28,
          left: 0,
          right: 0,
          borderTop: "1px dashed rgba(0,229,255,0.2)",
        }}
          className="md:block"
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.num}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
            >
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 40,
                fontWeight: 300,
                background: "linear-gradient(135deg, #7B4FFF, #00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 16,
                opacity: 0.4,
              }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#F0EEF8", fontWeight: 600, fontSize: 22, marginBottom: 12 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B6880", fontSize: 14, lineHeight: 1.75 }}>
                {s.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);