# Visual System V2 — Fase 2A: Token Normalization (Especificación)

> Estado: **especificación, sin implementación.** Ningún componente fue
> modificado al redactar este documento. Requiere aprobación de
> Estrategia antes de tocar código. Trabajo en paralelo a H2 (Hero
> checkpoint pendiente de revisión del usuario, Services/Home en
> pausa) — cero solapamiento de archivos entre ambos bloques.

**Principio de esta fase, no negociable:** *ANTES ≈ DESPUÉS
VISUALMENTE.* Fase 2A sustituye valores hardcodeados por `var(--token)`
**solo cuando el valor hardcodeado coincide de forma exacta** con un
token ya declarado en `global.css`. Cualquier valor que no tenga una
coincidencia exacta (opacidades distintas, ángulos de gradiente
distintos, etc.) queda **fuera de esta fase** por definición — eso es
Fase 2B (consolidación/cambio visual deliberado), no 2A.

---

## A. Colores hardcodeados → tokens existentes (mapeo 1:1 exacto)

Cada fila es una coincidencia byte-a-byte entre el valor hardcodeado y
el token ya declarado en `global.css:33-52`. Sin ambigüedad, sin
redondeo, sin aproximación.

| Valor hardcodeado | Token | Archivo:línea |
|---|---|---|
| `#00E5FF` | `var(--cyan)` | `Contact.tsx:45,127`; `CustomCursor.tsx:46,75,90`; `FAQ.tsx:37,52`; `Footer.tsx:7`; `Hero.tsx:154`; `Logo.tsx:26`; `Navbar.tsx:131,176,198,222,293,344`; `PromiseList.tsx` (vía gradiente, ver B); `ServiceDetail.tsx` (n/a — usa rgba, ver exclusiones) |
| `#7B4FFF` | `var(--violet)` | `CustomCursor.tsx:46`; `Logo.tsx:15,27`; `ServiceCard.tsx:35`; `WhyUs.tsx:53` |
| `#F0EEF8` | `var(--text)` | `Contact.tsx:22,161`; `FAQ.tsx:23,46`; `Footer.tsx:20`; `HowWeWork.tsx:54`; `Navbar.tsx:103,204,252,293,345,349`; `Process.tsx:18,62`; `WhatsAppFab.tsx:41`; `WhyUs.tsx:19,54`; `empresa/como-trabajamos.astro:18`; `empresa/nuestro-compromiso.astro:24`; `empresa/quienes-somos.astro:18` |
| `#A5A2BD` | `var(--muted)` | `Contact.tsx:177,227,230`; `FAQ.tsx:67`; `Footer.tsx:6,8,24,27,58,61`; `Hero.tsx:68,175,195`; `HowWeWork.tsx:21,57`; `Navbar.tsx:131,170,177,198,205,320`; `Process.tsx:65`; `Stats.tsx:51`; `WhyUs.tsx:24,57` |
| `#050508` | `var(--bg)` | `Contact.tsx:208` (color de texto de botón); `Hero.tsx:132`; `Navbar.tsx:271`; `StickyCTA.tsx:32`; también el color final de los dos `radial-gradient(...)` en `Hero.tsx:50` y `Contact.tsx:156` (sustitución parcial — ver nota) |
| `#09090F` | `var(--bg2)` | `FAQ.tsx:17`; `Footer.tsx:15`; `Stats.tsx:13`; `WhatsAppFab.tsx:39`; `WhyUs.tsx:13` |
| `#0F0F1A` | `var(--bg3)` | `Contact.tsx:21`; `PromiseList.tsx:35`; `WhyUs.tsx:44` |
| `#FF2D78` (`ERROR_COLOR`) | `var(--magenta)` | `Contact.tsx:18` (declaración de la constante — sustituir el valor asignado, no la constante en sí) |
| `rgba(240,238,248,0.07)` | `var(--line)` | `Contact.tsx:47,132`; `FAQ.tsx:36`; `Navbar.tsx:90`; `PromiseList.tsx:36,42`; `WhyUs.tsx:45,51` |
| `rgba(240,238,248,0.04)` | `var(--faint)` | `Footer.tsx:57` |
| `rgba(123,79,255,0.3)` | `var(--violet-bdr)` | `PromiseList.tsx:41`; `WhyUs.tsx:50` |

**Nota sobre `Hero.tsx:50` y `Contact.tsx:156`:** ambas líneas combinan
dos partes distintas en un solo string de `radial-gradient(...)`: un
stop intermedio en `rgba(123,79,255,0.07)` (sin token exacto — ver
sección "Excluido de 2A" más abajo) y el color final `#050508` (match
exacto de `--bg`). Solo la segunda parte entra en 2A; el string queda
como `radial-gradient(ellipse ..., rgba(123,79,255,0.07) 0%,
transparent 70%), var(--bg)` — cambio parcial dentro de la misma línea,
resultado visual idéntico.

