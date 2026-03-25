import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area } from '../data/types'
import { ArrowLeft, BookOpen, MessageCircle, ExternalLink, Lightbulb, FlaskConical, Wrench, Target, Link2, Check, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Pencil, Save } from 'lucide-react'
import { AnimatedDepthBar } from '../components/AnimatedDepthBar'
import { ThemeToggle } from '../components/ThemeToggle'
import { markDayActivity } from '../components/StreakCounter'

// ── Transfer Bridge ──
const AREA_BRIDGE_TIPS: Record<Area, string> = {
  praca: 'Użyj tego pytania na najbliższym spotkaniu 1:1 z członkiem zespołu',
  imprezy: 'Zadaj to pytanie na następnym spotkaniu towarzyskim zamiast \'co u Ciebie?\'',
  relacje: 'Porozmawiaj o tym z bliską osobą przy najbliższej wspólnej kawie',
  randki: 'To pytanie idealnie sprawdzi się na kolacji we dwoje',
  rodzicielstwo: 'Zadaj to pytanie dziecku przy kolacji lub w drodze do szkoły',
  szkola: 'Użyj tego pytania na godzinie wychowawczej lub w rozmowie z uczniem',
  zespol: 'Zacznij od tego pytania najbliższą retrospektywę lub daily',
  sasiedzi: 'Zadaj to pytanie sąsiadowi przy najbliższym spotkaniu na klatce',
  przedszkole: 'Zadaj to pytanie rodzicowi na zebraniu lub w rozmowie przy odbiorze dziecka',
}

const MICRO_TASKS = [
  'Zapisz swoją odpowiedź w dzienniku',
  'Podziel się tym pytaniem z jedną osobą',
  'Wróć do tego pytania za tydzień — czy Twoja odpowiedź się zmieniła?',
]

function hashCardId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function trackCardView(card: { area: string; depth: number }) {
  try {
    const raw = localStorage.getItem('poglebiarki-viewed')
    const stats = raw ? JSON.parse(raw) : { total: 0, byArea: {}, byDepth: {} }
    stats.total = (stats.total || 0) + 1
    stats.byArea[card.area] = (stats.byArea[card.area] || 0) + 1
    stats.byDepth[String(card.depth)] = (stats.byDepth[String(card.depth)] || 0) + 1
    localStorage.setItem('poglebiarki-viewed', JSON.stringify(stats))
    markDayActivity()
  } catch { /* ignore */ }
}

