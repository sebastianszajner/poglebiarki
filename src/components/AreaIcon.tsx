import { Compass, Zap, HeartHandshake, Flame, TreePine, GraduationCap, Users, Home, Baby } from 'lucide-react'
import type { Area } from '../data/types'

const ICONS: Record<Area, React.ComponentType<{ className?: string }>> = {
  praca: Compass,
  imprezy: Zap,
  relacje: HeartHandshake,
  randki: Flame,
  rodzicielstwo: TreePine,
  szkola: GraduationCap,
  zespol: Users,
  sasiedzi: Home,
  przedszkole: Baby,
}

interface AreaIconProps {
  area: Area;
  className?: string;
  color?: string;
}

export function AreaIcon({ area, className = 'w-4 h-4', color }: AreaIconProps) {
  const Icon = ICONS[area]
  return (
    <span style={color ? { color } : undefined}>
      <Icon className={className} />
    </span>
  )
}
