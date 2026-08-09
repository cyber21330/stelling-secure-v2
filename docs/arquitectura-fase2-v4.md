# Stelling Secure — Arquitectura Fase 2 (v4, aprobada — Sistema Operativo Empresarial)

**Estado:** APROBADA. Implementación en repositorio autorizada.
**Cambios v4:** tabla `owner` actualizada; nuevo metadato `maturityLevel`; concepto "Corporate Memory" (documental, sin implementar en el sitio); `/nuestra-promesa/` → `/nuestro-compromiso/`; nav principal simplificada a 6 ítems; estructura documental del "Brand & Identity Manual".

---

## 0. Metadatos transversales (todas las colecciones)

```
strategicImportance: critical | high | medium | low
owner: Estrategia | CTO | Marketing | Legal | Blue Team | Customer Success
lastReviewed: fecha (ISO)
maturityLevel: draft | review | approved | published | deprecated | archived
isStrategicAsset: boolean
businessValue: array de lead_generation | authority | trust | conversion |
                seo | education | retention (mínimo 1, sin excepción)
```

### `businessValue` — nota técnica de implementación
Array (`z.array(enum).min(1)`), no enum único: un mismo contenido puede aportar a varios valores de negocio a la vez (ej. un caso de éxito puede ser `trust` + `conversion` + `authority`). Aplica a las 3 colecciones del transversalSchema (`services`, `caseStudies`, `promises`) sin excepción — todo contenido debe declarar explícitamente al menos un valor, no hay default implícito.

### Tabla `owner` (v4, valores por defecto — representan responsabilidad empresarial, no autoría técnica)

| Activo | owner |
|---|---|
| Metodología SSA™ | Estrategia |
| SSA Engine | CTO |
| auditctl | CTO |
| Servicios | Estrategia |
| Casos de éxito | Estrategia |
| Insights | Blue Team |
| Blog | Marketing |
| FAQ | Customer Success |
| Testimonios | Customer Success |
| Dossier corporativo | Marketing |
| Nuestro Compromiso | Estrategia |
| Recursos descargables | Marketing |

### `maturityLevel` — nota técnica de implementación
Es un campo de estado, distinto de `evidenceStatus` (que controla riesgo de afirmaciones) y de `strategicImportance` (que controla prioridad). Regla de build: **solo el contenido con `maturityLevel: published` se renderiza en producción.** `draft`/`review`/`approved` son estados de trabajo interno (visibles en preview, no en el sitio público); `deprecated` se mantiene indexado pero con aviso; `archived` se retira del build pero no se borra del repositorio — preserva histórico para auditoría interna, coherente con el principio de no depender de la memoria de las personas.

---

## 1. Corporate Memory (concepto, no implementación)

Sistema transversal de clasificación del conocimiento interno de la empresa, **no es una colección del sitio web** — vive como documentación en el repositorio (o en la herramienta que Estrategia decida, ej. carpeta `/corporate-memory/` fuera del build de Astro) y no se publica.

Categorías: `Empresa`, `Marketing`, `Ventas`, `Operaciones`, `Metodología SSA™`, `Tecnología`, `Legal`, `Finanzas`, `Recursos Humanos`, `SSKB`.

Nota de arquitectura: cada documento de Corporate Memory hereda los mismos metadatos transversales (`owner`, `strategicImportance`, `maturityLevel`, `lastReviewed`) para que, cuando se decida darle una interfaz propia en el futuro, no haga falta rediseñar el modelo de datos — solo construir la vista. No requiere trabajo en Sprint 1.

---

## 2. Arquitectura de Información (v4)

### Sitemap

```
/                                   Home
/servicios/
  /servicios/auditoria-seguridad-web/
  /servicios/consultoria-pymes/
  /servicios/desarrollo-seguro/
/metodologia-ssa/
/empresa/
  /empresa/quienes-somos/           Historia · Misión · Visión · Valores · Filosofía · El Fundador
  /empresa/como-trabajamos/
  /empresa/nuestro-compromiso/      (antes "nuestra-promesa")
/casos-de-exito/
/recursos/
  /recursos/insights/[slug]/
  /recursos/blog/[slug]/            (largo plazo)
  /recursos/informes/[slug]/
  /recursos/dossier/
/faq/
/contacto/
/legal/
```

**Cambio de agrupación real, no solo de nombre:** `Quiénes Somos`, `Cómo Trabajamos` y `Nuestro Compromiso` pasan a vivir bajo `/empresa/` como sub-rutas — no solo agrupadas visualmente en el nav como en v3. Esto sí es un cambio estructural de URLs: si alguna de esas páginas ya estuviera indexada por Google bajo la ruta antigua, haría falta un redirect 301. Como todavía no se ha implementado nada, no hay coste — lo señalo para que quede constancia de por qué la v3 recomendaba agrupación de nav sin mover rutas y la v4 sí las mueve.

### Navegación principal (simplificada, 6 ítems)
`Servicios · Metodología SSA™ · Casos de Éxito · Recursos · Empresa · Contacto`

`Empresa` es un desplegable que enlaza a las tres sub-rutas anteriores.

