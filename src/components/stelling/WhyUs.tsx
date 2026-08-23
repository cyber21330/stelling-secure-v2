import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

interface Promise {
  statement: string;
  order: number;
}

interface WhyUsProps {
  promises: Promise[];
}

export const WhyUs = ({ promises }: WhyUsProps) => (
  <section id="why" style={{ padding: "128px 24px", background: "var(--bg2)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal x={-20} y={0}>
        <div className="slabel">02 · Por qué nosotros</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 80 }}>
  Por qué Stelling Secure
</h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--muted)", fontSize: 16, maxWidth: 600, lineHeight: 1.75, marginBottom: 64 }}>
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
        {promises.map((p) => (
          <motion.div
            key={p.order}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--line)",
              borderRadius: 3,
              padding: 32,
              transition: "border-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--violet-bdr)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 32,
              fontWeight: 300,
              background: "var(--grad-main)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 16,
              opacity: 0.4,
            }}>
              {String(p.order).padStart(2, "0")}
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--muted)", fontSize: 15, lineHeight: 1.75 }}>
              {p.statement}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);