# Visual System V2 — Color & Contrast — Fase V1 (Auditoría y Propuesta)

> Estado: **análisis y propuesta, sin implementación.** Ningún componente
> ni archivo de código fue modificado al redactar este documento — solo
> lectura, `grep` exhaustivo y cálculo real de contraste WCAG. Trabajo en
> paralelo a H2 (Hero/Services-Home siguen exactamente como se dejaron,
> en pausa, sin tocar).

---

## A. Inventario cromático actual (con ubicación exacta)

### A.1 — Tokens declarados en `src/styles/global.css:33-52`

```css
--bg:          #050508;   /* fondo primario */
--bg2:         #09090F;   /* fondo alterno de sección */
--bg3:         #0F0F1A;   /* superficie (cards) */
--bg4:         #141420;   /* superficie elevada */
--cyan:        #00E5FF;
--cyan-dim:    rgba(0,229,255,0.12);
--cyan-bdr:    rgba(0,229,255,0.22);
--cyan-glow:   rgba(0,229,255,0.06);
--violet:      #7B4FFF;
--violet-dim:  rgba(123,79,255,0.15);
--violet-bdr:  rgba(123,79,255,0.3);
--magenta:     #FF2D78;
--text:        #F0EEF8;
--muted:       #A5A2BD;
--faint:       rgba(240,238,248,0.04);
--line:        rgba(240,238,248,0.07);
--grad-main:   linear-gradient(135deg, #7B4FFF 0%, #00E5FF 100%);
--grad-text:   linear-gradient(90deg, #7B4FFF, #00E5FF);
```

### A.2 — Valores hex hardcodeados fuera de `global.css` (grep completo, todo `src/components` + `src/pages` + `src/layouts`)

| Valor | Token equivalente | Ocurrencias | Archivos (muestra con línea) |
|---|---|---|---|
| `#00E5FF` | `--cyan` | 30 | `Navbar.tsx:104,131`, `Hero.tsx:120,143`, `Contact.tsx` (focus states), `CustomCursor.tsx:75,90`, `ServicesGrid.tsx` (antes de la refactorización a tokens) |
| `#A5A2BD` | `--muted` | 26 | `Hero.tsx:69`, `Footer.tsx:24,27`, `FAQ.tsx`, `Process.tsx`, `WhyUs.tsx`, `HowWeWork.tsx`, `PromiseList.tsx`, `Contact.tsx` |
| `#F0EEF8` | `--text` | 20 | `Navbar.tsx:103`, `Hero.tsx` (headline previo), `Footer.tsx:20`, `Contact.tsx:161` |
| `#7B4FFF` | `--violet` | 15 | `Logo.tsx:16,25`, `CustomCursor.tsx:46`, todos los gradientes de CTA (ver A.4) |
| `#050508` | `--bg` | 8 | `Hero.tsx:50`, `Contact.tsx:156`, `Services.tsx` (eliminado en H2), `Process.tsx:12` |
| `#09090F` | `--bg2` | 5 | `WhyUs.tsx:13`, `FAQ.tsx:17`, `Stats.tsx:13`, `Footer.tsx:15` |
| `#0F0F1A` | `--bg3` | 3 | `Contact.tsx:21` (`inputBase.background`), `PromiseList.tsx:35`, `HowWeWork.tsx` (implícito vía copia de patrón) |
| `#FF2D78` | `--magenta` | 1 | `Contact.tsx:18` (`const ERROR_COLOR = "#FF2D78"`) |
| `#25D366` | *(sin token — no forma parte de la paleta de marca)* | 1 | `WhatsAppFab.tsx:59` — verde oficial de marca de WhatsApp, uso legítimo de marca de terceros, no es deuda técnica |

### A.3 — `rgba(...)` hardcodeados (fragmentación de opacidad)

