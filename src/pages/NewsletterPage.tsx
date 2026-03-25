import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import {
  ArrowLeft, Waves, Mail, Gift, BookOpen, Brain,
  CheckCircle, Sparkles, Users, Heart, Target, ChevronRight,
} from 'lucide-react'

const LEAD_MAGNET_BENEFITS = [
  {
    icon: Brain,
    title: '5 pytań Arona do natychmiastowego użycia',
    desc: 'Najpotężniejsze pytania z badań nad budowaniem bliskości — gotowe do rozmowy dziś wieczorem.',
  },
  {
    icon: BookOpen,
    title: 'Mini-przewodnik „Jak prowadzić głęboką rozmowę"',
    desc: '3-stronicowy PDF z technikami facylitacji rozmów na każdym poziomie głębokości.',
  },
  {
    icon: Target,
    title: '10 kart z pełnym kontekstem naukowym',
    desc: 'Próbka z każdego poziomu głębokości — z ciekawostką, badaniem i zastosowaniem.',
  },
  {
    icon: Users,
    title: 'Ściągawka „3 tryby gry na start"',
    desc: 'Zasady trzech najlepszych trybów: Ping-Pong, Eskalacja i Speed Round.',
  },
]

const NEWSLETTER_CONTENT = [
  {
    icon: Sparkles,
    title: 'Karta tygodnia',
    desc: 'Co tydzień jedno pytanie pogłębiające z rozbudowanym kontekstem psychologicznym.',
  },
  {
    icon: Brain,
    title: 'Psychologia relacji w pigułce',
    desc: 'Odkrycia naukowe o komunikacji, bliskości i budowaniu zaufania — bez żargonu.',
  },
  {
    icon: Heart,
    title: 'Tips na głębokie rozmowy',
    desc: 'Praktyczne wskazówki, jak prowadzić rozmowy, których naprawdę potrzebujemy.',
  },
  {
    icon: Gift,
    title: 'Premierowy dostęp i rabaty',
    desc: 'Subskrybenci jako pierwsi dowiadują się o nowych obszarach i dostają specjalne ceny.',
  },
]

const SOCIAL_PROOF = [
  { quote: 'Jedna karta tygodniowo zmieniła nasze wieczorne rozmowy.', author: 'Kasia, 34 lata' },
  { quote: 'Użyłam karty z newslettera na godzinie wychowawczej — dzieci gadały 40 minut.', author: 'Anna, nauczycielka' },
  { quote: 'Wreszcie newsletter, który otwieram w ciągu minuty od otrzymania.', author: 'Tomek, manager IT' },
]

export function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const areas = Object.keys(AREA_META) as Area[]

  const toggleInterest = (area: string) => {
    setSelectedInterests((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate with ConvertKit/Mailchimp API
    console.log('Newsletter signup:', { email, name, interests: selectedInterests })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Newsletter Pogłębiarki</h1>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
          <Gift className="w-4 h-4" />
          Darmowy zestaw startowy przy zapisie
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Głębokie rozmowy zaczynają się<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            od jednego pytania tygodniowo
          </span>
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
          Dołącz do newslettera Pogłębiarki i odbierz <strong>darmowy zestaw startowy</strong> —
          10 kart z kontekstem naukowym + mini-przewodnik prowadzenia głębokich rozmów.
        </p>
        <p className="text-slate-500 text-sm">
          Dołącz do 0 subskrybentów · Wysyłka co tydzień · Zero spamu · Wypisz się w 1 kliknięciu
        </p>
      </section>

      {/* Lead Magnet Preview */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* What you get */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Gift className="w-7 h-7 text-purple-400" />
              Co dostajesz od razu?
            </h3>
            <div className="space-y-4">
              {LEAD_MAGNET_BENEFITS.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signup form */}
          <div>
            {!submitted ? (
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-2">Zapisz się i odbierz zestaw</h3>
                <p className="text-slate-400 text-sm mb-6">Wyślemy Ci PDF w ciągu 2 minut od zapisu.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Imię</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jak masz na imię?"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Interest areas */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Które obszary Cię interesują? <span className="text-slate-500">(opcjonalnie)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {areas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleInterest(area)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                          style={{
                            backgroundColor: selectedInterests.includes(area) ? AREA_META[area].color : AREA_META[area].color + '22',
                            color: selectedInterests.includes(area) ? 'white' : AREA_META[area].color,
                          }}
                        >
                          {AREA_META[area].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02]"
                  >
                    <Mail className="w-5 h-5" />
                    Zapisz się i odbierz zestaw
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Zapisując się, wyrażasz zgodę na otrzymywanie newslettera. RODO: Twoje dane są bezpieczne.
                    Możesz się wypisać w każdej chwili.
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-slate-800/60 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Dziękuję, {name}!</h3>
                <p className="text-slate-300 mb-4">
                  Sprawdź swoją skrzynkę ({email}) — zestaw startowy jest już w drodze.
                </p>
                <p className="text-slate-500 text-sm mb-6">
                  Jeśli nie widzisz maila, sprawdź folder spam.
                </p>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
                >
                  Przeglądaj karty online
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's in the newsletter */}
      <section className="px-6 py-16 border-t border-slate-700/30">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Co dostajesz w każdym wydaniu?</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {NEWSLETTER_CONTENT.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-16 border-t border-slate-700/30">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Co mówią czytelnicy</h3>
          <div className="space-y-4">
            {SOCIAL_PROOF.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <p className="text-lg text-slate-200 italic mb-3">„{item.quote}"</p>
                <p className="text-sm text-slate-500">— {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depth visualization */}
      <section className="px-6 py-16 border-t border-slate-700/30">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">5 poziomów głębokości rozmowy</h3>
          <p className="text-slate-400 mb-8">Newsletter prowadzi Cię przez wszystkie poziomy — od small talku do rozmów, które zmieniają relacje.</p>
          <div className="flex gap-2 justify-center mb-8">
            {([1, 2, 3, 4, 5] as Depth[]).map((d) => (
              <div key={d} className="text-center">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-lg font-bold mb-2 mx-auto"
                  style={{ backgroundColor: DEPTH_META[d].color + '22', color: DEPTH_META[d].color }}
                >
                  {d}
                </div>
                <p className="text-xs text-slate-400">{DEPTH_META[d].label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {!submitted && (
        <section className="px-6 py-16 border-t border-slate-700/30">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Gotowy na głębsze rozmowy?</h3>
            <p className="text-slate-400 mb-8">
              Zapisz się teraz i odbierz darmowy zestaw 10 kart z kontekstem naukowym.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.pl"
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-bold transition-all"
              >
                Zapisz się
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-700/50 text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Waves className="w-4 h-4" />
          <span className="font-semibold">Pogłębiarki</span>
        </div>
        Karty do pogłębienia relacji · Oparte na psychologii · Stworzone przez Sebastiana Szajnera
      </footer>
    </div>
  )
}
