import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridItem {
  slug: string;
  title: string;
  description: string;
  category: "principal" | "complementario";
}

interface ServicesGridProps {
  services: ServiceGridItem[];
}

// `services` llega ya ordenado por `order` (asc) desde la página .astro.
// El primer elemento de categoría "principal" es el servicio insignia
// (Auditoría de Seguridad Web, order: 1) — se detecta por posición, no
// por slug, para no acoplar el componente a un servicio concreto.
export const ServicesGrid = ({ services }: ServicesGridProps) => {
  const principales = services.filter((s) => s.category === "principal");
  const complementarios = services.filter((s) => s.category === "complementario");

  return (
    <section id="services-grid" style={{ padding: "80px 0 128px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Primer contenido de la página (sin Hero encima) — animación
            disparada al montar, no al hacer scroll, mismo criterio que
            Hero.tsx para contenido garantizado en el viewport inicial. */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="slabel">Soluciones de Ciberseguridad</div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          {principales.map((service, i) => (
            <ServiceCard key={service.slug} service={service} featured={i === 0} />
          ))}
        </motion.div>

        {complementarios.length > 0 && (
          <div style={{ marginTop: 80, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            <Reveal x={-20} y={0}>
              <div
                className="font-mono"
                style={{
                  color: "var(--muted)",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                Capacidad complementaria
              </div>
            </Reveal>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              style={{ maxWidth: 460 }}
            >
              {complementarios.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
