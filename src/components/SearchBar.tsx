import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import { Search, X } from 'lucide-react'
import { AreaIcon } from './AreaIcon'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (query.length < 2) return []
    const q = query.toLowerCase()
    return cards
      .filter((c) => c.question.toLowerCase().includes(q) || c.science.title.toLowerCase().includes(q))
      .slice(0, 8)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (cardId: string) => {
    navigate(`/card/${cardId}`)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Szukaj pytania..."
          className="w-full pl-10 pr-8 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          {results.map((card) => {
            const meta = AREA_META[card.area]
            return (
              <button
                key={card.id}
                onClick={() => handleSelect(card.id)}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-slate-700/50 transition-colors text-left border-b border-slate-700/50 last:border-0"
              >
                <AreaIcon area={card.area} className="w-4 h-4 mt-0.5 shrink-0" color={meta.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{card.question}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-slate-500">{card.id}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: meta.color + '18', color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: DEPTH_META[card.depth].color + '18', color: DEPTH_META[card.depth].color }}
                    >
                      Poz. {card.depth}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 p-4">
          <p className="text-sm text-slate-400 text-center">Brak wyników dla „{query}"</p>
        </div>
      )}
    </div>
  )
}