| Familia | Valores encontrados | Token(s) existentes que deberían cubrir esto |
|---|---|---|
| Texto/línea `rgba(240,238,248, X)` | `0.04`, `0.05`, `0.06`, `0.07` (×8), `0.08` | Solo `--line` (0.07) y `--faint` (0.04) están declarados — `0.05`, `0.06`, `0.08` son valores inventados ad-hoc sin token |
| Cian `rgba(0,229,255, X)` | `0.05`, `0.08` (×2), `0.2` (×3), `0.3`, `0.35` (×3), `0.6`, `0.7` (×2), `0.8` | Ninguno coincide exactamente con `--cyan-dim` (0.12), `--cyan-bdr` (0.22) ni `--cyan-glow` (0.06) — **9 opacidades distintas de cian, cero coincidencias con los 3 tokens ya definidos** |
| Violeta `rgba(123,79,255, X)` | `0.07` (×2), `0.08`, `0.1`, `0.3` (×2) | `--violet-bdr` (0.3) coincide en 2 casos; `--violet-dim` (0.15) no se usa nunca — 0.07/0.08/0.1 son valores propios |
| Otros | `rgba(9,9,15,0.98)` (dropdown Navbar), `rgba(5,5,8,0.92)` (header scrolled), `rgba(37,211,102,0.35)` (sombra WhatsApp) | Sin token — casos puntuales de UI chrome, no de contenido |

### A.4 — Gradientes hardcodeados (duplicación exacta del mismo token no usado)

`var(--grad-main)` está declarado pero **nunca se referencia vía `var()` en ningún archivo**. El string literal `"linear-gradient(135deg, #7B4FFF, #00E5FF)"` está copiado a mano, byte por byte, en **8 archivos distintos**: `Stats.tsx:42`, `Navbar.tsx:104` (texto), `PromiseList.tsx:48`, `Hero.tsx:131,202`, `Process.tsx:53`, `HowWeWork.tsx:45`, `StickyCTA.tsx:30`, `Footer.tsx:21` (texto), `Contact.tsx:207`.

`.grad-text` (clase ya definida en `global.css:91-96` para texto con gradiente) tampoco se usa — `Navbar.tsx:104` y `Footer.tsx:21` reimplementan el mismo patrón `WebkitBackgroundClip: "text"` a mano en vez de aplicar la clase.

### A.5 — Tokens declarados pero infrautilizados o no usados en absoluto

