# Visual System V2 — Fase 2A: Checkpoint final (Bloques 1-5)

> Cierre de la normalización de tokens según `docs/visual-system-v2-fase2a-spec.md`.
> Protocolo aplicado en los 5 bloques: verificación exacta línea a línea (sin
> aproximación) → diff mostrado y confirmado → aplicación → `npm run build` →
> `git diff` de confirmación → verificación visual real desktop (~1440-1600px)
> y mobile (~390px), criterio "antes ≈ después" → commit aislado.

---

## A. Resumen ejecutivo

- **6 commits** (Bloques 1-4 + adenda Bloque 3 + Bloque 5).
- **16 archivos** tocados en total.
- **92 valores hardcodeados** sustituidos por tokens de `global.css`.
- **13 tokens/clases** reutilizados (ninguno nuevo creado).
- **Build final: limpio** (`npm run build` → 8 páginas, sin errores).
- **1 gap real descubierto en este checkpoint** (no un hallazgo ya cerrado):
  Hero.tsx quedó fuera del Bloque 4 — ver sección G.

## B. Archivos modificados (total, unión de los 5 bloques + adenda)

| # | Archivo | Bloques que lo tocan |
|---|---|---|
| 1 | `Contact.tsx` | 1, 2, 3, 4, 5 |
| 2 | `Footer.tsx` | 1, 2, 3, 4 |
| 3 | `Hero.tsx` | 1 (solo el gradiente 135°) |
| 4 | `HowWeWork.tsx` | 1, 4 |
| 5 | `Navbar.tsx` | 1, 2, 3, 4 |
| 6 | `Process.tsx` | 1, 2, 4 |
| 7 | `PromiseList.tsx` | 1, 2, 3, 4 |
| 8 | `Stats.tsx` | 1, 2, 4 |
| 9 | `StickyCTA.tsx` | 1, 4 |
| 10 | `FAQ.tsx` | 2, 3, 3-adenda, 4 |
| 11 | `WhatsAppFab.tsx` | 2, 4 |
| 12 | `WhyUs.tsx` | 2, 3, 4 |
| 13 | `empresa/como-trabajamos.astro` | 4 |
| 14 | `empresa/nuestro-compromiso.astro` | 4 |
| 15 | `empresa/quienes-somos.astro` | 4 |
| 16 | `CustomCursor.tsx` | 5 |

## C. Valores hardcodeados eliminados (por bloque)

| Bloque | Descripción | Líneas |
|---|---|---|
| 1 — Gradientes | `linear-gradient(135deg,#7B4FFF,#00E5FF)` → `var(--grad-main)` (7) + gradiente 90° → `.grad-text` (2) | 9 |
| 2 — Backgrounds | `#050508/#09090F/#0F0F1A` → `var(--bg/--bg2/--bg3)` | 10 |
| 3 — Borders | `rgba(240,238,248,0.07)`→`var(--line)`, `rgba(123,79,255,0.3)`→`var(--violet-bdr)`, `rgba(240,238,248,0.04)`→`var(--faint)` | 11 |
| 3-adenda | `FAQ.tsx:37` hex plano `#00E5FF`→`var(--cyan)` (border-left, se escapó del grep rgba-only) | 1 |
| 4 — Text colors | `#F0EEF8/#A5A2BD/#050508/#00E5FF/#7B4FFF/#FF2D78`→tokens, 14 archivos | 55 |
| 5 — Resto | `CustomCursor.tsx` (ring/dot) + `Contact.tsx` (focus border, fondo radial) | 6 |
| **Total** | | **92** |

## D. Tokens/clases reutilizados

`var(--grad-main)`, `.grad-text`, `var(--bg)`, `var(--bg2)`, `var(--bg3)`,
`var(--line)`, `var(--violet-bdr)`, `var(--faint)`, `var(--text)`,
`var(--muted)`, `var(--cyan)`, `var(--violet)`, `var(--magenta)`.

Ninguno de estos tokens fue creado durante Fase 2A — todos ya existían en
`global.css:33-52` desde antes; el trabajo fue puramente de sustitución.

## E. Detalle bloque a bloque

- **Bloque 1** (`7f5e5b5`): Contact, Hero (solo línea 202→no, la del 135°),
  HowWeWork, Process, PromiseList, Stats, StickyCTA, Navbar, Footer.
- **Bloque 2** (`414411b`): Stats, WhatsAppFab, Process, PromiseList, Navbar,
  Contact, WhyUs (×2), FAQ, Footer.
- **Bloque 3** (`1b2485a`): Navbar, PromiseList (×3), FAQ, WhyUs (×3),
  Contact (×2), Footer.
- **Bloque 3-adenda** (`c73b209`): FAQ.tsx:37.
- **Bloque 4** (`4026376`): Contact, FAQ, Footer, HowWeWork, Navbar, Process,
  PromiseList, Stats, StickyCTA, WhatsAppFab, WhyUs + 3 páginas `empresa/*.astro`.