### Renombrado `/nuestra-promesa/` → `/empresa/nuestro-compromiso/`
Colección `promises` se mantiene con ese nombre técnico interno (renombrar una colección en Astro implica migrar referencias en todo el contenido ya creado; como todavía no hay contenido cargado, es gratis ahora — lo mantengo documentado para que quede explícito que el nombre visible cambia, el identificador técnico interno no, salvo que Estrategia lo pida expresamente).

---

## 3. Arquitectura de Componentes

Sin cambios de fondo respecto a v3. `PromiseList` pasa a renderizar `/empresa/nuestro-compromiso/`; mismo componente, misma colección `promises`.

### 3.1 Colección `promises` — schema (implementado en `src/content/config.ts`)

```
statement: string
order: number (default 0)
owner: default 'Estrategia'
isStrategicAsset: default true   ← excepción frente al default false del resto
                                    de colecciones; compromiso público de marca
+ metadatos transversales (sección 0)
```

Nombre técnico interno `promises` sin cambios (ver sección 2). No usa `title`/`description` como `services` — el campo de contenido es `statement`.

### 3.2 Colección `caseStudies` — schema (implementado en `src/content/config.ts`)

```
title: string
client: string (opcional)
sector: string
challenge: string
vulnerabilitiesFound: string[] (default [])
remediationTime: string
improvementSummary: string
summary: string
evidenceLevel: 'publico' | 'anonimizado' | 'solo-interno'
order: number (default 0)
owner: default 'Estrategia'
+ metadatos transversales (sección 0)
```

`evidenceLevel` es el control de build para afirmaciones públicas sobre clientes reales (checklist BREACH/SHIELD, CLAUDE.md): `publico` se publica tal cual, `anonimizado` se publica sin identificar al cliente, `solo-interno` nunca se renderiza en el sitio público. Alimenta `/casos-de-exito/` (tarea 7 del roadmap, sección 5).

---

## 4. Brand & Identity Manual — estructura documental (no implementar en Sprint 1)

Nuevo activo estratégico, **documental, no es una página del sitio**:

```
strategicImportance: critical
owner: Estrategia
isStrategicAsset: true
maturityLevel: draft
```

Índice mínimo (a completar por Estrategia, no por el CTO):
1. Propósito, misión, visión, valores
2. Tono de comunicación y personalidad de marca
3. Principios éticos
4. Reglas de redacción
5. Estructura estándar de informes (ejecutivo/técnico)
6. Protocolo de comunicación con clientes
7. Identidad visual (logo, colores, tipografía — ya existe parcialmente en el sitio actual, aquí se formaliza)
8. Posicionamiento
9. Promesas permitidas / promesas prohibidas

Este manual, una vez exista, se convierte en la fuente de verdad contra la que el CTO valida cualquier copy nuevo — reemplaza revisiones ad hoc por un documento de referencia único. No bloquea Sprint 1.

---

## 5. Roadmap Sprint 1 (sin cambios de contenido respecto a v3, rutas actualizadas)

| # | Tarea | Complejidad |
|---|---|---|
| 1 | Metadatos transversales en schemas (incl. `maturityLevel`) | Baja — base de todo lo demás |
| 2 | Reestructurar IA/nav (6 ítems + `/empresa/` agrupando 3 sub-rutas) | Baja |
| 3 | `TrustBar` + Home (especialización clara en <15s) | Baja |
| 4 | `/empresa/nuestro-compromiso/` + colección `promises` + `PromiseList` | Baja |
| 5 | `/empresa/como-trabajamos/` + `HowWeWork` | Baja |
| 6 | Colección `services` + `ServicesGrid` | Media |
| 7 | Colección `caseStudies` (casos reales) | Media |
| 8 | `/empresa/quienes-somos/` + `Founder` + `CompanyValues` | Media |
| 9 | `/metodologia-ssa/` completa | Media |
| 10 | CTA evolucionado | Media |

`faq`, `insights`, `knowledgeCenterTopics`, Corporate Memory y Brand Manual quedan fuera de Sprint 1 — no aportan a las métricas de éxito definidas.

---

## 6. Objetivo y métricas del Sprint 1 (sin cambios)

En menos de 15 segundos, la Home debe transmitir que Stelling Secure es una consultora especializada en auditorías y análisis de ciberseguridad para PYMES. Se mide por: confianza, autoridad, claridad, especialización, capacidad comercial — no por funcionalidades entregadas. Recomiendo (ya señalado en v3) validar con 3-5 personas ajenas al proyecto antes de cerrar el sprint.

---

## 7. Riesgos (sin cambios)

`evidenceStatus` sigue siendo el control automático de build para RGPD, ISO 27001, ENS, NIST/CIS/OWASP. `confidentialityCheck` obligatorio en `insights`. El futuro Brand & Identity Manual, en su apartado "promesas prohibidas", debería terminar formalizando esta misma lista — cuando exista, este documento de arquitectura se actualizará para referenciarlo en vez de duplicar la política.

---

**Arquitectura cerrada. Para empezar Sprint 1 en el repositorio real, necesito acceso — sigue pendiente desde v3. Indícame cómo prefieres dármelo (clonar desde GitHub, acceso a un fork, o que trabajemos primero sobre una copia que tú subas).**
