interface ContactPayload {
  nombre: string;
  email: string;
  empresa?: string;
  mensaje: string;
  turnstileToken: string;
}

// ⚠️ DEBUG TEMPORAL (BREACH/SHIELD): este handler expone el mensaje de error
// real en la respuesta HTTP para diagnosticar el 500 desde la pestaña Network.
// Es information disclosure (CWE-209) en un endpoint público — revertir a la
// versión que devuelve solo "Error interno del servidor" en cuanto se
// identifique la causa. NO dejar así en producción de forma permanente.
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://stellingsecure.com",
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json() as ContactPayload;
    const { nombre, email, empresa, mensaje, turnstileToken } = body;

    // Validación básica
    if (!nombre || !email || !mensaje || !turnstileToken) {
      return new Response(JSON.stringify({ error: "Campos requeridos incompletos" }), { status: 400, headers });
    }

    // Verificar Turnstile
    const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });
    const tsData = await tsRes.json() as { success: boolean; ["error-codes"]?: string[] };
    if (!tsData.success) {
      return new Response(JSON.stringify({
        error: "Verificación de seguridad fallida",
        debug: { step: "turnstile-verify", status: tsRes.status, tsData },
      }), { status: 403, headers });
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
          from_name: nombre,
          from_email: email,
          empresa: empresa || "No indicada",
          message: mensaje,
        },
      }),
    });

    if (!ejRes.ok) {
      const ejBody = await ejRes.text();
      return new Response(JSON.stringify({
        error: "Error al enviar el mensaje",
        debug: { step: "emailjs-send", status: ejRes.status, statusText: ejRes.statusText, body: ejBody },
      }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });

  } catch (err) {
    // Log server-side (visible en `wrangler pages deployment tail` / dashboard Cloudflare)
    console.error("contact.ts error:", err);
    return new Response(JSON.stringify({
      error: "Error interno del servidor",
      debug: err instanceof Error
        ? { name: err.name, message: err.message }
        : { raw: String(err) },
    }), { status: 500, headers });
  }
};