export function CardPage() {
  const { id } = useParams<{ id: string }>()
  const card = cards.find((c) => c.id === id)
  const [copied, setCopied] = useState(false)

  // Rating state
  const [rating, setRating] = useState<'up' | 'down' | null>(null)

  // Transfer Bridge state
  const [bridgeOpen, setBridgeOpen] = useState(false)
  const [microTasksDone, setMicroTasksDone] = useState<boolean[]>([false, false, false])

  // Reflection Journal state
  const [journalOpen, setJournalOpen] = useState(false)
  const [journalText, setJournalText] = useState('')
  const [journalDate, setJournalDate] = useState<string | null>(null)
  const [journalEditing, setJournalEditing] = useState(false)
  const [journalDraft, setJournalDraft] = useState('')

  // Load rating from localStorage
  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`rating-${id}`)
      setRating(stored === 'up' || stored === 'down' ? stored : null)
    }
  }, [id])

  // Load micro-tasks from localStorage
  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`microtasks-${id}`)
      if (stored) {
        try { setMicroTasksDone(JSON.parse(stored)) } catch { /* ignore */ }
      } else {
        setMicroTasksDone([false, false, false])
      }
    }
  }, [id])

  // Load reflection from localStorage
  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`reflection-${id}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setJournalText(parsed.text || '')
          setJournalDate(parsed.date || null)
          setJournalEditing(false)
        } catch { /* ignore */ }
      } else {
        setJournalText('')
        setJournalDate(null)
        setJournalEditing(false)
      }
      setJournalDraft('')
    }
  }, [id])

  useEffect(() => {
    if (card) trackCardView(card)
  }, [card])

  const handleRating = (value: 'up' | 'down') => {
    if (rating === value) {
      // Toggle off
      setRating(null)
      localStorage.removeItem(`rating-${id}`)
    } else {
      setRating(value)
      localStorage.setItem(`rating-${id}`, value)
    }
  }

  const handleSaveReflection = () => {
    if (!id) return
    const text = journalDraft.trim()
    if (!text) return
    const date = new Date().toISOString().slice(0, 10)
    localStorage.setItem(`reflection-${id}`, JSON.stringify({ text, date }))
    setJournalText(text)
    setJournalDate(date)
    setJournalEditing(false)
    setJournalDraft('')
  }

  const handleEditReflection = () => {
    setJournalDraft(journalText)
    setJournalEditing(true)
  }

  const toggleMicroTask = (index: number) => {
    const updated = [...microTasksDone]
    updated[index] = !updated[index]
    setMicroTasksDone(updated)
    localStorage.setItem(`microtasks-${id}`, JSON.stringify(updated))
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Karta nie znaleziona</h1>
          <Link to="/" className="text-blue-400 hover:underline">Wróć do strony głównej</Link>
        </div>
      </div>
    )
  }

  const areaMeta = AREA_META[card.area]
  const depthMeta = DEPTH_META[card.depth]

  const cardIndex = cards.findIndex((c) => c.id === id)
  const prevCard = cardIndex > 0 ? cards[cardIndex - 1] : null
  const nextCard = cardIndex < cards.length - 1 ? cards[cardIndex + 1] : null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const pageTitle = `${card.question} — Pogłębiarki`
  const pageDescription = card.science.body.slice(0, 160) + '…'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://poglebiarki.pl/card/${card.id}`} />
        <link rel="canonical" href={`https://poglebiarki.pl/card/${card.id}`} />
      </Helmet>
      {/* Top bar */}
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50 dark-nav">
        <Link to="/cards" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Wszystkie karty
        </Link>
        <ThemeToggle />
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
            {copied ? 'Link skopiowany!' : 'Kopiuj link'}
          </button>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: areaMeta.color + '22', color: areaMeta.color }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: areaMeta.color }} />
            {areaMeta.label}
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: depthMeta.color + '22', color: depthMeta.color }}
          >
            Poziom {card.depth}: {depthMeta.label}
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link to="/cards" className="hover:text-slate-300 transition-colors">Karty</Link>
          <span className="text-slate-600">/</span>
          <Link
            to={`/cards?area=${card.area}`}
            className="hover:text-slate-300 transition-colors"
            style={{ color: areaMeta.color + 'aa' }}
          >
            {areaMeta.label}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-mono">{card.id}</span>
        </div>

        {/* Question */}
        <div
          className="rounded-2xl p-8 mb-10"
          style={{
            background: `linear-gradient(135deg, ${areaMeta.color}15, ${depthMeta.color}15)`,
            borderLeft: `4px solid ${depthMeta.color}`,
          }}
        >
          <h1 className="text-3xl font-bold leading-relaxed">{card.question}</h1>
        </div>

        {/* Depth bar */}
        <div className="mb-10">
          <AnimatedDepthBar depth={card.depth} color={depthMeta.color} />
        </div>

        {/* Science section — main body */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">{card.science.title}</h2>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <p className="text-slate-300 leading-relaxed mb-4">{card.science.body}</p>
            <div className="flex items-start gap-2 text-sm text-slate-500 border-t border-slate-700/50 pt-4">
              <ExternalLink className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="italic">{card.science.source}</p>
            </div>
          </div>
        </section>

        {/* Enriched content grid: ciekawostka, badanie, knowHow, zastosowanie */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {card.science.ciekawostka && (
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-amber-300 text-sm uppercase tracking-wider">Ciekawostka</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{card.science.ciekawostka}</p>
            </div>
          )}
          {card.science.badanie && (
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-blue-300 text-sm uppercase tracking-wider">Badanie</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{card.science.badanie}</p>
            </div>
          )}
          {card.science.knowHow && (
            <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-green-300 text-sm uppercase tracking-wider">Know-how</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{card.science.knowHow}</p>
            </div>
          )}
          {card.science.zastosowanie && (
            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-purple-300 text-sm uppercase tracking-wider">Zastosowanie</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{card.science.zastosowanie}</p>
            </div>
          )}
        </div>

        {/* Transfer Bridge */}
        <section className="mb-8">
          <button
            onClick={() => setBridgeOpen(!bridgeOpen)}
            className="w-full flex items-center justify-between p-5 rounded-xl bg-teal-500/5 border border-teal-500/20 hover:bg-teal-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌉</span>
              <h2 className="text-lg font-semibold text-teal-300">Jak użyć tego w praktyce?</h2>
            </div>
            {bridgeOpen ? (
              <ChevronUp className="w-5 h-5 text-teal-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-teal-400" />
            )}
          </button>
          {bridgeOpen && (
            <div className="mt-3 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-5">
              {/* Area-specific tip */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-teal-500/5 border border-teal-500/15">
                <span className="text-xl mt-0.5">🎯</span>
                <p className="text-teal-200 font-medium">{AREA_BRIDGE_TIPS[card.area]}</p>
              </div>

              {/* Micro-tasks */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Mikro-zadania</h3>
                <div className="space-y-2">
                  {MICRO_TASKS.map((task, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={microTasksDone[i]}
                        onChange={() => toggleMicroTask(i)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                      />
                      <span className={`text-sm ${microTasksDone[i] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                        {task}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Follow-up questions */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-semibold">Pytania pogłębiające</h2>
          </div>
          <div className="space-y-3">
            {card.science.followUp.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
              >
                <span className="text-emerald-400 font-bold text-sm mt-0.5">{i + 1}</span>
                <p className="text-slate-300">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Card Rating */}
        <section className="mb-10">
          <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-slate-300 text-center mb-4">Czy to pytanie było wartościowe?</p>
            <div className="flex items-center justify-center gap-4 mb-3">
              <button
                onClick={() => handleRating('up')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                  rating === 'up'
                    ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                👍
              </button>
              <button
                onClick={() => handleRating('down')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                  rating === 'down'
                    ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                👎
              </button>
            </div>
            <p className="text-xs text-slate-500 text-center">
              {card.depth * 12 + (hashCardId(card.id) % 47)} osób uznało to pytanie za wartościowe
            </p>
          </div>
        </section>

        {/* Depth explanation */}
        <section className="mb-10 p-6 rounded-xl border border-slate-700/30" style={{ backgroundColor: depthMeta.color + '08' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: depthMeta.color }}>
            Poziom {card.depth}: {depthMeta.label}
          </h3>
          <p className="text-slate-400 text-sm">{depthMeta.description}</p>
        </section>

        {/* Reflection Journal */}
        <section className="mb-10">
          <button
            onClick={() => setJournalOpen(!journalOpen)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800/60 transition-colors"
          >
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <span role="img" aria-label="journal">📓</span> Mój dziennik refleksji
            </span>
            {journalOpen ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {journalOpen && (
            <div className="mt-3 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
              {journalText && !journalEditing ? (
                /* Show existing reflection */
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500">
                      Zapisano: {journalDate}
                    </span>
                    <button
                      onClick={handleEditReflection}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edytuj
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{journalText}</p>
                </div>
              ) : (
                /* Edit / new reflection */
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Co odkryłem dzięki temu pytaniu?
                  </label>
                  <textarea
                    value={journalEditing ? journalDraft : journalDraft}
                    onChange={(e) => setJournalDraft(e.target.value)}
                    placeholder="Napisz swoją refleksję..."
                    className="w-full h-32 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-slate-200 placeholder-slate-600 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-slate-600">
                      Twoje notatki zostają na Twoim urządzeniu
                    </span>
                    <button
                      onClick={handleSaveReflection}
                      disabled={!journalDraft.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Zapisz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-slate-700/50">
          {prevCard ? (
            <Link
              to={`/card/${prevCard.id}`}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              ← {prevCard.id}
            </Link>
          ) : <div />}
          {nextCard ? (
            <Link
              to={`/card/${nextCard.id}`}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              {nextCard.id} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
