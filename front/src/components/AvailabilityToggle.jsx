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
      <span>De guardia</span>
      <input type="checkbox" className="switch" checked={available} onChange={toggle} disabled={saving} />
      <span
        className="duty-info"
        tabIndex={0}
        role="img"
        aria-label="Solo aparecerás de guardia cuando estés en el campus"
        data-tooltip="Solo aparecerás de guardia cuando estés en el campus"
      >
        ⓘ
      </span>
    </label>
  )
}
