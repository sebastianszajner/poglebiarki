import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { ArrowLeft, Waves, BarChart3, Award } from 'lucide-react'
import { ProgressMap } from '../components/ProgressMap'

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

function getTitle(total: number): { title: string; description: string } {
  if (total >= 150) return { title: 'Mistrz Głębi', description: 'Poznałeś ponad 150 kart. Jesteś prawdziwym mistrzem głębokich rozmów.' }
  if (total >= 100) return { title: 'Ekspert', description: 'Ponad 100 kart za Tobą. Głębokie rozmowy to Twoja specjalność.' }
  if (total >= 50) return { title: 'Pogłębiacz', description: 'Ponad 50 kart. Wchodzisz w poważne terytorium otwartości.' }
  if (total >= 20) return { title: 'Odkrywca', description: 'Ponad 20 kart. Zaczynasz odkrywać, co kryje się pod powierzchnią.' }
  if (total >= 1) return { title: 'Nowicjusz', description: 'Dopiero zaczynasz. Każda karta to krok w stronę głębszych relacji.' }
  return { title: 'Nowicjusz', description: 'Nie obejrzałeś jeszcze żadnej karty. Zacznij od sekcji "Przeglądaj karty"!' }
}

export function StatsPage() {
  const [stats, setStats] = useState<ViewedStats>({ total: 0, byArea: {}, byDepth: {} })

  useEffect(() => {
    setStats(getStats())
  }, [])

  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const { title, description } = getTitle(stats.total)

  const maxByArea = Math.max(1, ...areas.map((a) => stats.byArea[a] || 0))

  // Find favorite area
  let favoriteArea: Area | null = null
  let favoriteCount = 0
  for (const a of areas) {
    const count = stats.byArea[a] || 0
    if (count > favoriteCount) {
      favoriteCount = count
      favoriteArea = a
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Statystyki</h1>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Profile title */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Twój profil pogłębiacza</h2>
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 font-bold text-lg mb-3">
            {title}
          </div>
          <p className="text-slate-400 max-w-md mx-auto">{description}</p>
        </div>

        {/* Total */}
        <div className="text-center mb-12 p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40">
          <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-5xl font-bold text-white mb-2">{stats.total}</div>
          <div className="text-slate-400">kart przeglądniętych</div>
        </div>

        {/* Favorite area */}
        {favoriteArea && favoriteCount > 0 && (
          <div
            className="mb-10 p-6 rounded-xl border text-center"
            style={{ borderColor: AREA_META[favoriteArea].color + '40', backgroundColor: AREA_META[favoriteArea].color + '08' }}
          >
            <p className="text-sm text-slate-400 mb-1">Twój ulubiony obszar</p>
            <p className="text-xl font-bold" style={{ color: AREA_META[favoriteArea].color }}>
              {AREA_META[favoriteArea].label}
            </p>
            <p className="text-sm text-slate-500 mt-1">{favoriteCount} kart</p>
          </div>
        )}

        {/* Per area */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Karty per obszar</h3>
          <div className="space-y-3">
            {areas.map((area) => {
              const count = stats.byArea[area] || 0
              const pct = (count / maxByArea) * 100
              return (
                <div key={area} className="flex items-center gap-3">
                  <div className="w-28 shrink-0 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AREA_META[area].color }} />
                    <span className="text-sm font-medium">{AREA_META[area].label}</span>
                  </div>
                  <div className="flex-1 h-6 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: AREA_META[area].color, minWidth: count > 0 ? '8px' : '0' }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Per depth */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Karty per głębokość</h3>
          <div className="grid grid-cols-5 gap-3">
            {depths.map((d) => {
              const count = stats.byDepth[String(d)] || 0
              return (
                <div
                  key={d}
                  className="text-center p-4 rounded-xl border border-slate-700/30"
                  style={{ backgroundColor: DEPTH_META[d].color + '08' }}
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: DEPTH_META[d].color }}
                  >
                    {count}
                  </div>
                  <div className="text-xs text-slate-400">Poz. {d}</div>
                  <div className="text-xs text-slate-500">{DEPTH_META[d].label}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Progress Map */}
        <section className="mb-10">
          <ProgressMap />
        </section>

        {/* Levels explanation */}
        <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/30 text-sm text-slate-400">
          <p className="mb-2 font-semibold text-slate-300">Jak działają rangi?</p>
          <ul className="space-y-1">
            <li>1-19 kart: <span className="text-blue-400">Nowicjusz</span></li>
            <li>20-49 kart: <span className="text-blue-400">Odkrywca</span></li>
            <li>50-99 kart: <span className="text-blue-400">Pogłębiacz</span></li>
            <li>100-149 kart: <span className="text-blue-400">Ekspert</span></li>
            <li>150+ kart: <span className="text-blue-400">Mistrz Głębi</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
