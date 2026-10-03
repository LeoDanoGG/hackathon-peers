import Logo from './Logo.jsx'

export default function Login({ onLogin }) {
  return (
    <main className="center">
      <Logo />
      <h1>Sanatorio 42</h1>
      <p>¿Te has atascado? Pasa a consulta: aquí siempre hay alguien de guardia. Y tú también puedes ofrecer la tuya.</p>
      <button className="primary" onClick={onLogin}>Entrar con 42</button>
    </main>
  )
}
