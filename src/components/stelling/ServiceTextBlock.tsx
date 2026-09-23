interface ServiceTextBlockProps {
  heading: string;
  text?: string;
}

// Bloque reutilizable para campos de texto libre del servicio
// (problem, risk, evidence, decision, remediation, targetClient, scope).
// Si `text` no existe, no renderiza nada — nunca placeholder.
export const ServiceTextBlock = ({ heading, text }: ServiceTextBlockProps) => {
  if (!text) return null;

  return (
    <div style={{ marginBottom: 48 }}>
      <h2
        className="font-display"
        style={{
          color: "var(--text)",
          fontWeight: 600,
          fontSize: 22,
          marginBottom: 12,
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: "var(--muted)",
          fontSize: 15,
          lineHeight: 1.8,
          maxWidth: 720,
        }}
      >
        {text}
      </p>
    </div>
  );
};
