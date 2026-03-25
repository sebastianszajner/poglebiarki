import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Instagram } from 'lucide-react'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { InstagramCard } from '../components/InstagramCard'

export function InstagramPage() {
  const [selectedArea, setSelectedArea] = useState<Area | ''>('')
  const [selectedDepth, setSelectedDepth] = useState<Depth | ''>('')
  const [selectedCardId, setSelectedCardId] = useState('')

  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (selectedArea && c.area !== selectedArea) return false
      if (selectedDepth && c.depth !== selectedDepth) return false
      return true
    })
  }, [selectedArea, selectedDepth])

  const selectedCard = useMemo(() => {
    if (!selectedCardId) return filtered[0] || null
    return cards.find((c) => c.id === selectedCardId) || filtered[0] || null
  }, [selectedCardId, filtered])

  // Reset card selection when filters change and current card is not in filtered list
  useMemo(() => {
    if (selectedCardId && !filtered.find((c) => c.id === selectedCardId)) {
      setSelectedCardId('')
    }
  }, [filtered, selectedCardId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Instagram className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Generator grafik Instagram</h1>
      </nav>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value as Area | '')
              setSelectedCardId('')
            }}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Wszystkie obszary</option>
            {areas.map((a) => (
              <option key={a} value={a}>{AREA_META[a].label}</option>
            ))}
          </select>

          <select
            value={selectedDepth}
            onChange={(e) => {
              setSelectedDepth(e.target.value ? Number(e.target.value) as Depth : '')
              setSelectedCardId('')
            }}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Wszystkie poziomy</option>
            {depths.map((d) => (
              <option key={d} value={d}>Poziom {d}: {DEPTH_META[d].label}</option>
            ))}
          </select>

          <select
            value={selectedCardId || (selectedCard?.id ?? '')}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-1 min-w-[200px]"
          >
            {filtered.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.question.slice(0, 60)}{c.question.length > 60 ? '…' : ''}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          Wybierz kartę, aby wygenerować grafikę gotową do udostępnienia na Instagram lub LinkedIn.
        </p>

        {/* Card preview */}
        <div className="flex justify-center">
          {selectedCard ? (
            <InstagramCard card={selectedCard} />
          ) : (
            <p className="text-slate-500 text-sm">Brak kart do wyświetlenia</p>
          )}
        </div>
      </div>
    </div>
  )
}
