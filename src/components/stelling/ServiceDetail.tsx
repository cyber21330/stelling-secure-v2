import { ServiceTextBlock } from "./ServiceTextBlock";
import { ServiceListBlock } from "./ServiceListBlock";
import { ServiceContactCTA } from "./ServiceContactCTA";

interface ServiceDetailData {
  title: string;
  description: string;
  problem?: string;
  risk?: string;
  evaluation?: string[];
  evidence?: string;
  decision?: string;
  remediation?: string;
  targetClient?: string;
  scope?: string;
  deliverables?: string[];
  limitations?: string[];
}

interface ServiceDetailProps {
  service: ServiceDetailData;
}

export const ServiceDetail = ({ service }: ServiceDetailProps) => (
  <article style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
    <header style={{ marginBottom: 64, maxWidth: 720 }}>
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          color: "var(--text)",
          fontWeight: 700,
          fontSize: "clamp(32px, 5vw, 48px)",
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        {service.title}
      </h1>
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: "rgba(0,229,255,0.7)",
          fontSize: 18,
          lineHeight: 1.7,
        }}
      >
        {service.description}
      </p>
    </header>

    <ServiceTextBlock heading="El problema" text={service.problem} />
    <ServiceTextBlock heading="El riesgo" text={service.risk} />
    <ServiceListBlock heading="Qué evaluamos" items={service.evaluation} />
    <ServiceTextBlock heading="Cómo documentamos los hallazgos" text={service.evidence} />
    <ServiceTextBlock heading="Cómo priorizamos" text={service.decision} />
    <ServiceTextBlock heading="Recomendaciones y seguimiento" text={service.remediation} />
    <ServiceTextBlock heading="Para quién es" text={service.targetClient} />
    <ServiceTextBlock heading="Alcance" text={service.scope} />
    <ServiceListBlock heading="Qué entregamos" items={service.deliverables} />
    <ServiceListBlock heading="Limitaciones" items={service.limitations} />

    <ServiceContactCTA />
  </article>
);
