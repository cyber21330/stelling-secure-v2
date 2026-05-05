import { Logo } from "./Logo";

const FooterLink = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a
    href={href}
    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6B6880", display: "block", padding: "4px 0", transition: "color 0.2s ease" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#00E5FF")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6880")}
  >
    {children}
  </a>
);

export const Footer = () => (
  <footer style={{ background: "#09090F", borderTop: "1px solid rgba(240,238,248,0.06)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Logo size={32} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F0EEF8", letterSpacing: "0.15em", fontSize: 13, fontWeight: 600 }}>
            STELLING <span style={{ background: "linear-gradient(90deg, #7B4FFF, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>SECURE</span>
          </span>
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 11, marginBottom: 4 }}>
          Desarrollo web & Seguridad digital
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 11, marginBottom: 24 }}>
          Valencia, España
        </p>
        <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(0,229,255,0.35)", fontSize: 18, fontWeight: 500 }}>
          Tu negocio, construido y blindado.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00E5FF", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Servicios
          </div>
          <FooterLink href="#services">Desarrollo Web</FooterLink>
          <FooterLink href="#services">Seguridad Web</FooterLink>
          <FooterLink href="#services">Auditoría</FooterLink>
          <FooterLink href="#services">Consultoría</FooterLink>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00E5FF", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Empresa
          </div>
          <FooterLink href="#process">Proceso</FooterLink>
          <FooterLink href="#faq">FAQ</FooterLink>
          <FooterLink href="#contact">Contacto</FooterLink>
          <FooterLink href="mailto:hola@stellingsecure.com">hola@stellingsecure.com</FooterLink>
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px", borderTop: "1px solid rgba(240,238,248,0.04)", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 10 }}>
        © 2026 Stelling Secure. Todos los derechos reservados.
      </p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 10 }}>
        Hecho con precisión en Valencia.
      </p>
    </div>
  </footer>
);