import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META, PRODUCT_LINES, USE_CASES } from '../data/types'
import type { Area, Depth } from '../data/types'
import {
  Waves, ArrowRight, Check, Users, Heart, GraduationCap, Briefcase,
  Home, TreePine, Sparkles, Brain, Target, Shield, Puzzle, BarChart3,
  MessageCircle, BookOpen, QrCode, Layers, ChevronRight, Zap,
} from 'lucide-react'
import { AreaIcon } from '../components/AreaIcon'
import { ScrollProgress } from '../components/ScrollProgress'
import { TestimonialsCarousel } from '../components/TestimonialsCarousel'
import { Footer } from '../components/Footer'
import { ThemeToggle } from '../components/ThemeToggle'

// ============================================================
// BENEFITS
// ============================================================

const BENEFITS = [
  {
    icon: Brain,
    title: 'Evidence-based',
    description: 'Każde pytanie oparte o badania naukowe — Aron (1997), Altman & Taylor (1973), Kardas (2022). Żadnych wymysłów.',
  },
  {
    icon: Layers,
    title: '5 poziomów głębokości',
    description: 'Od "Jak masz na imię?" do "Czego najbardziej się boisz?". Ty kontrolujesz tempo odsłaniania.',
  },
  {
    icon: Puzzle,
    title: 'Architektura LEGO',
    description: 'Kup 1 obszar na start, dokładaj kolejne. Każdy pack działa samodzielnie i razem z innymi.',
  },
  {
    icon: QrCode,
    title: 'QR → wiedza naukowa',
    description: 'Zeskanuj QR na karcie → ciekawostka, badanie, know-how, pytania pogłębiające. Klej edukacyjny.',
  },
  {
    icon: Target,
    title: '8 obszarów życia',
    description: 'Praca, imprezy, relacje, randki, rodzicielstwo, szkoła, zespół, sąsiedzi. Jedna gra — 8 kontekstów.',
  },
  {
    icon: MessageCircle,
    title: '10 trybów rozgrywki',
    description: 'Od 10-minutowego Speed Round po 90-minutowe Głębokie Nurkowanie. Dopasuj do grupy i czasu.',
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo psychologiczne',
    description: 'Gracz SAM wybiera poziom głębokości. "Pasuję" jest zawsze OK. Odwaga = nagroda, nie przymus.',
  },
  {
    icon: BarChart3,
    title: 'Transfer po szkoleniu',
    description: 'Uczestnicy zabierają karty i ćwiczą dalej. Most między warsztatem a codzienną praktyką.',
  },
  {
    icon: BookOpen,
    title: '200+ pytań z kontekstem',
    description: 'Każde pytanie ma tytuł naukowy, źródło, ciekawostkę, badanie i wskazówki praktyczne.',
  },
  {
    icon: Sparkles,
    title: 'Rozmowy, które się nie zdarzają',
    description: 'Pytania, których normalnie byś nie zadał — a które otwierają najważniejsze tematy.',
  },
]

// ============================================================
// PERSONAS
// ============================================================

