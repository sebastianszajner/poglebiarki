import { useEffect, useState } from 'react'
import { DEPTH_META } from '../data/types'
import type { Depth } from '../data/types'

interface AnimatedDepthBarProps {
  depth: Depth
  color?: string
}

export function AnimatedDepthBar({ depth, color }: AnimatedDepthBarProps) {
  const [animated, setAnimated] = useState(false)
  const depthColor = color || DEPTH_META[depth].color

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((d) => {
        const isActive = d <= depth
        const delay = d * 200

        return (
          <div
            key={d}
            className="h-2 flex-1 rounded-full overflow-hidden"
            style={{ backgroundColor: '#334155', opacity: isActive ? 1 : 0.3 }}
          >
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: isActive ? depthColor : 'transparent',
                width: animated && isActive ? '100%' : '0%',
                transition: `width 400ms ease-out ${delay}ms`,
                animation: animated && isActive ? `depthPulse 2s ease-in-out ${delay + 400}ms infinite` : 'none',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
