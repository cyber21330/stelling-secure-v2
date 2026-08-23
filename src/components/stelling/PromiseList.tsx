import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

interface Promise {
  statement: string;
  order: number;
}

interface PromiseListProps {
  promises: Promise[];
}

export const PromiseList = ({ promises }: PromiseListProps) => (
  <section id="promise-list" style={{ padding: "80px 0 128px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal x={-20} y={0}>
        <div className="slabel">Compromiso</div>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 40 }}
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
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A5A2BD", fontSize: 15, lineHeight: 1.75 }}>
              {p.statement}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