const PERSONAS = [
  {
    id: 'trainer',
    icon: Briefcase,
    title: 'Trener / Facilitator',
    color: '#5c6bc0',
    howToPlay: [
      'Speed Round na start szkolenia — 5 min, karty poz. 1, energia od pierwszej minuty',
      'Eskalacja w module komunikacyjnym — pary idą od poziomu 1 do 3',
      'Kolory na integracji — losowe grupy, wymiana kart, przełamanie silosów',
      'Retrospekcja na zamknięcie — format SSC: Start / Stop / Continue',
    ],
    recommended: ['speed-round', 'colors', 'wheel', 'retro'],
    areas: ['praca', 'zespol'] as Area[],
    tip: 'Nie przekraczaj poziomu 3 na pierwszym spotkaniu. Karty poziomu 1 → bezpieczny icebreaker.',
  },
  {
    id: 'couple',
    icon: Heart,
    title: 'Para / Randka',
    color: '#ec407a',
    howToPlay: [
      'Ping-Pong — ta sama karta, obaj odpowiadają. Wzajemne odsłanianie',
      'Eskalacja à la Aron — 3 rundy po 15 min, od poziomu 1 do 4',
      'Lustro — piszecie odpowiedzi, potem porównujecie. Zaskoczenia gwarantowane',
      'Głębokie Nurkowanie — poziom 4-5, bez limitu czasu, las Vegas rule',
    ],
    recommended: ['ping-pong', 'escalation', 'mirror', 'deep-dive'],
    areas: ['randki', 'relacje'] as Area[],
    tip: 'Nawet po 10 latach razem — zaskoczysz się odpowiedziami partnera na poziomie 4.',
  },
  {
    id: 'parent',
    icon: TreePine,
    title: 'Rodzic',
    color: '#26a69a',
    howToPlay: [
      'Koło Fortuny przy kolacji — losuj kartę, cała rodzina odpowiada',
      'Ping-Pong rodzic-dziecko — rodzic TEŻ odpowiada, nie tylko pyta',
      'Odkrywca w aucie — losowy obszar, niespodzianka na każdy kilometr',
      'Karty poz. 1-2 dla dzieci, 3-4 dla rodziców — wspólna refleksja',
    ],
    recommended: ['wheel', 'ping-pong', 'explorer'],
    areas: ['rodzicielstwo', 'relacje'] as Area[],
    tip: 'Dzieci uwielbiają słyszeć historie rodziców. "A ty jak miałeś tyle lat?" — magia.',
  },
  {
    id: 'teacher',
    icon: GraduationCap,
    title: 'Nauczyciel',
    color: '#42a5f5',
    howToPlay: [
      'Speed Round na godzinie wychowawczej — 30 sek na odpowiedź, angażuje nawet cichych',
      'Wyzwanie Głębi — gamifikacja: punkty za odwagę, nie za "dobrą" odpowiedź',
      'Odkrywca na zajęciach integracyjnych — losowe obszary, nowe perspektywy',
      'Kontekst naukowy (QR) łączy zabawę z nauką — bonus edukacyjny',
    ],
    recommended: ['speed-round', 'depth-challenge', 'explorer'],
    areas: ['szkola', 'relacje'] as Area[],
    tip: 'Nigdy nie zmuszaj do odpowiedzi. "Pas" jest OK. Bezpieczeństwo > engagement.',
  },
  {
    id: 'manager',
    icon: Users,
    title: 'Manager / Team Lead',
    color: '#7e57c2',
    howToPlay: [
      '1 karta dziennie na stand-upie — Speed Round, 30 sekund, energizer',
      'Retro sprintu — karty jako opener retrospektywy (SSC lub 4L)',
      'Onboarding — nowy pracownik + zespół, karty poz. 1-2 przez 1 tydzień',
      'Offsite — Eskalacja: od lodołamacza do głębokich rozmów o wartościach zespołu',
    ],
    recommended: ['speed-round', 'retro', 'wheel', 'escalation'],
    areas: ['zespol', 'praca'] as Area[],
    tip: 'Karty na retro dają świeżość. Po 3 sprintach te same pytania retro się wyczerpują.',
  },
  {
    id: 'coach',
    icon: Brain,
    title: 'Coach / Terapeuta',
    color: '#ef5350',
    howToPlay: [
      'Losowa karta otwiera sesję — "co przynosi pole", klient wybiera',
      'Głębokie Nurkowanie — karty poz. 4-5, bez limitu czasu',
      'QR kontekst normalizuje temat — "badania pokazują, że to powszechne"',
      'Follow-up questions to gotowe pogłębiacze — nie musisz wymyślać',
    ],
    recommended: ['deep-dive', 'ping-pong'],
    areas: ['relacje', 'praca'] as Area[],
    tip: 'Kontekst naukowy (QR) daje klientowi ramę — to nie Twoja opinia, to badania.',
  },
  {
    id: 'friends',
    icon: Zap,
    title: 'Przyjaciele',
    color: '#ab47bc',
    howToPlay: [
      'Wyzwanie Głębi — kto odważy się na poziom 5? Żetony, punkty, tytuł "Pogłębiarz"',
      'Odkrywca — potasuj WSZYSTKO, losowy obszar = niespodzianka',
      'Eskalacja na domówce — od "jaka jest twoja ulubiona pizza?" do "czego się boisz?"',
      'Pasuję = -1 żeton, nie wyrok. Odwaga jest nagradzana, nie wymuszana',
    ],
    recommended: ['depth-challenge', 'explorer', 'escalation'],
    areas: ['imprezy', 'relacje'] as Area[],
    tip: 'Alkohol + karty powyżej poziomu 3 = ryzyko. Poziom 1-2 na luzie, 3+ na trzeźwo.',
  },
  {
    id: 'neighbors',
    icon: Home,
    title: 'Sąsiedzi / Wspólnota',
    color: '#8d6e63',
    howToPlay: [
      'Festyn — Speed Round przy grillu, karty poz. 1, duży druk',
      'Kolory — losowe grupy z różnych klatek, wymiana kart, poznanie się',
      'Koło Fortuny — ktoś losuje, sąsiad po lewej odpowiada',
      'Zacznij od poziomu 1 — sąsiedzi dopiero się poznają',
    ],
    recommended: ['speed-round', 'colors', 'wheel'],
    areas: ['sasiedzi', 'imprezy'] as Area[],
    tip: 'Po pierwszym spotkaniu będą chcieli więcej. Nie forsuj głębokości na start.',
  },
]

