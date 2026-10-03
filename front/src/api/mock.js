// Datos mock con EXACTAMENTE el formato de docs/api.md.
// Se usan mientras VITE_USE_MOCK=true.

const ME = { login: 'plopez-l', image: 'https://cdn.intra.42.fr/users/plopez-l.jpg' }

const PROJECTS = [
  { id: 1314, name: 'ft_printf' },
  { id: 1337, name: 'get_next_line' },
  { id: 1420, name: 'push_swap' },
]

const PEERS = {
  1314: [
    { login: 'jdoe', image: 'https://cdn.intra.42.fr/users/jdoe.jpg', location: 'c2r4s6', available: true },
    { login: 'mgarcia', image: 'https://cdn.intra.42.fr/users/mgarcia.jpg', location: 'c1r2s1', available: false },
    { login: 'anavarro', image: 'https://cdn.intra.42.fr/users/anavarro.jpg', location: null, available: true },
  ],
  1337: [
    { login: 'lruiz', image: 'https://cdn.intra.42.fr/users/lruiz.jpg', location: 'c3r1s9', available: true },
    { login: 'jdoe', image: 'https://cdn.intra.42.fr/users/jdoe.jpg', location: null, available: false },
  ],
  1420: [
    { login: 'mgarcia', image: 'https://cdn.intra.42.fr/users/mgarcia.jpg', location: 'c2r7s3', available: true },
    { login: 'cfernandez', image: 'https://cdn.intra.42.fr/users/cfernandez.jpg', location: 'c4r2s8', available: true },
  ],
}

const loggedKey = 'mock_logged_in'
const availableKey = 'mock_available'

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

function isLoggedIn() {
  const stored = localStorage.getItem(loggedKey)
  if (stored !== null) return stored === 'true'
  return import.meta.env.VITE_MOCK_LOGGED_IN === 'true'
}

export const mockApi = {
  async getMe() {
    await delay()
    if (!isLoggedIn()) {
      const err = new Error('No session')
      err.status = 401
      throw err
    }
    return ME
  },

  login() {
    // En la API real esto redirige; en mock simplemente iniciamos sesión
    localStorage.setItem(loggedKey, 'true')
    return Promise.resolve()
  },

  async logout() {
    await delay()
    localStorage.removeItem(loggedKey)
  },

  async getMyProjects() {
    await delay()
    return PROJECTS
  },

  async getPeers(projectId) {
    await delay()
    return PEERS[projectId] ?? []
  },

  async setAvailability(available) {
    await delay()
    localStorage.setItem(availableKey, String(available))
    return { available }
  },

  getAvailability() {
    return localStorage.getItem(availableKey) === 'true'
  },
}
