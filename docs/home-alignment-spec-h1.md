# HOME ALIGNMENT SPEC — H1

> Estado: propuesta técnica para aprobación de Estrategia. **No se ha
> tocado ningún archivo de código** (`src/pages/index.astro` ni sus
> componentes) al redactar este documento — solo lectura y análisis.
> Todo el texto nuevo marcado como `PENDIENTE DE ESTRATEGIA` no ha sido
> redactado por Claude Code; es un hueco señalado, no relleno.

---

## A. Inventario del contenido actual

Fuente: `src/pages/index.astro` y cada componente que importa. Contenido
textual real citado tal cual está en el código (no resumido), con su
componente y `id` de sección cuando existe.

### `Hero.tsx` (sin `id`, primera sección)
- Tag: `STELLING SECURE · VALENCIA`
- Headline: `Desarrollo web. Seguridad digital.`
- Subheadline: `Tu negocio, construido y blindado.`
- Body (oculto en móvil): `Stelling Secure es tu equipo de **desarrollo web y seguridad web en Valencia**. Construimos **páginas web para PYMEs** rápidas, elegantes y seguras desde la base — y nos quedamos para protegerlas.`
- Social proof (oculto en móvil): `Más de 50 PYMEs en Valencia confían en Stelling Secure`
- CTA primario: `Ver servicios` → `scrollTo("services")`
- CTA secundario: `Auditoría gratuita →` → `scrollTo("contact")`
- Trust line: `Sin compromiso · Respuesta en 24-48h · 100% confidencial`

### `Services.tsx` (`id="services"`)
- Label: `01 · Servicios`
- H2: `Servicios de Desarrollo Web y Seguridad Web`
- Card 1: **Desarrollo Web para PYMEs** — tag `[ web · performance · seo ]` — descripción sobre webs rápidas/optimizadas — 5 ítems (Diseño UI/UX, React/Next.js, SEO técnico, CMS, Core Web Vitals)
- Card 2: **Auditoría y Seguridad Web** — tag `[ audit · hardening · monitoring ]` — descripción sobre auditar/reforzar/monitorizar — 5 ítems (Auditoría completa, Hardening, Protección malware, SSL/HTTPS, Informes técnicos)

### `WhyUs.tsx` (`id="why"`)
- Label: `02 · Por qué nosotros`
- H2: `Servicios de Desarrollo Web y Seguridad Web` — **⚠️ idéntico al H2 de `Services.tsx`, verificado literal en el código (línea 20 de `WhyUs.tsx`). Es un bug de copy-paste, no contenido intencional.**
- Intro: `La mayoría de agencias hacen webs. La mayoría de empresas de seguridad no entienden tu negocio. Nosotros hacemos ambas cosas, con el mismo nivel de exigencia.`
- 4 razones: Visión completa / Sin intermediarios / Orientados a PYMEs / Transparencia total (cada una con texto propio)

### `Process.tsx` (`id="process"`)
- Label: `03 · Proceso`
- H2: `Servicios de Desarrollo Web y Seguridad Web` — **⚠️ mismo bug de copy-paste, verificado literal (línea 19 de `Process.tsx`).**
- 4 pasos genéricos: Diagnóstico / Propuesta / Ejecución / Entrega y soporte

### `Stats.tsx` (sin `id`)
- 4 métricas: `3` Proyectos entregados · `100%` Clientes satisfechos · `< 48h` Tiempo de respuesta · `0` Incidentes post-auditoría
- **⚠️ Sin campo de evidencia asociado — ni `evidenceStatus` ni fuente verificable en el código.** Son números hardcodeados en el array `stats` del componente.

### `FAQ.tsx` (`id="faq"`)
- Label: `04 · Preguntas frecuentes`
- H2: `Todo lo que necesitas saber`
- 5 preguntas (precio web PYME, qué incluye auditoría, cuánto tarda una web, mejora de seguridad de web existente, mantenimiento continuado)

### `Contact.tsx` (`id="contact"`)
- H2: `Contacta con Stelling Secure`
- Subheadline: `Cuéntanos tu proyecto. Primera consulta sin coste.`
- Formulario (nombre, email, empresa opcional, mensaje) + Turnstile + honeypot
- Trust bar: `✓ Primera consulta sin coste · ✓ Respuesta en < 48h · ✓ Sin permanencias`
- Botón submit: `Solicitar consulta gratuita →`
- Nota legal: `🔒 Tus datos están protegidos. No compartimos tu información.`
- Contacto alternativo: `hola@stellingsecure.com`

