interface ContactPayload {
  nombre: string;
  email: string;
  empresa?: string;
  mensaje: string;
  turnstileToken: string;
}

// Límite de tamaño de la petición (10 KB): evita cuerpos enormes
const MAX_BYTES = 10_000;

// Formato básico de email: algo@algo.algo, sin espacios
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devuelve el texto recortado si es una cadena no vacía dentro del límite; si no, null
function textoValido(valor: unknown, maxLen: number): string | null {
  if (typeof valor !== "string") return null;
  const limpio = valor.trim();
  if (limpio.length === 0 || limpio.length > maxLen) return null;
  return limpio;
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://stellingsecure.com",
    "Content-Type": "application/json",
  };

  // Mensaje genérico: no revelamos al visitante qué campo falló
  const datosNoValidos = () =>
    new Response(JSON.stringify({ error: "Datos no válidos" }), { status: 400, headers });

  try {
    // Rechazo rápido si la petición declara un cuerpo demasiado grande
    const declarado = Number(request.headers.get("content-length") ?? 0);
    if (declarado > MAX_BYTES) {
      return new Response(JSON.stringify({ error: "Petición demasiado grande" }), { status: 413, headers });
    }

    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return datosNoValidos();
    }
    const { nombre, email, empresa, mensaje, turnstileToken } = body as Record<string, unknown>;

    // Validación estricta de cada campo (tipo, longitud y formato)
    const nombreL = textoValido(nombre, 100);
    const emailL = textoValido(email, 254);
    const mensajeL = textoValido(mensaje, 2000);
    const tokenL = textoValido(turnstileToken, 2048);
    // La empresa es opcional: si no viene, se usa cadena vacía
    const empresaL = typeof empresa === "string" ? empresa.trim() : "";

    if (!nombreL || !emailL || !mensajeL || !tokenL || empresaL.length > 100 || !EMAIL_RE.test(emailL)) {
      return datosNoValidos();
    }

    // Verificar Turnstile
    const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: tokenL,
      }),
    });
    const tsData = await tsRes.json() as { success: boolean };
    if (!tsData.success) {
      return new Response(JSON.stringify({ error: "Verificación de seguridad fallida" }), { status: 403, headers });
    }

    // Enviar email via EmailJS REST API
    const ejRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_PUBLIC_KEY,
        accessToken: env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: nombreL,
          from_email: emailL,
          empresa: empresaL || "No indicada",
          message: mensajeL,
        },
      }),
    });

    if (!ejRes.ok) {
      return new Response(JSON.stringify({ error: "Error al enviar el mensaje" }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });

  } catch {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500, headers });
  }
};
