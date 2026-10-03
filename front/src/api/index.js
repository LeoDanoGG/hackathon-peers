import { mockApi } from './mock.js'
import { realApi } from './client.js'

// Una sola variable de entorno controla si usamos mock o API real.
export const api = import.meta.env.VITE_USE_MOCK === 'true' ? mockApi : realApi
