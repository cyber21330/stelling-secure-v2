import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "¿Cuánto cuesta una página web para una PYME en Valencia?", a: "El coste varía según el proyecto. En Stelling Secure trabajamos con presupuestos adaptados a la realidad de cada negocio. Contáctanos para una primera consulta sin coste y te damos un presupuesto en 48 horas." },
  { q: "¿Qué incluye una auditoría de seguridad web?", a: "Analizamos vulnerabilidades, configuración del servidor, CMS, plugins, exposición de datos sensibles, certificados SSL y configuración HTTPS. Entregamos informe con riesgos priorizados y plan de acción." },
  { q: "¿Cuánto tarda en hacerse una web profesional?", a: "La mayoría de proyectos web para PYMEs los entregamos en 3 a 6 semanas desde el inicio. Siempre fijamos plazos claros desde el primer día." },
  { q: "¿Podéis mejorar la seguridad de una web que ya tengo?", a: "Sí. Hacemos auditorías y hardening de webs existentes en WordPress, HTML estático, tiendas online y más. Analizamos tu caso y proponemos soluciones concretas." },
  { q: "¿Ofrecéis mantenimiento web y seguridad continuada?", a: "Sí. Ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, copias de seguridad, monitorización de seguridad y soporte técnico." },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" style={{ padding: "128px 24px", background: "#09090F" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal x={-20} y={0}>
          <div className="slabel">04 · Preguntas frecuentes</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F0EEF8", fontWeight: 700, fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 64 }}>
            Todo lo que necesitas saber
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid rgba(240,238,248,0.07)",
                    borderLeft: isOpen ? "2px solid #00E5FF" : "2px solid transparent",
                    transition: "border-color 0.25s ease",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", padding: "24px 28px", background: "none", border: "none" }}
                    aria-expanded={isOpen}
                  >
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F0EEF8", fontSize: 18, fontWeight: 500, lineHeight: 1.4 }}>
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "#00E5FF", fontSize: 24, fontWeight: 300, marginLeft: 16, flexShrink: 0 }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6B6880", fontSize: 15, lineHeight: 1.75, padding: "0 28px 24px 28px" }}>
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};