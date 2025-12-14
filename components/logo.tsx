export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hexagon background */}
      <path
        d="M60 10 L95 30 L95 70 L60 90 L25 70 L25 30 Z"
        fill="url(#logoGradient)"
        opacity="0.1"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />

      {/* Letter F */}
      <path
        d="M 35 40 L 35 80 M 35 40 L 52 40 M 35 58 L 48 58"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
      />

      {/* Letter A */}
      <path
        d="M 62 80 L 72 40 L 82 80 M 66 64 L 78 64"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
      />

      {/* Decorative nodes at corners */}
      <circle cx="35" cy="40" r="3" fill="url(#logoGradient)" filter="url(#glow)" />
      <circle cx="52" cy="40" r="3" fill="url(#logoGradient)" filter="url(#glow)" />
      <circle cx="72" cy="40" r="3" fill="url(#logoGradient)" filter="url(#glow)" />
    </svg>
  )
}
