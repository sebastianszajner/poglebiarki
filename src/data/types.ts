export type Area = 'praca' | 'imprezy' | 'relacje' | 'randki' | 'rodzicielstwo' | 'szkola' | 'zespol' | 'sasiedzi' | 'przedszkole';
export type Depth = 1 | 2 | 3 | 4 | 5;

export interface Card {
  id: string;
  question: string;
  area: Area;
  depth: Depth;
  science: {
    title: string;
    body: string;
    source: string;
    followUp: string[];
    ciekawostka?: string;
    badanie?: string;
    knowHow?: string;
    zastosowanie?: string;
  };
}

export interface ProductLine {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  color: string;
  icon: string;
  contents: string[];
  buildsOn: string | null;
  badge?: string;
}

export const PRODUCT_LINES: ProductLine[] = [
  {
    id: 'start',
    name: 'Pogłębiarki START',
    subtitle: 'Twój pierwszy krok w głąb',
    price: '49 zł',
    color: '#4caf50',
    icon: '🟢',
    contents: ['1 obszar do wyboru (25 kart)', '3 tryby gry (instrukcja)', 'QR kody → kontekst naukowy', 'Pudełko kieszonkowe'],
    buildsOn: null,
    badge: 'Na start',
  },
  {
    id: 'obszar',
    name: 'Pogłębiarki OBSZAR',
    subtitle: 'Rozszerzenie — nowy kontekst',
    price: '39 zł / szt.',
    color: '#2196f3',
    icon: '🔵',
    contents: ['1 dodatkowy obszar (25 kart)', 'Kompatybilny ze START', '8 obszarów do wyboru', 'Zbieraj jak klocki'],
    buildsOn: 'start',
  },
  {
    id: 'tryby',
    name: 'Pogłębiarki TRYBY',
    subtitle: '10 sposobów na grę',
    price: '29 zł',
    color: '#ffc107',
    icon: '🟡',
    contents: ['10 kart z trybami gry', 'Żetony do punktacji', 'Karta timera', 'Facilitation guide'],
    buildsOn: 'start',
  },
  {
    id: 'glebia',
    name: 'Pogłębiarki GŁĘBIA',
    subtitle: 'Dla odważnych — poziom 4 i 5',
    price: '59 zł',
    color: '#ff9800',
    icon: '🟠',
    contents: ['40 dodatkowych kart (poz. 4-5)', 'Ze wszystkich 8 obszarów', 'Wymaga zaufania w grupie', 'Materiał na Głębokie Nurkowanie'],
    buildsOn: 'obszar',
  },
  {
    id: 'komplet',
    name: 'Pogłębiarki KOMPLET',
    subtitle: 'Wszystko w jednym pudełku',
    price: '249 zł',
    color: '#f44336',
    icon: '🔴',
    contents: ['Wszystkie 8 obszarów (200+ kart)', '10 trybów gry + żetony', 'Karty głębi (poz. 4-5)', 'Premium pudełko z przegródkami', 'Facilitation guide (drukowany)'],
    buildsOn: null,
    badge: 'Bestseller',
  },
  {
    id: 'corporate',
    name: 'Pogłębiarki CORPORATE',
    subtitle: 'Branded dla Twojej firmy',
    price: 'od 499 zł',
    color: '#263238',
    icon: '⚫',
    contents: ['Pełny zestaw KOMPLET', 'Logo firmy na kartach i pudełku', '10 custom pytań (Twoje wartości)', 'Facilitation guide dla managera', 'Raport z QR analytics'],
    buildsOn: null,
    badge: 'Dla firm',
  },
];

export interface GameMode {
  id: string;
  name: string;
  icon: string;
  players: string;
  duration: string;
  description: string;
  rules: string[];
  bestFor: Area[];
  maxDepth?: Depth;
  wodzirejInspiration: string;
}

