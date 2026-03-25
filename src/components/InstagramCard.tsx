import { useRef } from 'react'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Card } from '../data/types'
import { AreaIcon } from './AreaIcon'
import { Waves } from 'lucide-react'

interface InstagramCardProps {
  card: Card
}

export function InstagramCard({ card }: InstagramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const meta = AREA_META[card.area]
  const depthMeta = DEPTH_META[card.depth]

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Instagram-ready card (1080x1080 at display scale) */}
      <div
        ref={cardRef}
        className="w-[400px] h-[400px] rounded-3xl relative overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(135deg, ${meta.color}15, ${depthMeta.color}15)`,
          border: `2px solid ${meta.color}30`,
        }}
      >
        {/* Top bar */}
        <div className="px-6 pt-6 flex items-center justify-between">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: meta.color + '22', color: meta.color }}
          >
            <AreaIcon area={card.area} className="w-3.5 h-3.5" color={meta.color} />
            {meta.label}
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className="w-6 h-1.5 rounded-full"
                style={{ backgroundColor: d <= card.depth ? depthMeta.color : '#e2e8f040' }}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center px-8">
          <p className="text-xl font-bold leading-relaxed text-white text-center">
            {card.question}
          </p>
        </div>

        {/* Bottom */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400 font-semibold">Pogłębiarki</span>
          </div>
          <div
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ backgroundColor: depthMeta.color + '22', color: depthMeta.color }}
          >
            Poziom {card.depth}: {depthMeta.label}
          </div>
        </div>

        {/* Side stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ backgroundColor: meta.color }}
        />
      </div>

      <p className="text-xs text-slate-500">
        Gotowe do udostępnienia na Instagram / LinkedIn
      </p>
    </div>
  )
}
