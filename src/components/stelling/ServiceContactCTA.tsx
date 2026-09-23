// Presentación, no contenido: enlaza a /#contact, mismo patrón que
// Navbar.tsx:20. Texto fijo aprobado por Estrategia.
export const ServiceContactCTA = () => (
  <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid var(--line)", textAlign: "center" }}>
    <a
      href="/#contact"
      className="font-mono"
      style={{
        display: "inline-block",
        background: "var(--grad-main)",
        color: "var(--bg-0)",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "16px 40px",
        borderRadius: 2,
        textDecoration: "none",
        transition: "opacity 0.25s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      Solicitar Diagnóstico Ejecutivo
    </a>
  </div>
);
