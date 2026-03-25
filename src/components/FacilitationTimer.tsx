import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, SkipForward, RotateCcw, Settings } from 'lucide-react'

interface Phase {
  id: string
  name: string
  color: string
  colorLight: string
  defaultSeconds: number
}

const PHASES: Phase[] = [
  { id: 'thinking', name: 'Myślenie', color: '#3b82f6', colorLight: '#93c5fd', defaultSeconds: 120 },
  { id: 'conversation', name: 'Rozmowa', color: '#22c55e', colorLight: '#86efac', defaultSeconds: 180 },
  { id: 'reflection', name: 'Refleksja', color: '#f97316', colorLight: '#fdba74', defaultSeconds: 60 },
]

function playBeep(frequency = 880, duration = 200, count = 2) {
  try {
    const ctx = new AudioContext()
    for (let i = 0; i < count; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = frequency
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * (duration / 1000 + 0.1))
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * (duration / 1000 + 0.1) + duration / 1000)
      osc.start(ctx.currentTime + i * (duration / 1000 + 0.1))
      osc.stop(ctx.currentTime + i * (duration / 1000 + 0.1) + duration / 1000)
    }
  } catch {
    // Web Audio API not available
  }
}

export function FacilitationTimer() {
  const [phaseTimes, setPhaseTimes] = useState<number[]>(
    PHASES.map((p) => p.defaultSeconds)
  )
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(phaseTimes[0])
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [editMinutes, setEditMinutes] = useState<string[]>(
    PHASES.map((p) => String(p.defaultSeconds / 60))
  )
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentPhase = PHASES[currentPhaseIndex]
  const totalPhaseTime = phaseTimes[currentPhaseIndex]
  const progress = totalPhaseTime > 0 ? (totalPhaseTime - secondsLeft) / totalPhaseTime : 0

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const goToNextPhase = useCallback(() => {
    if (currentPhaseIndex < PHASES.length - 1) {
      playBeep(880, 200, 2)
      const next = currentPhaseIndex + 1
      setCurrentPhaseIndex(next)
      setSecondsLeft(phaseTimes[next])
    } else {
      playBeep(660, 300, 3)
      setIsRunning(false)
      setIsFinished(true)
      clearTimer()
    }
  }, [currentPhaseIndex, phaseTimes, clearTimer])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [isRunning, clearTimer])

  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      goToNextPhase()
    }
  }, [secondsLeft, isRunning, goToNextPhase])

  const handleStart = () => {
    if (isFinished) {
      handleReset()
    }
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleSkip = () => {
    goToNextPhase()
  }

  const handleReset = () => {
    clearTimer()
    setIsRunning(false)
    setIsFinished(false)
    setCurrentPhaseIndex(0)
    setSecondsLeft(phaseTimes[0])
  }

  const handleSaveSettings = () => {
    const newTimes = editMinutes.map((m) => {
      const val = parseFloat(m)
      return isNaN(val) || val <= 0 ? 60 : Math.round(val * 60)
    })
    setPhaseTimes(newTimes)
    if (!isRunning) {
      setSecondsLeft(newTimes[currentPhaseIndex])
    }
    setShowSettings(false)
  }

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  // SVG circle params
  const size = 280
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Phase indicators */}
      <div className="flex items-center gap-3">
        {PHASES.map((phase, i) => (
          <div key={phase.id} className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!isRunning) {
                  setCurrentPhaseIndex(i)
                  setSecondsLeft(phaseTimes[i])
                  setIsFinished(false)
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: i === currentPhaseIndex ? phase.color : phase.color + '22',
                color: i === currentPhaseIndex ? 'white' : phase.color,
                transform: i === currentPhaseIndex ? 'scale(1.1)' : 'scale(1)',
                boxShadow: i === currentPhaseIndex ? `0 0 20px ${phase.color}40` : 'none',
              }}
            >
              {phase.name}
              <span className="opacity-70 text-xs">{formatTime(phaseTimes[i])}</span>
            </button>
            {i < PHASES.length - 1 && (
              <div className="w-6 h-0.5 bg-slate-600" />
            )}
          </div>
        ))}
      </div>

      {/* Timer circle */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={currentPhase.color + '22'}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={currentPhase.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: `drop-shadow(0 0 8px ${currentPhase.color}80)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-lg font-semibold tracking-wider uppercase"
            style={{ color: currentPhase.color }}
          >
            {isFinished ? 'Koniec' : currentPhase.name}
          </span>
          <span className="text-5xl font-mono font-bold text-white dark:text-white mt-1">
            {isFinished ? '0:00' : formatTime(secondsLeft)}
          </span>
          <span className="text-sm text-slate-400 mt-2">
            {isFinished
              ? 'Wszystkie fazy zakończone'
              : `Faza ${currentPhaseIndex + 1} z ${PHASES.length}`}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {isRunning ? (
          <button
            onClick={handlePause}
            className="p-5 rounded-full text-white transition-all hover:scale-105"
            style={{
              backgroundColor: currentPhase.color,
              boxShadow: `0 0 30px ${currentPhase.color}60`,
            }}
          >
            <Pause className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="p-5 rounded-full text-white transition-all hover:scale-105"
            style={{
              backgroundColor: currentPhase.color,
              boxShadow: `0 0 30px ${currentPhase.color}60`,
            }}
          >
            <Play className="w-8 h-8 ml-0.5" />
          </button>
        )}

        <button
          onClick={handleSkip}
          disabled={isFinished}
          className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors disabled:opacity-30"
          title="Następna faza"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Settings toggle */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <Settings className="w-4 h-4" />
        Dostosuj czasy
      </button>

      {/* Settings panel */}
      {showSettings && (
        <div className="w-full max-w-sm bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 space-y-4">
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-sm text-slate-300 w-24">{phase.name}</span>
              <input
                type="number"
                min="0.5"
                max="30"
                step="0.5"
                value={editMinutes[i]}
                onChange={(e) => {
                  const next = [...editMinutes]
                  next[i] = e.target.value
                  setEditMinutes(next)
                }}
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500">min</span>
            </div>
          ))}
          <button
            onClick={handleSaveSettings}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            Zapisz
          </button>
        </div>
      )}
    </div>
  )
}