### `Footer.tsx` (chrome global, fuera del flujo de secciones)
- Tagline: `Tu negocio, construido y blindado.`
- Ubicación: `Valencia, España`
- Enlaces "Servicios": Desarrollo Web / Seguridad Web / Auditoría / Consultoría → los 4 apuntan a `#services` (ancla única, textos distintos sin páginas propias detrás)
- Enlaces "Empresa": Proceso (`#process`) / FAQ (`#faq`) / Contacto (`#contact`) / email
- Copyright: `© 2026 Stelling Secure. Todos los derechos reservados.`

### `StickyCTA.tsx` (solo móvil, aparece a los 3s)
- Botón: `Solicitar consulta gratuita →` → `scrollTo("contact")`

### `WhatsAppFab.tsx` (aparece a los 4s)
- Tooltip: `Escríbenos por WhatsApp`
- Enlace a WhatsApp con mensaje prellenado

### Chrome global no listado como "sección": `Navbar.tsx`, `CustomCursor.tsx`
- Navbar: Logo, `Servicios` (`/#services`), dropdown `Empresa` (3 sub-páginas reales), `Contacto` (`/#contact`), botón `Consulta gratuita` (aparece al hacer scroll)

---

## B. Clasificación por elemento

| Elemento | Clasificación | Motivo |
|---|---|---|
| `Hero.tsx` (estructura/animación) | **Conservar** | Patrón `animate` (no `whileInView`) ya correcto para above-the-fold — mismo criterio validado en la corrección de `ServicesGrid` |
| `Hero.tsx` (copy) | **Modificar** | Copy actual centrado en "desarrollo web", no en la propuesta insignia de ciberseguridad. Texto nuevo = `PENDIENTE DE ESTRATEGIA` (ver G) |
| `Services.tsx` | **Sustituir por datos gobernados** | Los 2 servicios hardcodeados ("Desarrollo Web para PYMEs", "Auditoría y Seguridad Web") **contradicen** el modelo ya aprobado y publicado en la colección `services` (Auditoría + Evaluación como principales, Desarrollo Seguro como complementario) |
| `WhyUs.tsx` | **Sin slot en el orden C — decisión pendiente** | No aparece en la arquitectura de secciones que dio Estrategia. No lo elimino ni lo conservo por iniciativa propia |
| `Process.tsx` | **Sustituir por datos gobernados** | Los 4 pasos genéricos contradicen la metodología real de 7 pasos ya aprobada y publicada (`HowWeWork.tsx`, vía `/empresa/como-trabajamos/`) |
| `Stats.tsx` | **Sustituir por datos gobernados, o eliminar** — pendiente confirmación | Los 4 números no tienen evidencia verificable asociada (ver H). Antes de mapearlo a la sección "Trust" del orden C, Estrategia debe confirmar si son reales y con qué evidencia, o sustituirlos |
| `FAQ.tsx` | **Sin slot en el orden C — decisión pendiente** | Igual que `WhyUs.tsx`, no aparece en la arquitectura dada |
| `Contact.tsx` (formulario, validación, Turnstile, `id="contact"`) | **Conservar** | Lógica y estructura correctas, sin motivo técnico para tocarlas |
| `Contact.tsx` (copy del botón/CTA) | **Modificar** | `"Solicitar consulta gratuita →"` diverge del CTA ya establecido en `/servicios/` (`"Solicitar Diagnóstico Ejecutivo"`) — decisión de Estrategia, no mía |
| `Footer.tsx` (estructura) | **Conservar** | Grid y estilo reutilizables tal cual |
| `Footer.tsx` (enlaces `#services`/`#process`/`#faq`) | **Modificar (condicional)** | Solo si cambian los `id` de esas secciones — ver H |
| `StickyCTA.tsx` | **Modificar (copy)** | Mismo caso que el botón de `Contact.tsx` |
| `Navbar.tsx` | **Conservar sin tocar** | Instrucción vigente de una sesión anterior: "Servicios sigue como anchor a Home hasta autorización final de Estrategia" |
| `WhatsAppFab.tsx`, `CustomCursor.tsx` | **Conservar** | Chrome global sin relación con el contenido de las secciones |

---

## C. Arquitectura propuesta de secciones (orden dado por Estrategia)

```
Hero
  ↓
Trust
  ↓
Servicios principales
  ↓
Cómo trabajamos
  ↓
Nuestro compromiso
  ↓
Desarrollo Seguro (complementario)
  ↓
CTA
```

