import { useState, useEffect } from 'react'

function calculateStreak(): number {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let streak = 0
    const checkDate = new Date(today)

    // Check today first
    for (let i = 0; i < 365; i++) {
      const dateKey = checkDate.toISOString().slice(0, 10)

      const viewedDates = localStorage.getItem(`poglebiarki-day-${dateKey}`)
      const challengeDone = localStorage.getItem(`challenge-done-${dateKey}`)

      const hasActivity = viewedDates === 'true' || challengeDone === 'true'

      if (i === 0 && !hasActivity) {
        // Today no activity yet — check from yesterday
        checkDate.setDate(checkDate.getDate() - 1)
        continue
      }

      if (hasActivity) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  } catch {
    return 0
  }
}

function getMotivation(streak: number): string {
  if (streak === 0) return 'Zacznij dziś!'
  if (streak <= 3) return 'Dobry start!'
  if (streak <= 7) return 'Świetna seria!'
  if (streak <= 14) return 'Nie do zatrzymania!'
  if (streak <= 30) return 'Mistrz pogłębiania!'
  return 'Legenda!'
}

export function markDayActivity() {
  const today = new Date().toISOString().slice(0, 10)
  localStorage.setItem(`poglebiarki-day-${today}`, 'true')
}

export function StreakCounter() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    setStreak(calculateStreak())
  }, [])

  const motivation = getMotivation(streak)

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/40">
      <span className="text-2xl" role="img" aria-label="fire">
        {streak > 0 ? '🔥' : '💤'}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white">
          {streak} {streak === 1 ? 'dzień' : streak >= 2 && streak <= 4 ? 'dni' : 'dni'}
        </span>
        <span className="text-xs text-slate-400">{motivation}</span>
      </div>
    </div>
  )
}
