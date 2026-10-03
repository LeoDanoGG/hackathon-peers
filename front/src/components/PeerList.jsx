import { useEffect, useState } from 'react'
import { api } from '../api/index.js'
import Avatar from './Avatar.jsx'

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

  return (
    <section>
      <h2>Compañeros de guardia en {project.name}</h2>
      <p className="count">{peers.filter((p) => p.available).length} compañeros de guardia ahora mismo</p>
      {peers.length === 0 && <p>Ahora mismo no hay nadie en este turno... pero puedes volver a preguntar más tarde.</p>}
      <ul className="peer-list">
        {peers.map((peer) => (
          <li key={peer.login} className="peer-card">
            <Avatar login={peer.login} image={peer.image} />
            <div>
              <strong>{peer.login}</strong>
              <p>{peer.location ? `Te atiende en ${peer.location}` : 'Fuera del centro'}</p>
            </div>
            <span className={peer.available ? 'badge on' : 'badge off'}>
              {peer.available ? 'De guardia' : 'Fuera de turno'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
