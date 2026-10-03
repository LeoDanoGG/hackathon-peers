export default function Login({ onLogin }) {
  return (
    <main className="center">
      <h1>hackathon-peers</h1>
      <p>Descubre quién está haciendo tu mismo proyecto en el cluster.</p>
      <button className="primary" onClick={onLogin}>Entrar con 42</button>
    </main>
  )
}
