/**
 * Writes tiny valid JPEGs into public/images/** so <img> never 404s offline.
 * Run: node scripts/seed-image-placeholders.mjs
 * Replace with real photos: npm run images:download
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const imagesDir = path.join(root, 'public', 'images')

/** Minimal 1×1 grey JPEG (~600 bytes) — decodes in all browsers. */
const JPEG_PLACEHOLDER = Buffer.from(
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  'base64',
)

const FILES = [
  'roads/night-highway.jpg',
  'towing/flatbed-tow.jpg',
  'roads/aerial-traffic.jpg',
  'cars/highway-traffic.jpg',
  'towing/tow-on-road.jpg',
  'towing/commercial-fleet.jpg',
  'logistics/semi-convoy.jpg',
  'logistics/warehouse-yard.jpg',
  'people/phone-hands.jpg',
  'roads/aerial-highway.jpg',
  'maps/maps-navigation.jpg',
  'business/laptop-estimates.jpg',
  'mechanics/workshop-tools.jpg',
  'roads/motion-speed.jpg',
  'business/payment-terminal.jpg',
  'roads/open-road-trip.jpg',
  'devices/smartphone.jpg',
  'support/headset-dispatch.jpg',
]

let written = 0
for (const rel of FILES) {
  const dest = path.join(imagesDir, rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  if (!fs.existsSync(dest)) {
    fs.writeFileSync(dest, JPEG_PLACEHOLDER)
    written += 1
  }
}

console.log(`Images dir: ${imagesDir}`)
console.log(written ? `Wrote ${written} placeholder JPEG(s) (missing only).` : 'All image files already exist — skipped seed.')
