import { Link } from 'react-router-dom'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import { CalendarDays } from 'lucide-react'

function getCardOfDay() {
  const now = new Date()
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
  const index = seed % cards.length
  return cards[index]
}

export function CardOfDay() {
  const card = getCardOfDay()
  const areaMeta = AREA_META[card.area]
  const depthMeta = DEPTH_META[card.depth]

  return (
    <Link
      to={`/card/${card.id}`}
      className="block rounded-2xl p-6 border border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/50 transition-all group"
      style={{ borderLeftWidth: 4, borderLeftColor: areaMeta.color }}
    >
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pytanie dnia</span>
        <div className="ml-auto flex items-center gap-2">
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
            {card.depth}
          </span>
        </div>
      </div>
      <p className="text-lg text-slate-200 group-hover:text-white transition-colors leading-relaxed">
        {card.question}
      </p>
      <p className="text-xs text-slate-500 mt-3">
        Kliknij, by zobaczyć kontekst naukowy i pytania pogłębiające
      </p>
    </Link>
  )
}
