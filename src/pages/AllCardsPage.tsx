import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { ArrowLeft, Waves, ArrowUpDown } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { ScrollProgress } from '../components/ScrollProgress'
import { SearchBar } from '../components/SearchBar'

type SortOption = 'default' | 'area' | 'depth' | 'alphabetical'

export function AllCardsPage() {
  const [searchParams] = useSearchParams()
  const initialArea = searchParams.get('area') as Area | null
  const initialDepth = searchParams.get('depth') ? Number(searchParams.get('depth')) as Depth : null

  const [selectedAreas, setSelectedAreas] = useState<Area[]>(initialArea ? [initialArea] : [])
  const [selectedDepth, setSelectedDepth] = useState<Depth | null>(initialDepth)
  const [sortBy, setSortBy] = useState<SortOption>('default')

  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const toggleArea = (area: Area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const clearAreas = () => setSelectedAreas([])

  const filtered = useMemo(() => {
    let result = cards.filter((c) => {
      if (selectedAreas.length > 0 && !selectedAreas.includes(c.area)) return false
      if (selectedDepth && c.depth !== selectedDepth) return false
      return true
    })

    switch (sortBy) {
      case 'area':
        result = [...result].sort((a, b) => {
          const aLabel = AREA_META[a.area].label
          const bLabel = AREA_META[b.area].label
          return aLabel.localeCompare(bLabel, 'pl')
        })
        break
      case 'depth':
        result = [...result].sort((a, b) => a.depth - b.depth)
        break
      case 'alphabetical':
        result = [...result].sort((a, b) => a.question.localeCompare(b.question, 'pl'))
        break
      default:
        break
    }

    return result
  }, [selectedAreas, selectedDepth, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white dark-page">
      <Helmet>
        <title>Wszystkie karty — Pogłębiarki</title>
        <meta name="description" content="Przeglądaj wszystkie karty Pogłębiarki — filtruj po obszarach życia i poziomach głębokości. 200+ pytań opartych o badania naukowe." />
        <meta property="og:title" content="Wszystkie karty — Pogłębiarki" />
        <meta property="og:description" content="Przeglądaj wszystkie karty Pogłębiarki — filtruj po obszarach życia i poziomach głębokości." />
        <link rel="canonical" href="https://poglebiarki.pl/cards" />
      </Helmet>
      <ScrollProgress color="#6366f1" />
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50 dark-nav">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Wszystkie karty</h1>
        <span className="text-slate-500 text-sm">({filtered.length})</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>

      {/* Search + Filters */}
      <div className="px-6 py-4 border-b border-slate-700/30 space-y-4">
        {/* Search bar */}
        <SearchBar />

        {/* Area filters - multi-select */}
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={clearAreas}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedAreas.length === 0 ? 'bg-white text-slate-900' : 'bg-slate-700/50 text-slate-400 hover:text-white'
              }`}
            >
              Wszystkie obszary
            </button>
            {areas.map((area) => {
              const isSelected = selectedAreas.includes(area)
              return (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isSelected ? AREA_META[area].color : AREA_META[area].color + '22',
                    color: isSelected ? 'white' : AREA_META[area].color,
                  }}
                >
                  {AREA_META[area].label}
                  {isSelected && selectedAreas.length > 1 && ' ✕'}
                </button>
              )
            })}
          </div>
          <div className="w-px bg-slate-700/50 mx-1" />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDepth(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !selectedDepth ? 'bg-white text-slate-900' : 'bg-slate-700/50 text-slate-400 hover:text-white'
              }`}
            >
              Wszystkie poziomy
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
          <div className="w-px bg-slate-700/50 mx-1" />
          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="default">Domyślna kolejność</option>
              <option value="area">Sortuj wg obszaru</option>
              <option value="depth">Sortuj wg głębokości</option>
              <option value="alphabetical">Sortuj alfabetycznie</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((card) => (
            <Link
              key={card.id}
              to={`/card/${card.id}`}
              className="card-hover-effect group p-5 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all hover:bg-slate-800/60 dark-card relative"
              style={{
                borderLeftColor: DEPTH_META[card.depth].color,
                borderLeftWidth: 3,
                boxShadow: undefined,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${AREA_META[card.area].color}25, 0 4px 12px rgba(0,0,0,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-slate-500">{card.id}</span>
                <div
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: AREA_META[card.area].color + '22', color: AREA_META[card.area].color }}
                >
                  {AREA_META[card.area].label}
                </div>
                <div
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: DEPTH_META[card.depth].color + '22', color: DEPTH_META[card.depth].color }}
                >
                  {card.depth}
                </div>
              </div>
              <p className="text-slate-200 group-hover:text-white transition-colors leading-relaxed dark-text">
                {card.question}
              </p>
              <div
                className="card-open-btn mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium text-white"
                style={{ backgroundColor: AREA_META[card.area].color }}
              >
                Otwórz
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
