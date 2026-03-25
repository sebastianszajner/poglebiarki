import { useState, useEffect } from 'react'
import { cards } from '../data/cards'
import { DEPTH_META } from '../data/types'
import type { Depth } from '../data/types'
import { Waves } from 'lucide-react'

interface ViewedStats {
  total: number
  byArea: Record<string, number>
  byDepth: Record<string, number>
}

function getStats(): ViewedStats {
  try {
    const raw = localStorage.getItem('poglebiarki-viewed')
    if (!raw) return { total: 0, byArea: {}, byDepth: {} }
    return JSON.parse(raw)
  } catch {
    return { total: 0, byArea: {}, byDepth: {} }
  }
}

export function ProgressMap() {
  const [stats, setStats] = useState<ViewedStats>({ total: 0, byArea: {}, byDepth: {} })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStats(getStats())
    // Delay to trigger CSS transition on mount
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const depths = [1, 2, 3, 4, 5] as Depth[]
  const totalCards = cards.length

  const totalByDepth: Record<number, number> = {}
  for (const card of cards) {
    totalByDepth[card.depth] = (totalByDepth[card.depth] || 0) + 1
  }

  const totalViewed = stats.total || 0
  const hasViewed = totalViewed > 0

  return (
    <div className="rounded-2xl bg-slate-800/30 border border-slate-700/40 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Waves className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Mapa podróży w głąb</h3>
      </div>

      {!hasViewed ? (
        <div className="text-center py-8">
          <p className="text-slate-400 text-sm">
            Zacznij swoją podróż — otwórz pierwszą kartę!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {depths.map((depth) => {
              const meta = DEPTH_META[depth]
              const viewed = stats.byDepth[String(depth)] || 0
              const total = totalByDepth[depth] || 0
              const pct = total > 0 ? Math.min((viewed / total) * 100, 100) : 0

              return (
                <div key={depth} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: meta.color }}
                      >
                        {depth}
                      </span>
                      <span className="text-sm font-medium text-slate-300">
                        {meta.label}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {viewed} / {total}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: mounted ? `${pct}%` : '0%',
                        backgroundColor: meta.color,
                        minWidth: viewed > 0 ? '6px' : '0',
                        transition: 'width 0.8s ease-out',
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{meta.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-700/30 text-center">
            <p className="text-sm text-slate-400">
              Twoja podróż:{' '}
              <span className="font-bold text-white">{totalViewed}</span> z{' '}
              <span className="font-bold text-white">{totalCards}</span> kart odkrytych
            </p>
          </div>
        </>
      )}
    </div>
  )
}
