import { Link } from 'react-router-dom'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { Waves, Printer, LayoutGrid, Gamepad2, Shuffle, BarChart3, BookOpen, Compass, Trophy } from 'lucide-react'
import { CardOfDay } from '../components/CardOfDay'
import { ProgressMap } from '../components/ProgressMap'
import { StreakCounter } from '../components/StreakCounter'

export function HomePage() {
  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const getCount = (area: Area, depth: Depth) =>
    cards.filter((c) => c.area === area && c.depth === depth).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="px-6 py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Waves className="w-10 h-10 text-blue-400" />
          <h1 className="text-5xl font-bold tracking-tight">Pogłębiarki</h1>
        </div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {cards.length} kart do pogłębienia relacji. {Object.keys(AREA_META).length} obszarów, 5 poziomów głębokości.
          Każda karta oparta na badaniach naukowych.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            to="/cards"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            <LayoutGrid className="w-5 h-5" />
            Przeglądaj karty
          </Link>
          <Link
            to="/losuj"
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
          >
            <Shuffle className="w-5 h-5" />
            Losuj kartę
          </Link>
          <Link
            to="/play"
            className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
          >
            <Gamepad2 className="w-5 h-5" />
            Tryby gry
          </Link>
          <Link
            to="/zastosowania"
            className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            <Compass className="w-5 h-5" />
            Zastosowania
          </Link>
          <Link
            to="/przewodnik"
            className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Przewodnik
          </Link>
          <Link
            to="/statystyki"
            className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            Statystyki
          </Link>
          <Link
            to="/print"
            className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            <Printer className="w-5 h-5" />
            Drukuj
          </Link>
          <Link
            to="/wyzwanie"
            className="flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium transition-colors"
          >
            <Trophy className="w-5 h-5" />
            Wyzwanie 30 dni
          </Link>
        </div>
      </header>

      {/* Streak Counter */}
      <section className="px-6 pb-6 max-w-3xl mx-auto flex justify-center">
        <StreakCounter />
      </section>

      {/* Card of the Day */}
      <section className="px-6 pb-10 max-w-3xl mx-auto">
        <CardOfDay />
      </section>

      {/* Progress Map */}
      <section className="px-6 pb-10 max-w-3xl mx-auto">
        <ProgressMap />
      </section>

      {/* Matrix */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Matryca kart</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-slate-400 text-sm"></th>
                {depths.map((d) => (
                  <th key={d} className="p-3 text-center">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: DEPTH_META[d].color + '22', color: DEPTH_META[d].color }}
                    >
                      <span className="font-bold">{d}</span>
                      {DEPTH_META[d].label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area} className="border-t border-slate-700/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: AREA_META[area].color }}
                      />
                      <span className="font-medium">{AREA_META[area].label}</span>
                    </div>
                  </td>
                  {depths.map((d) => (
                    <td key={d} className="p-3 text-center">
                      <Link
                        to={`/cards?area=${area}&depth=${d}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-sm font-bold transition-colors"
                        style={{ borderBottom: `2px solid ${DEPTH_META[d].color}` }}
                      >
                        {getCount(area, d)}
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Science footer */}
      <footer className="px-6 py-8 border-t border-slate-700/50 text-center text-sm text-slate-500">
        Oparte na badaniach: Aron et al. (1997), Altman & Taylor (1973), Kardas et al. (2022) i wielu innych.
      </footer>
    </div>
  )
}