export const AREA_META: Record<Area, {
  label: string;
  icon: string;
  color: string;
  colorLight: string;
  description: string;
  symbol: string;
  pattern: string;
  patternDescription: string;
}> = {
  praca: {
    label: 'Praca',
    icon: 'Compass',
    color: '#5c6bc0',
    colorLight: '#c5cae9',
    description: 'Rozmowy w kontekście zawodowym — zespół, spotkania, networking',
    symbol: 'compass',
    pattern: 'grid',
    patternDescription: 'Geometryczna siatka — nawigacja zawodowa',
  },
  imprezy: {
    label: 'Imprezy',
    icon: 'Zap',
    color: '#ab47bc',
    colorLight: '#e1bee7',
    description: 'Spotkania towarzyskie, eventy, luźne konteksty społeczne',
    symbol: 'zap',
    pattern: 'confetti',
    patternDescription: 'Konfetti — energia spotkania',
  },
  relacje: {
    label: 'Bliskie relacje',
    icon: 'HeartHandshake',
    color: '#ef5350',
    colorLight: '#ffcdd2',
    description: 'Przyjaźnie, głębokie więzi, relacje bliskie',
    symbol: 'heart-handshake',
    pattern: 'waves',
    patternDescription: 'Organiczne fale — głębia więzi',
  },
  randki: {
    label: 'Randki',
    icon: 'Flame',
    color: '#ec407a',
    colorLight: '#f8bbd0',
    description: 'Poznawanie się, budowanie romantycznej relacji',
    symbol: 'flame',
    pattern: 'curves',
    patternDescription: 'Delikatne krzywe — ciepło poznawania',
  },
  rodzicielstwo: {
    label: 'Rodzicielstwo',
    icon: 'TreePine',
    color: '#26a69a',
    colorLight: '#b2dfdb',
    description: 'Relacja rodzic-dziecko, rozmowy międzypokoleniowe',
    symbol: 'tree-pine',
    pattern: 'branches',
    patternDescription: 'Gałęzie i liście — wzrost i korzenie',
  },
  szkola: {
    label: 'Szkoła',
    icon: 'GraduationCap',
    color: '#42a5f5',
    colorLight: '#bbdefb',
    description: 'Kontekst edukacyjny — nauczyciel-uczeń, rówieśnicy, klasa',
    symbol: 'graduation-cap',
    pattern: 'books',
    patternDescription: 'Książki i strony — wiedza i edukacja',
  },
  zespol: {
    label: 'Zespół',
    icon: 'Users',
    color: '#7e57c2',
    colorLight: '#d1c4e9',
    description: 'Team-building, lider-zespół, współpraca projektowa',
    symbol: 'users',
    pattern: 'network',
    patternDescription: 'Połączone punkty — sieć współpracy',
  },
  sasiedzi: {
    label: 'Sąsiedzi',
    icon: 'Home',
    color: '#8d6e63',
    colorLight: '#d7ccc8',
    description: 'Relacje sąsiedzkie, wspólnota lokalna, osiedle',
    symbol: 'home',
    pattern: 'houses',
    patternDescription: 'Dachy domów — wspólnota lokalna',
  },
  przedszkole: {
    label: 'Przedszkole',
    icon: 'Baby',
    color: '#FF7043',
    colorLight: '#FFCCBC',
    description: 'Wyzwania rozwojowe przedszkolaka — etapy, emocje, lęki rodzica',
    symbol: 'baby',
    pattern: 'blocks',
    patternDescription: 'Klocki — budowanie fundamentów rozwoju',
  },
};

export const DEPTH_META: Record<Depth, { label: string; emoji: string; color: string; description: string }> = {
  1: {
    label: 'Lód',
    emoji: '1',
    color: '#4caf50',
    description: 'Fakty, preferencje — zero ryzyka emocjonalnego',
  },
  2: {
    label: 'Ciekawość',
    emoji: '2',
    color: '#2196f3',
    description: 'Opinie, wspomnienia, hobby — lekkie otwarcie',
  },
  3: {
    label: 'Otwartość',
    emoji: '3',
    color: '#ffc107',
    description: 'Doświadczenia, historie, wartości — osobiste terytorium',
  },
  4: {
    label: 'Bliskość',
    emoji: '4',
    color: '#ff9800',
    description: 'Emocje, przekonania, wrażliwość — zaufanie wymagane',
  },
  5: {
    label: 'Głębia',
    emoji: '5',
    color: '#f44336',
    description: 'Rdzeń tożsamości, autentyczność, bezbronność',
  },
};

