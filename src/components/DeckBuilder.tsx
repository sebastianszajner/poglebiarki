import { useState, useMemo } from 'react'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { Shuffle, X, Share2, Check } from 'lucide-react'
import { AreaIcon } from './AreaIcon'

interface DeckBuilderProps {
  onClose?: () => void
}

export function DeckBuilder({ onClose }: DeckBuilderProps) {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [areaFilter, setAreaFilter] = useState<Area | ''>('')
  const [depthFilter, setDepthFilter] = useState<Depth | ''>('')
  const [shareCopied, setShareCopied] = useState(false)

  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (areaFilter && c.area !== areaFilter) return false
      if (depthFilter && c.depth !== depthFilter) return false
      return true
    })
  }, [areaFilter, depthFilter])

  const selectedCardObjects = useMemo(() => {
    return selectedCards.map((id) => cards.find((c) => c.id === id)!).filter(Boolean)
  }, [selectedCards])

  const toggleCard = (id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    )
  }

  const addRandom = (count: number) => {
    const available = filtered.filter((c) => !selectedCards.includes(c.id))
    const shuffled = [...available].sort(() => Math.random() - 0.5)
    const toAdd = shuffled.slice(0, count).map((c) => c.id)
    setSelectedCards((prev) => [...prev, ...toAdd])
  }

  const clearDeck = () => setSelectedCards([])

  const handleShareDeck = async () => {
    if (selectedCards.length === 0) return
    const encoded = btoa(selectedCards.join(','))
    const url = `${window.location.origin}/deck/${encoded}`
    try {
      await navigator.clipboard.writeText(url)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 3000)
    } catch { /* ignore */ }
  }

  const areaStats = useMemo(() => {
    const stats: Record<string, number> = {}
    selectedCardObjects.forEach((c) => {
      stats[c.area] = (stats[c.area] || 0) + 1
    })
    return stats
  }, [selectedCardObjects])

  const depthStats = useMemo(() => {
    const stats: Record<number, number> = {}
    selectedCardObjects.forEach((c) => {
      stats[c.depth] = (stats[c.depth] || 0) + 1
    })
    return stats
  }, [selectedCardObjects])

  return (
    <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Zbuduj własną talię</h2>
          <p className="text-sm text-slate-400">{selectedCards.length} kart w talii</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => addRandom(5)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            +5 losowych
          </button>
          <button
            onClick={clearDeck}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Wyczyść
          </button>
          {selectedCards.length > 0 && (
            <button
              onClick={handleShareDeck}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                shareCopied ? 'bg-emerald-600' : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              {shareCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {shareCopied ? 'Link skopiowany!' : 'Udostępnij tę talię'}
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Share toast */}
      {shareCopied && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm text-center">
          Link skopiowany! Wyślij go uczestnikom szkolenia
        </div>
      )}

      {/* Deck stats */}
      {selectedCards.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-700/50">
            <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Obszary</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(areaStats).map(([area, count]) => (
                <span
                  key={area}
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: AREA_META[area as Area].color + '22',
                    color: AREA_META[area as Area].color,
                  }}
                >
                  {AREA_META[area as Area].label}: {count}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-700/50">
            <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Głębokość</h3>
            <div className="flex gap-2">
              {depths.map((d) => (
                <div key={d} className="text-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: depthStats[d] ? DEPTH_META[d].color + '30' : '#334155',
                      color: depthStats[d] ? DEPTH_META[d].color : '#64748b',
                    }}
                  >
                    {depthStats[d] || 0}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value as Area | '')}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white"
        >
          <option value="">Wszystkie obszary</option>
          {areas.map((a) => (
            <option key={a} value={a}>{AREA_META[a].label}</option>
          ))}
        </select>
        <select
          value={depthFilter}
          onChange={(e) => setDepthFilter(e.target.value ? Number(e.target.value) as Depth : '')}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white"
        >
          <option value="">Wszystkie poziomy</option>
          {depths.map((d) => (
            <option key={d} value={d}>Poziom {d}: {DEPTH_META[d].label}</option>
          ))}
        </select>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
        {filtered.map((card) => {
          const isSelected = selectedCards.includes(card.id)
          const meta = AREA_META[card.area]
          return (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`relative p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/50'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AreaIcon area={card.area} className="w-3 h-3" color={meta.color} />
                <span className="text-[10px] font-mono text-slate-500">{card.id}</span>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div
                      key={d}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: d <= card.depth ? DEPTH_META[card.depth].color : '#334155' }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">{card.question}</p>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
