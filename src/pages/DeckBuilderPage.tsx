import { Link } from 'react-router-dom'
import { ArrowLeft, Layers } from 'lucide-react'
import { DeckBuilder } from '../components/DeckBuilder'

export function DeckBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Layers className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Zbuduj własną talię</h1>
      </nav>

      <div className="px-6 py-8 max-w-6xl mx-auto">
        <DeckBuilder />
      </div>
    </div>
  )
}
