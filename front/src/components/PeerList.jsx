import { useEffect, useState } from 'react'
import { api } from '../api/index.js'
import Avatar from './Avatar.jsx'

// 0: especialista de guardia en el cluster · 1: compañero de guardia en el cluster
// 2: especialista de guardia en remoto · 3: compañero de guardia en remoto
// 4: especialista fuera de turno · 5: compañero fuera de turno
function rank(peer) {
  const specialist = peer.status === 'finished'
  if (peer.available && peer.location && specialist) return 0
  if (peer.available && peer.location) return 1
  if (peer.available && specialist) return 2
  if (peer.available) return 3
  return specialist ? 4 : 5
}

export default function PeerList({ project }) {
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('all') // 'all' | 'finished' | 'in_progress'
  const [onlyOnDuty, setOnlyOnDuty] = useState(false)
  const [groupTherapyOpen, setGroupTherapyOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTypeFilter('all')
    setOnlyOnDuty(false)
    setGroupTherapyOpen(false)
    setCopied(false)
    api.getPeers(project.id).then((p) => {
      setPeers(p)
      setLoading(false)
    })
  }, [project.id])

  if (loading) return <p>Cargando compañeros...</p>

  const onDuty = peers.filter((p) => p.available).length
  const onDutySpecialists = peers.filter((p) => p.available && p.status === 'finished').length
  const sorted = [...peers].sort((a, b) => rank(a) - rank(b))

  const byDuty = onlyOnDuty ? sorted.filter((p) => p.available) : sorted
  const specialistsCount = byDuty.filter((p) => p.status === 'finished').length
  const inProgressCount = byDuty.filter((p) => p.status === 'in_progress').length
  const filtered =
    typeFilter === 'all' ? byDuty : byDuty.filter((p) => p.status === typeFilter)

  const badge = (peer) => {
    if (!peer.available) return <span className="badge off">Fuera de turno</span>
    return (
      <span className="badge on">
        {peer.location ? 'De guardia' : 'De guardia en remoto'}
      </span>
    )
  }

  const inProgressOnDuty = peers.filter((p) => p.available && p.status === 'in_progress')
  const meetupSpot = inProgressOnDuty.find((p) => p.location)?.location

  const copyLogins = async () => {
    await navigator.clipboard.writeText(inProgressOnDuty.map((p) => p.login).join(' '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusTag = (peer) => {
    if (peer.status === 'finished') {
      return <span className="badge specialist">★ Especialista</span>
    }
    return <span className="badge subtle">Paciente como tú</span>
  }

  return (
    <section>
      <h2>Quién te puede atender en {project.name}</h2>
      {onDuty > 0 ? (
        <p className="count">
          {onDuty === 1 ? '1 de guardia' : `${onDuty} de guardia`} ahora mismo
          {onDutySpecialists > 0 && (
            <> ({onDutySpecialists === 1 ? '1 especialista' : `${onDutySpecialists} especialistas`})</>
          )}
        </p>
      ) : (
        <p className="count">Hoy no hay nadie de guardia en este proyecto. ¿Y si te pones tú?</p>
      )}
      {peers.length === 0 && <p>Ahora mismo no hay nadie en este turno... pero puedes volver a preguntar más tarde.</p>}
      <div className="filters">
        <div className="filter-pills">
          {[
            ['all', `Todos (${byDuty.length})`],
            ['finished', `Especialistas (${specialistsCount})`],
            ['in_progress', `Pacientes como tú (${inProgressCount})`],
          ].map(([value, label]) => (
            <button
              key={value}
              className={`pill ${typeFilter === value ? 'active' : ''}`}
              onClick={() => setTypeFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="duty-check">
          <input
            type="checkbox"
            checked={onlyOnDuty}
            onChange={(e) => setOnlyOnDuty(e.target.checked)}
          />
          Solo de guardia
        </label>
      </div>
      {filtered.length === 0 && peers.length > 0 && (
        <p>Ahora mismo no hay nadie así de guardia. Prueba con otro filtro</p>
      )}
      {inProgressOnDuty.length >= 2 && (
        <div className="group-therapy">
          <p>
            Hay {inProgressOnDuty.length} pacientes con tu misma dolencia de guardia. ¿Iniciáis terapia de grupo?
          </p>
          {!groupTherapyOpen && (
            <button className="pill active" onClick={() => setGroupTherapyOpen(true)}>
              Iniciar terapia de grupo
            </button>
          )}
          {groupTherapyOpen && (
            <>
              <ul className="group-therapy-list">
                {inProgressOnDuty.map((p) => (
                  <li key={p.login}>
                    <Avatar login={p.login} image={p.image} size={28} />
                    <strong>{p.login}</strong>
                  </li>
                ))}
              </ul>
              <p>{meetupSpot ? `Quedad en ${meetupSpot}` : 'Quedad por Slack'}</p>
              <button className="pill" onClick={copyLogins}>
                {copied ? '¡Copiados!' : 'Copiar logins'}
              </button>
            </>
          )}
        </div>
      )}
      <ul className="peer-list">
        {filtered.map((peer) => (
          <li key={peer.login} className="peer-card">
            <Avatar login={peer.login} image={peer.image} />
            <div>
              <strong>{peer.login}</strong>
              <p>{peer.location ? `Te atiende en ${peer.location}` : 'Fuera del centro'}</p>
              {statusTag(peer)}
            </div>
            {badge(peer)}
            <a
              className="profile-link"
              href={`https://profile.intra.42.fr/users/${peer.login}`}
              target="_blank"
              rel="noreferrer"
            >
              Ver perfil
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
