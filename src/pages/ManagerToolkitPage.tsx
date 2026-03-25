import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Waves,
  ChevronDown,
  ChevronUp,
  Shuffle,
  Users,
  Calendar,
  RotateCcw,
  UserPlus,
  Activity,
  Briefcase,
} from 'lucide-react'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Card, Depth } from '../data/types'

// --- Helpers ---

function randomCards(filter: (c: Card) => boolean, count: number): Card[] {
  const pool = cards.filter(filter)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function CardDisplay({ card }: { card: Card }) {
  const area = AREA_META[card.area]
  const depth = DEPTH_META[card.depth]
  return (
    <div
      className="rounded-xl p-4 border transition-all"
      style={{
        borderColor: area.color + '30',
        background: `linear-gradient(135deg, ${area.color}08, ${area.color}03)`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ backgroundColor: area.color + '22', color: area.color }}
        >
          {area.label}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ backgroundColor: depth.color + '22', color: depth.color }}
        >
          Poz. {card.depth}
        </span>
      </div>
      <p className="text-base font-semibold leading-relaxed text-white">{card.question}</p>
      {card.science.followUp.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-700/20">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
            Follow-up
          </p>
          {card.science.followUp.map((q, i) => (
            <p key={i} className="text-xs text-slate-400">
              &bull; {q}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Collapsible Section ---

function Section({
  title,
  icon: Icon,
  color,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: color + '30' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-slate-800/30 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color + '22' }}
        >
          <span style={{ color }}><Icon className="w-5 h-5" /></span>
        </div>
        <span className="flex-1 text-lg font-bold text-white">{title}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  )
}

// --- Sections ---

function OneOnOneSection() {
  const [card, setCard] = useState<Card | null>(null)

  const draw = useCallback(() => {
    const result = randomCards(
      (c) =>
        (c.area === 'praca' || c.area === 'zespol') &&
        (c.depth === 2 || c.depth === 3),
      1
    )
    setCard(result[0] || null)
  }, [])

  return (
    <Section title="Spotkanie 1:1" icon={Users} color="#6366f1">
      <p className="text-sm text-slate-300 leading-relaxed">
        Jak poprowadzić głębsze spotkanie 1:1 z wykorzystaniem Pogłębiarek:
      </p>
      <ol className="space-y-3 text-sm text-slate-300 list-none">
        <li className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
            1
          </span>
          <span>
            <strong className="text-white">Zacznij od check-inu</strong> — wylosuj kartę
            z poziomu 2 i odpowiedzcie oboje. To wyrównuje pozycje i buduje otwartość.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
            2
          </span>
          <span>
            <strong className="text-white">Przejdź do tematu spotkania</strong> —
            wykorzystaj pytanie z karty jako most do celów, wyzwań lub feedbacku.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
            3
          </span>
          <span>
            <strong className="text-white">Pogłębiaj pytaniami follow-up</strong> —
            każda karta ma gotowe pytania pogłębiające. Użyj ich zamiast wymyślać ad hoc.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
            4
          </span>
          <span>
            <strong className="text-white">Słuchaj aktywnie</strong> — nie poprawiaj,
            nie oceniaj. Twoja odpowiedź buduje wzajemność (procedura Arona).
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
            5
          </span>
          <span>
            <strong className="text-white">Zamknij refleksją</strong> — pytanie: „Co
            zabierasz z dzisiejszej rozmowy?" daje zamknięcie i utrwala wartość spotkania.
          </span>
        </li>
      </ol>

      <button
        onClick={draw}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        Losuj kartę na dzisiejsze 1:1
      </button>

      {card && <CardDisplay card={card} />}

      <div className="bg-slate-800/40 rounded-xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
          Sugerowane pytania follow-up
        </p>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>&bull; Jak mogę Cię w tym wesprzeć?</li>
          <li>&bull; Co Cię ostatnio pozytywnie zaskoczyło w pracy?</li>
          <li>&bull; Gdybyś mógł zmienić jedną rzecz w naszym zespole, co by to było?</li>
          <li>&bull; Jak się czujesz z obecnym tempem pracy?</li>
        </ul>
      </div>
    </Section>
  )
}

function TeamMeetingSection() {
  const [card, setCard] = useState<Card | null>(null)

  const draw = useCallback(() => {
    const result = randomCards((c) => c.depth === 1 || c.depth === 2, 1)
    setCard(result[0] || null)
  }, [])

  return (
    <Section title="Otwarcie spotkania zespołowego" icon={Calendar} color="#22c55e">
      <p className="text-sm text-slate-300 leading-relaxed">
        3-minutowy rytuał otwierający spotkanie — buduje obecność i połączenie w zespole:
      </p>
      <div className="bg-slate-800/40 rounded-xl p-4 space-y-3">
        <div className="flex gap-3 text-sm text-slate-300">
          <span className="text-green-400 font-mono font-bold text-xs mt-0.5">00:00</span>
          <span>Wylosuj kartę i przeczytaj pytanie na głos</span>
        </div>
        <div className="flex gap-3 text-sm text-slate-300">
          <span className="text-green-400 font-mono font-bold text-xs mt-0.5">00:15</span>
          <span>Każdy odpowiada w max 30 sekund (po kolei lub popcorn)</span>
        </div>
        <div className="flex gap-3 text-sm text-slate-300">
          <span className="text-green-400 font-mono font-bold text-xs mt-0.5">02:30</span>
          <span>Zamknięcie: „Dzięki — teraz wiemy, z czym dziś przychodzimy"</span>
        </div>
      </div>
      <p className="text-xs text-slate-400">
        Stosuj karty poziomu 1-2 — bezpieczne, szybkie, bez ryzyka emocjonalnego. Idealne
        na stand-up, retro, planowanie sprintu.
      </p>

      <button
        onClick={draw}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        Losuj kartę na meeting
      </button>

      {card && <CardDisplay card={card} />}
    </Section>
  )
}

function RetroSection() {
  const [retroCards, setRetroCards] = useState<Card[]>([])

  const drawSet = useCallback(() => {
    const result = randomCards(
      (c) => c.depth === 3 || c.depth === 4,
      5
    )
    setRetroCards(result)
  }, [])

  return (
    <Section title="Retrospektywa" icon={RotateCcw} color="#f59e0b">
      <p className="text-sm text-slate-300 leading-relaxed">
        Format SSC (Start / Stop / Continue) z Pogłębiarkami — 5 kart na głębszą retro:
      </p>
      <div className="bg-slate-800/40 rounded-xl p-4 space-y-2">
        <p className="text-sm text-slate-300">
          <strong className="text-amber-400">START</strong> — Wylosuj 2 karty. Odpowiedzcie
          na nie w kontekście: „Co chcemy zacząć robić jako zespół?"
        </p>
        <p className="text-sm text-slate-300">
          <strong className="text-red-400">STOP</strong> — Wylosuj 1 kartę. Odpowiedzcie
          w kontekście: „Co powinniśmy przestać robić?"
        </p>
        <p className="text-sm text-slate-300">
          <strong className="text-green-400">CONTINUE</strong> — Wylosuj 2 karty.
          Odpowiedzcie w kontekście: „Co warto kontynuować i pogłębiać?"
        </p>
      </div>
      <p className="text-xs text-slate-400">
        Karty poziomu 3-4 otwierają trudniejsze tematy — idealnie do retro, gdzie chcesz
        wyjść poza standard.
      </p>

      <button
        onClick={drawSet}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        Losuj 5 kart do retrospektywy
      </button>

      {retroCards.length > 0 && (
        <div className="space-y-3">
          {retroCards.map((card, i) => (
            <div key={card.id} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold mt-1">
                {i + 1}
              </span>
              <div className="flex-1">
                <CardDisplay card={card} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

function OnboardingSection() {
  const [onboardingCards, setOnboardingCards] = useState<Card[]>([])

  const generateSet = useCallback(() => {
    const result = randomCards(
      (c) =>
        (c.area === 'praca' || c.area === 'zespol') &&
        (c.depth === 1 || c.depth === 2),
      10
    )
    setOnboardingCards(result)
  }, [])

  const schedule = [
    { day: 'Dzień 1', label: 'Powitanie', indices: [0, 1] },
    { day: 'Dzień 3', label: 'Pierwsze wrażenia', indices: [2, 3] },
    { day: 'Dzień 5', label: 'Oswajanie', indices: [4, 5] },
    { day: 'Dzień 8', label: 'Zanurzenie', indices: [6, 7] },
    { day: 'Dzień 12', label: 'Refleksja', indices: [8, 9] },
  ]

  return (
    <Section title="Onboarding buddy" icon={UserPlus} color="#8b5cf6">
      <p className="text-sm text-slate-300 leading-relaxed">
        10 kart na pierwsze 2 tygodnie nowego pracownika. Buddy losuje zestaw i realizuje
        harmonogram — 2 karty na spotkanie:
      </p>

      <div className="bg-slate-800/40 rounded-xl p-4 space-y-2">
        {schedule.map((s) => (
          <div key={s.day} className="flex items-center gap-3 text-sm text-slate-300">
            <span className="text-violet-400 font-mono font-bold text-xs w-16">{s.day}</span>
            <span>{s.label} — 2 karty, 15 min rozmowy</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        Karty z obszarów „praca" i „zespół" na poziomie 1-2 — bezpieczne, profesjonalne,
        budujące relację bez nachalności.
      </p>

      <button
        onClick={generateSet}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        Wygeneruj zestaw onboardingowy
      </button>

      {onboardingCards.length > 0 && (
        <div className="space-y-6">
          {schedule.map((s) => (
            <div key={s.day}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-violet-400">{s.day}</span>
                <span className="text-xs text-slate-500">— {s.label}</span>
              </div>
              <div className="space-y-2">
                {s.indices.map(
                  (idx) =>
                    onboardingCards[idx] && (
                      <CardDisplay key={onboardingCards[idx].id} card={onboardingCards[idx]} />
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

// --- Diagnostics ---

interface QuizAnswer {
  question: string
  options: { label: string; score: number }[]
}

const QUIZ_QUESTIONS: QuizAnswer[] = [
  {
    question: 'Jak często w Twoim zespole ludzie dzielą się osobistymi opiniami na spotkaniach?',
    options: [
      { label: 'Prawie nigdy', score: 1 },
      { label: 'Czasami, gdy ktoś zainicjuje', score: 2 },
      { label: 'Regularnie — to norma', score: 3 },
      { label: 'Zawsze, otwarcie i szczerze', score: 4 },
    ],
  },
  {
    question: 'Czy członkowie zespołu proszą się nawzajem o pomoc?',
    options: [
      { label: 'Rzadko — każdy sobie', score: 1 },
      { label: 'Tylko w kryzysie', score: 2 },
      { label: 'Dość często', score: 3 },
      { label: 'Naturalnie i bez oporu', score: 4 },
    ],
  },
  {
    question: 'Jak reagujecie na konflikty w zespole?',
    options: [
      { label: 'Unikamy — zamiatamy pod dywan', score: 1 },
      { label: 'Eskalujemy do managera', score: 2 },
      { label: 'Rozmawiamy, choć nie zawsze skutecznie', score: 3 },
      { label: 'Adresujemy otwarcie jako zespół', score: 4 },
    ],
  },
  {
    question: 'Czy ludzie w zespole znają osobiste cele i motywacje kolegów?',
    options: [
      { label: 'W ogóle nie', score: 1 },
      { label: 'Powierzchownie', score: 2 },
      { label: 'Większość wie, co jest ważne dla drugiego', score: 3 },
      { label: 'Tak — rozmawiamy o tym regularnie', score: 4 },
    ],
  },
  {
    question: 'Jak opisałbyś poziom zaufania w zespole?',
    options: [
      { label: 'Niski — pilnujemy się nawzajem', score: 1 },
      { label: 'Umiarkowany — zależy od osób', score: 2 },
      { label: 'Dobry — ufamy sobie zawodowo', score: 3 },
      { label: 'Wysoki — ufamy sobie też osobiście', score: 4 },
    ],
  },
]

function getResult(score: number): {
  level: string
  description: string
  recommendation: string
  depthRange: [Depth, Depth]
  mode: string
  color: string
} {
  if (score <= 7) {
    return {
      level: 'Powierzchnia',
      description:
        'Twój zespół jest na etapie budowania podstawowego zaufania. Zaczynajcie od bezpiecznych kart.',
      recommendation:
        'Używaj kart poziomu 1-2 z obszarów „praca" i „zespół". Tryb Speed Round lub Koło Fortuny.',
      depthRange: [1, 2],
      mode: 'Speed Round / Koło Fortuny',
      color: '#22c55e',
    }
  }
  if (score <= 12) {
    return {
      level: 'Ciekawość',
      description:
        'Zespół jest otwarty na rozmowę, ale głębsze tematy wymagają jeszcze czasu.',
      recommendation:
        'Karty poziomu 2-3 z różnych obszarów. Tryb Odkrywca lub Eskalacja (zatrzymaj na poz. 3).',
      depthRange: [2, 3],
      mode: 'Odkrywca / Eskalacja',
      color: '#3b82f6',
    }
  }
  if (score <= 16) {
    return {
      level: 'Otwartość',
      description:
        'Zespół ma solidne zaufanie. Możecie eksplorować głębsze tematy.',
      recommendation:
        'Karty poziomu 3-4. Tryb Eskalacja (pełna) lub Retrospekcja z Pogłębiarkami.',
      depthRange: [3, 4],
      mode: 'Eskalacja / Retrospekcja',
      color: '#f59e0b',
    }
  }
  return {
    level: 'Głębia',
    description:
      'Zespół o wysokim zaufaniu. Gotowy na Głębokie Nurkowanie i karty poziomu 4-5.',
    recommendation:
      'Karty poziomu 4-5, wszystkie obszary. Tryb Głębokie Nurkowanie lub Lustro.',
    depthRange: [4, 5],
    mode: 'Głębokie Nurkowanie / Lustro',
    color: '#ef4444',
  }
}

function DiagnosticsSection() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null)
  )
  const [submitted, setSubmitted] = useState(false)

  const totalScore = useMemo(
    () => answers.reduce<number>((sum, a) => sum + (a ?? 0), 0),
    [answers]
  )

  const allAnswered = answers.every((a) => a !== null)
  const result = submitted ? getResult(totalScore) : null

  const recommendedCards = useMemo(() => {
    if (!result) return []
    return randomCards(
      (c) => c.depth >= result.depthRange[0] && c.depth <= result.depthRange[1],
      3
    )
  }, [result])

  return (
    <Section title="Diagnostyka zespołu" icon={Activity} color="#ef4444">
      <p className="text-sm text-slate-300 leading-relaxed">
        Szybki quiz — 5 pytań o głębokość relacji w Twoim zespole. Wynik podpowie, jakie
        karty i tryby gry dobrać.
      </p>

      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="text-sm font-semibold text-white mb-2">
              {qi + 1}. {q.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => {
                    const next = [...answers]
                    next[qi] = opt.score
                    setAnswers(next)
                    setSubmitted(false)
                  }}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all border ${
                    answers[qi] === opt.score
                      ? 'border-red-500/50 bg-red-500/10 text-white'
                      : 'border-slate-700/50 bg-slate-800/30 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
        >
          <Activity className="w-4 h-4" />
          Pokaż wynik
        </button>
      )}

      {result && (
        <div
          className="rounded-xl p-5 border space-y-3"
          style={{
            borderColor: result.color + '40',
            background: `linear-gradient(135deg, ${result.color}10, ${result.color}05)`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: result.color + '22', color: result.color }}
            >
              {totalScore}
            </div>
            <div>
              <p className="text-lg font-bold text-white">{result.level}</p>
              <p className="text-xs text-slate-400">
                Wynik: {totalScore}/20 | Karty poz.{' '}
                {result.depthRange[0]}-{result.depthRange[1]}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-300">{result.description}</p>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Rekomendacja
            </p>
            <p className="text-sm text-slate-200">{result.recommendation}</p>
            <p className="text-xs text-slate-400 mt-1">
              Tryb: <strong>{result.mode}</strong>
            </p>
          </div>

          {recommendedCards.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                Przykładowe karty na start
              </p>
              <div className="space-y-2">
                {recommendedCards.map((c) => (
                  <CardDisplay key={c.id} card={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Section>
  )
}

// --- Main Page ---

export function ManagerToolkitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link
          to="/app"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Toolkit menedżera</h1>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/50 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold">
            Toolkit menedżera — jak używać Pogłębiarek w pracy
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            5 gotowych scenariuszy z kartami, instrukcjami i losowaniem. Kliknij sekcję,
            żeby rozwinąć.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <OneOnOneSection />
          <TeamMeetingSection />
          <RetroSection />
          <OnboardingSection />
          <DiagnosticsSection />
        </div>
      </div>
    </div>
  )
}