---

## B. Las copias de `--grad-main` / `--grad-text` — listado exacto

Al revisar línea por línea para esta especificación (más estricto que
el barrido de Fase 1) se identifican **tres gradientes distintos**, no
uno solo — es importante no tratarlos como intercambiables:

### B.1 — `linear-gradient(135deg, #7B4FFF, #00E5FF)` → `var(--grad-main)` (7 ocurrencias, match exacto)

| Archivo:línea | Uso |
|---|---|
| `Contact.tsx:207` | Fondo del botón de envío |
| `Hero.tsx:131` | Fondo del CTA principal |
| `HowWeWork.tsx:45` | Número de paso (gradiente de texto, ver nota) |
| `Process.tsx:53` | Número de paso |
| `PromiseList.tsx:48` | Número de promesa |
| `Stats.tsx:42` | Valor numérico de estadística |
| `StickyCTA.tsx:30` | Fondo del botón sticky móvil |

Nota: `HowWeWork.tsx:45`, `Process.tsx:53`, `PromiseList.tsx:48` y
`Stats.tsx:42` usan este gradiente como **texto** vía
`WebkitBackgroundClip`, no como fondo sólido — el reemplazo por
`var(--grad-main)` es igualmente exacto (es el mismo valor de
`background`, el clip-to-text es una propiedad aparte que no cambia).

### B.2 — `linear-gradient(90deg, #7B4FFF, #00E5FF)` + `WebkitBackgroundClip` → `var(--grad-text)` / clase `.grad-text` (2 ocurrencias, match exacto)

| Archivo:línea | Uso |
|---|---|
| `Navbar.tsx:104` | "SECURE" del logotipo de texto |
| `Footer.tsx:21` | "SECURE" del logotipo de texto |

`global.css:91-96` ya define la clase `.grad-text` con exactamente este
patrón (`background: var(--grad-text)` + las 3 propiedades de clip) —
el reemplazo aquí es aplicar `className="grad-text"` al `<span>` y
eliminar el `style` inline duplicado, no solo sustituir el valor del
gradiente.

### B.3 — `linear-gradient(180deg, #7B4FFF, #00E5FF)` — **sin match exacto, excluido de 2A**

| Archivo:línea | Uso |
|---|---|
| `Hero.tsx:202` | Línea decorativa vertical bajo el indicador "SCROLL" |

Ángulo distinto (180deg vs 135deg) — no coincide con `--grad-main` ni
con ningún otro token declarado. Sustituirlo por `var(--grad-main)`
cambiaría la dirección visual del degradado (violaría el criterio
ANTES ≈ DESPUÉS de esta fase). Queda fuera de 2A; candidato a Fase 2B
si se decide crear un token nuevo para este caso, o a excepción
documentada si se mantiene como caso único.

**Corrección respecto a Fase 1:** el documento de Fase 1 mencionó "8
archivos" de forma agregada; el recuento línea-a-línea para esta
especificación da **7 + 2 = 9 ocurrencias en 8 archivos distintos**
repartidas en 3 gradientes no intercambiables entre sí (B.1/B.2/B.3) —
esta especificación es la referencia correcta, más precisa que el
resumen de Fase 1.

---

## C. Fondos hardcodeados → tokens actuales

(Subconjunto de A, aislado aquí por claridad ya que el encargo lo pide
como sección propia)

| Valor | Token | Archivo:línea |
|---|---|---|
| `#050508` | `var(--bg)` | `Navbar.tsx:271`; `StickyCTA.tsx:32` (color, no background); ver también A |
| `#09090F` | `var(--bg2)` | `FAQ.tsx:17`; `Footer.tsx:15`; `Stats.tsx:13`; `WhatsAppFab.tsx:39`; `WhyUs.tsx:13` |
| `#0F0F1A` | `var(--bg3)` | `Contact.tsx:21`; `PromiseList.tsx:35`; `WhyUs.tsx:44` |

**Excluido de 2A (sin match exacto):** `rgba(5,5,8,0.92)` (`Navbar.tsx:87`,
header con scroll) y `rgba(9,9,15,0.98)` (`Navbar.tsx:152`, fondo del
dropdown) — ninguno de los dos tiene un token de "fondo translúcido"
declarado; son valores de opacidad únicos sin equivalente exacto.

---

## D. Borders hardcodeados → tokens actuales

| Valor | Token | Archivo:línea |
|---|---|---|
| `rgba(240,238,248,0.07)` | `var(--line)` | `Contact.tsx:47,132`; `FAQ.tsx:36`; `Navbar.tsx:90`; `PromiseList.tsx:36,42`; `WhyUs.tsx:45,51` |
| `rgba(123,79,255,0.3)` | `var(--violet-bdr)` | `PromiseList.tsx:41`; `WhyUs.tsx:50` |

