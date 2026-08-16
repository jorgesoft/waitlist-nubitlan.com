import { ClipboardCheckIcon } from 'lucide-react'

import { ServicePageTemplate } from '@/components/ServicePageTemplate'

function DataProtectionEvaluationPage() {
  return (
    <ServicePageTemplate
      icon="lock"
      eyebrow="Servicio"
      title="Evaluación Inicial Ley de Protección de Datos"
      description="Verifica el cumplimiento de tu empresa con la Ley de Protección de Datos Personales de El Salvador."
      overviewTitle="¿Qué incluye este servicio?"
      overviewBody="Realizamos una evaluación completa del estado de cumplimiento de tu empresa con la Ley de Protección de Datos Personales de El Salvador, identificando brechas y proporcionando un plan de acción claro para lograr el cumplimiento total."
      featuresTitle="Características principales"
      features={[
        { text: 'Evaluación del estado actual de cumplimiento normativo' },
        { text: 'Análisis de políticas y procedimientos de protección de datos' },
        { text: 'Identificación de brechas y riesgos de incumplimiento' },
        { text: 'Reporte detallado con recomendaciones específicas' },
        { text: 'Plan de acción priorizado para lograr el cumplimiento' },
        { text: 'Plantillas de documentos legales necesarios' },
      ]}
      sections={[
        {
          title: '¿Por qué es importante?',
          tinted: true,
          items: [
            {
              icon: 'alert',
              title: 'Evita sanciones',
              body: 'Las multas por incumplimiento pueden alcanzar grandes sumas de dinero. Protege tu empresa de sanciones costosas.',
              tone: 'warning',
            },
            {
              icon: 'users',
              title: 'Genera confianza',
              body: 'Demuestra a tus clientes que tomas en serio la protección de sus datos personales.',
            },
            {
              icon: 'trophy',
              title: 'Ventaja competitiva',
              body: 'Diferénciate de la competencia con prácticas sólidas de protección de datos.',
              tone: 'success',
            },
          ],
        },
      ]}
      cta={{
        title: 'Comienza tu evaluación hoy',
        body: 'Contáctanos para programar tu evaluación inicial de cumplimiento con la Ley de Protección de Datos.',
        extra: {
          to: '/evaluacion',
          label: 'Prueba nuestra evaluación gratuita',
          icon: ClipboardCheckIcon,
        },
      }}
    />
  )
}

export default DataProtectionEvaluationPage
