import { Link } from 'react-router-dom'
import { MailPlusIcon, StarIcon } from 'lucide-react'

import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const STEPS = [
  {
    step: '01',
    title: 'Identificación de riesgos',
    body: 'Usando IA, identificamos sistemas expuestos, servicios desactualizados y puntos de acceso no autorizado. Explicamos el impacto de cada vulnerabilidad en la operación y el cumplimiento legal.',
  },
  {
    step: '02',
    title: 'Análisis de cumplimiento',
    body: 'La IA evaluó automáticamente qué artículos de la ley estaban en riesgo y qué acciones eran prioritarias para mitigarlo.',
  },
  {
    step: '03',
    title: 'Plan de remediación',
    body: 'Generamos un plan priorizado con ajustes técnicos, controles recomendados y pasos para fortalecer procesos internos.',
  },
]

function CaseStudyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Caso de estudio"
        title="De la incertidumbre a un plan concreto"
        description="Nuestro trabajo con el primer cliente muestra cómo la IA acelera el camino hacia el cumplimiento."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol className="stagger space-y-6">
            {STEPS.map((item) => (
              <li key={item.step}>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex gap-5 p-7">
                    <span className="font-pixel text-primary text-2xl leading-none">
                      {item.step}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">
                        {item.title}
                      </h2>
                      <p className="text-muted-foreground mt-2.5 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <Card className="border-success/40 bg-success/5 mt-10">
            <CardContent className="p-8 text-center">
              <StarIcon className="text-success mx-auto size-9 fill-current" />
              <h2 className="mt-4 text-2xl font-bold tracking-tight">
                Resultado
              </h2>
              <p className="text-muted-foreground mt-3 text-lg leading-relaxed text-pretty">
                El cliente destacó que por primera vez tenía una visión clara de
                sus riesgos y un camino concreto para solucionarlo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance">
            ¿Listo para preparar tu empresa?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Únete a la lista de espera y recibe una evaluación rápida.
          </p>
          <Button asChild variant="pixel" size="xl" className="mt-8">
            <Link to="/#lista-de-espera">
              <MailPlusIcon />
              Únete a la lista de espera
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}

export default CaseStudyPage