**Excluido de 2A (sin match exacto — candidatos a consolidación en Fase 2B):**
`rgba(240,238,248,0.04)` ya cubierto en A como `--faint` (Footer.tsx:57,
correctamente incluido); pero `rgba(240,238,248,0.05)` (`Stats.tsx:14,15`),
`rgba(240,238,248,0.06)` (`Footer.tsx:15` — nota: este es el borde, no
el fondo de esa misma línea; `Stats.tsx:34`), `rgba(240,238,248,0.08)`
(`Navbar.tsx:153`) — cuatro variantes de opacidad sin token exacto.
`rgba(0,229,255,0.2)` (`Contact.tsx:46`; `Process.tsx:30`;
`WhatsAppFab.tsx:40`), `rgba(0,229,255,0.3)` (`Navbar.tsx:221`),
`rgba(0,229,255,0.35)` (`Hero.tsx:153`; `ServiceCard.tsx:35`) — tres
variantes de opacidad de cian, ninguna coincide con `--cyan-bdr` (0.22).

---

## E. Colores tipográficos hardcodeados → tokens actuales

(Subconjunto de A — texto primario y muted; aislado aquí por claridad)

| Valor | Token | Cobertura |
|---|---|---|
| `#F0EEF8` | `var(--text)` | 21 ocurrencias en 12 archivos — ver tabla completa en A |
| `#A5A2BD` | `var(--muted)` | 26 ocurrencias en 12 archivos — ver tabla completa en A |

**Excluido de 2A (sin match exacto):** `rgba(0,229,255,0.6)`,
`rgba(0,229,255,0.7)` (`Hero.tsx:106`; `Contact.tsx:166`;
`ServiceDetail.tsx:42`), `rgba(0,229,255,0.8)` (`CustomCursor.tsx:79`,
boxShadow no color de texto, pero afín) — colores de texto/acento con
opacidad reducida sin token declarado para esos niveles exactos.

---

## F. Excepciones que permanecen sin tocar (y por qué)

| Elemento | Motivo | Cumple las 3 condiciones de `token-governance.md` |
|---|---|---|
| `Logo.tsx` (SVG completo) | Marca autocontenida — un logo debe poder exportarse/reutilizarse fuera del proyecto sin depender de `global.css` | Sí |
| `#25D366` + `rgba(37,211,102,0.35)` (`WhatsAppFab.tsx:59`) | Verde y sombra oficiales de marca de WhatsApp, no forman parte de la identidad propia | Sí |
| `content="#050508"` en `<meta name="theme-color">` (`Layout.astro:31`) | Atributo HTML, no CSS — `var()` no se resuelve ahí | Sí |
| Los 15 valores listados como "sin match exacto" en C/D/E | No son excepciones permanentes — son candidatos a Fase 2B (consolidación con cambio visual deliberado y revisado), no exclusiones definitivas | N/A — pendiente de fase, no de excepción |

---

## G. Lista completa de archivos afectados por 2A

`Contact.tsx`, `CustomCursor.tsx`, `FAQ.tsx`, `Footer.tsx`, `Hero.tsx`
(parcial — ver nota en A), `HowWeWork.tsx`, `Logo.tsx` (**no** afectado,
ver F), `Navbar.tsx`, `Process.tsx`, `PromiseList.tsx`, `ServiceCard.tsx`
(1 de sus 2 valores en la línea 35), `Stats.tsx`, `StickyCTA.tsx`,
`WhyUs.tsx`, `empresa/como-trabajamos.astro`,
`empresa/nuestro-compromiso.astro`, `empresa/quienes-somos.astro`.

**No afectados por 2A:** `Logo.tsx`, `WhatsAppFab.tsx` (su único hex es
la excepción de marca, F), `ServiceDetail.tsx` (su único valor
—`rgba(0,229,255,0.7)`— no tiene match exacto), `ServiceTextBlock.tsx`,
`ServiceListBlock.tsx`, `ServiceContactCTA.tsx`, `ServicesGrid.tsx` (ya
usan tokens desde su construcción — Tarea #6), `Layout.astro` (su único
hex es la excepción del `meta`, F; sus dos `rgba` decorativos no tienen
match exacto).

---

## H. Riesgo de regresión por archivo

