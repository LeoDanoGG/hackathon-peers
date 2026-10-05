import { useState } from 'react'
import { useAuth } from './hooks/useAuth.js'
import Login from './components/Login.jsx'
import ProjectSelect from './components/ProjectSelect.jsx'
import PeerList from './components/PeerList.jsx'
import AvailabilityToggle from './components/AvailabilityToggle.jsx'
import Avatar from './components/Avatar.jsx'
import Logo from './components/Logo.jsx'

export default function App() {
  const { me, loading, login, logout } = useAuth()
  const [project, setProject] = useState(null)

  if (loading) return <p className="center">Cargando...</p>
  if (!me) return <Login onLogin={login} />

  return (
    <main className="container">
      <header className="topbar">
        <div className="topbar-brand">
          <Logo />
          <strong className="brand">Sanatorio 42</strong>
        </div>
        <div className="topbar-user">
          <Avatar login={me.login} image={me.image} size={40} />
          <span className="user-login">{me.login}</span>
        </div>
        <AvailabilityToggle />
        <button onClick={logout}>Salir</button>
      </header>

      {project ? (
        <>
          <button className="back-btn" onClick={() => setProject(null)}>← Volver a la sala de espera</button>
          <PeerList project={project} />
        </>
      ) : (
        <ProjectSelect onSelect={setProject} />
      )}

      <footer className="footer">Sanatorio 42 · Hecho en la Hackathon de 42 Madrid</footer>
    </main>
  )
}
