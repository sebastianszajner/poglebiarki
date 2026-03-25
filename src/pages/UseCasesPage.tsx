import { useState } from 'react'
import { Link } from 'react-router-dom'
import { USE_CASES, AREA_META, GAME_MODES } from '../data/types'
import type { Area } from '../data/types'
import { ArrowLeft, Waves, Lightbulb, Gamepad2 } from 'lucide-react'

export function UseCasesPage() {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)
  const areas = Object.keys(AREA_META) as Area[]

  const filtered = selectedArea
    ? USE_CASES.filter((uc) => uc.recommendedAreas.includes(selectedArea))
    : USE_CASES

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Zastosowania</h1>
        <span className="text-slate-500 text-sm">({filtered.length})</span>
      </nav>

      {/* Area filter */}
      <div className="px-6 py-4 border-b border-slate-700/30 flex flex-wrap gap-2">
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

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Scenariusze użycia</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Sprawdzone konteksty, w których Pogłębiarki robią różnicę. Każdy scenariusz zawiera rekomendowane tryby gry i praktyczne wskazówki.
          </p>
        </div>

        <div className="space-y-6">
          {filtered.map((uc) => {
            const recommendedModes = GAME_MODES.filter((m) => uc.recommendedModes.includes(m.id))
            return (
              <div
                key={uc.id}
                className="rounded-2xl border border-slate-700/40 bg-slate-800/20 overflow-hidden"
              >
                <div className="px-6 py-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{uc.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>{uc.target}</span>
                        <span className="text-slate-600">|</span>
                        <span>{uc.context}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 shrink-0">
                      {uc.recommendedAreas.map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: AREA_META[a].color + '22', color: AREA_META[a].color }}
                        >
                          {AREA_META[a].label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-5">{uc.description}</p>

                  {/* Recommended modes */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Gamepad2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Rekomendowane tryby</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recommendedModes.map((m) => (
                        <Link
                          key={m.id}
                          to="/play"
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                        >
                          {m.name}
                          <span className="text-emerald-500/60 ml-1.5">{m.players}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Wskazówki</span>
                    </div>
                    <ul className="space-y-2">
                      {uc.tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