Mapeo contra el inventario actual:

| Posición en C | Existe hoy como | Estado |
|---|---|---|
| Hero | `Hero.tsx` | Estructura ok, copy pendiente |
| Trust | `Stats.tsx` (parcial, sin evidencia) | Necesita decisión de Estrategia — ver B y H |
| Servicios principales | `Services.tsx` (contenido contradictorio) | Sustituir por `services` collection |
| Cómo trabajamos | `Process.tsx` (contenido contradictorio) | Sustituir por `HowWeWork.tsx` |
| Nuestro compromiso | No existe en Home hoy | Nueva — reutilizar `PromiseList.tsx` + `promises` collection |
| Desarrollo Seguro | No existe en Home hoy | Nueva — reutilizar `ServiceCard.tsx` filtrado por `category: "complementario"` |
| CTA | `Contact.tsx` (`id="contact"`) | Conservar estructura, copy del botón pendiente de alinear |

`WhyUs.tsx` y `FAQ.tsx` no tienen posición en este orden — señalado en B y G, no resuelto aquí.

---

## D. Componentes reutilizables tal cual

- `Reveal.tsx` — patrón de aparición al scroll, usado en secciones que no están en el viewport inicial.
- Convención `motion.div` con `variants={{hidden, show}}` + contenedor con `staggerChildren` — patrón repetido en `Services`, `WhyUs`, `Process`, `Stats`, `PromiseList`, `HowWeWork`, `ServicesGrid`.
- Tokens de diseño de `global.css` (`--bg`, `--bg3`, `--cyan`, `--violet`, `--muted`, `--line`, `--grad-main`, clase `.slabel`, `.font-mono`).
- `CustomCursor.tsx`, `WhatsAppFab.tsx` — sin relación con el contenido, cero motivo para tocarlos.
- `ServiceCard.tsx`, `ServicesGrid.tsx` — ya construidos y verificados (build + visual desktop/móvil) para `/servicios/`; reutilizables directamente para "Servicios principales" y "Desarrollo Seguro".
- `PromiseList.tsx` — ya construido y verificado para `/empresa/nuestro-compromiso/`; reutilizable directamente para "Nuestro compromiso".
- `HowWeWork.tsx` — ya construido y verificado para `/empresa/como-trabajamos/`; reutilizable directamente para "Cómo trabajamos".
- `Contact.tsx` (lógica de formulario, validación Zod, Turnstile, honeypot, llamada a `/api/contact`) — sin motivo técnico para tocar.

---

## E. Componentes que requerirían modificación y por qué

- **`Hero.tsx`** — copy nuevo (pendiente de Estrategia); posible ajuste de los `scrollTo("services")`/`scrollTo("contact")` si cambian los `id` de las secciones destino.
- **`Services.tsx`** — se retira o se reescribe por completo; su contenido actual no es compatible con el modelo ya publicado en `/servicios/`. La alternativa más limpia es sustituirlo por una variante de `ServicesGrid` adaptada a Home (o reutilizar el componente tal cual, filtrando `category: "principal"`).
- **`Process.tsx`** — se retira; se sustituye por `HowWeWork.tsx` (mismo componente que ya usa `/empresa/como-trabajamos/`), no una reescritura de `Process.tsx`.
- **`Stats.tsx`** — bloqueado hasta que Estrategia confirme si los números son reales/verificables o deben sustituirse; no debe copiarse tal cual a la sección "Trust" sin esa confirmación (ver H).
- **`Footer.tsx`** — solo si los `id` de sección cambian (p. ej. si `#services` deja de existir o cambia de significado al insertar "Servicios principales" en su lugar).
- **`Contact.tsx`, `StickyCTA.tsx`** — copy del botón, pendiente de decisión sobre alinear con "Solicitar Diagnóstico Ejecutivo".
- **`WhyUs.tsx`, `FAQ.tsx`** — no se tocan hasta que Estrategia decida si tienen lugar en la nueva estructura.

---

## F. Fuente de datos concreta por sección

