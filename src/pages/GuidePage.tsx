import { Link } from 'react-router-dom'
import {
  ArrowLeft, Waves, Users, Shield, Clock, Heart,
  AlertTriangle, CheckCircle2, BookOpen, Lightbulb,
} from 'lucide-react'

const GOLDEN_FIVE = [
  {
    title: 'Dobrowolność ponad wszystko',
    description: 'Każdy uczestnik ma prawo powiedzieć "pas". Żadna presja, żaden wyrok. Odwaga jest nagradzana, ale nigdy wymuszana.',
    icon: Shield,
  },
  {
    title: 'Wzajemność buduje zaufanie',
    description: 'Facilitator TEŻ odpowiada. Gdy lider grupy się odsłania, reszta czuje się bezpieczniej. Nie pytaj o to, na co sam nie odpowiesz.',
    icon: Heart,
  },
  {
    title: 'Nie oceniaj odpowiedzi',
    description: 'Żadnych "świetna odpowiedź!" ani "naprawdę tak myślisz?". Reakcja powinna być neutralno-ciepła: "dziękuję" lub skinienie głową.',
    icon: CheckCircle2,
  },
  {
    title: 'Las Vegas Rule',
    description: 'Co tu powiedziane, tu zostaje. Poufność jest fundamentem głębokiej rozmowy. Przypominaj tę zasadę na początku.',
    icon: AlertTriangle,
  },
  {
    title: 'Szanuj ciszę',
    description: 'Po głębokim pytaniu cisza jest naturalna. Nie wypełniaj jej. Daj ludziom 10-15 sekund na przemyślenie. Cisza pracuje.',
    icon: Clock,
  },
]

const GROUP_SIZES = [
  {
    size: '2 osoby',
    modes: 'Ping-Pong, Lustro, Głębokie Nurkowanie',
    timing: '30-90 min',
    tips: [
      'Usiądźcie naprzeciwko siebie — kontakt wzrokowy buduje bliskość',
      'Obaj odpowiadacie na to samo pytanie — wzajemność jest kluczowa',
      'Bez limitu czasu dla Głębokiego Nurkowania — cisza jest OK',
      'Zacznij od poziomu 1-2, nawet jeśli dobrze się znacie',
    ],
  },
  {
    size: '4-8 osób',
    modes: 'Koło Fortuny, Eskalacja, Wyzwanie Głębi',
    timing: '30-60 min',
    tips: [
      'Koło Fortuny — jasne zasady kto odpowiada eliminują niezręczność',
      'Eskalacja — pary co rundę zapewniają różnorodność perspektyw',
      'Max poziom 3 na pierwszym spotkaniu — potem możesz eskalować',
      'Przygotuj 2-3 karty zapasowe poziomu 1 na wypadek oporu',
    ],
  },
  {
    size: '10-20 osób',
    modes: 'Kolory, Speed Round, Odkrywca',
    timing: '15-45 min',
    tips: [
      'Speed Round — 30 sekund na odpowiedź, energia od pierwszej minuty',
      'Kolory — losowe grupy przełamują klikę i silosy',
      'W dużej grupie TYLKO poziomy 1-2 — bezpiecznie i dynamicznie',
      'Facilitator powinien mieć zapasowe karty i jasny sygnał końca rundy',
    ],
  },
]

const TIMING_GUIDE = [
  { phase: 'Intro + zasady', time: '3-5 min', description: 'Wyjaśnij format, Las Vegas Rule, "pas" jest OK' },
  { phase: 'Rozgrzewka (poz. 1)', time: '5-10 min', description: 'Bezpieczne pytania, budowanie komfortu' },
  { phase: 'Główna gra (poz. 2-3)', time: '15-30 min', description: 'Właściwa rozgrywka, stopniowe pogłębianie' },
  { phase: 'Pogłębienie (poz. 3-4)', time: '10-20 min', description: 'Opcjonalnie — dla grup z wystarczającym zaufaniem' },
  { phase: 'Zamknięcie / retro', time: '5-10 min', description: 'Refleksja: "co zabieram stąd?" lub format SSC' },
]

