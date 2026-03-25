import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Waves, Users, ChevronRight, RotateCcw } from 'lucide-react'
import { DEPTH_META } from '../data/types'
import type { Depth } from '../data/types'

interface Question {
  text: string
  answers: { text: string; depth: number }[]
}

const QUESTIONS: Question[] = [
  {
    text: 'Jak dobrze znacie się w zespole?',
    answers: [
      { text: 'Znamy imiona i stanowiska', depth: 1 },
      { text: 'Wiemy o hobby i zainteresowaniach', depth: 2 },
      { text: 'Dzielimy się historiami i doświadczeniami', depth: 3 },
      { text: 'Rozmawiamy o emocjach i wyzwaniach', depth: 4 },
    ],
  },
  {
    text: 'Jak reagujecie na błędy w zespole?',
    answers: [
      { text: 'Szukamy winnego', depth: 1 },
      { text: 'Analizujemy co poszło nie tak', depth: 2 },
      { text: 'Otwarcie rozmawiamy o przyczynach', depth: 3 },
      { text: 'Dzielimy się własnymi błędami jako lekcjami', depth: 4 },
    ],
  },
  {
    text: 'Jak wygląda feedback w zespole?',
    answers: [
      { text: 'Prawie go nie ma', depth: 1 },
      { text: 'Tylko od szefa', depth: 2 },
      { text: 'Dwukierunkowy, ale formalny', depth: 3 },
      { text: 'Naturalny, częsty, między wszystkimi', depth: 4 },
    ],
  },
  {
    text: 'Jak rozwiązujecie konflikty?',
    answers: [
      { text: 'Unikamy ich', depth: 1 },
      { text: 'Eskalujemy do szefa', depth: 2 },
      { text: 'Rozmawiamy o problemie', depth: 3 },
      { text: 'Badamy potrzeby i emocje za konfliktem', depth: 4 },
    ],
  },
  {
    text: 'Ile wiesz o życiu prywatnym kolegów z zespołu?',
    answers: [
      { text: 'Praktycznie nic', depth: 1 },
      { text: 'Ogólne fakty', depth: 2 },
      { text: 'Ważne wydarzenia i plany', depth: 3 },
      { text: 'Wartości, marzenia, lęki', depth: 4 },
    ],
  },
]

interface ResultData {
  avgDepth: number
  depthLevel: Depth
  label: string
  description: string
  recommendedModes: string[]
}

function getResult(answers: number[]): ResultData {
  const total = answers.reduce((sum, a) => sum + a, 0)
  const avg = total / answers.length
  const rounded = Math.round(avg) as Depth
  const depthLevel = Math.max(1, Math.min(4, rounded)) as Depth

  const descriptions: Record<number, { label: string; description: string; modes: string[] }> = {
    1: {
      label: 'Powierzchnia (Lód)',
      description:
        'Wasz zespół dopiero się poznaje. Relacje są formalne, oparte na rolach. To dobry punkt wyjścia — zacznijcie od bezpiecznych pytań poziomu 1-2, żeby zbudować fundament.',
      modes: ['Speed Round', 'Koło Fortuny', 'Kolory'],
    },
    2: {
      label: 'Ciekawość',
      description:
        'Macie podstawy — znacie się trochę, ale rozmowy rzadko wychodzą poza tematy służbowe. Czas na więcej ciekawości i otwartości. Karty poziomu 2-3 pomogą przejść dalej.',
      modes: ['Eskalacja', 'Odkrywca', 'Koło Fortuny'],
    },
    3: {
      label: 'Otwartość',
      description:
        'Wasz zespół jest otwarty — dzielicie się doświadczeniami i rozmawiacie o ważnych tematach. Jesteście gotowi na głębsze pytania. Spróbujcie kart poziomu 3-4.',
      modes: ['Wyzwanie Głębi', 'Eskalacja', 'Ping-Pong'],
    },
    4: {
      label: 'Bliskość',
      description:
        'Gratulacje — wasz zespół osiągnął wysoki poziom zaufania. Rozmawianie o emocjach i wyzwaniach to wasza codzienność. Możecie sięgnąć po najtrudniejsze karty poziomu 4-5.',
      modes: ['Głębokie Nurkowanie', 'Lustro', 'Retrospekcja'],
    },
  }

  const data = descriptions[depthLevel]
  return {
    avgDepth: Math.round(avg * 10) / 10,
    depthLevel,
    label: data.label,
    description: data.description,
    recommendedModes: data.modes,
  }
}