export const GAME_MODES: GameMode[] = [
  {
    id: 'wheel',
    name: 'Koło Fortuny',
    icon: 'CircleDot',
    players: '4-8 osób',
    duration: '20-40 min',
    description: 'Losuj kartę, osoba po lewej odpowiada. Wariant "pickRemove" — kto odpowiedział, odpada z rundy.',
    rules: [
      'Potasuj talię wybranego obszaru',
      'Pierwsza osoba losuje kartę i czyta pytanie na głos',
      'Osoba po lewej odpowiada (max 2 minuty)',
      'Wariant PICK: losowa osoba odpowiada, może powtórzyć',
      'Wariant PICK-REMOVE: kto odpowiedział — odpada z rundy (każdy mówi raz)',
      'Po odpowiedzi — QR kod → kontekst naukowy i pytania pogłębiające',
    ],
    bestFor: ['imprezy', 'praca'],
    wodzirejInspiration: 'Wheel Panel — tryb pick/pickRemove z losowaniem uczestników',
  },
  {
    id: 'escalation',
    name: 'Eskalacja',
    icon: 'TrendingUp',
    players: '2-6 osób',
    duration: '45-90 min',
    description: 'Zacznij od poziomu 1. Każda runda — o jeden poziom głębiej. Procedura Arona w praktyce.',
    rules: [
      'Podziel karty na 5 stosów wg głębokości (1-5)',
      'Runda 1: Każdy losuje kartę z poziomu 1, odpowiada w parach (5 min)',
      'Runda 2: Poziom 2, nowe pary (7 min)',
      'Runda 3: Poziom 3, wracamy do pierwszych par (10 min)',
      'Runda 4-5: Poziomy 4-5, te same pary — budowanie zaufania (15 min)',
      'Zasada wzajemności: obaj odpowiadają na to samo pytanie',
    ],
    bestFor: ['relacje', 'randki'],
    wodzirejInspiration: 'Openness Levels (1-5) z IcebreakerPanel — stopniowa eskalacja',
  },
  {
    id: 'colors',
    name: 'Kolory',
    icon: 'Palette',
    players: '10-20 osób',
    duration: '30-60 min',
    description: 'Rozdaj karty losowo. Gracze grupują się po kolorze (obszarze). Wymiana kart między grupami.',
    rules: [
      'Rozdaj po 2 karty na osobę (losowo ze wszystkich obszarów)',
      'Runda 1: Gracze grupują się po kolorze karty',
      'W grupie — każdy odpowiada na swoje pytanie (po 2 min)',
      'Runda 2: Wymiana — oddaj 1 kartę do innej grupy, weź 1 od nich',
      'Runda 3: Grupy mieszane — nowe konstelacje z wymienionych kart',
      'Zamknięcie: Retro — co odkryłeś? (format SSC)',
    ],
    bestFor: ['praca', 'imprezy'],
    wodzirejInspiration: 'Groups Panel — generowanie grup z collision avoidance + Retro Panel (SSC)',
  },
  {
    id: 'depth-challenge',
    name: 'Wyzwanie Głębi',
    icon: 'Trophy',
    players: '4-10 osób',
    duration: '30-45 min',
    description: 'Gamifikacja — każdy ma żetony. Głębsze karty = więcej punktów, ale więcej odwagi.',
    rules: [
      'Każdy gracz dostaje 5 żetonów na start',
      'Losuj kartę z talii (mieszane poziomy)',
      'Decyzja: ODPOWIADAM (+punkty = numer poziomu) lub PASUJĘ (-1 żeton)',
      'Level 5 = 5 punktów. Level 1 = 1 punkt',
      'Zasada: Nie oceniamy odpowiedzi. Odwaga = nagroda',
      'Koniec po 5 rundach. Najwięcej punktów wygrywa',
      'Bonus: Kto odpowie na 3 karty poziomu 4-5 → tytuł "Pogłębiarz"',
    ],
    bestFor: ['imprezy', 'praca'],
    wodzirejInspiration: 'Scoring Panel — punkty za aktywności + emoji + leaderboard',
  },
  {
    id: 'ping-pong',
    name: 'Ping-Pong',
    icon: 'ArrowLeftRight',
    players: '2 osoby',
    duration: '30-60 min',
    description: 'Dwójka naprzeciwko siebie. Ta sama karta — obaj odpowiadają. Wzajemne odsłanianie.',
    rules: [
      'Usiądźcie naprzeciwko siebie',
      'Osoba A losuje kartę, czyta pytanie na głos',
      'Osoba A odpowiada pierwsza (90 sekund)',
      'Osoba B odpowiada na TO SAMO pytanie (90 sekund)',
      'Zeskanujcie QR → przeczytajcie kontekst naukowy razem',
      'Pytanie pogłębiające (follow-up) → ponownie obaj',
      'Po 2 kartach — osoba B losuje następną',
    ],
    bestFor: ['randki', 'relacje'],
    wodzirejInspiration: 'Queue Panel — kolejka mówców z timerem per osoba',
  },
  {
    id: 'retro',
    name: 'Retrospekcja',
    icon: 'RotateCcw',
    players: '3-12 osób',
    duration: '15-20 min',
    description: 'Zamknięcie po grze. Refleksja: co odkryłem, czego się nauczyłem, co chcę zmienić.',
    rules: [
      'Po zakończeniu głównej gry — runda refleksyjna',
      'Format SSC: Co chcę ZACZĄĆ mówić? / Co chcę PRZESTAĆ robić w rozmowach? / Co KONTYNUOWAĆ?',
      'LUB Format 4L: Liked / Learned / Lacked / Longed for',
      'Każdy dzieli się jednym punktem z każdej kategorii',
      'Opcjonalnie: głosowanie na najciekawsze spostrzeżenie',
      'Zamknięcie: jedno zdanie „zabieram stąd..."',
    ],
    bestFor: ['praca', 'relacje', 'rodzicielstwo'],
    wodzirejInspiration: 'Retro Panel — formaty SSC, GSM, 4L z głosowaniem',
  },
  {
    id: 'speed-round',
    name: 'Speed Round',
    icon: 'Timer',
    players: '6-15 osób',
    duration: '10-15 min',
    description: 'Szybkie odpowiedzi, 30 sekund na pytanie. Idealny energizer na początek spotkania lub szkolenia.',
    rules: [
      'Stań w kręgu — karty głębokości 1-2 (bezpieczne)',
      'Losuj kartę i czytaj na głos — odpowiadasz NATYCHMIAST',
      'Max 30 sekund na odpowiedź — ktoś odlicza',
      'Jak skończysz — podaj kartę osobie po prawej, ta losuje nową',
      'Kto się zacina? Grupa skanduje „PO-GŁĘBIAJ!" i daje 10 sek bonusu',
      'Koniec po 2 pełnych rundach lub 15 minutach',
    ],
    bestFor: ['imprezy', 'praca', 'zespol'],
    wodzirejInspiration: 'Timer Panel — countdown per osoba + Quick Round z Wheel',
  },
  {
    id: 'deep-dive',
    name: 'Głębokie Nurkowanie',
    icon: 'Anchor',
    players: '2-4 osoby',
    duration: '60-90 min',
    description: 'Tylko karty poziomu 4-5. Dla bliskich osób, które chcą pogłębić relację. Wymaga zaufania.',
    rules: [
      'Wybierzcie obszar, który Was interesuje',
      'Przygotujcie przestrzeń — bez telefonów, cicho, wygodnie',
      'Losujcie TYLKO karty z poziomu 4 i 5',
      'Każda osoba ma tyle czasu, ile potrzebuje (bez limitu)',
      'Zasada Las Vegas: co tu powiedziane, tu zostaje',
      'Po każdej karcie — 2 minuty ciszy na refleksję, potem follow-up',
    ],
    bestFor: ['relacje', 'randki', 'rodzicielstwo'],
    maxDepth: 5,
    wodzirejInspiration: 'Deep Mode — wyłączony timer, pełna przestrzeń na odpowiedź',
  },
  {
    id: 'explorer',
    name: 'Odkrywca',
    icon: 'Map',
    players: '3-8 osób',
    duration: '30-45 min',
    description: 'Losuj kartę z DOWOLNEGO obszaru — odkrywaj nowe tematy. Każda runda to nowy kontekst.',
    rules: [
      'Potasuj WSZYSTKIE karty ze wszystkich obszarów razem',
      'Losuj kartę — nie wiesz, jaki obszar wypadnie',
      'Przeczytaj pytanie na głos — wszyscy odpowiadają po kolei (1 min każdy)',
      'Kolor karty = niespodzianka. Praca? Randki? Rodzicielstwo? Losowo!',
      'Po 3 kartach — głosowanie: „Który obszar chcecie pogłębić?"',
      'Ostatnie 3 karty — tylko z wybranego obszaru, głębokość 3+',
    ],
    bestFor: ['imprezy', 'zespol', 'szkola'],
    wodzirejInspiration: 'Random Category z IcebreakerPanel — cross-area discovery',
  },
  {
    id: 'mirror',
    name: 'Lustro',
    icon: 'Scan',
    players: '2 osoby',
    duration: '45-60 min',
    description: 'Dwie osoby odpowiadają na to samo pytanie, potem porównują odpowiedzi. Wzajemne odkrywanie przez kontrast.',
    rules: [
      'Usiądźcie naprzeciwko siebie — kontakt wzrokowy',
      'Osoba A losuje kartę, czyta pytanie, ale NIE odpowiada od razu',
      'Obie osoby piszą odpowiedź na kartce (2 min) — bez konsultacji',
      'Odkryjcie odpowiedzi jednocześnie — przeczytajcie na głos',
      'Porównajcie: co Was zaskoczyło? Gdzie się różnicie? Gdzie jesteście podobni?',
      'Zeskanujcie QR → przeczytajcie kontekst naukowy i follow-up razem',
    ],
    bestFor: ['randki', 'relacje'],
    wodzirejInspiration: 'Reciprocal Self-Disclosure (Aron, 1997) — wzajemność buduje bliskość',
  },
];

