import { Link } from 'react-router-dom'
import { ArrowLeftIcon, WrenchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PixelSky } from '@/components/pixel/pixel-sky'
import { PixelCloud } from '@/components/pixel/pixel-sky'

function NotFoundPage() {
  return (
    <PixelSky className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <PixelCloud shape="big" width={200} className="mx-auto" />

        <p className="font-pixel text-primary mt-8 text-5xl">404</p>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-balance">
          Esta página se fue con las nubes
        </h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          La dirección que buscas no existe o cambió de lugar.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="pixel" size="lg">
            <Link to="/">
              <ArrowLeftIcon />
              Volver al inicio
            </Link>
          </Button>
          <Button asChild variant="pixelOutline" size="lg">
            <Link to="/herramientas">
              <WrenchIcon />
              Ver herramientas
            </Link>
          </Button>
        </div>
      </div>
    </PixelSky>
  )
}

export default NotFoundPage
