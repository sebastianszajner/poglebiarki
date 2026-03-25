import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { cards } from '../data/cards'
import { AREA_META, DEPTH_META } from '../data/types'
import type { Area, Depth } from '../data/types'
import { ArrowLeft, Printer, Waves } from 'lucide-react'
import { AreaPattern } from '../components/AreaPattern'
import { AreaIcon } from '../components/AreaIcon'

const BASE_URL = 'https://poglebiarki.web.app'

export function PrintPage() {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)
  const [selectedDepth, setSelectedDepth] = useState<Depth | null>(null)
  const [showBack, setShowBack] = useState(false)

  const areas = Object.keys(AREA_META) as Area[]
  const depths = [1, 2, 3, 4, 5] as Depth[]

  const filtered = cards.filter((c) => {
    if (selectedArea && c.area !== selectedArea) return false
    if (selectedDepth && c.depth !== selectedDepth) return false
    return true
  })

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Controls — hidden on print */}
      <div className="no-print px-6 py-4 bg-slate-100 border-b flex flex-wrap items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
          <Waves className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold">Druk kart ({filtered.length})</h1>

        <div className="flex gap-2 ml-4">
          <select
            value={selectedArea || ''}
            onChange={(e) => setSelectedArea(e.target.value as Area || null)}
            className="px-3 py-1.5 border rounded text-sm"
          >
            <option value="">Wszystkie obszary</option>
            {areas.map((a) => (
              <option key={a} value={a}>{AREA_META[a].label}</option>
            ))}
          </select>
          <select
            value={selectedDepth || ''}
            onChange={(e) => setSelectedDepth(e.target.value ? Number(e.target.value) as Depth : null)}
            className="px-3 py-1.5 border rounded text-sm"
          >
            <option value="">Wszystkie poziomy</option>
            {depths.map((d) => (
              <option key={d} value={d}>Poziom {d}: {DEPTH_META[d].label}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm ml-4">
          <input type="checkbox" checked={showBack} onChange={(e) => setShowBack(e.target.checked)} />
          Rewersy
        </label>

        <button
          onClick={() => window.print()}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500"
        >
          <Printer className="w-4 h-4" />
          Drukuj
        </button>
      </div>

      {/* Print grid — 6 cards per A4 page (2 columns × 3 rows) */}
      <div className="p-[5mm]">
        <div className="grid grid-cols-2 gap-[3mm]" style={{ gridAutoRows: 'auto' }}>
          {filtered.map((card, index) => {
            const areaMeta = AREA_META[card.area]
            const depthMeta = DEPTH_META[card.depth]

            return (
              <div key={card.id}>
                {/* Front */}
                <div
                  className="relative overflow-hidden rounded-lg border border-slate-200"
                  style={{
                    width: '90mm',
                    height: '130mm',
                    padding: '5mm',
                    paddingLeft: '7mm',
                    display: 'flex',
                    flexDirection: 'column',
                    pageBreakInside: 'avoid',
                  }}
                >
                  {/* Background pattern */}
                  <AreaPattern area={card.area} depth={card.depth} />

                  {/* Top bar: area icon + label + depth */}
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <div
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold"
                      style={{ backgroundColor: areaMeta.color + '18', color: areaMeta.color }}
                    >
                      <AreaIcon area={card.area} className="w-3 h-3" />
                      {areaMeta.label}
                    </div>
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
                      style={{ backgroundColor: depthMeta.color + '18', color: depthMeta.color }}
                    >
                      {card.depth} {depthMeta.label}
                    </div>
                  </div>

                  {/* Depth indicator bar */}
                  <div className="relative z-10 flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <div
                        key={d}
                        className="h-1 flex-1 rounded-full"
                        style={{
                          backgroundColor: d <= card.depth ? depthMeta.color : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>

                  {/* Question */}
                  <div className="relative z-10 flex-1 flex items-center">
                    <p className="text-base font-semibold leading-relaxed text-slate-800">
                      {card.question}
                    </p>
                  </div>

                  {/* Bottom: QR + icon + ID */}
                  <div className="relative z-10 flex items-end justify-between mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-end gap-3">
                      <QRCodeSVG
                        value={`${BASE_URL}/card/${card.id}`}
                        size={48}
                        level="M"
                        bgColor="transparent"
                        fgColor={areaMeta.color}
                      />
                      <div className="text-[7px] text-slate-400 leading-tight mb-1">
                        Zeskanuj po<br />kontekst naukowy
                      </div>
                    </div>
                    <div className="text-right">
                      <AreaIcon area={card.area} className="w-5 h-5 ml-auto mb-1" color={areaMeta.color + '30'} />
                      <div className="text-[8px] text-slate-400 font-mono">{card.id}</div>
                    </div>
                  </div>

                  {/* Side depth stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2mm]"
                    style={{ backgroundColor: areaMeta.color }}
                  />

                  {/* Bottom depth stripe */}
                  <div
                    className="absolute left-0 right-0 bottom-0 h-[1.5mm]"
                    style={{ backgroundColor: depthMeta.color }}
                  />
                </div>

                {/* Back (optional) */}
                {showBack && (
                  <div
                    className="relative overflow-hidden rounded-lg border border-slate-200 flex flex-col items-center justify-center text-center mt-[2mm]"
                    style={{
                      width: '90mm',
                      height: '130mm',
                      padding: '8mm',
                      backgroundColor: areaMeta.color + '08',
                      pageBreakInside: 'avoid',
                    }}
                  >
                    <AreaPattern area={card.area} depth={3} />
                    <div className="relative z-10">
                      <AreaIcon area={card.area} className="w-16 h-16 mx-auto mb-4" color={areaMeta.color + '25'} />
                      <h3 className="text-xl font-bold mb-1" style={{ color: areaMeta.color }}>
                        Pogłębiarki
                      </h3>
                      <p className="text-xs text-slate-400 mb-6">{areaMeta.label}</p>
                      <div className="flex gap-1 justify-center">
                        {[1, 2, 3, 4, 5].map((d) => (
                          <div
                            key={d}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: DEPTH_META[d as Depth].color + '40' }}
                          />
                        ))}
                      </div>
                      <p className="text-[8px] text-slate-300 mt-6">
                        Zeskanuj QR na froncie karty
                      </p>
                    </div>
                  </div>
                )}

                {/* Page break every 6 cards */}
                {(index + 1) % 6 === 0 && <div className="print-break" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
