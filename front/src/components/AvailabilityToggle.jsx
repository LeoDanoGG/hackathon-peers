import { useState } from 'react'
import { api } from '../api/index.js'

export default function AvailabilityToggle() {
  const [available, setAvailable] = useState(() =>
    typeof api.getAvailability === 'function' ? api.getAvailability() : false
  )
  const [saving, setSaving] = useState(false)

  const toggle = async () => {
    const next = !available
    setAvailable(next)
    setSaving(true)
    try {
      await api.setAvailability(next)
    } catch {
      setAvailable(!next) // revertir si falla
    } finally {
      setSaving(false)
    }
  }

  return (
    <label className="switch-row">
      <span>Estoy disponible para ayudar</span>
      <input type="checkbox" className="switch" checked={available} onChange={toggle} disabled={saving} />
    </label>
  )
}