// ============================================================
// USE CASES
// ============================================================

export interface UseCase {
  id: string;
  title: string;
  target: string;
  context: string;
  description: string;
  recommendedAreas: Area[];
  recommendedModes: string[];
  tips: string[];
}

export const USE_CASES: UseCase[] = [
  {
    id: 'team-integration',
    title: 'Integracja zespołu',
    target: 'Trener / HR prowadzący integrację',
    context: 'Szkolenie, warsztat, offsite firmowy (8-20 osób)',
    description: 'Pogłębiarki jako narzędzie integracyjne. Zaczynasz od bezpiecznych kart (poziom 1-2), stopniowo eskalujesz. Idealne na przełamanie pierwszego lodu i budowanie zaufania w zespole.',
    recommendedAreas: ['praca', 'zespol', 'imprezy'],
    recommendedModes: ['wheel', 'colors', 'speed-round'],
    tips: [
      'Nie przekraczaj poziomu 3 na pierwszym spotkaniu — zaufanie rośnie stopniowo',
      'Tryb Kolory świetnie działa na mieszanie podgrup i przełamywanie silosów',
      'Zakończ Retrospekcją — format SSC daje zamknięcie i refleksję',
      'Przygotuj karty zapasowe z poziomu 1 na wypadek oporu grupy',
    ],
  },
  {
    id: 'date-night',
    title: 'Wieczór we dwoje',
    target: 'Para na randce lub w stałym związku',
    context: 'Kolacja, wieczór w domu, podróż (2 osoby)',
    description: 'Pogłębiarki jako katalizator rozmowy w parze. Zamiast scrollować telefony — losujecie karty i poznajesz partnera od nowa. Nawet po 10 latach razem.',
    recommendedAreas: ['randki', 'relacje'],
    recommendedModes: ['ping-pong', 'escalation', 'mirror', 'deep-dive'],
    tips: [
      'Zacznij od poziomu 1-2 jako rozgrzewkę, nawet jeśli dobrze się znacie',
      'Tryb Lustro daje fascynujące efekty — zapisujecie odpowiedzi, potem porównujecie',
      'Nie oceniaj odpowiedzi partnera — słuchaj z ciekawością',
      'Jedno pytanie pogłębiające (follow-up) potrafi otworzyć godzinną rozmowę',
    ],
  },
  {
    id: 'family-dinner',
    title: 'Kolacja rodzinna',
    target: 'Rodzina (rodzice + dzieci)',
    context: 'Kolacja, weekend, wakacje, długa podróż samochodem',
    description: 'Pogłębiarki jako alternatywa dla „jak było w szkole? — dobrze". Karty dają konkretne pytania, które otwierają prawdziwą rozmowę między pokoleniami.',
    recommendedAreas: ['rodzicielstwo', 'szkola', 'relacje'],
    recommendedModes: ['wheel', 'ping-pong', 'explorer'],
    tips: [
      'Dzieci odpowiadają na karty poziomu 1-2, rodzice na 2-3',
      'Zasada: rodzic też odpowiada! Dzieci uwielbiają słyszeć historie rodziców',
      'Tryb Odkrywca — losowy obszar sprawia, że każdy ma „swoje" pytanie',
      'Nie poprawiaj odpowiedzi dziecka — każda odpowiedź jest dobra',
    ],
  },
  {
    id: 'workshop-opener',
    title: 'Otwarcie warsztatu',
    target: 'Facilitator, trener',
    context: 'Początek warsztatu lub szkolenia (5-15 min, energizer)',
    description: 'Pogłębiarki jako icebreaker na starcie. Szybkie, angażujące, z nutą nauki. Uczestnicy poznają się i wchodzą w „tryb otwartości".',
    recommendedAreas: ['praca', 'zespol', 'imprezy'],
    recommendedModes: ['speed-round', 'wheel', 'colors'],
    tips: [
      'Speed Round — 30 sekund na odpowiedź, energia od pierwszej minuty',
      'Używaj TYLKO kart poziomu 1 — bezpiecznie, szybko, bez ryzyka',
      'Dobierz obszar do tematyki szkolenia (praca → praca, soft skills → relacje)',
      'Po ice-breakerze pokaż QR kod jednej karty — „nauka za pytaniem" robi wrażenie',
    ],
  },
  {
    id: 'friendship-deepener',
    title: 'Pogłębianie przyjaźni',
    target: 'Grupa przyjaciół (3-8 osób)',
    context: 'Domówka, wyjazd weekendowy, impreza urodzinowa',
    description: 'Pogłębiarki zamiast kolejnej gry w „Prawda czy wyzwanie". Prawdziwe pytania, prawdziwe odpowiedzi, prawdziwe połączenie.',
    recommendedAreas: ['relacje', 'imprezy'],
    recommendedModes: ['depth-challenge', 'escalation', 'explorer'],
    tips: [
      'Wyzwanie Głębi dodaje element gamifikacji — kto odważy się na poziom 5?',
      'Nie zmuszaj nikogo — „PASUJĘ" jest zawsze OK (kosztuje tylko żeton)',
      'Alkohol + karty powyżej poziomu 3 = ryzyko. Bądź mądry.',
      'Zamknij Retrospekcją — „co zabieram z dzisiejszego wieczoru?"',
    ],
  },
  {
    id: 'coaching-session',
    title: 'Sesja coachingowa',
    target: 'Coach, terapeuta, mentor',
    context: 'Sesja indywidualna 1:1 (45-60 min)',
    description: 'Pogłębiarki jako narzędzie coachingowe. Karta losowa otwiera temat, kontekst naukowy daje ramę, follow-up pogłębia eksplorację.',
    recommendedAreas: ['relacje', 'praca', 'rodzicielstwo'],
    recommendedModes: ['deep-dive', 'ping-pong'],
    tips: [
      'Losowa karta = „co przynosi pole" — klient wybiera, nie coach',
      'Kontekst naukowy (QR) normalizuje temat — „badania pokazują, że to powszechne"',
      'Follow-up questions to gotowe pogłębiacze — nie musisz wymyślać',
      'Używaj kart poziomu 4-5 z obszaru, nad którym klient pracuje',
    ],
  },
  {
    id: 'onboarding',
    title: 'Onboarding nowego pracownika',
    target: 'Manager, buddy, HR',
    context: 'Pierwszy tydzień nowego pracownika w zespole',
    description: 'Pogłębiarki przyspieszają budowanie relacji. Nowy człowiek poznaje zespół nie przez prezentację PowerPoint, ale przez prawdziwe rozmowy.',
    recommendedAreas: ['praca', 'zespol'],
    recommendedModes: ['wheel', 'speed-round', 'explorer'],
    tips: [
      'Karty poziomu 1-2 z obszaru „praca" i „zespół" — bezpiecznie i profesjonalnie',
      'Cały zespół odpowiada razem z nową osobą — to nie przesłuchanie',
      'Speed Round na porannym stand-upie — 1 karta dziennie przez pierwszy tydzień',
      'Po tygodniu — karta poziomu 3: „Co w naszym zespole Cię zaskoczyło?"',
    ],
  },
  {
    id: 'neighborhood-event',
    title: 'Spotkanie sąsiedzkie',
    target: 'Organizator spotkań lokalnych, rada osiedla',
    context: 'Festyn, grill sąsiedzki, zebranie wspólnoty (10-30 osób)',
    description: 'Pogłębiarki łamią barierę anonimowości w bloku. Sąsiedzi, którzy mijali się latami, zaczynają rozmawiać naprawdę.',
    recommendedAreas: ['sasiedzi', 'imprezy'],
    recommendedModes: ['wheel', 'colors', 'speed-round'],
    tips: [
      'Zacznij od kart „sąsiedzi" poziomu 1 — „Jak długo tu mieszkasz?"',
      'Tryb Kolory świetnie miesza grupy — sąsiedzi z różnych klatek/pięter',
      'Przygotuj karty dużym drukiem — na zewnątrz trudniej czytać',
      'Nie forsuj głębokości — po pierwszym spotkaniu będą chcieli więcej',
    ],
  },
  {
    id: 'classroom',
    title: 'Lekcja w klasie',
    target: 'Nauczyciel (uczniowie 14-18 lat)',
    context: 'Godzina wychowawcza, zajęcia integracyjne, początek roku szkolnego',
    description: 'Pogłębiarki jako narzędzie nauczyciela. Pytania dostosowane do kontekstu szkolnego, kontekst naukowy buduje ciekawość, format karciany angażuje młodzież.',
    recommendedAreas: ['szkola', 'relacje'],
    recommendedModes: ['speed-round', 'depth-challenge', 'explorer'],
    tips: [
      'Karty poziomu 1-2 — bezpieczne, nie wymagają odsłaniania prywatności',
      'Wyzwanie Głębi — gamifikacja motywuje nastolatków bardziej niż „porozmawiajmy"',
      'Kontekst naukowy (QR) łączy zabawę z nauką — bonus edukacyjny',
      'Nigdy nie zmuszaj do odpowiedzi — „pas" jest zawsze OK w klasie',
    ],
  },
  {
    id: 'self-reflection',
    title: 'Refleksja indywidualna',
    target: 'Każdy — solo, dziennik, journaling',
    context: 'Wieczorna refleksja, podróż, czas dla siebie',
    description: 'Pogłębiarki w wersji solo. Losujesz kartę, odpowiadasz pisemnie w dzienniku. Kontekst naukowy poszerza perspektywę. Follow-up prowadzi głębiej.',
    recommendedAreas: ['relacje', 'praca', 'rodzicielstwo'],
    recommendedModes: ['deep-dive'],
    tips: [
      'Losuj 1 kartę dziennie — „pytanie dnia" jako rytuał wieczorny',
      'Pisz odpowiedź ręcznie — pisanie odręczne angażuje inne obwody niż klawiatura',
      'Przeczytaj kontekst naukowy PO napisaniu odpowiedzi — nie przed',
      'Po miesiącu przeczytaj swoje odpowiedzi — zauważysz wzorce',
    ],
  },
];
