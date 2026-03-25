import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CardPage } from './pages/CardPage'
import { PrintPage } from './pages/PrintPage'
import { AllCardsPage } from './pages/AllCardsPage'
import { GameModesPage } from './pages/GameModesPage'
import { LandingPage } from './pages/LandingPage'
import { ComparisonPage } from './pages/ComparisonPage'
import { PricingPage } from './pages/PricingPage'
import { RandomCardPage } from './pages/RandomCardPage'
import { StatsPage } from './pages/StatsPage'
import { GuidePage } from './pages/GuidePage'
import { UseCasesPage } from './pages/UseCasesPage'
import { DeckBuilderPage } from './pages/DeckBuilderPage'
import { InstagramPage } from './pages/InstagramPage'
import { QRPage } from './pages/QRPage'
import { NewsletterPage } from './pages/NewsletterPage'
import { TeamDiagnosticPage } from './pages/TeamDiagnosticPage'
import { ChallengePage } from './pages/ChallengePage'
import { CustomDeckPage } from './pages/CustomDeckPage'
import { TimerPage } from './pages/TimerPage'
import { ManagerToolkitPage } from './pages/ManagerToolkitPage'
import { BackToTop } from './components/BackToTop'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<HomePage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/cards" element={<AllCardsPage />} />
        <Route path="/print" element={<PrintPage />} />
        <Route path="/play" element={<GameModesPage />} />
        <Route path="/porownanie" element={<ComparisonPage />} />
        <Route path="/cennik" element={<PricingPage />} />
        <Route path="/losuj" element={<RandomCardPage />} />
        <Route path="/statystyki" element={<StatsPage />} />
        <Route path="/przewodnik" element={<GuidePage />} />
        <Route path="/zastosowania" element={<UseCasesPage />} />
        <Route path="/talia" element={<DeckBuilderPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/diagnostyka" element={<TeamDiagnosticPage />} />
        <Route path="/wyzwanie" element={<ChallengePage />} />
        <Route path="/deck/:encoded" element={<CustomDeckPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/menedzer" element={<ManagerToolkitPage />} />
      </Routes>
      <BackToTop />
    </>
  )
}

export default App