| Sección | Fuente | Campo(s) | Componente que la lee |
|---|---|---|---|
| Hero | Ninguna existente | — | `Hero.tsx` (copy pendiente) |
| Trust | Ninguna existente con evidencia | — | Pendiente de decisión (ver H) |
| Servicios principales | `services` collection | `title`, `description`, `slug`, `category: "principal"`, ordenado por `order` | `ServiceCard.tsx` (ya existe) |
| Cómo trabajamos | No es una content collection — está hardcodeada dentro de `HowWeWork.tsx` (array `steps`) | — | `HowWeWork.tsx` (reutilizar el componente completo, no una collection) |
| Nuestro compromiso | `promises` collection | `statement`, `order`, filtro `maturityLevel: "published"` | `PromiseList.tsx` (ya existe) |
| Desarrollo Seguro | `services` collection | mismo esquema que "Servicios principales", filtro `category: "complementario"` | `ServiceCard.tsx` (ya existe, sin `featured`) |
| CTA | `Contact.tsx` (sin collection) | — | `Contact.tsx` (conservar) |

Nota importante para F: **"Cómo trabajamos" no tiene una content collection real detrás**, a pesar de que B/F del encargo original sugería tratarla como "dato gobernado" igual que `services`/`promises`. Lo más preciso es: su copy ya pasó por aprobación (está publicada en `/empresa/como-trabajamos/`), pero técnicamente vive hardcodeada en el componente, no en `src/content/`. Si se quiere formalizarla como collection con `maturityLevel`/`lastReviewed` igual que `services`/`promises`, es una decisión de arquitectura aparte que no estaba en el alcance de esta spec — la señalo, no la resuelvo aquí.

---

## G. Copy pendiente de redacción de Estrategia

**Nada de lo siguiente ha sido escrito por Claude Code.** Lista explícita de huecos:

1. **Hero completo** — tag, headline, subheadline, body, ambos CTA, línea de confianza. Ligado directamente al objetivo de "15 segundos" (ver J). Estrategia dijo que lo entregará después de ver esta propuesta estructural.
2. **Sección "Trust"** — si existe como tal: qué métricas mostrar y con qué evidencia verificable detrás de cada una (los números actuales de `Stats.tsx` no tienen evidencia asociada — ver H).
3. **CTA final** — texto del botón/sección de cierre: ¿se alinea con "Solicitar Diagnóstico Ejecutivo" (ya usado en las 3 fichas de `/servicios/`) o mantiene su propio framing ("Solicitar consulta gratuita")?
4. **Decisión sobre `WhyUs.tsx` y `FAQ.tsx`** — ¿tienen lugar en la nueva estructura (y dónde), o se retiran de la Home?
5. **Copy de enlaces de `Footer.tsx`** — solo aplica si cambian los `id`/nombres de sección (dependiente del punto 4 y de la decisión final de estructura).

---

## H. Riesgos de regresión

- **`id="contact"` es el punto de mayor radio de impacto de todo este cambio.** Está referenciado como `/#contact` desde `Navbar.tsx`, `StickyCTA.tsx`, `Footer.tsx`, y desde **las 3 fichas de `/servicios/` ya publicadas** (`ServiceContactCTA.tsx`). Si la reestructuración de Home elimina, renombra o mueve ese `id`, los 6 puntos de entrada quedan rotos silenciosamente — ningún build lo detecta, es una URL con fragmento, no una ruta.
- **Contradicción de contenido ya en producción real.** `/servicios/` (3 fichas, `maturityLevel: published`) ya presenta el modelo gobernado (Auditoría + Evaluación como principales, Desarrollo Seguro como complementario). La Home, sin tocar nada todavía, sigue mostrando un modelo distinto e incompatible ("Desarrollo Web para PYMEs" + "Auditoría y Seguridad Web" como los 2 servicios). Esta inconsistencia **ya existe hoy**, de forma independiente a esta spec — cuanto más tiempo pase sin corregirla, más visible es el riesgo reputacional (un visitante que navegue de Home a Servicios verá dos historias distintas de "qué vendemos").
- **Métricas sin evidencia verificable (`Stats.tsx`).** Si se trasladan tal cual a "Trust" sin confirmación de Estrategia, se estaría publicando una afirmación de negocio sin `evidenceStatus` — exactamente lo que la arquitectura del proyecto (`docs/arquitectura-fase2-v4.md`, sección 0/7) ya identifica como riesgo a evitar.
- **SEO.** La Home no lleva `noindex` (a diferencia de los placeholders de `/empresa/` en su momento) — es la página con más probabilidad de estar ya indexada. Cambiar H1/headings/anchors sin plan puede perder señales de posicionamiento existentes. Nota aparte, no causada por este cambio: `robots.txt` referencia `https://stellingsecure.com/sitemap.xml`, que no existe en el repo ni se genera en el build (no hay integración `@astrojs/sitemap`) — gap preexistente, señalado por completitud, no en el alcance de esta spec.
- **Animaciones above-the-fold.** Lección ya aprendida y corregida en `ServicesGrid`: cualquier sección nueva que quede en el viewport inicial (p. ej. "Trust", si va justo debajo del Hero) debe usar `animate`, no `whileInView` — si no, se repite el bug de contenido invisible en la carga inicial.
- **Responsive.** Riesgo bajo si las secciones nuevas reutilizan los mismos primitivos CSS grid (`repeat(auto-fit, minmax(...))`) ya usados en todo el sitio; riesgo más alto si "Trust" o el nuevo orden introducen layout a medida sin verificación visual real (con foco de ventana, según la lección de esta misma sesión).