export function TeamDiagnosticPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (depth: number) => {
    const newAnswers = [...answers, depth]
    setAnswers(newAnswers)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setShowResult(true)
    }
  }

  const reset = () => {
    setCurrentQ(0)
    setAnswers([])
    setShowResult(false)
  }

  const result = showResult ? getResult(answers) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Diagnostyka zespołu</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {!showResult ? (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Na jakim poziomie głębi jest Twój zespół?
              </h2>
              <p className="text-slate-400 text-sm">
                Odpowiedz na 5 pytań — dowiesz się, od jakich kart zacząć.
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i < answers.length
                        ? DEPTH_META[(answers[i] as Depth) || 1].color
                        : i === currentQ
                          ? '#94a3b8'
                          : '#334155',
                  }}
                />
              ))}
            </div>

            {/* Question */}
            <div className="mb-8">
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">
                Pytanie {currentQ + 1} z {QUESTIONS.length}
              </p>
              <h3 className="text-xl font-semibold mb-6">
                {QUESTIONS[currentQ].text}
              </h3>

              <div className="space-y-3">
                {QUESTIONS[currentQ].answers.map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(answer.depth)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/40 hover:border-slate-600 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ backgroundColor: DEPTH_META[answer.depth as Depth].color }}
                        >
                          {String.fromCharCode(97 + i)}
                        </span>
                        <span className="text-sm">{answer.text}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : result ? (
          <>
            {/* Result screen */}
            <div className="text-center mb-10">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-white"
                style={{ backgroundColor: DEPTH_META[result.depthLevel].color }}
              >
                {result.avgDepth}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Wasz zespół jest na poziomie {result.depthLevel}: {result.label}
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto">{result.description}</p>
            </div>

            {/* Visual depth indicator */}
            <div className="mb-8 space-y-2">
              {([1, 2, 3, 4] as Depth[]).map((d) => {
                const meta = DEPTH_META[d]
                const isActive = d <= result.depthLevel
                return (
                  <div
                    key={d}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all"
                    style={{
                      backgroundColor: isActive ? meta.color + '15' : 'transparent',
                      borderLeft: isActive ? `4px solid ${meta.color}` : '4px solid transparent',
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: isActive ? meta.color : '#334155',
                        color: isActive ? 'white' : '#64748b',
                      }}
                    >
                      {d}
                    </span>
                    <div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: isActive ? meta.color : '#64748b' }}
                      >
                        {meta.label}
                      </span>
                      {d === result.depthLevel && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/10 text-white">
                          Tu jesteście
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recommended modes */}
            <div className="mb-8 p-5 rounded-xl bg-slate-800/30 border border-slate-700/40">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Rekomendowane tryby gry
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.recommendedModes.map((mode) => (
                  <span
                    key={mode}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: DEPTH_META[result.depthLevel].color + '20',
                      color: DEPTH_META[result.depthLevel].color,
                    }}
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended card areas */}
            <div className="mb-8 p-5 rounded-xl bg-slate-800/30 border border-slate-700/40">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Rekomendowane obszary kart
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-400">
                  Praca
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
                  Zespół
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Karty z poziomu {Math.max(1, result.depthLevel - 1)}-{Math.min(5, result.depthLevel + 1)} będą najlepszym startem.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/cards?area=praca&depth=${result.depthLevel}`}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors text-white"
                style={{ backgroundColor: DEPTH_META[result.depthLevel].color }}
              >
                Zacznij od tych kart
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Wypełnij ponownie
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
