import { useEffect, useState } from 'react'
import { api } from '../api/index.js'
import Avatar from './Avatar.jsx'

// 0: de guardia y en el cluster · 1: de guardia fuera del cluster · 2: fuera de turno
function rank(peer) {
  if (peer.available && peer.location) return 0
  if (peer.available) return 1
  return 2
}

export default function PeerList({ project }) {
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getPeers(project.id).then((p) => {
      setPeers(p)
      setLoading(false)
    })
  }, [project.id])

  if (loading) return <p>Cargando compañeros...</p>

  const onDuty = peers.filter((p) => p.available).length
  const sorted = [...peers].sort((a, b) => rank(a) - rank(b))

  const badge = (peer) => {
    if (!peer.available) return <span className="badge off">Fuera de turno</span>
    return (
      <span className="badge on">
        {peer.location ? 'De guardia' : 'De guardia en remoto'}
      </span>
    )
  }

  return (
    <section>
      <h2>Compañeros de guardia en {project.name}</h2>
      {onDuty > 0 ? (
        <p className="count">
          {onDuty === 1 ? '1 compañero de guardia' : `${onDuty} compañeros de guardia`} ahora mismo
        </p>
      ) : (
        <p className="count">Hoy no hay nadie de guardia en este proyecto. ¿Y si te pones tú?</p>
      )}
      {peers.length === 0 && <p>Ahora mismo no hay nadie en este turno... pero puedes volver a preguntar más tarde.</p>}
      <ul className="peer-list">
        {sorted.map((peer) => (
          <li key={peer.login} className="peer-card">
            <Avatar login={peer.login} image={peer.image} />
            <div>
              <strong>{peer.login}</strong>
              <p>{peer.location ? `Te atiende en ${peer.location}` : 'Fuera del centro'}</p>
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
