import { useEffect, useState } from 'react'
import { api } from '../api/index.js'

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
      <h2>{project.name} — compañeros</h2>
      {peers.length === 0 && <p>Nadie más está con este proyecto ahora.</p>}
      <ul className="peer-list">
        {peers.map((peer) => (
          <li key={peer.login} className="peer-card">
            <img src={peer.image} alt={peer.login} />
            <div>
              <strong>{peer.login}</strong>
              <p>{peer.location ? `Puesto: ${peer.location}` : 'No está en el cluster'}</p>
            </div>
            <span className={peer.available ? 'badge on' : 'badge off'}>
              {peer.available ? 'Disponible' : 'Ocupado'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
