import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Waves, Linkedin, Instagram, Mail, Brain } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="py-12 px-6 bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Waves className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white text-lg">Pogłębiarki</span>
            </div>
            <p className="text-sm mb-4">by Sebastian Szajner</p>
            <div className="flex items-center gap-2 text-sm">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 italic">Zbudowane na psychologii</span>
            </div>
          </div>

          {/* Links + Social */}
          <div>
            <h4 className="font-semibold text-white mb-3">Nawigacja</h4>
            <div className="flex flex-col gap-2 text-sm mb-6">
              <Link to="/cards" className="hover:text-white transition-colors">Karty</Link>
              <Link to="/losuj" className="hover:text-white transition-colors">Losuj kartę</Link>
              <Link to="/play" className="hover:text-white transition-colors">Tryby gry</Link>
              <Link to="/zastosowania" className="hover:text-white transition-colors">Zastosowania</Link>
              <Link to="/przewodnik" className="hover:text-white transition-colors">Przewodnik</Link>
              <Link to="/statystyki" className="hover:text-white transition-colors">Statystyki</Link>
              <Link to="/print" className="hover:text-white transition-colors">Drukuj</Link>
            </div>
            <h4 className="font-semibold text-white mb-3">Znajdź nas</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-3">Newsletter</h4>
            <p className="text-sm mb-4">Nowe pytania, tryby gry i psychologiczne ciekawostki. Raz w miesiącu.</p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-green-900/30 border border-green-700/30 text-green-400 text-sm">
                Dziękujemy za zapis!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj@email.pl"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                >
                  Zapisz
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div>Oparte na badaniach: Aron (1997), Altman & Taylor (1973), Kardas (2022)</div>
          <div className="text-slate-600">&copy; {new Date().getFullYear()} Pogłębiarki</div>
        </div>
      </div>
    </footer>
  )
}
