import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const steps = [
  { num: "01", title: "Reunión inicial", text: "Hablamos contigo para entender tu negocio, tu web actual y tus objetivos de seguridad." },
  { num: "02", title: "Definición del alcance", text: "Acordamos por escrito qué se audita, con qué profundidad y en qué plazo." },
  { num: "03", title: "Auditoría", text: "Analizamos los activos incluidos en el alcance acordado: infraestructura, aplicación web y configuración, según corresponda." },
  { num: "04", title: "Informe ejecutivo", text: "Resumen para dirección: qué riesgos se han encontrado, su impacto y qué priorizar." },
  { num: "05", title: "Informe técnico", text: "Detalle para tu equipo técnico: vulnerabilidades encontradas, evidencias y pasos de reproducción." },
  { num: "06", title: "Plan de remediación", text: "Proponemos correcciones concretas, priorizadas por impacto y esfuerzo, con plazos." },
  { num: "07", title: "Seguimiento", text: "Verificamos que las correcciones se han aplicado correctamente." },
];

export const HowWeWork = () => (
  <section id="how-we-work" style={{ padding: "80px 0 128px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal x={-20} y={0}>
        <div className="slabel">Metodología</div>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A5A2BD", fontSize: 16, maxWidth: 600, lineHeight: 1.75, marginBottom: 64 }}>
          Siete pasos, siempre los mismos, siempre visibles para ti. Así es como trabajamos en cada proyecto de auditoría.
        </p>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}
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
              background: "var(--grad-main)",
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A5A2BD", fontSize: 14, lineHeight: 1.75 }}>
              {s.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