---

## I. Plan de implementación por fases

0. *(Hecho)* — esta investigación y spec.
1. Estrategia entrega el copy pendiente (sección G) y decide sobre `WhyUs`/`FAQ`.
2. **Fase de menor riesgo, cero copy nueva necesaria:** sustituir `Process.tsx` por `HowWeWork.tsx` y `Services.tsx` por datos de la collection `services` — elimina las dos contradicciones de contenido ya señaladas en H, usando componentes ya construidos y verificados.
3. Insertar "Nuestro compromiso" (`PromiseList.tsx` + `promises`) y "Desarrollo Seguro" (`ServiceCard.tsx` filtrado) en el orden dado.
4. Reescribir `Hero.tsx` con el copy ya recibido de Estrategia, respetando `animate` (no `whileInView`) para el contenido above-the-fold.
5. Resolver CTA final, decisión `WhyUs`/`FAQ`, y actualizar `Footer.tsx`/anchors si cambian los `id` de sección.
6. Verificación completa: `npm run build`, verificación visual real (con foco de ventana — ver lección de esta sesión) en desktop ~1440px y móvil ~390px, comprobación de que `#contact` sigue resoluble desde las 3 fichas de `/servicios/` y desde `Navbar`/`Footer`/`StickyCTA`.

Cada fase, rama de feature + preview deploy de Cloudflare Pages antes de merge a `main` (regla ya vigente en `CLAUDE.md` para cambios de riesgo).

---

## J. Criterios de aceptación

- **Objetivo "15 segundos" de Estrategia:** un visitante debe poder identificar qué hace Stelling Secure y por qué confiar, sin hacer scroll, en 15 segundos. Es una restricción de comunicación (Hero + quizá Trust), no de código — el rol del código es no sabotearla: el contenido above-the-fold debe estar visible de inmediato, no depender de un evento de scroll para aparecer (ver hallazgo `animate` vs `whileInView`).
- Cero contradicciones de contenido entre Home y páginas ya gobernadas y publicadas (`/servicios/`, `/empresa/`).
- `id="contact"` preservado exactamente, o las 6 referencias cruzadas actualizadas de forma atómica en el mismo cambio.
- `npm run build` limpio + verificación visual real (foco de ventana) en desktop y móvil antes de cualquier commit.
- Ninguna sección nueva above-the-fold usa `whileInView` para su primera aparición.
- Cero copy inventado por Claude Code — todo texto nuevo proviene de Estrategia, con huecos marcados explícitamente hasta recibirlo.

---

## K. Arquitectura i18n

### Verificación técnica previa

Versión de Astro realmente instalada: **6.3.3** (`node_modules/astro/package.json`) — no 6.2.2 como se mencionó; `package.json` fija `^6.2.2`, npm resolvió una versión posterior compatible.

Inspección directa del paquete instalado (`node_modules/astro/dist/i18n/`, `dist/virtual-modules/i18n.d.ts`, `dist/i18n/router.d.ts`), no solo conocimiento general de Astro:

- Las utilidades puras de `astro:i18n` (`getRelativeLocaleUrl`, `getAbsoluteLocaleUrl`, `getPathByLocale`, `getLocaleByPath`, `pathHasLocale`, `toCodes`, `toPaths`) son funciones síncronas de construcción de URLs — **compatibles con `output: "static"`.**
- El motor de decisión de rutas (`I18nRouter`, `redirectToDefaultLocale`, `redirectToFallback`, `notFound`, `requestHasLocale`, `middleware`) tiene tipos que dependen explícitamente de `SSRManifest` y `APIContext` (`dist/i18n/router.d.ts:1`) — construcciones exclusivas de runtime de servidor. Es el mismo mecanismo de middleware que ATLAS ya documentó como inerte en este proyecto bajo `output: "static"` sin adaptador.

