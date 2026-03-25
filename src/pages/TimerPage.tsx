import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Waves, Shuffle } from 'lucide-react'
import { FacilitationTimer } from '../components/FacilitationTimer'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Card } from '../data/types'

export function TimerPage() {
  const areas = Object.keys(AREA_META) as Area[]
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)
  const [drawnCard, setDrawnCard] = useState<Card | null>(null)

  const pool = useMemo(() => {
    if (!selectedArea) return cards
    return cards.filter((c) => c.area === selectedArea)
  }, [selectedArea])

  const drawCard = useCallback(() => {
    if (pool.length === 0) return
    const idx = Math.floor(Math.random() * pool.length)
    setDrawnCard(pool[idx])
  }, [pool])

  const cardArea = drawnCard ? AREA_META[drawnCard.area] : null
  const cardDepth = drawnCard ? DEPTH_META[drawnCard.depth] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link
          to="/app"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Timer facylitacyjny</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-12">
        {/* Timer */}
        <FacilitationTimer />

        {/* Divider */}
        <div className="border-t border-slate-700/50" />

        {/* Card draw section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Karta do sesji</h2>
            <p className="text-slate-400 text-sm">
              Użyj tego pytania z timerem facylitacyjnym
            </p>
          </div>

          {/* Area selector */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">
              Wybierz obszar
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedArea(null)
                  setDrawnCard(null)
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !selectedArea
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                Wszystkie
              </button>
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setSelectedArea(selectedArea === area ? null : area)
                    setDrawnCard(null)
                  }}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor:
                      selectedArea === area
                        ? AREA_META[area].color
                        : AREA_META[area].color + '22',
                    color: selectedArea === area ? 'white' : AREA_META[area].color,
                  }}
                >
                  {AREA_META[area].label}
                </button>
              ))}
            </div>
          </div>

          {/* Draw button */}
          <div className="flex justify-center">
            <button
              onClick={drawCard}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Shuffle className="w-5 h-5" />
              Losuj kartę
            </button>
          </div>

          {/* Drawn card */}
          {drawnCard && cardArea && cardDepth && (
            <div
              className="rounded-2xl p-6 border transition-all"
              style={{
                borderColor: cardArea.color + '40',
                background: `linear-gradient(135deg, ${cardArea.color}10, ${cardArea.color}05)`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: cardArea.color + '22',
                    color: cardArea.color,
                  }}
                >
                  {cardArea.label}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: cardDepth.color + '22',
                    color: cardDepth.color,
                  }}
                >
                  Poziom {drawnCard.depth} — {cardDepth.label}
                </span>
              </div>
              <p className="text-xl font-bold leading-relaxed">{drawnCard.question}</p>
              {drawnCard.science.followUp.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700/30">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                    Pytania pogłębiające
                  </p>
                  <ul className="space-y-1">
                    {drawnCard.science.followUp.map((q, i) => (
                      <li key={i} className="text-sm text-slate-300">
                        &bull; {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
