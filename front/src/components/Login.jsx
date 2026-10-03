export default function Login({ onLogin }) {
  return (
    <main className="center">
      <h1>hackathon-peers</h1>
      <p>¿Te has atascado con un proyecto? Aquí hay alguien dispuesto a echarte una mano. Y tú también puedes ofrecer la tuya.</p>
      <button className="primary" onClick={onLogin}>Entrar con 42</button>
    </main>
  )
}
