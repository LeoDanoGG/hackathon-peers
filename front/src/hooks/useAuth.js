import { useEffect, useState, useCallback } from 'react'
import { api } from '../api/index.js'

export function useAuth() {
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      setMe(await api.getMe())
    } catch {
      setMe(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = async () => {
    await api.login()
    await refresh()
  }

  const logout = async () => {
    await api.logout()
    setMe(null)
  }

  return { me, loading, login, logout }
}
