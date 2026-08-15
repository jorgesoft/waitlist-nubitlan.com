import {
  AwardIcon,
  HomeIcon,
  LaptopIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  UsersRoundIcon,
  VideoIcon,
} from 'lucide-react'

import { ICON_BOOK } from '@/components/pixel/sprites'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'

function SecurityTrainingPage() {
  return (
    <ServicePageTemplate
      sprite={ICON_BOOK}
      eyebrow="Servicio"
      title="Capacitación en Seguridad"
      description="Fortalece las capacidades de tu equipo con entrenamiento especializado, desde concientización hasta habilidades técnicas avanzadas."
      overviewTitle="¿Qué incluye este servicio?"
      overviewBody="Ofrecemos programas de capacitación personalizados que cubren todos los aspectos de la seguridad de la información, desde la concientización básica hasta el entrenamiento técnico especializado para ingenieros y profesionales de TI."
      featuresTitle="Áreas de capacitación"
      features={[
        {
          label: 'Concientización en Seguridad:',
          text: 'Entrenamiento para todos los empleados sobre mejores prácticas, phishing, ingeniería social y protección de datos.',
        },
        {
          label: 'Desarrollo Seguro:',
          text: 'Capacitación técnica en codificación segura, OWASP Top 10, revisión de código y pruebas de seguridad.',
        },
        {
          label: 'Seguridad en la Nube:',
          text: 'Entrenamiento en AWS, Azure y GCP — configuración segura, IAM, monitoreo y respuesta a incidentes.',
        },
        {
          label: 'Cumplimiento Legal:',
          text: 'Capacitación en Ley de Protección de Datos, GDPR, requisitos de cumplimiento y gestión de privacidad.',
        },
        {
          label: 'Respuesta a Incidentes:',
          text: 'Entrenamiento práctico en detección, análisis y respuesta a incidentes de seguridad.',
        },
        {
          label: 'Seguridad en DevOps:',
          text: 'Integración de seguridad en pipelines CI/CD, contenedores, Kubernetes y automatización.',
        },
      ]}
      sections={[
        {
          title: 'Formatos de capacitación',
          tinted: true,
          items: [
            {
              icon: UsersRoundIcon,
              title: 'Talleres presenciales',
              body: 'Sesiones interactivas en tu empresa con ejercicios prácticos y casos reales.',
            },
            {
              icon: VideoIcon,
              title: 'Capacitación virtual',
              body: 'Sesiones en línea en vivo con interacción directa y materiales digitales.',
              tone: 'success',
            },
            {
              icon: LaptopIcon,
              title: 'Laboratorios prácticos',
              body: 'Entornos de práctica seguros para aplicar conocimientos técnicos.',
              tone: 'warning',
            },
          ],
        },
        {
          title: 'Beneficios para tu organización',
          items: [
            {
              icon: ShieldCheckIcon,
              title: 'Reduce riesgos',
              body: 'Empleados capacitados son tu primera línea de defensa contra amenazas de seguridad.',
            },
            {
              icon: TrendingUpIcon,
              title: 'Mejora continua',
              body: 'Desarrolla una cultura de seguridad que evoluciona con las amenazas.',
              tone: 'success',
            },
            {
              icon: AwardIcon,
              title: 'Cumplimiento normativo',
              body: 'Cumple con requisitos de capacitación de leyes y estándares de seguridad.',
              tone: 'warning',
            },
            {
              icon: UsersIcon,
              title: 'Desarrollo de talento',
              body: 'Invierte en el crecimiento profesional de tu equipo técnico.',
            },
          ],
        },
      ]}
      cta={{
        title: 'Capacita a tu equipo hoy',
        body: 'Contáctanos para diseñar un programa de capacitación personalizado para tu organización.',
        extra: { to: '/', label: 'Volver al inicio', icon: HomeIcon },
      }}
    />
  )
}

export default SecurityTrainingPage