| Token | Uso real encontrado |
|---|---|
| `--bg4` (#141420) | **Una sola vez** en todo el proyecto: `ServiceCard.tsx:28`, fondo del card "insignia". Ningún otro componente lo usa como superficie elevada. |
| `--magenta` | **Cero** referencias vía `var(--magenta)`. `Contact.tsx:18` redefine el mismo hex de forma independiente (`ERROR_COLOR`), sin conexión con el token. |
| `--faint` | **Cero** referencias vía `var(--faint)`. `Footer.tsx:57` hardcodea el mismo valor rgba de forma independiente. |
| `--violet-dim` | **Cero** referencias — 0.15 de opacidad de violeta no se usa en ningún sitio, pese a estar declarado. |
| `--grad-main`, `--grad-text` | Ver A.4 — declarados, cero adopción real. |

### A.6 — Único subsistema que sí usa tokens consistentemente

`ServiceCard.tsx`, `ServicesGrid.tsx`, `ServiceDetail.tsx`, `ServiceTextBlock.tsx`, `ServiceListBlock.tsx`, `ServiceContactCTA.tsx` y las 3 páginas `/servicios/*.astro` (construidos en la Tarea #6 de este mismo sprint) son el **único conjunto de componentes del proyecto que usa `var(--token)` en vez de hex hardcodeado**, confirmado por `grep -rl "var(--" `. Cero excepciones puntuales de deuda ahí — sirve de referencia de patrón correcto para lo que V2 debería generalizar al resto del sitio.

---

## B. Problemas detectados (contraste con la hipótesis de Estrategia)

La hipótesis se confirma con datos concretos, no solo percepción:

1. **Predominio de `#050508`** — confirmado: es el valor hex más repetido junto con sus derivados casi-idénticos. `--bg` (#050508) y `--bg2` (#09090F) difieren en apenas **4 unidades de R, 4 de G y 7 de B sobre 255** — una diferencia perceptualmente casi nula entre "página" y "sección alterna". El sitio técnicamente alterna 2 fondos por sección, pero visualmente lee como un solo negro continuo.
2. **Superficies intermedias infrautilizadas** — `--bg3` y `--bg4` existen para dar sensación de profundidad (cards que "flotan" sobre el fondo), pero `--bg4` se usa **una sola vez en todo el sitio** (A.5). No hay un lenguaje de elevación consistente — cada componente decide su propio fondo de card de forma independiente.
3. **Acentos infrautilizados y sin control central** — cian y violeta se usan mucho (30 y 15 apariciones respectivamente) pero con **9 opacidades distintas de cian y 5 de violeta inventadas ad-hoc** (A.3) en vez de reutilizar los 3+2 tokens de opacidad ya declarados. El resultado no es "poco acento", es "acento sin sistema" — cada hover/borde tiene su propia intensidad, sin relación entre sí.
4. **Gradiente de marca duplicado 8 veces en vez de centralizado** (A.4) — cualquier ajuste futuro al gradiente principal (p. ej. cambiar el ángulo o los stops) requeriría editar 8 archivos a mano, con alto riesgo de dejar alguno desactualizado.

---

## C. Tokens actuales reutilizables (base de V2, no se descartan)

- `--bg` (#050508): ancla de marca, base de toda la identidad — se mantiene sin cambios.
- `--cyan` (#00E5FF) y `--violet` (#7B4FFF): ADN cromático explícito de Estrategia — se mantienen sin cambios de matiz.
- `--text` (#F0EEF8): contraste ya verificado (ver L), se mantiene.
- `--muted` (#A5A2BD): **ya fue corregido por WCAG en esta misma sesión** (commit `2c8bee6`, sustituyó `#6B6880`). Contraste actual recalculado en L — se mantiene como base del tier "Muted", no se retoca otra vez.
- `--line` (rgba(240,238,248,0.07)): patrón de borde por defecto ya establecido, solo necesita adopción consistente (dejar de hardcodearse 8 veces).
- `--grad-main` / `--grad-text`: bien diseñados, el problema no es el valor sino la adopción (A.4) — V2 no rediseña el gradiente, corrige su uso.

---

## D. Colores hardcodeados / deuda técnica (resumen accionable)

| Deuda | Alcance | Prioridad de corrección en V2 |
|---|---|---|
| Gradiente de marca duplicado en 8 archivos en vez de `var(--grad-main)` | Alto (visual, mantenibilidad) | Alta |
| 9 opacidades de cian y 5 de violeta sin relación con los tokens declarados | Alto (consistencia de acentos) | Alta |
| `--bg4` declarado pero usado 1 vez — sin lenguaje de elevación real | Medio-alto (la queja central de Estrategia) | Alta |
| `--magenta`/`--faint` declarados y nunca referenciados vía `var()` | Bajo (funciona igual, pero es token muerto) | Media |
| Hex de texto/fondo (#F0EEF8, #A5A2BD, #050508, etc.) repetidos 20-30 veces cada uno como string literal en vez de `var()` | Alto (volumen), bajo riesgo (valores correctos, solo no centralizados) | Media — no es una emergencia porque los valores ya coinciden con los tokens, es limpieza, no corrección |
| `.grad-text` (clase ya existente) reimplementada a mano en `Navbar.tsx`/`Footer.tsx` | Bajo | Baja |

**No se cuenta como deuda:** `Logo.tsx` (SVG de marca, autocontenido por diseño — un logo no debería depender de tokens externos para ser portable) y `#25D366` de WhatsApp (color de marca de terceros, correcto que esté fuera del sistema de tokens propio).

---

## E. Propuesta Visual System V2 — valores concretos

> Principio rector: **evolucionar, no sustituir.** Los 3 colores de marca (negro base, violeta, cian) no cambian de matiz. V2 amplía la escala de fondos/superficies (donde está la queja real) y consolida los acentos ya existentes en menos valores, mejor definidos.

```css
/* Backgrounds */
--bg-primary:      #050508;   /* = --bg actual, sin cambio — ancla de marca */
--bg-secondary:    #0B0B15;   /* nuevo — reemplaza #09090F, salto perceptible real */

/* Surfaces */
--surface:         #12121D;   /* reemplaza --bg3 (#0F0F1A) — superficie de card en reposo */
--surface-elevated:#1C1C2E;   /* reemplaza --bg4 (#141420) — hover / card insignia / modales */

/* Texto */
--text-primary:    #F0EEF8;   /* = --text actual, sin cambio */
--text-secondary:  #C7C4DC;   /* NUEVO — tier intermedio que hoy no existe */
--text-muted:      #A5A2BD;   /* = --muted actual, sin cambio (ya corregido por WCAG) */

/* Acentos */
--accent-primary:   #00E5FF;  /* = --cyan actual, sin cambio de matiz */
--accent-secondary: #7B4FFF;  /* = --violet actual, sin cambio de matiz */

/* Bordes — consolidación de las 9+5 opacidades ad-hoc en 2 valores fijos */
--border-default:  rgba(240,238,248,0.07);  /* = --line actual */
--border-emphasis: rgba(0,229,255,0.35);    /* reemplaza el cluster 0.2/0.3/0.35 de cian */

/* Semántico — solo lo que ya existe en producción real */
--error:           #FF2D78;   /* = --magenta actual, formalizado como semántico */

/* Gradientes — mismos valores, ahora con nombre de adopción obligatoria */
--grad-main:  linear-gradient(135deg, #7B4FFF 0%, #00E5FF 100%);  /* sin cambio */
--grad-text:  linear-gradient(90deg, #7B4FFF, #00E5FF);           /* sin cambio */
--glow-violet: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,79,255,0.08) 0%, transparent 70%);
  /* NUEVO — formaliza el patrón ya duplicado a mano en Hero.tsx:50 y Contact.tsx:156 */
```

**Deliberadamente NO propuesto:** `--success`, `--warning`, `--info`. Ningún componente real del sitio necesita hoy esos 3 estados con color propio — el único feedback de usuario existente es el toast de `Contact.tsx`, que usa `<Toaster richColors>` (`Layout.astro`), y `richColors` de la librería `sonner` **ya aplica su propia paleta verde/roja/amarilla por defecto, desconectada del sistema de tokens del proyecto**. Introducir `--success`/`--warning`/`--info` ahora mismo sería añadir tokens sin ningún consumidor real (contradice el principio del proyecto de no construir para casos hipotéticos). Si en el futuro se necesita, la decisión pendiente real es si sobreescribir el tema de `sonner` para que use los tokens del proyecto — señalado en K, no resuelto aquí.

---

## F. Función semántica de cada color propuesto

| Token | Función | Restricción importante |
|---|---|---|
| `--bg-primary` | Fondo base de toda la página, el "vacío" de la marca | — |
| `--bg-secondary` | Alternar entre secciones consecutivas para dar ritmo de scroll sin depender de bordes | — |
| `--surface` | Fondo de cualquier card/panel en reposo (flota sobre bg-primary/secondary) | — |
| `--surface-elevated` | Estado hover de cards, o elementos que deben leerse como "el más importante de su grupo" (ya establecido en `ServiceCard.tsx` para el servicio insignia) | Reservar para 1 nivel de jerarquía, no usar en cascada (si todo está "elevado" nada lo está) |
| `--text-primary` | Titulares, texto de máxima jerarquía | — |
| `--text-secondary` | Cuerpo de texto estándar (hoy colapsado incorrectamente con muted) | — |
| `--text-muted` | Metadatos, timestamps, texto verdaderamente secundario | — |
| `--accent-primary` (cian) | CTAs, enlaces, estados activos — **seguro también como color de texto** (13.2:1 de contraste, ver L) | — |
| `--accent-secondary` (violeta) | Fondos, bordes, iconografía, gradientes, headings grandes (≥24px) | **No usar como color de texto en tamaño normal** — 4.27:1 de contraste, falla AA normal-text (ver L) |
| `--border-default` | Borde por defecto de cualquier card/input en reposo | — |
| `--border-emphasis` | Hover/focus — un único valor consolidado en vez de 5+ opacidades sueltas | — |
| `--error` | Validación de formularios (ya implementado en `Contact.tsx`) | — |
| `--glow-violet` | Fondo decorativo radial detrás de headlines/CTAs principales (ya usado 2 veces a mano) | Máximo 1 por viewport — es un acento de foco, no un patrón de fondo repetible |

---

## G. Tratamiento de superficies (profundidad sin fotografía)

Con 4 fondos reales y perceptualmente distintos (`bg-primary` → `bg-secondary` → `surface` → `surface-elevated`), la diferenciación de bloques se logra por **combinación de 3 señales**, nunca una sola:

1. **Alternancia de fondo de sección** (`bg-primary`/`bg-secondary`) — ya existe como patrón, V2 solo lo hace perceptible.
2. **Elevación de superficie** (`surface`/`surface-elevated`) para cards dentro de una sección — mismo mecanismo que `ServiceCard.tsx` ya usa para el insignia, generalizado al resto del sitio (WhyUs, Stats, FAQ items, etc. cuando les toque su bloque).
3. **Borde + halo de acento** (`border-default` en reposo, `border-emphasis` + `glow-violet`/sombra de color en hover) — refuerzo direccional sin necesitar imagen ni textura nueva.

La textura de ruido ya existente (`body::before`, `global.css:76-83`) se mantiene sin cambios — es sutil (opacity 0.035) y ya cumple su función de romper la planitud del negro; no se toca.

---

## H. Ejemplo conceptual de aplicación (solo concepto, cero archivos tocados)

- **Hero:** `bg-primary` de fondo (sin cambio — ya es el ancla de la home). El `glow-violet` radial ya presente se mantiene tal cual, ahora como token en vez de string duplicado.
- **Services (Home, ya construido en H2):** sección sobre `bg-secondary` (hoy usa el mismo `bg-primary` que Hero — con V2 se diferenciaría). Cards en `surface`, insignia en `surface-elevated` (mismo patrón que `ServiceCard.tsx` ya implementa, sin cambios de comportamiento, solo de valores hex vía los nuevos nombres de token).
- **Trust (aún no construido):** candidata natural a `bg-primary` de nuevo, alternando con Services — mantiene el ritmo primary/secondary sección a sección.
- **Nuestro Compromiso:** ya usa cards sobre `--bg3` actual (`PromiseList.tsx`) — migraría a `surface` sin cambio visual perceptible más allá de la ligera elevación de valor.
- **CTA final (Contact):** el `glow-violet` ya presente (`Contact.tsx:156`) se formaliza como token; el botón de envío usa `--grad-main` vía token en vez de string duplicado — cero cambio visual, solo de origen del valor.

---

## I. Impacto esperado en desktop/mobile

- **Ningún cambio de layout, breakpoint ni tamaño** — esta propuesta es estrictamente de color. Cero riesgo de reflow o de repetir el tipo de bug de overflow ya resuelto en el Hero.
- **Mobile:** el mayor beneficio esperado es en pantallas OLED/AMOLED (mayoría de gama media-alta Android) donde la diferencia entre negros casi-idénticos es *aún menos perceptible* que en monitores desktop por la forma en que estos paneles renderizan valores RGB muy bajos — la ampliación de la escala de grises en V2 beneficia proporcionalmente más a mobile.
- **Desktop:** el efecto más visible será en secciones largas de scroll (Home completa) — la alternancia `bg-primary`/`bg-secondary` real dará más sensación de "avance" entre bloques.

---

## J. Riesgos de regresión

- **El mayor riesgo no es de código, es de disciplina de adopción.** El problema documentado en D no es que falten tokens — es que existen y no se usan. V2 puede fallar exactamente igual si se define pero no se fuerza su uso. Recomendación para K: cualquier PR que introduzca un hex/rgba literal nuevo en un componente debería tratarse como señal de alerta en revisión de código.
- **Contraste de `--text-secondary` sobre `surface-elevated`** (el fondo más claro de la nueva escala) no fue verificado en este documento porque `surface-elevated` es una superficie nueva sin implementación — debe verificarse con las herramientas de contraste reales (no solo cálculo manual) en cuanto exista un componente real que combine ambos, antes de aprobar ese combo específico para texto de cuerpo.
- **`--accent-secondary` (violeta) como texto** — riesgo real si algún futuro componente decide usar violeta para texto de tamaño normal copiando el patrón de cian sin revisar contraste (ver L) — debe documentarse como regla explícita, no solo quedar implícito.
- **Migración de los 8 duplicados del gradiente** — bajo riesgo técnico (son strings idénticos, sustitución mecánica) pero alto en superficie tocada (8 archivos) — candidato a hacerse en un PR aislado, fácil de revisar por ser un cambio de "buscar y reemplazar" verificable.

---

## K. Plan de implementación incremental (propuesto, no ejecutado)

1. **Fase 1 (esta):** este documento — aprobación de Estrategia antes de tocar código.
2. **Fase 2:** actualizar `global.css` — añadir los nuevos tokens de E sin eliminar los actuales todavía (`--bg2`/`--bg3`/`--bg4` conviven con `--bg-secondary`/`--surface`/`--surface-elevated` como alias temporal), cero cambio visual hasta que se adopten.
3. **Fase 3:** migrar el gradiente duplicado (8 archivos) a `var(--grad-main)`/`var(--grad-text)` — cambio mecánico, bajo riesgo, alta visibilidad de la deuda resuelta.
4. **Fase 4:** consolidar las opacidades de cian/violeta (9+5 valores → 2 tokens `border-default`/`border-emphasis`) — requiere revisión visual por componente, no solo buscar-reemplazar.
5. **Fase 5:** aplicar `bg-secondary`/`surface`/`surface-elevated` sección por sección, en el mismo orden ya aprobado para H2 (Services → Trust → Cómo trabajamos → Nuestro compromiso → Desarrollo Seguro → CTA) — reutiliza la secuencia de bloques que Estrategia ya autorizó, no inventa un orden nuevo.
6. **Fase 6:** eliminar los tokens legacy (`--bg2`/`--bg3`/`--bg4`) una vez cero componentes los referencien — confirmado por `grep`, igual que se hizo en este documento.
7. Cada fase, rama de feature + preview deploy antes de merge a `main` — mismo criterio ya vigente en `CLAUDE.md`.

---

## L. Criterios de aceptación (con WCAG real, calculado con la fórmula de contraste relativo, no estimado)

| Par | Contraste calculado | Umbral AA aplicable | Resultado |
|---|---|---|---|
| `--text-muted` (#A5A2BD) sobre `--bg-primary` (#050508) | **8.24:1** | 4.5:1 (texto normal) | ✅ Pasa AA y AAA |
| `--text-muted` sobre `--surface` actual (#0F0F1A) | **7.70:1** | 4.5:1 | ✅ Pasa AA y AAA |
| `--text-muted` sobre `--surface-elevated` actual (#141420) | **7.38:1** | 4.5:1 | ✅ Pasa AA y AAA |
| `--text-primary` (#F0EEF8) sobre `--bg-primary` | **17.72:1** | 4.5:1 | ✅ Pasa AAA con amplio margen |
| `--text-secondary` propuesto (#C7C4DC) sobre `--bg-primary` | **11.98:1** | 4.5:1 | ✅ Pasa AAA |
| `--accent-primary` cian (#00E5FF) sobre `--bg-primary` | **13.23:1** | 4.5:1 | ✅ Seguro también como texto |
| `--accent-secondary` violeta (#7B4FFF) sobre `--bg-primary` | **4.27:1** | 4.5:1 (texto normal) / 3:1 (texto grande ≥24px o UI) | ⚠️ **Falla AA para texto normal** — solo válido como texto grande/UI, nunca como párrafo o label pequeño |

**Hallazgo crítico para L:** el texto muted actual (`#A5A2BD`), que Estrategia pidió revisar por posible debilidad, **ya está sobradamente por encima del umbral AA en todas las superficies actuales** (7.38–8.24:1) — la corrección de la sesión anterior (`2c8bee6`, `#6B6880` → `#A5A2BD`) funcionó correctamente y no necesita un segundo ajuste. El riesgo real de contraste no está en el muted, está en el **violeta usado como texto**, que hoy no ocurre en producción (confirmado por grep, A.2) pero debe quedar prohibido explícitamente en la guía de V2 para que no se introduzca por accidente al implementar.

**Criterios de aceptación para la Fase 2+ (implementación futura):**
- Ningún par texto/fondo nuevo por debajo de 4.5:1 para texto de tamaño normal, 3:1 para texto ≥24px o componentes de UI (checkboxes, bordes de foco).
- Cero valores hex/rgba nuevos introducidos fuera de `global.css` — todo color debe consumirse vía `var(--token)`.
- Contraste de `--text-secondary`/`--text-muted` sobre `--surface-elevated` (la superficie nueva más clara) verificado con herramienta real antes de aprobar esa combinación específica, no solo por cálculo manual (ver J).
- Verificación visual real en navegador (desktop + mobile) de cada fase de K antes de merge — mismo criterio ya establecido en Hero/Services este sprint.
