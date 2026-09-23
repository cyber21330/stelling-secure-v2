import { Logo } from "./Logo";

const FooterLink = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a
    href={href}
    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--muted)", display: "block", padding: "4px 0", transition: "color 0.2s ease" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--shield)")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
  >
    {children}
  </a>
);

export const Footer = () => (
  <footer style={{ background: "var(--bg2)", borderTop: "1px solid rgba(240,238,248,0.06)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Logo size={32} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text)", letterSpacing: "0.15em", fontSize: 13, fontWeight: 600 }}>
            STELLING <span className="grad-text">SECURE</span>
          </span>
        </div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", fontSize: 11, marginBottom: 4 }}>
          Ciberseguridad para PYMEs.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", fontSize: 11, marginBottom: 24 }}>
          Valencia, España
        </p>
        <p className="font-display" style={{ color: "var(--text-secondary)", fontSize: 18, fontWeight: 500 }}>
          Tu negocio, construido y blindado.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--shield)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Servicios
          </div>
          <FooterLink href="/servicios/auditoria-seguridad-web/">Auditoría de Seguridad Web</FooterLink>
          <FooterLink href="/servicios/evaluacion-ciberseguridad-pymes/">Evaluación de Ciberseguridad para PYMES</FooterLink>
          <FooterLink href="/servicios/desarrollo-seguro/">Desarrollo Seguro</FooterLink>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--shield)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Empresa
          </div>
          <FooterLink href="/#how-we-work">Cómo trabajamos</FooterLink>
          <FooterLink href="/#faq">FAQ</FooterLink>
          <FooterLink href="/#contact">Contacto</FooterLink>
          <FooterLink href="mailto:hola@stellingsecure.com">hola@stellingsecure.com</FooterLink>
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px", borderTop: "1px solid var(--faint)", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <FooterLink href="/legal/aviso-legal/">Aviso Legal</FooterLink>
        <FooterLink href="/legal/privacidad/">Política de Privacidad</FooterLink>
        <FooterLink href="/legal/cookies/">Política de Cookies</FooterLink>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", fontSize: 10 }}>
          © 2026 Stelling Secure. Todos los derechos reservados.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted)", fontSize: 10 }}>
          Hecho con precisión en Valencia.
        </p>
      </div>
    </div>
  </footer>
);