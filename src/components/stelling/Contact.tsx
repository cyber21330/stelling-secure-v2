import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { toast } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

const schema = z.object({
  nombre: z.string().trim().min(1, "Introduce tu nombre").max(100),
  email: z.string().trim().email("Email no válido").max(255),
  empresa: z.string().trim().max(200).optional().or(z.literal("")),
  mensaje: z.string().trim().min(1, "Cuéntanos brevemente tu proyecto").max(1000),
});

type FieldName = "nombre" | "email" | "empresa" | "mensaje";
const ERROR_COLOR = "#FF2D78";

const inputBase: React.CSSProperties = {
  background: "#0F0F1A",
  color: "#F0EEF8",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 300,
  fontSize: 14,
  padding: "14px 18px",
  borderRadius: 2,
  width: "100%",
  outline: "none",
  transition: "border-color 0.25s ease",
  borderWidth: 1,
  borderStyle: "solid",
};

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<{ reset: () => void }>(null);

  const borderFor = (name: FieldName, focused: boolean) => {
    if (errors[name]) return ERROR_COLOR;
    if (focused) return "#00E5FF";
    if (touched[name]) return "rgba(0,229,255,0.2)";
    return "rgba(240,238,248,0.07)";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    if (fd.get("_gotcha")) return;

    if (!turnstileToken) {
      toast.error("Completa la verificación de seguridad.");
      return;
    }

    const data = {
      nombre: String(fd.get("nombre") || ""),
      email: String(fd.get("email") || ""),
      empresa: String(fd.get("empresa") || ""),
      mensaje: String(fd.get("mensaje") || ""),
    };

    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Partial<Record<FieldName, string>> = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as FieldName;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      setTouched({ nombre: true, email: true, empresa: true, mensaje: true });
      setShakeKey((k) => k + 1);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (res.ok) {
        toast.success("Mensaje enviado. Te respondemos en menos de 48h.");
        form.reset();
        setTouched({});
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      } else {
        const err = await res.json() as { error: string };
        toast.error(err.error || "Error al enviar. Escríbenos a hola@stellingsecure.com");
        turnstileRef.current?.reset();
      }
    } catch {
      toast.error("Error de conexión. Escríbenos a hola@stellingsecure.com");
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (
    name: FieldName,
    placeholder: string,
    type: "text" | "email" | "textarea",
    required = true
  ) => {
    const errorMsg = errors[name];
    const shake = errorMsg ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 };
    const common = {
      name,
      required,
      placeholder,
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTouched((t) => ({ ...t, [name]: true }));
        e.currentTarget.style.borderColor = borderFor(name, false);
      },
      onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = errors[name] ? ERROR_COLOR : "#00E5FF";
      },
      onChange: () => {
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
      },
      style: { ...inputBase, borderColor: errorMsg ? ERROR_COLOR : "rgba(240,238,248,0.07)" },
    };

    return (
      <div>
        <motion.div key={`${name}-${shakeKey}`} animate={shake} transition={{ duration: 0.4 }}>
          {type === "textarea"
            ? <textarea {...common} rows={5} style={{ ...common.style, resize: "vertical" }} />
            : <input {...common} type={type} />}
        </motion.div>
        {errorMsg && (
          <p style={{ color: ERROR_COLOR, fontSize: 11, marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>
            {errorMsg}
          </p>
        )}
      </div>
    );
  };

  return (
    <section
      id="contact"
      style={{
        padding: "128px 24px",
        background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(123,79,255,0.07) 0%, transparent 70%), #050508",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F0EEF8", fontWeight: 700, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1, marginBottom: 16 }}>
            Contacta con Stelling Secure
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "'Syne', sans-serif", color: "rgba(0,229,255,0.6)", fontSize: 22, fontWeight: 400, marginBottom: 48 }}>
            Cuéntanos tu proyecto. Primera consulta sin coste.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}
          >
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 10, letterSpacing: "0.05em", textAlign: "center" }}>
              ✓ Primera consulta sin coste · ✓ Respuesta en &lt; 48h · ✓ Sin permanencias
            </p>

            {renderField("nombre", "Nombre", "text")}
            {renderField("email", "Email", "email")}
            {renderField("empresa", "Web / Empresa (opcional)", "text", false)}
            {renderField("mensaje", "Cuéntanos brevemente tu proyecto", "textarea")}

            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <Turnstile
              ref={turnstileRef}
              siteKey={SITE_KEY}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark", language: "es" }}
            />

            <button
              type="submit"
              disabled={submitting || !turnstileToken}
              style={{
                background: "linear-gradient(135deg, #7B4FFF, #00E5FF)",
                color: "#050508",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "16px 32px",
                borderRadius: 2,
                width: "100%",
                border: "none",
                marginTop: 8,
                opacity: submitting || !turnstileToken ? 0.7 : 1,
                transition: "opacity 0.25s ease",
                cursor: submitting || !turnstileToken ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Enviando..." : "Solicitar consulta gratuita →"}
            </button>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 10, textAlign: "center" }}>
              🔒 Tus datos están protegidos. No compartimos tu información.
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6880", fontSize: 11, textAlign: "center" }}>
              También puedes escribirnos a{" "}
              <a href="mailto:hola@stellingsecure.com" style={{ color: "#00E5FF" }}>
                hola@stellingsecure.com
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
