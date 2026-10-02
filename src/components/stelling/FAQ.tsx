import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "¿Qué incluye la Auditoría de Seguridad Web?", a: "Evaluamos la exposición pública de tu sitio web, la configuración HTTPS/TLS, las cabeceras HTTP de seguridad y los componentes con vulnerabilidades públicas conocidas que sean detectables desde el exterior. Entregamos un informe ejecutivo, un informe técnico y recomendaciones priorizadas." },
  { q: "¿Es lo mismo una auditoría que una prueba de intrusión (pentest)?", a: "No. Una prueba de intrusión intenta explotar vulnerabilidades como lo haría un atacante. Nuestra auditoría se limita a observar y analizar la exposición y la configuración, sin explotar vulnerabilidades." },
  { q: "¿Necesitáis acceso a mis sistemas?", a: "Para la Auditoría de Seguridad Web no necesitamos credenciales ni acceso interno: trabajamos sobre lo que es visible desde Internet, siempre con tu autorización por escrito y sobre un alcance acordado previamente." },
  { q: "¿Qué recibo al terminar?", a: "Un informe ejecutivo para dirección y un informe técnico, con los hallazgos priorizados y recomendaciones concretas. Cuando forma parte del alcance acordado, también un seguimiento de las correcciones." },
  { q: "¿Cuánto cuesta?", a: "Depende del alcance de cada proyecto. Tras una primera conversación para definirlo, te enviamos una propuesta por escrito." },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" style={{ padding: "128px 24px", background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal x={-20} y={0}>
          <div className="slabel">04 · Preguntas frecuentes</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)", fontWeight: 700, fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 64 }}>
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
                    borderBottom: "1px solid var(--line)",
                    borderLeft: isOpen ? "2px solid var(--shield)" : "2px solid transparent",
                    transition: "border-color 0.25s ease",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", padding: "24px 28px", background: "none", border: "none" }}
                    aria-expanded={isOpen}
                  >
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)", fontSize: 18, fontWeight: 500, lineHeight: 1.4 }}>
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "var(--shield)", fontSize: 24, fontWeight: 300, marginLeft: 16, flexShrink: 0 }}
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
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--muted)", fontSize: 15, lineHeight: 1.75, padding: "0 28px 24px 28px" }}>
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