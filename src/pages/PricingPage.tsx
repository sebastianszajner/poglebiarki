import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PRODUCT_LINES } from '../data/types'
import { ArrowLeft, Waves, Check, ArrowRight } from 'lucide-react'

export function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Helmet>
        <title>Cennik — Pogłębiarki</title>
        <meta name="description" content="Wybierz swój zestaw Pogłębiarki — od START (49 zł) po KOMPLET (249 zł). Architektura LEGO — zacznij od jednego obszaru, dokładaj kolejne." />
        <meta property="og:title" content="Cennik — Pogłębiarki" />
        <meta property="og:description" content="Wybierz swój zestaw Pogłębiarki — od START (49 zł) po KOMPLET (249 zł). Architektura LEGO." />
        <link rel="canonical" href="https://poglebiarki.pl/cennik" />
      </Helmet>
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Cennik</h1>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Wybierz swój zestaw</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Architektura LEGO — zacznij od jednego obszaru, dokładaj kolejne.
            Każdy produkt działa samodzielnie i łączy się z innymi.
          </p>
        </div>

        {/* Product lineup image */}
        <img
          src="/images/product-family.png"
          alt="Rodzina produktów Pogłębiarki"
          className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl mb-16"
        />

        {/* Pricing grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PRODUCT_LINES.map((product) => (
            <div
              key={product.id}
              className={`relative p-8 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                product.id === 'komplet'
                  ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 ring-2 ring-yellow-500/30'
                  : 'bg-slate-800/30'
              }`}
              style={{ borderColor: product.color + '50' }}
            >
              {product.badge && (
                <div
                  className="absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: product.color }}
                >
                  {product.badge}
                </div>
              )}

              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{product.subtitle}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: product.color }}>
                  {product.price}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {product.contents.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: product.color }} />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              {product.buildsOn && (
                <div className="text-xs text-slate-500 mb-4 p-2 rounded-lg bg-slate-700/30">
                  Wymaga: {PRODUCT_LINES.find((p) => p.id === product.buildsOn)?.name}
                </div>
              )}

              <button
                className="w-full py-3 rounded-xl font-semibold text-white transition-colors"
                style={{ backgroundColor: product.color }}
              >
                Zamów
              </button>
            </div>
          ))}
        </div>

        {/* Packaging mockups */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center">
            <img src="/images/box-start.png" alt="START" className="rounded-xl shadow-lg mx-auto h-64 object-contain" />
            <h3 className="font-bold mt-4">Pogłębiarki START</h3>
            <p className="text-sm text-slate-400">Kieszonkowe, kompaktowe</p>
          </div>
          <div className="text-center">
            <img src="/images/box-obszar-randki.png" alt="OBSZAR" className="rounded-xl shadow-lg mx-auto h-64 object-contain" />
            <h3 className="font-bold mt-4">Expansion Pack</h3>
            <p className="text-sm text-slate-400">Dokładaj nowe obszary</p>
          </div>
          <div className="text-center">
            <img src="/images/box-komplet.png" alt="KOMPLET" className="rounded-xl shadow-lg mx-auto h-64 object-contain" />
            <h3 className="font-bold mt-4">Pogłębiarki KOMPLET</h3>
            <p className="text-sm text-slate-400">Premium pudełko z przegródkami</p>
          </div>
        </div>

        {/* LEGO flow */}
        <div className="p-8 rounded-2xl border border-slate-700/40 bg-slate-800/20 mb-16">
          <h3 className="text-xl font-bold mb-6 text-center">Jak budować?</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: 'START', color: '#4caf50', desc: '1 obszar' },
              { label: 'OBSZAR ×2', color: '#2196f3', desc: '+2 obszary' },
              { label: 'TRYBY', color: '#ffc107', desc: '+10 trybów' },
              { label: 'GŁĘBIA', color: '#ff9800', desc: '+karty 4-5' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xs font-bold mx-auto"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{step.desc}</div>
                </div>
                {i < 3 && <ArrowRight className="w-5 h-5 text-slate-600" />}
              </div>
            ))}
            <div className="text-center ml-4">
              <div className="text-lg font-bold text-slate-400">=</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-16 rounded-xl bg-gradient-to-r from-red-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                KOMPLET
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Wszystko!</div>
            </div>
          </div>
        </div>

        {/* FAQ pricing */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-center">Pytania o cennik</h3>
          <div className="space-y-4">
            {[
              { q: 'Czy taniej kupić KOMPLET czy po kawałku?', a: 'KOMPLET (249 zł) to oszczędność ~30% vs. kupowanie osobno. Ale LEGO model pozwala zacząć od 49 zł i testować.' },
              { q: 'Co zawiera wersja CORPORATE?', a: 'Pełny KOMPLET + logo firmy na kartach + 10 customowych pytań (dopasowanych do wartości Twojej firmy) + facilitation guide dla managera.' },
              { q: 'Czy mogę dokupić więcej niż 1 expansion?', a: 'Tak — możesz dokupić wszystkie 9 obszarów osobno. Każdy OBSZAR to 25 unikalnych kart.' },
              { q: 'Jaka jest minimalna wielkość zamówienia CORPORATE?', a: 'Minimum 10 zestawów. Przy 20+ zestawach — rabat 15%. Przy 50+ — rabat 25% i darmowa customizacja.' },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-700/30 bg-slate-800/20">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
