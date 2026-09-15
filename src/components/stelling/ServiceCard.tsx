import { motion } from "framer-motion";

interface ServiceCardData {
  slug: string;
  title: string;
  description: string;
  category: "principal" | "complementario";
}

interface ServiceCardProps {
  service: ServiceCardData;
  featured?: boolean;
}

export const ServiceCard = ({ service, featured = false }: ServiceCardProps) => {
  const isComplementary = service.category === "complementario";

  return (
    <motion.a
      href={`/servicios/${service.slug}/`}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      style={{
        display: "block",
        textDecoration: "none",
        background: featured ? "var(--bg4)" : "var(--bg3)",
        border: featured ? "1px solid var(--violet-bdr)" : "1px solid var(--line)",
        borderRadius: 3,
        padding: isComplementary ? 24 : featured ? 48 : 32,
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = featured ? "#7B4FFF" : "rgba(0,229,255,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = featured ? "var(--violet-bdr)" : "var(--line)";
      }}
    >
      {featured && (
        <div
          className="font-mono"
          style={{
            color: "var(--cyan)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: 0.8,
          }}
        >
          Servicio insignia
        </div>
      )}
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          color: "var(--text)",
          fontWeight: featured ? 700 : 600,
          fontSize: featured ? "clamp(26px, 3.5vw, 36px)" : isComplementary ? 18 : 24,
          marginBottom: isComplementary ? 8 : 12,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: "var(--muted)",
          fontSize: isComplementary ? 13 : 15,
          lineHeight: 1.75,
        }}
      >
        {service.description}
      </p>
    </motion.a>
  );
};