| Categoría | Archivos | Riesgo |
|---|---|---|
| **Mecánico puro** (buscar-reemplazar 1:1, cero ambigüedad) | `Contact.tsx`, `FAQ.tsx`, `Footer.tsx` (excepto B.2), `HowWeWork.tsx`, `Process.tsx`, `PromiseList.tsx`, `Stats.tsx`, `StickyCTA.tsx`, `WhyUs.tsx`, las 3 páginas `empresa/*.astro` | Bajo — el valor resultante es carácter-por-carácter el mismo color, solo cambia su origen (literal → variable) |
| **Mecánico + estructural** (sustituir + aplicar clase existente) | `Navbar.tsx:104`, `Footer.tsx:21` (B.2) | Bajo-medio — requiere reemplazar un bloque de 3 propiedades por una clase, no solo un valor; revisar que `.grad-text` no tenga ninguna diferencia de especificidad CSS frente al inline actual |
| **Mecánico parcial** (una línea, dos valores, uno sí/uno no aplica) | `Hero.tsx:50,153` (background del glow), `Contact.tsx:156`, `ServiceCard.tsx:35` | Medio — riesgo de tocar por error el valor sin match exacto que está en la misma línea; requiere edición quirúrgica, no reemplazo de línea completa |
| **Alto volumen, mismo patrón repetido** | `Navbar.tsx` (14 ocurrencias en un solo archivo, muchas dentro de `onMouseEnter`/`onMouseLeave` que asignan `style.color` directamente vía JS, no JSX) | Medio — no por ambigüedad de color, sino porque son asignaciones imperativas (`e.currentTarget.style.color = "#00E5FF"`) mezcladas con las declarativas del `style={{}}` inicial; hay que verificar que ambas versiones (inicial + hover) queden consistentes tras la migración |

En todos los casos, "riesgo medio" se refiere a la superficie de
revisión necesaria (líneas a inspeccionar con cuidado), no a
probabilidad de cambio visual — el criterio J exige que, aplicado
correctamente, **ningún** archivo de esta lista produzca una diferencia
visual perceptible.

---

## I. Orden de migración recomendado

1. **Archivos de un solo tipo de sustitución, sin casos parciales**
   (`FAQ.tsx`, `HowWeWork.tsx`, `Process.tsx`, `PromiseList.tsx`,
   `Stats.tsx`, `StickyCTA.tsx`, `WhyUs.tsx`, las 3 páginas
   `empresa/*.astro`) — valida el patrón de migración con el menor
   riesgo posible antes de tocar los casos complejos.
2. **`Contact.tsx` y `Footer.tsx`** — más ocurrencias por archivo, pero
   siguen siendo sustituciones directas salvo la línea parcial de
   `Contact.tsx:156` y la estructural de `Footer.tsx:21`.
3. **`Hero.tsx`** — mismo criterio, con atención a las líneas parciales
   (50, 153) y a que `Hero.tsx:202` (B.3) se deja intencionalmente sin
   tocar.
4. **`ServiceCard.tsx`** — un solo archivo, una sola línea con
   sustitución parcial (35).
5. **`Navbar.tsx`** — el de mayor volumen y con asignaciones
   imperativas vía JS; se hace al final, cuando el patrón ya está
   validado en los pasos 1-4, y se revisa con especial atención a los
   pares `onMouseEnter`/`onMouseLeave` para no dejar un hover
   inconsistente con su estado base.
6. **`Navbar.tsx:104` / `Footer.tsx:21`** (aplicar `.grad-text`) — al
   final de todo, por ser el único cambio estructural (no solo de
   valor) de toda la fase.

Cada paso, verificación visual real antes de pasar al siguiente — mismo
criterio ya establecido en Hero/Services este sprint (build limpio +
captura de navegador, no solo lectura de código).

---

## J. Criterios de aceptación

- **ANTES ≈ DESPUÉS VISUALMENTE — criterio principal y excluyente.** Si
  algún cambio de esta lista se ve diferente en el navegador (aunque
  sea sutil), ese cambio específico no pertenece a Fase 2A — se retira
  de esta fase y se reclasifica como Fase 2B.
- `npm run build` limpio en cada paso del orden de I.
- Cero valores hex/rgba nuevos introducidos — 2A solo elimina
  duplicación existente, no añade colores.
- Los 15 valores "sin match exacto" (C/D/E) permanecen intactos en el
  código tal cual están hoy — no se tocan, no se aproximan al token más
  cercano, no se redondean.
- `Hero.tsx:202` (B.3) permanece intacto — no se sustituye por
  `var(--grad-main)` aunque comparta los mismos dos colores, por tener
  ángulo distinto.
- Verificación visual real en navegador (desktop + mobile), no solo
  `grep` de confirmación — mismo criterio ya aplicado en Hero/Services.
- Ningún archivo de `src/components/stelling/Service*.tsx` ni
  `src/pages/servicios/*.astro` se toca en esta fase — ya usan tokens
  desde su construcción (Tarea #6), fuera del alcance de esta
  normalización.
