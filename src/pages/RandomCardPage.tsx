import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { ArrowLeft, Waves, Shuffle, SkipForward, LayoutGrid } from 'lucide-react'

export function RandomCardPage() {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)
  const [selectedDepth, setSelectedDepth] = useState<Depth | null>(null)
  const [currentCard, setCurrentCard] = useState<typeof cards[number] | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [flipKey, setFlipKey] = useState(0)

  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const pool = useMemo(() => {
    return cards.filter((c) => {
      if (selectedArea && c.area !== selectedArea) return false
      if (selectedDepth && c.depth !== selectedDepth) return false
      return true
    })
  }, [selectedArea, selectedDepth])

  const drawCard = useCallback(() => {
    if (pool.length === 0) return
    const randomIndex = Math.floor(Math.random() * pool.length)
    setCurrentCard(pool[randomIndex])
    setIsFlipped(false)
    setFlipKey((k) => k + 1)
  }, [pool])

  const areaMeta = currentCard ? AREA_META[currentCard.area] : null
  const depthMeta = currentCard ? DEPTH_META[currentCard.depth] : null

  const bgGradient = areaMeta
    ? `linear-gradient(135deg, ${areaMeta.color}08, ${areaMeta.color}15)`
    : undefined

  return (
    <div
      className="min-h-screen text-white transition-colors duration-500"
      style={{
        background: currentCard
          ? `linear-gradient(135deg, #0f172a, ${areaMeta!.color}15, #0f172a)`
          : 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)',
      }}
    >
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Losuj kartę</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Obszar</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedArea(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !selectedArea ? 'bg-white text-slate-900' : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                Wszystkie
              </button>
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(selectedArea === area ? null : area)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: selectedArea === area ? AREA_META[area].color : AREA_META[area].color + '22',
                    color: selectedArea === area ? 'white' : AREA_META[area].color,
                  }}
                >
                  {AREA_META[area].label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Głębokość</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDepth(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !selectedDepth ? 'bg-white text-slate-900' : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                Wszystkie
              </button>
              {depths.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDepth(selectedDepth === d ? null : d)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: selectedDepth === d ? DEPTH_META[d].color : DEPTH_META[d].color + '22',
                    color: selectedDepth === d ? 'white' : DEPTH_META[d].color,
                  }}
                >
                  {d} {DEPTH_META[d].label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500">Dostępnych kart: {pool.length}</p>
        </div>

        {/* Draw button */}
        {!currentCard && (
          <div className="text-center py-20">
            <button
              onClick={drawCard}
              disabled={pool.length === 0}
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-2xl font-bold text-xl transition-colors shadow-xl shadow-blue-600/20"
            >
              <Shuffle className="w-7 h-7" />
              Losuj kartę
            </button>
          </div>
        )}

        {/* Card with flip animation */}
        {currentCard && areaMeta && depthMeta && (
          <div className="mb-8">
            <div
              key={flipKey}
              className="relative cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative w-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front — question */}
                <div
                  className="rounded-2xl p-8 min-h-[280px] flex flex-col justify-center"
                  style={{
                    background: bgGradient,
                    borderLeft: `4px solid ${depthMeta.color}`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-slate-500">{currentCard.id}</span>
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
                      {currentCard.depth} {depthMeta.label}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-relaxed">{currentCard.question}</h2>
                  <p className="text-xs text-slate-500 mt-6">Kliknij kartę, by zobaczyć kontekst naukowy</p>
                </div>

                {/* Back — science */}
                <div
                  className="absolute inset-0 rounded-2xl p-8 min-h-[280px] flex flex-col overflow-y-auto"
                  style={{
                    background: `linear-gradient(135deg, #1e293b, ${areaMeta.color}10)`,
                    border: `1px solid ${areaMeta.color}30`,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="text-lg font-bold text-blue-400 mb-3">{currentCard.science.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{currentCard.science.body}</p>
                  <p className="text-xs text-slate-500 italic mb-4">{currentCard.science.source}</p>
                  {currentCard.science.ciekawostka && (
                    <p className="text-sm text-amber-300/80 mb-2">
                      <span className="font-semibold">Ciekawostka:</span> {currentCard.science.ciekawostka}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-auto">Kliknij, by wrócić do pytania</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); drawCard() }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
              >
                <SkipForward className="w-5 h-5" />
                Następna
              </button>
              <Link
                to={`/card/${currentCard.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors"
              >
                <LayoutGrid className="w-5 h-5" />
                Przeglądaj
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
