import { useEffect, useState } from 'react'
import { api } from '../api/index.js'

export default function ProjectSelect({ onSelect }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getMyProjects().then((p) => {
      setProjects(p)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Cargando proyectos...</p>

  return (
    <section>
      <h2>¿Qué te duele hoy?</h2>
      {projects.length === 0 && <p>No tienes proyectos en curso. ¡Buen momento para descansar!</p>}
      <ul className="project-list">
        {projects.map((p) => (
          <li key={p.id}>
            <button className="project" onClick={() => onSelect(p)}>{p.name}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
