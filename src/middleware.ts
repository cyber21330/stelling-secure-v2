import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Nonce criptográfico único por request — 128 bits de entropía
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...bytes));

  context.locals.cspNonce = nonce;

  const response = await next();

  const csp = [
    "default-src 'self'",
    // 'nonce-{nonce}' permite los scripts inyectados por Astro; Turnstile necesita su dominio
    `script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com`,
    // unsafe-inline necesario para atributos style="" inline y estilos de Tailwind
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: https:",
    // Turnstile usa fetch a su propia API
    "connect-src 'self' https://challenges.cloudflare.com",
    // Turnstile renderiza en un iframe
    "frame-src https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  return response;
});
