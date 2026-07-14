/**
 * Downloads full-resolution marketing photos into public/images/**.
 * Requires network. Run from repo root:
 *   npm run images:download
 *
 * Curation: mix of **African urban roads** (Lagos, Cape Town) and **towing /
 * breakdown / flatbed** scenes so the site reads roadside + region, not
 * generic US-only stock. URLs use photo IDs verified HTTP 200.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const imagesDir = path.join(root, 'public', 'images')

/** [ relativePath, unsplashUrl ] */
const ASSETS = [
  [
    'roads/night-highway.jpg',
    'https://images.unsplash.com/photo-1696339061679-c424f5b4e4a1?auto=format&fit=crop&w=2400&q=82',
  ],
  [
    'towing/flatbed-tow.jpg',
    'https://images.unsplash.com/photo-1703130931523-5113aa0d4c3c?auto=format&fit=crop&w=2000&q=82',
  ],
  [
    'roads/aerial-traffic.jpg',
    'https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1200&q=80',
  ],
  [
    'cars/highway-traffic.jpg',
    'https://images.unsplash.com/photo-1706130576686-d1a24ca0a8ea?auto=format&fit=crop&w=2000&q=82',
  ],
  [
    'towing/tow-on-road.jpg',
    'https://images.unsplash.com/photo-1730514784243-f0e7f09c9f50?auto=format&fit=crop&w=2000&q=82',
  ],
  [
    'towing/commercial-fleet.jpg',
    'https://images.unsplash.com/photo-1742069029207-0aacf8fa4401?auto=format&fit=crop&w=2000&q=82',
  ],
  [
    'logistics/semi-convoy.jpg',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2200&q=82',
  ],
  [
    'logistics/warehouse-yard.jpg',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
  ],
  [
    'people/phone-hands.jpg',
    'https://images.unsplash.com/photo-1576814547952-f8531781d7ef?auto=format&fit=crop&w=900&q=80',
  ],
  [
    'roads/aerial-highway.jpg',
    'https://images.unsplash.com/photo-1586159863536-1d88f7c02a8b?auto=format&fit=crop&w=900&q=80',
  ],
  [
    'maps/maps-navigation.jpg',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
  ],
  [
    'business/laptop-estimates.jpg',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
  ],
  [
    'mechanics/workshop-tools.jpg',
    'https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&w=1000&q=80',
  ],
  [
    'roads/motion-speed.jpg',
    'https://images.unsplash.com/photo-1686966933735-305bd8fe0a77?auto=format&fit=crop&w=800&q=80',
  ],
  [
    'business/payment-terminal.jpg',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
  ],
  [
    'roads/open-road-trip.jpg',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  ],
  [
    'devices/smartphone.jpg',
    'https://images.unsplash.com/photo-1576814547952-f8531781d7ef?auto=format&fit=crop&w=1200&q=82',
  ],
  [
    'support/headset-dispatch.jpg',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=82',
  ],
]

async function downloadOne(rel, url) {
  const dest = path.join(imagesDir, rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`${rel}: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 500) throw new Error(`${rel}: response too small (${buf.length}b), likely error page`)
  fs.writeFileSync(dest, buf)
  console.log('OK', rel, `(${(buf.length / 1024).toFixed(0)} KB)`)
}

async function main() {
  console.log('Downloading to', imagesDir)
  let ok = 0
  for (const [rel, url] of ASSETS) {
    try {
      await downloadOne(rel, url)
      ok += 1
    } catch (e) {
      console.error('FAIL', rel, e.message)
    }
  }
  console.log(`Done: ${ok}/${ASSETS.length} files.`)
  if (ok < ASSETS.length) process.exitCode = 1
}

main()