**Conclusión:** el `i18n` config nativo de Astro (`locales`/`defaultLocale`/`routing` en `astro.config.mjs`) genera páginas estáticas por idioma sin adaptador — eso funciona. Pero toda la conveniencia automática (redirección por idioma de navegador en `/`, fallback automático ante página traducida faltante) depende de middleware SSR y **no funcionaría** en este proyecto (`astro.config.mjs` actual: sin `i18n`, sin adaptador, `output` sin definir → estático por defecto). Añadir un adaptador solo para esas conveniencias contradice la arquitectura ya cerrada y el principio de mínimo cambio estructural.

**Recomendación:** no usar el `i18n` config nativo de Astro. Usar estructura de carpetas estática (`/en/` paralela a la raíz), construida con páginas `.astro` individuales — mismo patrón ya usado en `/empresa/` y `/servicios/` — sin redirección ni fallback automáticos de middleware: lo que existe, se genera como HTML estático; lo que no existe, no se genera (404 nativo de Cloudflare Pages).

### K.1 — Estrategia de rutas ES/EN

Dos opciones evaluadas contra las rutas ya existentes:

- **`/en/services/` (sin prefijo `/es/` para español)** — español permanece en la raíz exactamente como está hoy (`/servicios/`, `/empresa/...`); inglés vive en un árbol paralelo `/en/...`. **Cero URLs actuales se rompen.**
- **`/es/servicios/` + `/en/services/`** — requiere mover todo el contenido español actual bajo un nuevo prefijo `/es/`, rompiendo cada URL ya publicada e indexable (`/servicios/auditoria-seguridad-web/`, `/empresa/quienes-somos/`, etc.), y forzando redirects 301 permanentes desde las rutas antiguas.

**Recomendación: la primera opción.** Español = fuente editorial principal (principio vinculante de Estrategia) y raíz del sitio sin prefijo; inglés = árbol `/en/` paralelo. Cero URLs rotas, cero redirects necesarios.

### K.2 — Selector de idioma desktop/mobile

Viviría en `Navbar.tsx`, como un elemento adicional en el array `navItems` (o un elemento separado junto al botón "Consulta gratuita"). En desktop: junto a los demás ítems de navegación, antes del botón CTA. En mobile: dentro del menú fullscreen (`AnimatePresence` ya existente), como último ítem, con el mismo patrón de animación `initial/animate` que ya usan los demás. Necesitaría saber en qué idioma está la página actual (derivable de `window.location.pathname.startsWith("/en/")`, mismo patrón que ya usa `isEmpresaRoute`) y, para el idioma que no es el actual, a qué URL enlazar — lo que exige el mapeo de slugs traducidos de K.5.

### K.3 — Arquitectura de Content Collections multidioma

Dos alternativas:

- **Campo `locale` en el mismo schema** (`services`, `promises`, etc. ganan un campo `locale: z.enum(['es', 'en'])`, y cada idioma es una entrada distinta con el mismo `slug` base pero locale distinto) — mantiene un único schema, pero mezcla ambos idiomas en la misma carpeta/colección y complica los filtros de `getCollection` (todo query necesita añadir `&& data.locale === 'es'`).
- **Colecciones separadas por idioma** (`services` para ES, `servicesEn` para EN, ambas con el mismo `schema` base reutilizado vía una función compartida, ej. `const servicesSchema = (transversalSchema) => transversalSchema.extend({...})`, invocada dos veces) — más colecciones declaradas en `content.config.ts`, pero cada una con su propio `maturityLevel`/`lastReviewed` independientes de forma natural (requisito vinculante de Estrategia), y sin tener que añadir un filtro de locale a cada query existente.

**Recomendación:** colecciones separadas, con el schema base extraído a una función reutilizable para no duplicarlo. Encaja mejor con el requisito explícito de "`maturityLevel` independiente por idioma" — con un campo `locale` en la misma colección, sería fácil accidentalmente escribir un filtro que trate ambos idiomas como una sola unidad de gobernanza; con colecciones separadas, esa separación es estructural, no depende de que cada query recuerde filtrar por locale.

### K.4 — Reutilización de componentes existentes sin duplicar código

`ServiceCard.tsx`, `ServiceDetail.tsx`, `PromiseList.tsx`, `HowWeWork.tsx` ya reciben su contenido como props/parámetros (no tienen texto hardcodeado de negocio) — **no necesitan cambios** para servir ambos idiomas. Lo único que cambia es qué colección lee la página `.astro` que los envuelve: una página bajo `/en/services/` importaría el mismo `ServiceCard`, pero pasándole datos de `getCollection('servicesEn', ...)` en vez de `getCollection('services', ...)`. El componente es agnóstico al idioma; solo el `.astro` que lo invoca sabe de qué colección viene el dato — mismo principio ya aplicado sin darse cuenta en la construcción de `/servicios/`, donde el componente no sabe nada del schema, solo recibe props tipadas.

