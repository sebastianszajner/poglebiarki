import { useState, useEffect, useCallback } from 'react'
import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  who: string
}

const TESTIMONIALS: Testimonial[] = [
  { quote: '„Pierwszy raz na szkoleniu naprawdę rozmawiałem z kolegą z innego działu."', who: 'Uczestnik warsztatu, branża IT' },
  { quote: '„Mąż odpowiedział na pytanie o strach — po 12 latach to było jak nowa randka."', who: 'Uczestniczka, Poznań' },
  { quote: '„Karty na retro sprintu dały świeżość. Zespół w końcu mówił szczerze."', who: 'Scrum Master, fintech' },
  { quote: '„Córka zapytała: mamo, a czego ty się boisz? Po tym pytaniu rozmawiałyśmy dwie godziny."', who: 'Mama dwójki dzieci, Kraków' },
  { quote: '„Użyłam kart na sesji coachingowej. Klient otworzył się w 10 minut zamiast 40."', who: 'Coach ICC, Warszawa' },
  { quote: '„Na festynie sąsiedzkim ludzie, którzy się mijali latami, zaczęli naprawdę rozmawiać."', who: 'Przewodniczący rady osiedla' },
]

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isPaused, next])

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="w-full flex-shrink-0 px-4">
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl mx-auto text-center">
              <div className="flex gap-1 justify-center mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-slate-700 mb-4 italic leading-relaxed">{t.quote}</p>
              <p className="text-sm text-slate-500">{t.who}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-blue-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Opinia ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
