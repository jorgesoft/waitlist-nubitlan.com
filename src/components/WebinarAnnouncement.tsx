import { VideoIcon } from 'lucide-react'

const WEBINAR_URL =
  'https://events.teams.microsoft.com/event/ee453fb0-4ad6-43c4-bdf5-31003e0db30d@6ab7acf2-fe86-4069-9292-89cfc34493e3'

function WebinarAnnouncement() {
  return (
    <div className="bg-warning text-warning-foreground flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-3 text-center text-sm">
      <span className="inline-flex items-center gap-2 font-semibold">
        <VideoIcon className="size-4" aria-hidden="true" />
        Webinar gratuito —
      </span>
      <a
        href={WEBINAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline underline-offset-2 hover:no-underline"
      >
        El Estado de la Ciberseguridad para Desarrolladores en El Salvador
      </a>
      <a
        href={WEBINAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono bg-foreground text-warning px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.1em] transition-transform hover:-translate-y-0.5"
      >
        REGÍSTRATE
      </a>
    </div>
  )
}

export default WebinarAnnouncement
