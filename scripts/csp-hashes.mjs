// Post-build: calcula la huella (SHA-256) de cada script incrustado de las páginas
// generadas en dist/ y la escribe en dist/_headers, sustituyendo el marcador
// __SCRIPT_HASHES__ de la política CSP (script-src).
//
// Por qué: así la CSP puede prescindir de 'unsafe-inline'. El navegador solo ejecutará
// los scripts incrustados cuyo contenido coincida exactamente con una de estas huellas.
// Si Astro se actualiza y sus scripts cambian, las huellas se recalculan solas en la
// siguiente compilación. Este script falla (y por tanto falla el despliegue) si algo
// no cuadra, así nunca se publica una CSP rota.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const DIST = "dist";
const MARCADOR = "__SCRIPT_HASHES__";
const MAX_LINEA = 1900; // Cloudflare Pages limita cada línea de _headers a 2000 caracteres

function fallar(mensaje) {
  console.error(`[csp-hashes] ERROR: ${mensaje}`);
  process.exit(1);
}

// Devuelve las rutas de todos los .html de una carpeta (recursivo)
function paginasHtml(dir) {
  const rutas = [];
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) rutas.push(...paginasHtml(ruta));
    else if (entrada.name.endsWith(".html")) rutas.push(ruta);
  }
  return rutas;
}

const huellas = new Set();
const paginas = paginasHtml(DIST);
if (paginas.length === 0) fallar(`no hay páginas .html en ${DIST}/`);

const reScript = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
for (const pagina of paginas) {
  const html = readFileSync(pagina, "utf8");
  for (const m of html.matchAll(reScript)) {
    const atributos = m[1];
    // Script externo: lo cubre 'self' (o el dominio permitido), no necesita huella
    if (/\bsrc\s*=/.test(atributos)) continue;
    // Bloques de datos que el navegador no ejecuta (p. ej. JSON-LD): la CSP no los restringe
    const tipo = atributos.match(/\btype\s*=\s*["']([^"']+)["']/i);
    if (tipo && !["module", "text/javascript"].includes(tipo[1].toLowerCase())) continue;
    const huella = createHash("sha256").update(m[2], "utf8").digest("base64");
    huellas.add(`'sha256-${huella}'`);
  }
}

if (huellas.size === 0) {
  fallar("no se encontró ningún script incrustado; es raro y puede indicar un cambio inesperado");
}

const rutaHeaders = join(DIST, "_headers");
const cabeceras = readFileSync(rutaHeaders, "utf8");
if (!cabeceras.includes(MARCADOR)) {
  fallar(`${rutaHeaders} no contiene el marcador ${MARCADOR}`);
}

const resultado = cabeceras.replaceAll(MARCADOR, [...huellas].sort().join(" "));
if (resultado.includes(MARCADOR)) fallar("quedó algún marcador sin sustituir");
const larga = resultado.split("\n").find((linea) => linea.length > MAX_LINEA);
if (larga) fallar(`una línea de _headers supera ${MAX_LINEA} caracteres (${larga.length})`);

writeFileSync(rutaHeaders, resultado, "utf8");
console.log(`[csp-hashes] ${huellas.size} huella(s) de script escritas en ${rutaHeaders} (${paginas.length} páginas revisadas)`);
