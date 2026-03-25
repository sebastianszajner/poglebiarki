import { Link } from 'react-router-dom'
import { ArrowLeft, Waves, Check, X, Minus } from 'lucide-react'

const COMPETITORS = [
  {
    name: 'Pogłębiarki',
    highlight: true,
    features: {
      'Kontekst naukowy (QR)': true,
      'Poziomy głębokości (1-5)': true,
      'Wiele obszarów życia': '9 obszarów',
      'Tryby rozgrywki': '10 trybów',
      'Facilitation guide': true,
      'Wersja korporacyjna': true,
      'Customowe pytania': true,
      'Evidence-based': true,
      'Architektura LEGO': true,
      'Follow-up questions': true,
      'Psychologia rozwojowa': true,
      'Cena od': '49 zł',
    },
  },
  {
    name: 'Prawda czy Wyzwanie',
    highlight: false,
    features: {
      'Kontekst naukowy (QR)': false,
      'Poziomy głębokości (1-5)': false,
      'Wiele obszarów życia': '1 kontekst',
      'Tryby rozgrywki': '1 tryb',
      'Facilitation guide': false,
      'Wersja korporacyjna': false,
      'Customowe pytania': false,
      'Evidence-based': false,
      'Architektura LEGO': false,
      'Follow-up questions': false,
      'Psychologia rozwojowa': false,
      'Cena od': '30-50 zł',
    },
  },
  {
    name: 'Do You Know Me?',
    highlight: false,
    features: {
      'Kontekst naukowy (QR)': false,
      'Poziomy głębokości (1-5)': 'Częściowo',
      'Wiele obszarów życia': '1-2 konteksty',
      'Tryby rozgrywki': '1 tryb',
      'Facilitation guide': false,
      'Wersja korporacyjna': false,
      'Customowe pytania': false,
      'Evidence-based': false,
      'Architektura LEGO': false,
      'Follow-up questions': false,
      'Psychologia rozwojowa': false,
      'Cena od': '60-90 zł',
    },
  },
  {
    name: 'Talking Point',
    highlight: false,
    features: {
      'Kontekst naukowy (QR)': false,
      'Poziomy głębokości (1-5)': 'Częściowo',
      'Wiele obszarów życia': '3 konteksty',
      'Tryby rozgrywki': '2 tryby',
      'Facilitation guide': false,
      'Wersja korporacyjna': false,
      'Customowe pytania': false,
      'Evidence-based': false,
      'Architektura LEGO': false,
      'Follow-up questions': false,
      'Psychologia rozwojowa': false,
      'Cena od': '80-120 zł',
    },
  },
]

const FEATURE_KEYS = Object.keys(COMPETITORS[0].features) as (keyof typeof COMPETITORS[0]['features'])[]

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-green-400 mx-auto" />
  if (value === false) return <X className="w-5 h-5 text-red-400/50 mx-auto" />
  if (value === 'Częściowo') return <Minus className="w-5 h-5 text-yellow-400 mx-auto" />
  return <span className="text-sm text-slate-300">{value}</span>
}

export function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Porównanie z rynkiem</h1>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pogłębiarki vs. konkurencja</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Na polskim rynku jest kilka gier konwersacyjnych. Oto co nas wyróżnia —
            kontekst psychologiczny, architektura modułowa i 9 obszarów życia.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm text-slate-400 w-48">Cecha</th>
                {COMPETITORS.map((comp) => (
                  <th
                    key={comp.name}
                    className={`p-4 text-center text-sm font-semibold ${
                      comp.highlight ? 'text-blue-400 bg-blue-500/5' : 'text-slate-300'
                    }`}
                  >
                    {comp.name}
                    {comp.highlight && (
                      <div className="text-[10px] text-blue-400/60 font-normal mt-1">★ Nasz produkt</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_KEYS.map((feature) => (
                <tr key={feature} className="border-t border-slate-700/30">
                  <td className="p-4 text-sm text-slate-300">{feature}</td>
                  {COMPETITORS.map((comp) => (
                    <td
                      key={comp.name}
                      className={`p-4 text-center ${comp.highlight ? 'bg-blue-500/5' : ''}`}
                    >
                      <FeatureCell value={comp.features[feature]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* USP Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Dlaczego Pogłębiarki?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Psychologia, nie przypadek',
                body: 'Każde pytanie oparte o Social Penetration Theory (Altman & Taylor, 1973), procedurę Arona (1997) i badania Kardas et al. (2022). Nie wymyślamy pytań „na kolanie".',
              },
              {
                title: 'Modularność LEGO',
                body: 'Zacznij od 1 obszaru za 49 zł. Dokładaj kolejne obszary, tryby gry, karty głębi. Konkurencja sprzedaje „wszystko albo nic".',
              },
              {
                title: 'Kontekst pod QR',
                body: 'Żadna inna gra karciana nie daje 0.5-1 strony kontekstu naukowego pod QR kodem. Ciekawostka, badanie, know-how, zastosowanie — to edukacja w grze.',
              },
            ].map((usp) => (
              <div key={usp.title} className="p-6 rounded-xl border border-slate-700/40 bg-slate-800/30">
                <h4 className="font-bold text-lg mb-3 text-blue-400">{usp.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{usp.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/#produkty"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-lg transition-colors"
          >
            Zobacz produkty
          </Link>
        </div>
      </div>
    </div>
  )
}
