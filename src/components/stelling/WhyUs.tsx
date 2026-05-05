import { motion } from "framer-motion";
import { Eye, Handshake, Building2, FileText } from "lucide-react";
import { Reveal } from "./Reveal";

const reasons = [
  { Icon: Eye, title: "Visión completa", text: "Construimos tu web pensando ya en su seguridad. No son dos proyectos separados: son uno." },
  { Icon: Handshake, title: "Sin intermediarios", text: "Trabajas directamente con quien ejecuta. Sin account managers. Sin sorpresas." },
  { Icon: Building2, title: "Orientados a PYMEs", text: "Precios justos, plazos claros y soluciones que se ajustan a tu realidad, no a la de una corporación." },
  { Icon: FileText, title: "Transparencia total", text: "Sabes exactamente qué se hace, cómo y por qué. Entregamos documentación de todo." },
];

export const WhyUs = () => (
  <section id="why" style={{ padding: "128px 24px", background: "#09090F" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal x={-20} y={0}>
        <div className="slabel">02 · Por qué nosotros</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F0EEF8", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 80 }}>
  Servicios de Desarrollo Web y Seguridad Web
</h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B6880", fontSize: 16, maxWidth: 600, lineHeight: 1.75, marginBottom: 64 }}>
          La mayoría de agencias hacen webs. La mayoría de empresas de seguridad no entienden tu negocio. Nosotros hacemos ambas cosas, con el mismo nivel de exigencia.
        </p>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}
      >
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            style={{
              background: "#0F0F1A",
              border: "1px solid rgba(240,238,248,0.07)",
              borderRadius: 3,
              padding: 32,
              transition: "border-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(123,79,255,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,238,248,0.07)")}
          >
            <r.Icon size={24} color="#7B4FFF" strokeWidth={1.5} />
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#F0EEF8", fontWeight: 600, fontSize: 22, lineHeight: 1.2, marginTop: 20, marginBottom: 12 }}>
              {r.title}
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B6880", fontSize: 14, lineHeight: 1.75 }}>
              {r.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);