import { Link } from 'react-router-dom'
import { ArrowLeft, QrCode } from 'lucide-react'
import { QRBulkGenerator } from '../components/QRBulkGenerator'

export function QRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="px-6 py-4 flex items-center gap-4 border-b border-slate-700/50">
        <Link to="/app" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <QrCode className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Generator kodów QR</h1>
      </nav>

      <div className="py-4">
        <QRBulkGenerator />
      </div>
    </div>
  )
}
