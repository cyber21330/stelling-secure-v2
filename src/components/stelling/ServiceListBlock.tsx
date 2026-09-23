interface ServiceListBlockProps {
  heading: string;
  items?: string[];
}

// Bloque reutilizable para campos de lista del servicio
// (evaluation, deliverables, limitations). Si `items` no existe o
// está vacío, no renderiza nada — nunca placeholder.
export const ServiceListBlock = ({ heading, items }: ServiceListBlockProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: 48 }}>
      <h2
        className="font-display"
        style={{
          color: "var(--text)",
          fontWeight: 600,
          fontSize: 22,
          marginBottom: 16,
        }}
      >
        {heading}
      </h2>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--muted)",
              fontSize: 15,
              lineHeight: 1.7,
              paddingLeft: 20,
              position: "relative",
              listStyle: "none",
            }}
          >
            <span style={{ position: "absolute", left: 0, color: "var(--shield)" }}>—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
