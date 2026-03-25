import { useState, useMemo } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { cards } from '../data/cards'
import { AREA_META } from '../data/types'
import type { Area } from '../data/types'
import { Printer } from 'lucide-react'

const BASE_URL = 'https://poglebiarki.web.app'

export function QRBulkGenerator() {
  const [selectedArea, setSelectedArea] = useState<Area | ''>('')
  const areas = Object.keys(AREA_META) as Area[]

  const filtered = useMemo(() => {
    if (!selectedArea) return cards
    return cards.filter((c) => c.area === selectedArea)
  }, [selectedArea])

  return (
    <div className="p-6">
      <div className="no-print flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold">Generator QR kodów</h2>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value as Area | '')}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Wszystkie obszary ({cards.length})</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {AREA_META[a].label} ({cards.filter((c) => c.area === a).length})
            </option>
          ))}
        </select>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500"
        >
          <Printer className="w-4 h-4" />
          Drukuj QR kody
        </button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filtered.map((card) => {
          const meta = AREA_META[card.area]
          return (
            <div
              key={card.id}
              className="flex flex-col items-center p-3 border rounded-lg"
              style={{ borderColor: meta.color + '30' }}
            >
              <QRCodeSVG
                value={`${BASE_URL}/card/${card.id}`}
                size={80}
                level="M"
                bgColor="transparent"
                fgColor={meta.color}
              />
              <div className="mt-2 text-center">
                <div className="text-xs font-mono font-bold" style={{ color: meta.color }}>
                  {card.id}
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">
                  {meta.label} · Poz. {card.depth}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