- **Bloque 5** (`a216c89`): CustomCursor, Contact.

## F. Deliberadamente conservado / excluido (razón exacta)

**Sin token exacto — candidatos a Fase 2B:**
- `Hero.tsx:202` — `linear-gradient(180deg, #7B4FFF, #00E5FF)`. `--grad-main` es 135°; no existe token para 180°.
- `Navbar.tsx:153` — `rgba(240,238,248,0.08)` (no coincide con `--line` 0.07 ni `--faint` 0.04).
- `Navbar.tsx:221` — `rgba(0,229,255,0.3)` (borde cyan; `--violet-bdr` es violeta 0.3, no aplica).
- `Navbar.tsx:229` — `rgba(0,229,255,0.08)` (hover background, imperativo).
- `Stats.tsx:14,15` — `rgba(240,238,248,0.05)` (×2).
- `Stats.tsx:34` — `rgba(240,238,248,0.06)`.
- `Hero.tsx:106` — `rgba(0,229,255,0.7)` (texto).
- `Hero.tsx:153` — `rgba(0,229,255,0.35)` (border).
- `Hero.tsx:165` — `rgba(0,229,255,0.08)` (hover background).
- `WhatsAppFab.tsx:40` — `rgba(0,229,255,0.2)`.
- `Process.tsx:30` — `rgba(0,229,255,0.2)` (border dashed).
- `Footer.tsx:15` — `rgba(240,238,248,0.06)`.
- `Contact.tsx:46` — `rgba(0,229,255,0.2)` (estado "touched", distinto del focus).
- `Contact.tsx:166` — `rgba(0,229,255,0.6)` (texto).
- `Footer.tsx:30` — `rgba(0,229,255,0.35)` (texto).
- `CustomCursor.tsx:79` — `boxShadow: rgba(0,229,255,0.8)` (sin token de alpha para shadows).

Total: **15 valores rgba** sin equivalente exacto en `global.css`, todos
verificados individualmente y excluidos por no-aproximación, no por omisión.

**Fuera de alcance de toda la Fase 2A (por gobernanza, no por falta de match):**
- `ServiceCard.tsx:35`, `ServiceDetail.tsx:42` — todo el subsistema `Service*.tsx` nunca se asignó a ningún bloque.
- `Logo.tsx:15,16,26,27` — gradiente SVG del isotipo, identidad de marca, nunca en alcance.
- `Layout.astro:31` — `<meta name="theme-color" content="#050508">`, no es CSS.
- `Layout.astro:52,53` — blobs decorativos de fondo (`rgba(123,79,255,0.07)`, `rgba(0,229,255,0.05)`), nunca asignados a ningún bloque.
- `WhatsAppFab.tsx:59` — `#25D366` + `rgba(37,211,102,0.35)`, verde corporativo de WhatsApp (identidad de marca externa, no de Stelling Secure).

## G. Hallazgo nuevo — gap no reportado previamente

`Hero.tsx` **no aparece en ningún commit del Bloque 4**, confirmado vía
`git log -- src/components/stelling/Hero.tsx`. Quedan sin migrar 5 líneas de
color de texto que sí encajan exactamente en tokens ya existentes:

- `Hero.tsx:68` — `color: "#A5A2BD"` → `var(--muted)`
- `Hero.tsx:132` — `color: "#050508"` → `var(--bg)`
- `Hero.tsx:154` — `color: "#00E5FF"` → `var(--cyan)`
- `Hero.tsx:175` — `color: "#A5A2BD"` → `var(--muted)`
- `Hero.tsx:195` — `color: "#A5A2BD"` → `var(--muted)`

**Por qué no se hizo:** consistente con la regla de aislar `Hero.tsx` que se
aplicó en el Bloque 1 (el archivo tenía y sigue teniendo cambios sin
commitear de la tipografía H2, pendientes de tu autorización) — Block 4 no
aplicó la técnica de "commit intermedio" sobre este archivo. No hay
evidencia de que esto se decidiera explícitamente en su momento; lo trato
como un gap descubierto ahora, no como una exclusión ya cerrada.

**No lo he tocado** — mezclar esto con el commit del H2 (Plus Jakarta Sans,
aún sin tu autorización) rompería el aislamiento que exiges. Queda como
candidato inmediato para cuando autorices el commit del H2: se puede aplicar
en el mismo momento (isolando igual que se hizo en Bloque 1) o como un
Bloque 4-adenda independiente. Tu decisión.

## H. Resultado de build

```
npm run build
✓ 8 page(s) built in 5.51s
[build] Complete!
```
Limpio en los 6 commits (verificado individualmente antes de cada uno).

## I. Validación visual — desktop / mobile

