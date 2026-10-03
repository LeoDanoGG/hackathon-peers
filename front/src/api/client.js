// Cliente real contra el backend. Usa cookies de sesión (credentials: 'include').
const BASE = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const res = await fetch(BASE + path, { credentials: 'include', ...options })
  if (!res.ok) {
    const err = new Error(`${res.status} ${res.statusText}`)
    err.status = res.status
    throw err
  }
  if (res.status === 204) return null
  return res.json()
}

export const realApi = {
  getMe: () => request('/auth/me'),

  login() {
    window.location.href = BASE + '/auth/login'
    return new Promise(() => {})
  },

  logout: () => request('/auth/logout', { method: 'POST' }),

  getMyProjects: () => request('/me/projects'),

  getPeers: (projectId) => request(`/projects/${projectId}/peers`),

  setAvailability: (available) =>
    request('/me/availability', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available }),
    }),
}
