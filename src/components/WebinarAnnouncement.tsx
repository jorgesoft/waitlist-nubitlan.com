function WebinarAnnouncement() {
  return (
    <div
      className="text-center py-3 px-3"
      style={{ backgroundColor: '#f59e0b', fontSize: '1rem' }}
    >
      <i className="bi bi-camera-video-fill me-2" style={{ color: '#1a1a1a' }}></i>
      <strong style={{ color: '#1a1a1a' }}>Webinar gratuito &mdash;</strong>{' '}
      <a
        href="https://events.teams.microsoft.com/event/ee453fb0-4ad6-43c4-bdf5-31003e0db30d@6ab7acf2-fe86-4069-9292-89cfc34493e3"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1a1a1a', fontWeight: 700, textDecoration: 'underline' }}
      >
        El Estado de la Ciberseguridad para Desarrolladores en El Salvador
      </a>
      <a
        href="https://events.teams.microsoft.com/event/ee453fb0-4ad6-43c4-bdf5-31003e0db30d@6ab7acf2-fe86-4069-9292-89cfc34493e3"
        target="_blank"
        rel="noopener noreferrer"
        className="ms-3 px-2 py-1 rounded fw-bold text-decoration-none"
        style={{ backgroundColor: '#1a1a1a', color: '#f59e0b', fontSize: '0.8rem', letterSpacing: '0.04em' }}
      >
        REGÍSTRATE
      </a>
    </div>
  )
}

export default WebinarAnnouncement
