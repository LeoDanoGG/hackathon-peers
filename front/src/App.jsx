import { useState } from 'react'
import { useAuth } from './hooks/useAuth.js'
import Login from './components/Login.jsx'
import ProjectSelect from './components/ProjectSelect.jsx'
import PeerList from './components/PeerList.jsx'
import AvailabilityToggle from './components/AvailabilityToggle.jsx'

export default function App() {
  const { me, loading, login, logout } = useAuth()
  const [project, setProject] = useState(null)

  if (loading) return <p className="center">Cargando...</p>
  if (!me) return <Login onLogin={login} />

  return (
    <main className="container">
      <header className="topbar">
        <img src={me.image} alt={me.login} className="avatar" />
        <span>{me.login}</span>
        <AvailabilityToggle />
        <button onClick={logout}>Salir</button>
      </header>

      {project ? (
        <>
          <button className="link" onClick={() => setProject(null)}>← Cambiar de proyecto</button>
          <PeerList project={project} />
        </>
      ) : (
        <ProjectSelect onSelect={setProject} />
      )}
    </main>
  )
}
