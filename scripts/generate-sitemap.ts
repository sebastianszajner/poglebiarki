/**
 * Sitemap generator for Pogłębiarki
 *
 * Usage: npx tsx scripts/generate-sitemap.ts
 * Output: public/sitemap.xml
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Import cards data — adjust path for script context
import { cards } from '../src/data/cards.js'

const BASE_URL = 'https://poglebiarki.pl'

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/app', priority: '0.8', changefreq: 'weekly' },
  { path: '/cards', priority: '0.9', changefreq: 'weekly' },
  { path: '/play', priority: '0.7', changefreq: 'monthly' },
  { path: '/cennik', priority: '0.8', changefreq: 'monthly' },
  { path: '/porownanie', priority: '0.6', changefreq: 'monthly' },
  { path: '/losuj', priority: '0.5', changefreq: 'daily' },
  { path: '/statystyki', priority: '0.4', changefreq: 'weekly' },
  { path: '/przewodnik', priority: '0.7', changefreq: 'monthly' },
  { path: '/zastosowania', priority: '0.7', changefreq: 'monthly' },
]

const today = new Date().toISOString().split('T')[0]

function buildSitemap(): string {
  const urls: string[] = []

  // Static routes
  for (const route of staticRoutes) {
    urls.push(`  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  }

  // Dynamic card routes
  for (const card of cards) {
    urls.push(`  <url>
    <loc>${BASE_URL}/card/${card.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sitemap = buildSitemap()
const outputPath = resolve(__dirname, '../public/sitemap.xml')

writeFileSync(outputPath, sitemap, 'utf-8')

console.log(`Sitemap generated: ${outputPath}`)
console.log(`  Static routes: ${staticRoutes.length}`)
console.log(`  Card routes: ${cards.length}`)
console.log(`  Total URLs: ${staticRoutes.length + cards.length}`)
