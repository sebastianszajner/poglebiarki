import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Card, Depth } from '../data/types'
import { ArrowLeft, ChevronDown, ChevronUp, RotateCcw, CheckCircle2, Circle, CalendarDays, Trophy } from 'lucide-react'
import { StreakCounter, markDayActivity } from '../components/StreakCounter'

const CHALLENGE_START_KEY = 'challenge-start-date'
const CHALLENGE_DONE_PREFIX = 'challenge-done-'

function seededRandom(seed: number): number {
  let x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function getCardForDay(dayNumber: number, startDate: string): Card {
  // Determine depth range based on day progression
  let minDepth: Depth
  let maxDepth: Depth
  if (dayNumber <= 10) {
    minDepth = 1
    maxDepth = 2
  } else if (dayNumber <= 20) {
    minDepth = 2
    maxDepth = 3
  } else {
    minDepth = 3
    maxDepth = 5
  }

  const eligibleCards = cards.filter(c => c.depth >= minDepth && c.depth <= maxDepth)
  if (eligibleCards.length === 0) return cards[0]

  // Deterministic seed from startDate + dayNumber
  const dateSeed = startDate.split('-').map(Number).reduce((a, b) => a * 100 + b, 0)
  const seed = dateSeed * 31 + dayNumber * 7
  const index = Math.floor(seededRandom(seed) * eligibleCards.length)

  return eligibleCards[index]
}

function getDayNumber(startDateStr: string): number {
  const start = new Date(startDateStr)
  start.setHours(0, 0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return diff + 1 // Day 1 on start date
}

function getCompletedDays(): Set<number> {
  const completed = new Set<number>()
  const startDate = localStorage.getItem(CHALLENGE_START_KEY)
  if (!startDate) return completed

  for (let day = 1; day <= 30; day++) {
    const dateForDay = new Date(startDate)
    dateForDay.setDate(dateForDay.getDate() + day - 1)
    const dateKey = dateForDay.toISOString().slice(0, 10)
    if (localStorage.getItem(`${CHALLENGE_DONE_PREFIX}${dateKey}`) === 'true') {
      completed.add(day)
    }
  }
  return completed
}

function getStreakCount(completedDays: Set<number>, currentDay: number): number {
  let streak = 0
  for (let d = Math.min(currentDay, 30); d >= 1; d--) {
    if (completedDays.has(d)) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export function ChallengePage() {
  const [startDate, setStartDate] = useState<string | null>(null)
  const [currentDay, setCurrentDay] = useState(1)
  const [scienceOpen, setScienceOpen] = useState(false)
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    let stored = localStorage.getItem(CHALLENGE_START_KEY)
    if (!stored) {
      const today = new Date().toISOString().slice(0, 10)
      localStorage.setItem(CHALLENGE_START_KEY, today)
      stored = today
    }
    setStartDate(stored)
    setCurrentDay(getDayNumber(stored))
    setCompletedDays(getCompletedDays())
  }, [])

  const handleToggleDone = useCallback(() => {
    if (!startDate) return
    const dateForDay = new Date(startDate)
    dateForDay.setDate(dateForDay.getDate() + Math.min(currentDay, 30) - 1)
    const dateKey = dateForDay.toISOString().slice(0, 10)
    const key = `${CHALLENGE_DONE_PREFIX}${dateKey}`

    const isDone = localStorage.getItem(key) === 'true'
    if (isDone) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, 'true')
      markDayActivity()
    }
    setCompletedDays(getCompletedDays())
  }, [startDate, currentDay])

  const handleReset = () => {
    // Clear all challenge data
    localStorage.removeItem(CHALLENGE_START_KEY)
    for (let i = 0; i < 60; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      localStorage.removeItem(`${CHALLENGE_DONE_PREFIX}${key}`)
    }
    const today = new Date().toISOString().slice(0, 10)
    localStorage.setItem(CHALLENGE_START_KEY, today)
    setStartDate(today)
    setCurrentDay(1)
    setCompletedDays(new Set())
    setShowResetConfirm(false)
    setScienceOpen(false)
  }

  if (!startDate) return null

  const effectiveDay = Math.min(currentDay, 30)
  const isFinished = currentDay > 30
  const card = getCardForDay(effectiveDay, startDate)
  const areaMeta = AREA_META[card.area]
  const depthMeta = DEPTH_META[card.depth]
  const todayDone = completedDays.has(effectiveDay)
  const challengeStreak = getStreakCount(completedDays, effectiveDay)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Strona główna
        </Link>
        <div className="ml-auto">
          <StreakCounter />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold">Wyzwanie 30 Dni</h1>
          </div>
          <p className="text-slate-400">
            Jedno pytanie dziennie. 30 dni pogłębiania relacji.
          </p>
          {challengeStreak > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
              🔥 Seria w wyzwaniu: {challengeStreak} {challengeStreak === 1 ? 'dzień' : 'dni'}
            </div>
          )}
        </div>

        {isFinished ? (
          /* Challenge completed */
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold mb-3">Gratulacje!</h2>
            <p className="text-slate-400 mb-2">
              Ukończyłeś wyzwanie 30 dni pogłębiania!
            </p>
            <p className="text-slate-500 text-sm mb-8">
              Ukończone dni: {completedDays.size} / 30
            </p>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium transition-colors"
            >
              Zacznij od nowa
            </button>
          </div>
        ) : (
          <>
            {/* Day indicator */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <CalendarDays className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-semibold">Dzień {effectiveDay} / 30</span>
              </div>
            </div>

            {/* Today's card */}
            <div
              className="rounded-2xl p-8 mb-6"
              style={{
                background: `linear-gradient(135deg, ${areaMeta.color}15, ${depthMeta.color}15)`,
                borderLeft: `4px solid ${depthMeta.color}`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: areaMeta.color + '22', color: areaMeta.color }}
                >
                  {areaMeta.label}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: depthMeta.color + '22', color: depthMeta.color }}
                >
                  Poziom {card.depth}: {depthMeta.label}
                </span>
              </div>
              <h2 className="text-2xl font-bold leading-relaxed mb-4">{card.question}</h2>
              <Link
                to={`/card/${card.id}`}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Zobacz pełną kartę →
              </Link>
            </div>

            {/* Micro-task */}
            <div className="rounded-xl p-5 mb-6 bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm font-medium text-emerald-300 mb-1">Zadanie na dziś</p>
              <p className="text-slate-300">
                Użyj tego pytania w rozmowie z kimś dzisiaj.
              </p>
            </div>

            {/* Science expand */}
            <button
              onClick={() => setScienceOpen(!scienceOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800/60 transition-colors mb-4"
            >
              <span className="text-sm font-medium text-slate-300">Odkryj kontekst naukowy</span>
              {scienceOpen ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {scienceOpen && (
              <div className="grid gap-3 mb-6 animate-in fade-in">
                {card.science.ciekawostka && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">Ciekawostka</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.science.ciekawostka}</p>
                  </div>
                )}
                {card.science.badanie && (
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Badanie</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.science.badanie}</p>
                  </div>
                )}
                {card.science.knowHow && (
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <h3 className="text-xs font-semibold text-green-300 uppercase tracking-wider mb-2">Know-how</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.science.knowHow}</p>
                  </div>
                )}
                {card.science.zastosowanie && (
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                    <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">Zastosowanie</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.science.zastosowanie}</p>
                  </div>
                )}
              </div>
            )}

            {/* Done checkbox */}
            <button
              onClick={handleToggleDone}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all mb-10 ${
                todayDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {todayDone ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <Circle className="w-6 h-6 text-slate-500" />
              )}
              <span className="font-medium">{todayDone ? 'Zrobione!' : 'Oznacz jako zrobione'}</span>
            </button>
          </>
        )}

        {/* Calendar view */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-center">Kalendarz wyzwania</h3>
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1
              const isDone = completedDays.has(day)
              const isFuture = day > currentDay
              const isToday = day === effectiveDay && !isFinished

              return (
                <div
                  key={day}
                  className={`relative flex items-center justify-center w-full aspect-square rounded-lg text-sm font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isFuture
                        ? 'bg-slate-800/20 text-slate-600 border border-dashed border-slate-700/30'
                        : 'bg-slate-800/40 text-slate-500 border border-slate-700/30'
                  } ${isToday ? 'ring-2 ring-blue-400/50' : ''}`}
                >
                  {day}
                  {isDone && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full" />
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
              Ukończone
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-slate-800/40 border border-slate-700/30" />
              Pominięte
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-slate-800/20 border border-dashed border-slate-700/30" />
              Przyszłe
            </div>
          </div>
        </section>

        {/* Reset */}
        <div className="text-center pb-10">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Resetuj wyzwanie
            </button>
          ) : (
            <div className="inline-flex flex-col items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-sm text-red-300">Na pewno chcesz zresetować wyzwanie? Cały postęp zostanie usunięty.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition-colors"
                >
                  Tak, resetuj
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
