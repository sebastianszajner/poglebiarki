import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import { ArrowLeft, Play, Grid3X3 } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'

export function CustomDeckPage() {
  const { encoded } = useParams<{ encoded: string }>()
  const [sequentialIndex, setSequentialIndex] = useState<number | null>(null)

  const deckCards = useMemo(() => {
    if (!encoded) return []
    try {
      const ids = atob(encoded).split(',')
      return ids
        .map((id) => cards.find((c) => c.id === id.trim()))
        .filter(Boolean) as typeof cards
    } catch {
      return []
    }
  }, [encoded])

  if (!encoded || deckCards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Talia nie znaleziona</h1>
          <p className="text-slate-400 mb-6">Link do talii jest nieprawidłowy lub nie zawiera kart.</p>
          <Link to="/" className="text-blue-400 hover:underline">Wróć do strony głównej</Link>
        </div>
      </div>
    )
  }

  // Sequential mode
  if (sequentialIndex !== null) {
    const card = deckCards[sequentialIndex]
    if (!card) {
      setSequentialIndex(null)
      return null
    }
    const areaMeta = AREA_META[card.area]
    const depthMeta = DEPTH_META[card.depth]

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
          <button
            onClick={() => setSequentialIndex(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Wróć do talii
          </button>
          <ThemeToggle />
          <div className="ml-auto text-sm text-slate-400">
            {sequentialIndex + 1} / {deckCards.length}
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Progress */}
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-8">
            <div
              className="h-1.5 rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((sequentialIndex + 1) / deckCards.length) * 100}%` }}
            />
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8 mb-8"
            style={{
              background: `linear-gradient(135deg, ${areaMeta.color}15, ${depthMeta.color}15)`,
              borderLeft: `4px solid ${depthMeta.color}`,
            }}
          >
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
            <h1 className="text-2xl font-bold leading-relaxed">{card.question}</h1>
          </div>

          <div className="text-center mb-6">
            <Link
              to={`/card/${card.id}`}
              className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Zobacz pełny kontekst naukowy →
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setSequentialIndex(Math.max(0, sequentialIndex - 1))}
              disabled={sequentialIndex === 0}
              className="flex-1 py-3 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Poprzednia
            </button>
            {sequentialIndex < deckCards.length - 1 ? (
              <button
                onClick={() => setSequentialIndex(sequentialIndex + 1)}
                className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium"
              >
                Następna →
              </button>
            ) : (
              <button
                onClick={() => setSequentialIndex(null)}
                className="flex-1 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors font-medium"
              >
                Zakończ ✓
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Grid mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Strona główna
        </Link>
        <ThemeToggle />
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Grid3X3 className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold">Twój spersonalizowany zestaw</h1>
          </div>
          <p className="text-slate-400">{deckCards.length} kart w talii</p>
        </div>

        {/* Sequential mode button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setSequentialIndex(0)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium text-white transition-colors"
          >
            <Play className="w-5 h-5" />
            Przejdź cały zestaw po kolei
          </button>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deckCards.map((card) => {
            const areaMeta = AREA_META[card.area]
            const depthMeta = DEPTH_META[card.depth]
            return (
              <Link
                key={card.id}
                to={`/card/${card.id}`}
                className="group p-5 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{ backgroundColor: areaMeta.color + '22', color: areaMeta.color }}
                  >
                    {areaMeta.label}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{ backgroundColor: depthMeta.color + '22', color: depthMeta.color }}
                  >
                    Poz. {card.depth}
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-slate-600">{card.id}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {card.question}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