Único hardcode de idioma a resolver aparte: microcopy de UI dentro de los propios componentes (ej. "Servicio insignia" en `ServiceCard.tsx`, los headings de `ServiceDetail.tsx` como "El problema"/"Qué evaluamos") — eso sí está hardcodeado en español dentro del componente. Ver K.13 para cómo encaja esto sin duplicar componentes.

### K.5 — Gestión de slugs traducidos

El campo `slug` ya existe en el schema de `services` (añadido en la Tarea #6). Con colecciones separadas por idioma (K.3), cada colección tiene su propio `slug` en su propio idioma (`auditoria-seguridad-web` en `services`, `web-security-audit` en `servicesEn`) — son independientes, no hay conflicto de namespacing. Lo que sí hace falta es un campo adicional de **enlace entre ambas versiones del mismo documento** (ej. `translationKey: "web-security-audit"` en ambas colecciones, con el mismo valor en ES y EN) para que el selector de idioma (K.2) sepa a qué URL saltar al cambiar de idioma sin depender de que los slugs coincidan textualmente.

### K.6 — Metadata SEO por idioma

`Layout.astro` ya recibe `title`/`description` como props desde cada página — el mecanismo ya soporta esto sin cambios: cada página `.astro` bajo `/en/` simplemente pasaría el `title`/`description` en inglés al mismo `<Layout>`. No requiere tocar `Layout.astro` para esta parte.

### K.7 — `hreflang`

Sí requiere tocar `Layout.astro` — añadir, dentro del `<head>`, un `<link rel="alternate" hreflang="es" href="...">` y su equivalente `hreflang="en"` (más `x-default` apuntando a la versión ES, como idioma fuente principal) por cada página que tenga versión en ambos idiomas. Necesita una nueva prop en `Layout.astro` (ej. `alternateUrls?: { es?: string; en?: string }`) que cada página pase explícitamente — no se puede derivar automáticamente sin el campo `translationKey` de K.5.

### K.8 — `canonical` por idioma

`Layout.astro` ya construye `canonicalUrl` a partir de `canonicalPath` (prop existente). No necesita cambios de mecanismo: una página bajo `/en/services/web-security-audit/` simplemente pasaría `canonicalPath="/en/services/web-security-audit/"` como ya hace cualquier página hoy. `canonical` y `hreflang` son conceptualmente independientes: `canonical` le dice al buscador "esta es la URL autoritativa de *esta* página"; `hreflang` le dice "esta página tiene estas otras versiones de idioma". No hay conflicto entre ambos mecanismos.

### K.9 — Comportamiento cuando ES está publicado pero EN no existe todavía

Con la arquitectura estática de carpetas (K.1) sin middleware, no hay fallback automático — hay que decidir explícitamente, por página, uno de estos tres comportamientos, ninguno "gratis":
- **Ocultar el selector de idioma** para esa página si no existe su par en el otro idioma (requiere que el selector consulte si existe la entrada `EN` correspondiente al `translationKey` actual antes de renderizar el enlace).
- **No generar la ruta `/en/...`** en absoluto (comportamiento por defecto de cualquier página `.astro` que no exista — 404 nativo de Cloudflare Pages si alguien llega por URL directa).
- **Fallback explícito**: la página EN existe pero muestra un aviso ("This content is not yet available in English — spanish content is authoritative") en vez de contenido traducido a medias.

**Recomendación:** ocultar el selector para la página que no tenga par (primera opción) — es la más coherente con "inglés como contenido gobernado, nunca traducción automática": si Estrategia no ha aprobado esa pieza en inglés, no debe existir ningún rastro de ella, ni un enlace roto ni un aviso de "coming soon" no aprobado tampoco. Esto es una decisión de UX con implicación de negocio — señalada aquí, no decidida unilateralmente por mí más allá de la recomendación técnica.

### K.10 — Detección de contenido EN desactualizado respecto a ES

Con colecciones separadas (K.3) y el campo `lastReviewed` ya existente en el schema transversal de ambas, un script de auditoría (no en build, sino una utilidad separada, ej. `npm run i18n:audit`) podría comparar `lastReviewed` de cada entrada ES contra su par EN vía `translationKey` (K.5), y listar cualquier par donde `lastReviewed` (ES) sea posterior a `lastReviewed` (EN) — es decir, "la versión española cambió después de que se tradujera la inglesa". Esto no bloquea el build (no es una regla de `maturityLevel`), es una herramienta de gobernanza para que Estrategia sepa qué traducciones revisar, no algo que decida automáticamente ocultar contenido.

### K.11 — Impacto sobre `maturityLevel`/`lastReviewed`/gobernanza

Con colecciones separadas por idioma, cada documento (ES y EN) tiene sus propios `maturityLevel`, `lastReviewed`, `owner`, `strategicImportance`, etc., de forma completamente independiente — es una consecuencia natural de K.3, no un mecanismo adicional a construir. **Nunca "si ES está `published`, EN se publica automáticamente"**: el filtro de build para EN sería exactamente el mismo patrón ya usado (`data.maturityLevel === 'published'`), aplicado a su propia colección `servicesEn`/`promisesEn`, sin ninguna relación automática con el estado de la colección ES. Esto cumple el principio vinculante de Estrategia por construcción, no por disciplina manual.

### K.12 — Impacto sobre Header, Footer, navegación, CTA, formulario de contacto

- **Header/Navbar, Footer, CTA:** microcopy hardcodeado en español dentro de los componentes (`"Consulta gratuita"`, `"Solicitar Diagnóstico Ejecutivo"`, enlaces del footer, etc.) — necesitaría externalizarse a un diccionario de UI por idioma (ver K.13) para no duplicar componentes, ya que hoy ese texto vive directamente en el JSX.
- **Formulario de contacto (`Contact.tsx` + `functions/api/contact.ts`):** confirmado leyendo el código de la Pages Function — **`contact.ts` no recibe ni usa ningún campo de idioma.** El payload es `{ nombre, email, empresa, mensaje, turnstileToken }`; los mensajes de éxito/error del formulario están hardcodeados en español directamente en `Contact.tsx` (`toast.success("Mensaje enviado...")`, etc.), y la plantilla de EmailJS (`template_params`) tampoco lleva ningún indicador de idioma. **Si se necesita que el email interno o la respuesta al usuario reflejen el idioma de origen**, hace falta: (a) que `Contact.tsx` envíe un campo `locale` en el body del POST, (b) que `contact.ts` lo acepte y opcionalmente lo pase a `template_params` para que la plantilla de EmailJS pueda diferenciar, y (c) que los textos de UI del formulario (labels, placeholders, mensajes de error/éxito) vengan del diccionario de K.13 en vez de estar hardcodeados. Ninguno de estos tres cambios existe hoy — es trabajo nuevo si se activa EN, no algo ya soportado silenciosamente.

### K.13 — Propuesta de estructura técnica final

Cambios estructurales, en orden de menor a mayor alcance:

1. **`content.config.ts`** — añadir colecciones EN paralelas (`servicesEn`, `promisesEn`, etc.), reutilizando el `transversalSchema` y una función de schema compartida por colección para no duplicar la definición de campos.
2. **`src/pages/en/`** — árbol de páginas `.astro` paralelo a `/servicios/` y `/empresa/`, mismo patrón de página individual ya establecido (no rutas dinámicas, consistente con la decisión ya tomada para `/servicios/`).
3. **Diccionario de microcopy de UI** — un único archivo (ej. `src/i18n/ui.ts`) con las cadenas fijas por idioma que hoy están hardcodeadas en componentes (`"Servicio insignia"`, headings de `ServiceDetail`, copy de `Navbar`/`Footer`/CTA) — los componentes reciben la cadena como prop o la resuelven vía una función `t(key, locale)` simple, sin librería externa de i18n runtime (no hace falta más maquinaria para 2 idiomas estáticos).
4. **`Layout.astro`** — nueva prop `alternateUrls` para generar `hreflang` (K.7); `canonicalPath` ya soporta `canonical` por idioma sin cambios (K.8).
5. **`Navbar.tsx`** — nuevo ítem de selector de idioma (K.2), condicionado a que exista `translationKey` par (K.9).
6. **Nada de esto requiere adaptador SSR ni tocar `astro.config.mjs` más allá de, opcionalmente, no usar el bloque `i18n` nativo en absoluto** (según la recomendación de la verificación técnica) — es el conjunto de cambios estructurales más pequeño posible sin sacrificar ninguno de los principios vinculantes de Estrategia.

**No implementado. Ningún archivo de código tocado al escribir esta sección.**
