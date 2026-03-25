import type { Area, Depth } from '../data/types'
import { AREA_META } from '../data/types'

interface AreaPatternProps {
  area: Area;
  depth: Depth;
  className?: string;
}

export function AreaPattern({ area, depth, className = '' }: AreaPatternProps) {
  const meta = AREA_META[area]
  const opacity = 0.03 + depth * 0.02 // deeper = denser pattern

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {area === 'praca' && (
          <pattern id={`pat-${area}-${depth}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none" />
            <line x1="0" y1="0" x2="20" y2="0" stroke={meta.color} strokeWidth="0.5" opacity={opacity * 4} />
            <line x1="0" y1="0" x2="0" y2="20" stroke={meta.color} strokeWidth="0.5" opacity={opacity * 4} />
          </pattern>
        )}
        {area === 'imprezy' && (
          <pattern id={`pat-${area}-${depth}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="none" />
            <circle cx="5" cy="5" r="1.5" fill={meta.color} opacity={opacity * 5} />
            <circle cx="20" cy="12" r="1" fill={meta.color} opacity={opacity * 4} />
            <circle cx="10" cy="25" r="1.8" fill={meta.color} opacity={opacity * 3} />
            <circle cx="25" cy="22" r="1.2" fill={meta.color} opacity={opacity * 5} />
          </pattern>
        )}
        {area === 'relacje' && (
          <pattern id={`pat-${area}-${depth}`} width="40" height="20" patternUnits="userSpaceOnUse">
            <rect width="40" height="20" fill="none" />
            <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke={meta.color} strokeWidth="0.8" opacity={opacity * 4} />
          </pattern>
        )}
        {area === 'randki' && (
          <pattern id={`pat-${area}-${depth}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <path d="M20 5 Q25 0 30 5 Q35 10 30 15 L20 25 L10 15 Q5 10 10 5 Q15 0 20 5Z" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 3} />
          </pattern>
        )}
        {area === 'rodzicielstwo' && (
          <pattern id={`pat-${area}-${depth}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="none" />
            <path d="M15 28 L15 12 M15 12 Q10 6 5 10 M15 12 Q20 6 25 10 M15 18 Q8 14 3 18 M15 18 Q22 14 27 18" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
          </pattern>
        )}
        {area === 'szkola' && (
          <pattern id={`pat-${area}-${depth}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <rect width="28" height="28" fill="none" />
            <rect x="4" y="6" width="10" height="14" rx="1" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
            <rect x="14" y="8" width="10" height="14" rx="1" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 3} />
            <line x1="6" y1="10" x2="12" y2="10" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
            <line x1="6" y1="13" x2="12" y2="13" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
          </pattern>
        )}
        {area === 'zespol' && (
          <pattern id={`pat-${area}-${depth}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="none" />
            <circle cx="8" cy="8" r="2" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
            <circle cx="24" cy="8" r="2" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
            <circle cx="16" cy="24" r="2" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
            <line x1="10" y1="8" x2="22" y2="8" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
            <line x1="9" y1="10" x2="15" y2="22" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
            <line x1="23" y1="10" x2="17" y2="22" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
          </pattern>
        )}
        {area === 'sasiedzi' && (
          <pattern id={`pat-${area}-${depth}`} width="30" height="24" patternUnits="userSpaceOnUse">
            <rect width="30" height="24" fill="none" />
            <path d="M5 14 L10 8 L15 14 L15 22 L5 22 Z" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
            <path d="M18 14 L23 8 L28 14 L28 22 L18 22 Z" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 3} />
            <rect x="8" y="16" width="3" height="4" fill="none" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
            <rect x="21" y="16" width="3" height="4" fill="none" stroke={meta.color} strokeWidth="0.4" opacity={opacity * 3} />
          </pattern>
        )}
        {area === 'przedszkole' && (
          <pattern id={`pat-${area}-${depth}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="none" />
            <rect x="2" y="18" width="10" height="10" rx="1.5" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 4} />
            <rect x="14" y="14" width="8" height="8" rx="1.5" fill="none" stroke={meta.color} strokeWidth="0.6" opacity={opacity * 3} />
            <rect x="20" y="22" width="10" height="8" rx="1.5" fill="none" stroke={meta.color} strokeWidth="0.5" opacity={opacity * 4} />
            <rect x="6" y="8" width="6" height="8" rx="1" fill="none" stroke={meta.color} strokeWidth="0.5" opacity={opacity * 3} />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#pat-${area}-${depth})`} />
    </svg>
  )
}
