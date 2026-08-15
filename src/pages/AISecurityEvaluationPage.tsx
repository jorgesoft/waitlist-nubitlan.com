import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  ZapIcon,
} from 'lucide-react'

import { ICON_ROBOT } from '@/components/pixel/sprites'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'

function AISecurityEvaluationPage() {
  return (
    <ServicePageTemplate
      sprite={ICON_ROBOT}
      eyebrow="Servicio"
      title="Evaluación de Seguridad Externa con IA"
      description="Análisis automatizado de vulnerabilidades y riesgos de seguridad para tu empresa."
      overviewTitle="¿Qué incluye este servicio?"
      overviewBody="Utilizamos inteligencia artificial avanzada para realizar una evaluación exhaustiva de la seguridad externa de tu infraestructura digital, identificando vulnerabilidades y proporcionando recomendaciones accionables para fortalecer tu postura de seguridad."
      featuresTitle="Características principales"
      features={[
        { text: 'Escaneo automatizado de vulnerabilidades en tu infraestructura web' },
        { text: 'Análisis de configuraciones de seguridad y mejores prácticas' },
        { text: 'Detección de exposición de datos sensibles' },
        { text: 'Reporte detallado con priorización de riesgos' },
        { text: 'Recomendaciones específicas para remediar vulnerabilidades' },
      ]}
      sections={[
        {
          title: 'Beneficios para tu empresa',
          tinted: true,
          items: [
            {
              icon: ZapIcon,
              title: 'Rápido y eficiente',
              body: 'Obtén un análisis completo en pocos días, con resultados detallados y accionables para tu negocio.',
            },
            {
              icon: ShieldCheckIcon,
              title: 'Protección proactiva',
              body: 'Identifica y corrige vulnerabilidades antes de que sean explotadas por atacantes.',
              tone: 'success',
            },
            {
              icon: TrendingUpIcon,
              title: 'Mejora continua',
              body: 'Recibe recomendaciones claras para mejorar tu postura de seguridad de forma progresiva.',
            },
          ],
        },
      ]}
      cta={{
        title: '¿Listo para fortalecer tu seguridad?',
        body: 'Contáctanos para obtener más información sobre nuestro servicio de evaluación de seguridad con IA.',
        extra: { to: '/', label: 'Volver al inicio', icon: ArrowLeftIcon },
      }}
    />
  )
}

export default AISecurityEvaluationPage
