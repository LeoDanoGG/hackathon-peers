export default function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark">+</span>
      <svg className="ekg" viewBox="0 0 120 30" width="120" height="30" aria-hidden="true">
        <polyline
          points="0,15 25,15 35,15 42,4 50,26 58,15 80,15 90,8 98,22 106,15 120,15"
          fill="none"
          stroke="#00babc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
