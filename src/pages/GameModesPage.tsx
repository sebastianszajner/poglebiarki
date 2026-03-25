import { Link } from 'react-router-dom'
import { GAME_MODES, AREA_META } from '../data/types'
import type { Area } from '../data/types'
import {
  ArrowLeft, Waves, CircleDot, TrendingUp, Palette,
  Trophy, ArrowLeftRight, RotateCcw, Timer, Anchor, Map, Scan,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CircleDot, TrendingUp, Palette, Trophy, ArrowLeftRight, RotateCcw, Timer, Anchor, Map, Scan,
}

export function GameModesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Tryby rozgrywki</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">6 sposobów na grę</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Każdy tryb zainspirowany mechanikami z platformy Wodzirej.
            Wybierz tryb dopasowany do kontekstu, grupy i poziomu zaufania.
          </p>
        </div>

        <div className="space-y-6">
          {GAME_MODES.map((mode) => {
            const IconComp = ICON_MAP[mode.icon] || CircleDot
            return (
              <div
                key={mode.id}
                className="rounded-2xl border border-slate-700/40 bg-slate-800/30 overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center shrink-0">
                    <IconComp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{mode.name}</h3>
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">{mode.players}</span>
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">{mode.duration}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{mode.description}</p>
                  </div>
                </div>

                {/* Rules */}
                <div className="px-6 pb-5">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Zasady</h4>
                  <ol className="space-y-2">
                    {mode.rules.map((rule, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-blue-400 font-bold shrink-0 w-5">{i + 1}.</span>
                        <span className="text-slate-300">{rule}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Best for + Wodzirej source */}
                <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700/30 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-slate-500">Najlepsze dla:</span>
                  {mode.bestFor.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: AREA_META[area as Area].color + '22',
                        color: AREA_META[area as Area].color,
                      }}
                    >
                      {AREA_META[area as Area].label}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-slate-600 italic">
                    Wodzirej: {mode.wodzirejInspiration}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Area-specific recommendations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Rekomendacje per obszar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(AREA_META) as Area[]).map((area) => {
              const meta = AREA_META[area]
              const recommended = GAME_MODES.filter((m) => m.bestFor.includes(area))
              const tips: Record<Area, string> = {
                praca: 'Bezpieczne zamknięcie — nie forsuj poziomu 4-5 w kontekście zawodowym. Max level 3 na integracji.',
                imprezy: 'Luźno, z humorem. Jeśli alkohol — max level 3. Gamifikacja (Wyzwanie Głębi) świetnie działa.',
                relacje: 'Pełna głębokość OK, ale wzajemność jest kluczowa — obaj odpowiadają na to samo pytanie.',
                randki: 'Inspiracja Aronem: 3 rundy po 15 min, stopniowo głębiej. Ping-Pong + Eskalacja.',
                rodzicielstwo: 'Dzieci odpowiadają na karty 1-2, rodzice na 3-5, potem wspólna refleksja.',
                szkola: 'Karty poziomu 1-2 na godzinie wychowawczej. Speed Round angażuje nawet nieśmiałych uczniów.',
                zespol: 'Idealne na retrospektywę sprintu lub offsite. Kolory mieszają podgrupy i przełamują silosy.',
                sasiedzi: 'Zacznij od poziomu 1 — sąsiedzi dopiero się poznają. Festyn + Speed Round = sprawdzony przepis.',
                przedszkole: 'Karty dla rodziców przedszkolaków. Poziomy 1-2 na warsztacie, 3-5 w zaufanej grupie lub parze. Kontekst naukowy normalizuje wyzwania.',
              }
              return (
                <div
                  key={area}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: meta.color + '40', backgroundColor: meta.color + '08' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.color }} />
                    <h3 className="font-semibold" style={{ color: meta.color }}>{meta.label}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{tips[area]}</p>
                  <div className="flex flex-wrap gap-2">
                    {recommended.map((m) => (
                      <span key={m.id} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
