import { useState } from 'react'

// Color pastel determinista a partir del login
function colorFor(login) {
  let h = 0
  for (let i = 0; i < login.length; i++) h = (h * 31 + login.charCodeAt(i)) % 360
  return `hsl(${h}, 55%, 82%)`
}

export default function Avatar({ login, image, size = 64 }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <span
        className="avatar-fallback"
        style={{ width: size, height: size, background: colorFor(login), fontSize: size * 0.45 }}
      >
        {login[0].toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={image}
      alt={login}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      onError={() => setFailed(true)}
    />
  )
}