// ============================================================
// COMPONENT
// ============================================================

export function LandingPage() {
  const areas = Object.keys(AREA_META) as Area[]

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Pogłębiarki',
    description: 'Karty do pogłębienia relacji — 200+ pytań opartych o badania naukowe, 8 obszarów życia, 5 poziomów głębokości.',
    brand: { '@type': 'Brand', name: 'Pogłębiarki' },
    category: 'Gra karciana / narzędzie relacyjne',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '29',
      highPrice: '499',
      priceCurrency: 'PLN',
      offerCount: PRODUCT_LINES.length,
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pogłębiarki',
    url: 'https://poglebiarki.pl',
    description: 'Karty do pogłębienia relacji — evidence-based pytania dla par, rodzin, zespołów i przyjaciół.',
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Helmet>
        <title>Pogłębiarki — karty do pogłębienia relacji</title>
        <meta name="description" content="200+ pytań opartych o badania naukowe. 8 obszarów życia, 5 poziomów głębokości, 10 trybów gry. Rozmowy, które naprawdę zbliżają." />
        <meta property="og:title" content="Pogłębiarki — karty do pogłębienia relacji" />
        <meta property="og:description" content="200+ pytań opartych o badania naukowe. 8 obszarów życia, 5 poziomów głębokości. Rozmowy, które naprawdę zbliżają." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://poglebiarki.pl" />
        <meta property="og:image" content="https://poglebiarki.pl/images/og-cover.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pogłębiarki — karty do pogłębienia relacji" />
        <meta name="twitter:description" content="200+ pytań opartych o badania naukowe. 8 obszarów życia, 5 poziomów głębokości." />
        <link rel="canonical" href="https://poglebiarki.pl" />
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>
      <ScrollProgress color="#6366f1" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
        <div className="gradient-mesh">
          <div className="mesh-blob-1" />
          <div className="mesh-blob-2" />
          <div className="mesh-blob-3" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="flex items-center gap-3 mb-6">
            <Waves className="w-10 h-10 text-blue-400" />
            <span className="text-blue-400 font-semibold text-lg">Pogłębiarki</span>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Pytania, które otwierają<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              najważniejsze rozmowy
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            200+ kart z pytaniami opartymi na badaniach naukowych. 5 poziomów głębokości.
            8 obszarów życia. Każda karta ma QR kod → kontekst naukowy, ciekawostka, badanie.
            Gra karciana, która zmienia jakość Twoich relacji.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#produkty" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-lg transition-colors">
              Zobacz produkty <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/cards" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-lg transition-colors border border-white/20">
              Przeglądaj karty <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Hero images */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <img src="/images/card-front-view.png" alt="Karta Pogłębiarki — front" className="rounded-2xl shadow-2xl w-full object-cover h-64" />
            <img src="/images/cards-fan.png" alt="Karty rozłożone wachlarzem" className="rounded-2xl shadow-2xl w-full object-cover h-64" />
            <img src="/images/cards-in-play.png" alt="Karty w grze przy kawie" className="rounded-2xl shadow-2xl w-full object-cover h-64" />
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: `${cards.length}+`, label: 'pytań z kontekstem naukowym' },
              { value: '5', label: 'poziomów głębokości' },
              { value: '8', label: 'obszarów życia' },
              { value: '10', label: 'trybów rozgrywki' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Dlaczego rozmowy są płytkie?</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Badania Kardas et al. (2022, Journal of Personality and Social Psychology) wykazały,
            że ludzie <strong>systematycznie niedoceniają</strong>, jak bardzo inni chcą prowadzić
            głębokie rozmowy. Boimy się pójść głębiej — i ta obawa jest bezpodstawna.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-2xl bg-red-50 border border-red-100">
              <h3 className="text-xl font-bold text-red-700 mb-4">Bez Pogłębiarek</h3>
              <ul className="space-y-3 text-red-700/80">
                {[
                  '„Jak było w szkole?" — „Dobrze."',
                  'Scrollowanie telefonów przy kolacji',
                  'Small talk na szkoleniu — i zapomnienie po tygodniu',
                  'Retrospektywa z tymi samymi 3 pytaniami',
                  '10 lat razem i nie wiesz, czego się partner boi',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-green-50 border border-green-100">
              <h3 className="text-xl font-bold text-green-700 mb-4">Z Pogłębiarkami</h3>
              <ul className="space-y-3 text-green-700/80">
                {[
                  'Pytanie, które otwiera 30-minutową rozmowę',
                  'Kontekst naukowy pod QR — „o, nie wiedziałam!"',
                  'Uczestnicy ćwiczą po szkoleniu — transfer learning',
                  'Retro, które naprawdę otwiera ludzi',
                  '5 poziomów głębokości — Ty decydujesz o tempie',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 BENEFITS ── */}
      <section className="py-20 px-6" id="korzysci">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">10 powodów, by sięgnąć głębiej</h2>
            <p className="text-lg text-slate-500">Każdy powód oparty o badania i sprawdzony na szkoleniach.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — QR FLOW ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jak działa karta?</h2>
            <p className="text-lg text-slate-500">Od pytania do głębokiej rozmowy — w 4 krokach.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Wylosuj kartę', desc: 'Potasuj talię, wyciągnij kartę. Przeczytaj pytanie na głos.', color: '#4caf50' },
              { step: '2', title: 'Odpowiedz', desc: 'Ty lub osoba obok odpowiada. Każdy poziom głębokości = inna odwaga.', color: '#2196f3' },
              { step: '3', title: 'Zeskanuj QR', desc: 'Pod QR kodem: ciekawostka, badanie naukowe, know-how, zastosowanie.', color: '#ff9800' },
              { step: '4', title: 'Pogłębiaj', desc: 'Follow-up questions prowadzą dalej. Rozmowa nabiera głębi naturalnie.', color: '#f44336' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Example card content */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: '#ec407a22', color: '#ec407a' }}>
                Randki — Poziom 3
              </div>
              <div className="flex gap-1 ml-auto">
                {[1, 2, 3, 4, 5].map((d) => (
                  <div key={d} className="w-6 h-1.5 rounded-full" style={{ backgroundColor: d <= 3 ? '#ffc107' : '#e2e8f0' }} />
                ))}
              </div>
            </div>
            <p className="text-xl font-semibold mb-6">„Co jest dla Ciebie najtrudniejsze w otwieraniu się przed nową osobą?"</p>
            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-blue-50">
                <div className="font-bold text-blue-700 mb-1">🔬 Badanie</div>
                <p className="text-blue-600">Social Penetration Theory (Altman & Taylor, 1973) — odsłanianie siebie to proces warstwowy. Tempo musi być wzajemne.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50">
                <div className="font-bold text-amber-700 mb-1">💡 Ciekawostka</div>
                <p className="text-amber-600">Ludzie, którzy odsłaniają się za szybko, są oceniani jako mniej stabilni. Ale ci, którzy się nie odsłaniają wcale — jako zimni. Złoty środek: wzajemne, stopniowe otwieranie.</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50">
                <div className="font-bold text-green-700 mb-1">🛠 Know-how</div>
                <p className="text-green-600">Zacznij od dzielenia się obserwacjami, potem opiniami, potem uczuciami. Ten porządek jest naturalny i buduje zaufanie.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 AREAS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">8 obszarów — 8 kontekstów</h2>
            <p className="text-lg text-slate-500">Każdy obszar ma swój kolor, wzorzec graficzny i dedykowane pytania.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areas.map((area) => {
              const meta = AREA_META[area]
              const count = cards.filter((c) => c.area === area).length
              return (
                <div
                  key={area}
                  className="p-6 rounded-2xl border-2 text-center hover:shadow-lg transition-all cursor-pointer group"
                  style={{ borderColor: meta.color + '30', backgroundColor: meta.color + '06' }}
                >
                  <div className="mb-3">
                    <AreaIcon area={area} className="w-10 h-10 mx-auto" color={meta.color} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: meta.color }}>{meta.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-3">{meta.description}</p>
                  <div className="text-sm font-semibold" style={{ color: meta.color }}>{count} kart</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DEPTH LEVELS ── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">5 poziomów głębokości</h2>
            <p className="text-lg text-slate-500">Social Penetration Theory (Altman & Taylor, 1973) — od powierzchni do rdzenia.</p>
          </div>
          <img src="/images/cards-depth-spread.png" alt="5 poziomów głębokości" className="rounded-2xl shadow-lg w-full max-w-2xl mx-auto mb-12" />
          <div className="space-y-4">
            {([1, 2, 3, 4, 5] as Depth[]).map((d) => {
              const meta = DEPTH_META[d]
              const width = 20 + d * 16
              return (
                <div key={d} className="flex items-center gap-6">
                  <div
                    className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: meta.color }}
                  >
                    {d}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">{meta.label}</h3>
                    </div>
                    <p className="text-sm text-slate-500">{meta.description}</p>
                    <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${width}%`, backgroundColor: meta.color }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW TO PLAY — PER PERSONA ── */}
      <section className="py-20 px-6" id="jak-grac">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jak grać? Zależy kim jesteś</h2>
            <p className="text-lg text-slate-500">8 person — 8 sposobów na grę. Znajdź swój.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PERSONAS.map((persona) => {
              const Icon = persona.icon
              return (
                <div
                  key={persona.id}
                  className="p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: persona.color + '15' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: persona.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{persona.title}</h3>
                      <div className="flex gap-1 mt-1">
                        {persona.areas.map((a) => (
                          <span
                            key={a}
                            className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                            style={{ backgroundColor: AREA_META[a].color + '18', color: AREA_META[a].color }}
                          >
                            {AREA_META[a].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {persona.howToPlay.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="font-bold shrink-0" style={{ color: persona.color }}>{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 rounded-xl bg-slate-50 text-sm">
                    <span className="font-semibold">💡 Tip:</span>{' '}
                    <span className="text-slate-600">{persona.tip}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCT LINES (LEGO) ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white" id="produkty">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Buduj jak klocki LEGO</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Zacznij od jednego obszaru. Dokładaj kolejne. Każdy produkt działa samodzielnie i razem z innymi.
            </p>
          </div>

          {/* Product gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <img src="/images/box-start.png" alt="Pogłębiarki START" className="rounded-xl shadow-lg w-full object-cover h-48" />
            <img src="/images/box-obszar-randki.png" alt="Pogłębiarki OBSZAR Randki" className="rounded-xl shadow-lg w-full object-cover h-48" />
            <img src="/images/box-komplet.png" alt="Pogłębiarki KOMPLET" className="rounded-xl shadow-lg w-full object-cover h-48" />
            <img src="/images/product-family.png" alt="Cała rodzina produktów" className="rounded-xl shadow-lg w-full object-cover h-48" />
          </div>

          {/* LEGO flow visualization */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PRODUCT_LINES.filter((p) => p.id !== 'komplet' && p.id !== 'corporate').map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.icon} {p.name.replace('Pogłębiarki ', '')}
                </div>
                {i < 3 && <span className="text-slate-500">+</span>}
              </div>
            ))}
            <span className="text-slate-500 self-center mx-2">=</span>
            <div className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-red-500 to-purple-500 text-white">
              🔴 KOMPLET
            </div>
          </div>

          {/* Product cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_LINES.map((product) => (
              <div
                key={product.id}
                className={`relative p-6 rounded-2xl border-2 bg-white/5 backdrop-blur-sm transition-all hover:scale-[1.02] ${
                  product.id === 'komplet' ? 'md:col-span-2 lg:col-span-1 ring-2 ring-yellow-500/50' : ''
                }`}
                style={{ borderColor: product.color + '60' }}
              >
                {product.badge && (
                  <div
                    className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="text-3xl mb-3">{product.icon}</div>
                <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{product.subtitle}</p>
                <div className="text-3xl font-bold mb-4" style={{ color: product.color }}>
                  {product.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {product.contents.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: product.color }} />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                {product.buildsOn && (
                  <div className="text-xs text-slate-500 mt-auto">
                    Wymaga: {PRODUCT_LINES.find((p) => p.id === product.buildsOn)?.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">10 scenariuszy użycia</h2>
            <p className="text-lg text-slate-500">Sprawdzone konteksty, w których Pogłębiarki robią różnicę.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => (
              <div key={uc.id} className="p-5 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-bold mb-1">{uc.title}</h3>
                <div className="text-xs text-slate-500 mb-3">{uc.target} · {uc.context}</div>
                <p className="text-sm text-slate-600 mb-3">{uc.description.slice(0, 120)}...</p>
                <div className="flex flex-wrap gap-1">
                  {uc.recommendedAreas.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      style={{ backgroundColor: AREA_META[a].color + '18', color: AREA_META[a].color }}
                    >
                      {AREA_META[a].label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENCE SECTION ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Oparte na badaniach</h2>
          <p className="text-lg text-slate-500 mb-12">
            Nie wymyślamy pytań „na kolanie". Każde pytanie ma kontekst naukowy.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'Arthur Aron (1997)',
                body: '36 pytań, które budują bliskość. Procedura eskalacji — od powierzchni do głębi w 45 minut. Replikowana w 20+ badaniach.',
                tag: 'Fundament',
              },
              {
                title: 'Altman & Taylor (1973)',
                body: 'Social Penetration Theory — model cebuli. Relacje pogłębiają się warstwowo: fakty → opinie → uczucia → rdzeń tożsamości.',
                tag: 'Model głębokości',
              },
              {
                title: 'Kardas et al. (2022)',
                body: 'Ludzie CHCĄ głębokich rozmów, ale MYŚLĄ, że inni nie chcą. Illusion of shallow preference. Pogłębiarki przełamują tę barierę.',
                tag: 'Mechanizm',
              },
            ].map((study) => (
              <div key={study.title} className="p-6 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-bold text-blue-600 mb-2">{study.tag}</div>
                <h3 className="font-bold mb-2">{study.title}</h3>
                <p className="text-sm text-slate-500">{study.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Co mówią uczestnicy</h2>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Pytania i odpowiedzi</h2>
          <div className="space-y-6">
            {[
              { q: 'Dla jakiego wieku są Pogłębiarki?', a: 'Od 14 lat wzwyż. Karty poziomu 1-2 działają od 12 lat. Karty poziomu 4-5 wymagają dojrzałości emocjonalnej.' },
              { q: 'Czy mogę używać na szkoleniach komercyjnych?', a: 'Tak — zestaw PRO i KOMPLET zawierają licencję na użycie w kontekście szkoleniowym. CORPORATE daje pełny branding.' },
              { q: 'Ile osób może grać jednocześnie?', a: 'Od 2 (Ping-Pong, Lustro) do 20 (Kolory, Speed Round). 10 trybów gry pokrywa każdą wielkość grupy.' },
              { q: 'Co jest pod QR kodem?', a: 'Strona z tytułem naukowym, źródłem badania, ciekawostką, praktycznym know-how i pytaniami pogłębiającymi. Ok. 0.5-1 strony A4.' },
              { q: 'Czy mogę dokupić kolejne obszary osobno?', a: 'Tak — to model LEGO. Zaczynasz od START (1 obszar), dokładasz OBSZAR packs (39 zł/szt). Zbieraj to, czego potrzebujesz.' },
              { q: 'Czy pytania się powtarzają w różnych zestawach?', a: 'Nie. Każdy OBSZAR ma unikalne 25 pytań. GŁĘBIA dodaje 40 nowych pytań poziomu 4-5.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/50 to-slate-900 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Darmowy zestaw startowy
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Odbierz 10 kart z kontekstem naukowym</h2>
          <p className="text-slate-300 mb-8">
            Zapisz się do newslettera i otrzymaj mini-przewodnik głębokich rozmów + 10 próbnych kart — za darmo.
          </p>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105"
          >
            Zapisz się i odbierz zestaw <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-sm mt-4">Zero spamu · Wypisz się w 1 kliknięciu</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Gotowy, by pogłębić rozmowy?</h2>
          <p className="text-xl text-blue-100 mb-10">
            200+ pytań opartych na badaniach. 5 poziomów. 8 obszarów. 10 trybów gry.
            Jedno pudełko zmienia jakość Twoich relacji.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#produkty" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors">
              Zobacz produkty <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/cards" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              Przeglądaj karty za darmo <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  )
}
