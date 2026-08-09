import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Metadatos transversales — ver docs/arquitectura-fase2-v4.md, sección 0.
// Regla de build: solo maturityLevel: 'published' se renderiza en producción
// (draft/review/approved = preview interno; deprecated = indexado con aviso;
// archived = fuera del build, se conserva en el repo para auditoría).
const transversalSchema = z.object({
  strategicImportance: z.enum(['critical', 'high', 'medium', 'low']),
  owner: z.enum([
    'Estrategia',
    'CTO',
    'Marketing',
    'Legal',
    'Blue Team',
    'Customer Success',
  ]),
  lastReviewed: z.coerce.date(),
  maturityLevel: z.enum([
    'draft',
    'review',
    'approved',
    'published',
    'deprecated',
    'archived',
  ]),
  isStrategicAsset: z.boolean().default(false),
  // Valores de negocio a los que aporta este contenido (arquitectura v4,
  // sección 0). Array porque un mismo contenido puede aportar a varios a la
  // vez. .min(1): obligatorio declarar al menos uno, sin excepción — sin
  // default implícito.
  businessValue: z
    .array(
      z.enum([
        'lead_generation',
        'authority',
        'trust',
        'conversion',
        'seo',
        'education',
        'retention',
      ])
    )
    .min(1),
});

// Colección `services` — owner por defecto: Estrategia (tabla sección 0).
// Alimenta /servicios/ y ServicesGrid (Sprint 1, tarea 6).
const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: transversalSchema.extend({
    owner: transversalSchema.shape.owner.default('Estrategia'),
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

// Colección `caseStudies` — owner por defecto: Estrategia (tabla sección 0).
// Alimenta /casos-de-exito/ (Sprint 1, tarea 7). Campos de negocio y
// evidenceLevel documentados en docs/arquitectura-fase2-v4.md, sección 3.2.
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: transversalSchema.extend({
    owner: transversalSchema.shape.owner.default('Estrategia'),
    title: z.string(),
    client: z.string().optional(),
    sector: z.string(),
    challenge: z.string(),
    vulnerabilitiesFound: z.array(z.string()).default([]),
    remediationTime: z.string(),
    improvementSummary: z.string(),
    summary: z.string(),
    // Control de build para afirmaciones públicas (CLAUDE.md, checklist BREACH/SHIELD):
    // publico = publicable tal cual; anonimizado = publicable sin identificar al cliente;
    // solo-interno = nunca se renderiza en el sitio público.
    evidenceLevel: z.enum(['publico', 'anonimizado', 'solo-interno']),
    order: z.number().default(0),
  }),
});

// Colección `promises` — nombre técnico interno sin cambios; el nombre visible
// pasa a /empresa/nuestro-compromiso/ (arquitectura v4, sección 2).
// owner por defecto: Estrategia; isStrategicAsset por defecto true en esta
// colección específica (sección 3.1) — compromiso público de marca.
const promises = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/promises' }),
  schema: transversalSchema.extend({
    owner: transversalSchema.shape.owner.default('Estrategia'),
    isStrategicAsset: z.boolean().default(true),
    statement: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { services, caseStudies, promises };
