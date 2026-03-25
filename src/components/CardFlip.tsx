import { useState } from 'react'
import type { Card } from '../data/types'
import { AREA_META, DEPTH_META } from '../data/types'

interface CardFlipProps {
  card: Card
  className?: string
}

export function CardFlip({ card, className = '' }: CardFlipProps) {
  const [flipped, setFlipped] = useState(false)
  const areaMeta = AREA_META[card.area]
  const depthMeta = DEPTH_META[card.depth]

  return (
    <div
      className={`card-flip-container cursor-pointer ${className}`}
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="card-flip-inner relative w-full h-full transition-transform duration-600"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${areaMeta.color}20, ${depthMeta.color}15)`,
            border: `2px solid ${areaMeta.color}40`,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ backgroundColor: areaMeta.color + '22', color: areaMeta.color }}
              >
                {areaMeta.label}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ backgroundColor: depthMeta.color + '22', color: depthMeta.color }}
              >
                Poziom {card.depth}
              </span>
            </div>
            <p className="text-white text-lg font-semibold leading-relaxed">{card.question}</p>
          </div>
          <div className="flex gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className="h-1.5 flex-1 rounded-full"
                style={{
                  backgroundColor: d <= card.depth ? depthMeta.color : '#334155',
                  opacity: d <= card.depth ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${areaMeta.color}10, #1e293b)`,
            border: `2px solid ${areaMeta.color}30`,
          }}
        >
          <h3 className="text-blue-400 font-semibold text-sm mb-3">{card.science.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-6">{card.science.body}</p>
          <p className="text-xs text-slate-500 mt-auto italic">{card.science.source}</p>
        </div>
      </div>
    </div>
  )
}
