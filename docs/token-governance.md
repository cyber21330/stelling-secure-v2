# UI Color Token Governance

> Regla permanente de gobernanza, no un artefacto de una fase concreta —
> vive separada de `docs/visual-system-v2-fase1.md` (auditoría puntual)
> por el mismo motivo que `arquitectura-fase2-v4.md` vive separado de
> `changelog-sprint1.md`: esto es una referencia viva que futuras
> sesiones deben consultar en cada PR, no un registro histórico de una
> auditoría ya cerrada.

---

## Regla central

**Token → Componente → Superficie. Nunca Color hardcodeado → Componente directamente.**

Todo color visual del proyecto (fondo, texto, borde, sombra, gradiente)
se define una única vez en `src/styles/global.css` como custom property
(`--nombre-token`) y se consume en componentes/páginas exclusivamente vía
`var(--nombre-token)`. `global.css` es la **única fuente de verdad
cromática** del proyecto.

## Bandera roja en code review

Cualquier valor `HEX` / `RGB` / `RGBA` / `HSL` nuevo introducido
directamente en un componente o página (`.tsx`, `.astro`, o cualquier
`style={{}}`/`style="..."` inline) es señal de alerta automática en
revisión de código — se trata como un defecto a corregir antes de
aprobar el PR, no como una preferencia de estilo.

## Excepción permitida (las tres condiciones, no basta con una)

Un color hardcodeado solo se acepta si se cumplen **las tres**
condiciones simultáneamente:

1. Existe una razón técnica o semántica justificada (ej.: color de
   marca de un tercero, restricción de un contexto que no soporta CSS
   custom properties).
2. El valor no corresponde a ningún token reutilizable ya existente ni
   a uno que deba crearse — es decir, no es una omisión de gobernanza,
   es un caso genuinamente fuera del sistema.
3. La excepción queda documentada explícitamente en el propio código
   con un comentario que explique el motivo, en el punto exacto donde
   aparece el valor — no en un documento aparte que nadie vuelve a
   leer.

### Excepciones ya identificadas y aceptadas (ver `visual-system-v2-fase1.md`, sección A.2/D)

- `Logo.tsx` — SVG de marca autocontenido; un logo no debe depender de
  tokens externos para seguir siendo portable fuera del proyecto.
- `#25D366` (`WhatsAppFab.tsx`) — verde oficial de marca de terceros
  (WhatsApp), no forma parte de la paleta propia.
- `<meta name="theme-color" content="#050508">` (`Layout.astro`) — los
  atributos HTML no-CSS no soportan `var(--token)`; el navegador lo lee
  como texto plano, no como CSS.

Ninguna excepción existente hoy carece de las tres condiciones — si en
el futuro aparece un color hardcodeado sin comentario justificativo en
el propio código, no es una excepción válida, es deuda técnica a
corregir.

## Mecanismo único: `global.css`, no herramientas nuevas

No se introduce configuración de Tailwind (`tailwind.config.*` no
existe en este proyecto y no se crea para esto), JSON de design tokens,
ni ningún otro mecanismo de tokens, salvo que exista una necesidad
técnica demostrada y documentada aparte (no asumida). El proyecto ya
resuelve esto con custom properties de CSS estándar — no hay
justificación técnica hoy para añadir una capa adicional.

## Regla específica: violeta como texto

`--violet` (`#7B4FFF`) **no debe usarse como color de texto de tamaño
normal** en ningún fondo donde no alcance el umbral WCAG AA — contraste
calculado: **4.27:1 sobre `--bg` (#050508), falla el mínimo de 4.5:1**
para texto normal (ver `visual-system-v2-fase1.md`, sección L).

**Sí permitido:**
- Gradientes (`--grad-main`, `--grad-text`)
- Bordes (`--violet-bdr`, `--violet-dim`)
- Iconografía (fill/stroke de SVG)
- Texto grande, ≥24px o negrita ≥18.66px (umbral AA de "texto grande": 3:1, que sí cumple)
- Fondos de superficie/accent (no como color de primer plano sobre fondo oscuro)

**No permitido:** párrafos, labels, metadatos, o cualquier texto de
cuerpo en tamaño normal usando `--violet` como `color` sobre `--bg`,
`--bg2`, `--bg3` o `--bg4` (todos ellos comparten un nivel de
luminancia demasiado bajo para que el violeta alcance 4.5:1).

Verificado por `grep` (ver `visual-system-v2-fase1.md`, A.2): esta
situación **no ocurre hoy en ningún componente real** — la regla existe
para prevenir que se introduzca por accidente al implementar Fase 2B o
posteriores, no porque exista un caso a corregir ahora mismo.