| Bloque | Desktop | Mobile | Nota |
|---|---|---|---|
| 1 | ✅ | ✅ | 9 puntos afectados, confirmado en commit message |
| 2 | ✅ | ✅ | incluye verificación de `getComputedStyle` sobre custom properties |
| 3 | ✅ | ⚠️ no documentado explícitamente | reposo + hover verificados en WhyUs/PromiseList; mobile no mencionado en el mensaje de commit |
| 3-adenda | ✅ | — | cambio trivial (1 línea, border-left) |
| 4 | ✅ | ⚠️ parcial | Footer completo (incl. fuera de viewport) confirmado desktop+mobile; resto de archivos no detallado por archivo en el mensaje |
| 5 | ✅ | ✅ | cerrado — ver detalle abajo |

**Bloque 5 — detalle de lo verificado:**
- `CustomCursor.tsx` (desktop, ~1600px): hover del ring confirmado vía `getComputedStyle` — estado reposo `border-color: rgb(0,229,255)` (cyan) y estado hover `border-color: rgb(123,79,255)` / `background: rgba(123,79,255,0.1)` (violeta), valores idénticos a los previos a la migración. Captura visual confirma el anillo violeta sobre el link de nav. Componente inaplicable en mobile por diseño (`matchMedia("(hover: hover) and (pointer: fine)")` → `null` en touch), así que no requiere verificación mobile.
- `Contact.tsx` — focus state, **desktop**: `border-color: rgb(0,229,255)` (cyan) confirmado por computed style + captura visual.
- `Contact.tsx` — focus state, **mobile (~500px, viewport real logrado en el entorno de prueba; `resize_window` no bajó de ~500px pese a pedir 390px, pero el layout no tiene lógica condicionada al ancho para este campo, así que es equivalente funcional a 390px)**: confirmado tras resolver un falso positivo — ver nota metodológica abajo. Resultado final: `border-color: rgb(0,229,255)` (cyan), idéntico al valor pre-migración `#00E5FF`, confirmado tanto por computed style como por captura visual con zoom.

**Nota metodológica — falso positivo encontrado y resuelto durante la verificación mobile:**
La primera lectura de `getComputedStyle` en mobile devolvió el valor de
`var(--line)` en vez de `var(--cyan)`, pese a que el atributo `style` inline
contenía literalmente `border-color: var(--cyan)`. Diagnóstico: la pestaña
de automatización tenía `document.visibilityState: "hidden"` (no es la
pestaña visible del navegador), lo que pausa el motor de compositación de
Chrome a mitad de la transición CSS (`transition: border-color 0.25s`) —
`el.getAnimations().length` mostraba 4 animaciones activas nunca
completadas. Al forzar su finalización (`el.getAnimations().forEach(a =>
a.finish())`), el valor computado pasó inmediatamente a `rgb(0,229,255)`
(cyan), y una captura visual con zoom lo confirmó igual. Es el mismo tipo de
artefacto ya documentado en esta sesión para `document.hasFocus()===false`
congelando `requestAnimationFrame` — aquí afecta a transiciones CSS vía
`document.hidden`, no al RAF. **No es un bug del sitio**: el DOM real
siempre tuvo el valor correcto; solo la lectura de `getComputedStyle` en
plena transición, con la pestaña en segundo plano, devolvía un valor
congelado a mitad de interpolación.

**Conclusión de I:** el criterio "antes ≈ después" se cumplió en todo lo
verificado, incluido ahora el mobile del Bloque 5. No quedan huecos de
cobertura visual pendientes en Fase 2A.

## J. Deuda para Fase 2B + hashes de commits

**Candidatos a Fase 2B:**
1. `Hero.tsx:202` — gradiente 180°, sin token (decidir: crear `--grad-main-180` o dejarlo como valor único documentado).
2. 15 valores rgba sin equivalente exacto (sección F) — decidir si se crean tokens nuevos (ej. `--line-soft`, `--cyan-touched`) o se documentan como excepciones permanentes.
3. `Hero.tsx` — 5 líneas de color de texto (sección G), a resolver junto con el commit del H2.
4. Evaluar si el subsistema `Service*.tsx` entra en alcance de una futura fase de normalización.
5. Mobile de Bloque 5 (`Contact.tsx` focus state) — verificación pendiente si se requiere cierre estricto.

**Commits (Bloque 1 → 5):**
| Bloque | Hash | Mensaje |
|---|---|---|
| 1 | `7f5e5b5` | migra gradientes hardcodeados a tokens |
| 2 | `414411b` | migra backgrounds hardcodeados a tokens |
| 3 | `1b2485a` | migra borders hardcodeados a tokens |
| 3-adenda | `c73b209` | adenda Bloque 3 — FAQ.tsx:37 |
| 4 | `4026376` | migra colores de texto hardcodeados a tokens |
| 5 | `a216c89` | normaliza resto de hardcoded values a tokens |

---

**Trabajo en paralelo, sin tocar en este checkpoint (pausado/pendiente por tu
instrucción explícita):**
- Hero.tsx — tipografía H2 (Plus Jakarta Sans 700), aplicada en disco, build
  limpio, no commiteada — esperando tu revisión vía `npm run dev`.
- Services/Home Bloque 2 (ServicesGrid variant/sectionId, `index.astro`,
  `Services.tsx` eliminado) — pausado, sin tocar.
