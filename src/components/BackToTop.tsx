import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-600/80 transition-all shadow-lg flex items-center justify-center"
      aria-label="Przewiń do góry"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}