export function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Przewodnik facilitatora</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-16">
          <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Jak prowadzić Pogłębiarki?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Praktyczny przewodnik dla trenerów, facilitatorów, coachów i liderów zespołów.
            Krok po kroku — od przygotowania do zamknięcia sesji.
          </p>
        </div>

        {/* Golden Five */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-2 text-center">Złota piątka</h3>
          <p className="text-slate-400 text-center mb-8">5 zasad dobrej facylitacji Pogłębiarek</p>
          <div className="space-y-4">
            {GOLDEN_FIVE.map((rule, i) => {
              const Icon = rule.icon
              return (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{i + 1}. {rule.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Group sizes */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-2 text-center">Dopasuj do grupy</h3>
          <p className="text-slate-400 text-center mb-8">Rekomendacje per wielkość grupy</p>
          <div className="space-y-6">
            {GROUP_SIZES.map((group) => (
              <div key={group.size} className="rounded-2xl border border-slate-700/40 bg-slate-800/20 overflow-hidden">
                <div className="px-6 py-4 bg-slate-800/40 border-b border-slate-700/30 flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h4 className="font-bold text-lg">{group.size}</h4>
                  <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">{group.timing}</span>
                  <span className="ml-auto text-sm text-slate-400">{group.modes}</span>
                </div>
                <div className="px-6 py-4">
                  <ul className="space-y-2">
                    {group.tips.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <span className="text-slate-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timing guide */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-2 text-center">Harmonogram sesji</h3>
          <p className="text-slate-400 text-center mb-8">Typowa sesja 45-60 minut</p>
          <div className="space-y-3">
            {TIMING_GUIDE.map((phase, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold">{phase.phase}</h4>
                    <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">{phase.time}</span>
                  </div>
                  <p className="text-sm text-slate-400">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety section */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-2 text-center">Bezpieczeństwo psychologiczne</h3>
          <p className="text-slate-400 text-center mb-8">Fundamenty, bez których głębokie rozmowy nie działają</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Przed sesją',
                items: [
                  'Przygotuj przestrzeń — wygodne krzesła, brak przeszkód',
                  'Poinformuj o formacie — "to nie terapia, to ćwiczenie komunikacji"',
                  'Przygotuj karty zapasowe poziomu 1 — plan B na opór',
                  'Ustal Las Vegas Rule zanim zaczniesz',
                ],
              },
              {
                title: 'W trakcie sesji',
                items: [
                  'Obserwuj poziom energii — jeśli spada, zmień tryb lub zrób przerwę',
                  'Reaguj na dyskomfort — jeśli ktoś wygląda na zestresowanego, zaproponuj "pas"',
                  'Nie komentuj emocji — łzy są OK, cisza jest OK',
                  'Modeluj otwartość — odpowiadaj sam na trudniejsze pytania',
                ],
              },
              {
                title: 'Po sesji',
                items: [
                  'Zamknij rundą refleksyjną — "co zabierasz stąd?"',
                  'Podziękuj za odwagę — uznanie buduje bezpieczeństwo na przyszłość',
                  'Przypomnij Las Vegas Rule',
                  'Daj uczestnikom chwilę na decompression',
                ],
              },
              {
                title: 'Sygnały ostrzegawcze',
                items: [
                  'Osoba milczy i unika kontaktu wzrokowego → zaproponuj przerwę',
                  'Ktoś zaczyna krytykować odpowiedzi innych → przypomnij zasadę nieoceniania',
                  'Grupa naciska na osobę, by odpowiedziała → stanowczo "pas jest OK"',
                  'Emocjonalna reakcja (płacz) → daj przestrzeń, nie ratuj, nie uciszaj',
                ],
              },
            ].map((section) => (
              <div key={section.title} className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <h4 className="font-bold mb-3 text-blue-400">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Print-friendly note */}
        <div className="text-center p-6 rounded-xl bg-slate-800/20 border border-slate-700/30 text-slate-400 text-sm">
          Ta strona jest przygotowana do druku — użyj Ctrl+P / Cmd+P, by wydrukować przewodnik.
        </div>
      </div>
    </div>
  )
}
