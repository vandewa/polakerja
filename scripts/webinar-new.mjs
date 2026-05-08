#!/usr/bin/env node
// CLI generator untuk scaffold webinar baru.
// Usage: npm run webinar:new -- --slug=xxx --title="yyy" --template=dark-premium --format=zoom
// Atau interaktif: npm run webinar:new

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const TEMPLATES = {
  'dark-premium': 'DarkPremium.tsx',
  'light-professional': 'LightProfessional.tsx',
  'bold-gradient': 'BoldGradient.tsx',
}

const FORMATS = ['zoom', 'meet', 'youtube-live', 'offline']

function parseArgs(argv) {
  const args = {}
  for (const arg of argv.slice(2)) {
    const m = arg.match(/^--([a-z-]+)=(.*)$/)
    if (m) args[m[1]] = m[2]
  }
  return args
}

function validateSlug(slug) {
  if (!slug) return 'slug wajib diisi'
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return 'slug harus kebab-case (huruf-kecil + angka, dipisah strip), contoh: leadership-mar2026'
  }
  return null
}

function slugToComponentName(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function fileExists(path) {
  return existsSync(path)
}

async function prompt(rl, question, defaultValue) {
  const suffix = defaultValue ? ` (${defaultValue})` : ''
  const answer = (await rl.question(`${question}${suffix}: `)).trim()
  return answer || defaultValue || ''
}

async function main() {
  const args = parseArgs(process.argv)
  const rl = readline.createInterface({ input, output })

  try {
    // Step 1: Collect inputs (interactive fallback)
    let slug = args.slug
    let title = args.title
    let template = args.template
    let format = args.format

    if (!slug) slug = await prompt(rl, 'Slug (kebab-case)')
    const slugErr = validateSlug(slug)
    if (slugErr) {
      console.error(`✗ ${slugErr}`)
      process.exit(1)
    }

    if (!title) title = await prompt(rl, 'Title')
    if (!title) {
      console.error('✗ title wajib diisi')
      process.exit(1)
    }

    if (!template) {
      console.log(`Available templates: ${Object.keys(TEMPLATES).join(', ')}`)
      template = await prompt(rl, 'Template', 'dark-premium')
    }
    if (!TEMPLATES[template]) {
      console.error(`✗ template harus salah satu: ${Object.keys(TEMPLATES).join(', ')}`)
      process.exit(1)
    }

    if (!format) {
      console.log(`Available formats: ${FORMATS.join(', ')}`)
      format = await prompt(rl, 'Format', 'zoom')
    }
    if (!FORMATS.includes(format)) {
      console.error(`✗ format harus salah satu: ${FORMATS.join(', ')}`)
      process.exit(1)
    }

    const componentName = slugToComponentName(slug)
    const componentPath = join(ROOT, 'components/webinar/pages', `${componentName}.tsx`)
    const templatePath = join(ROOT, 'components/webinar/pages/templates', TEMPLATES[template])
    const registryPath = join(ROOT, 'components/webinar/pages/registry.ts')
    const webinarsPath = join(ROOT, 'lib/webinars.ts')

    // Step 2: Pre-flight checks
    if (fileExists(componentPath)) {
      console.error(`✗ ${componentPath} sudah ada — slug "${slug}" mungkin duplikat`)
      process.exit(1)
    }
    if (!fileExists(templatePath)) {
      console.error(`✗ template ${templatePath} tidak ditemukan`)
      process.exit(1)
    }

    const registrySource = readFileSync(registryPath, 'utf8')
    if (registrySource.includes(`from './${componentName}'`)) {
      console.error(`✗ component "${componentName}" sudah terdaftar di registry`)
      process.exit(1)
    }
    if (!registrySource.includes('// CLI:imports-end') || !registrySource.includes('// CLI:entries-end')) {
      console.error('✗ marker comments di registry.ts hilang. Reset file ini dulu.')
      process.exit(1)
    }

    const webinarsSource = readFileSync(webinarsPath, 'utf8')
    if (webinarsSource.includes(`slug: '${slug}'`)) {
      console.error(`✗ slug "${slug}" sudah ada di lib/webinars.ts`)
      process.exit(1)
    }
    if (!webinarsSource.includes('// CLI:entries-end')) {
      console.error('✗ marker comment di lib/webinars.ts hilang. Reset file ini dulu.')
      process.exit(1)
    }

    // Step 3: Apply changes (delegated to next task — Task 9)
    // ...

    console.log('TODO Task 9: implement file mutations')
  } finally {
    rl.close()
  }
}

main().catch((err) => {
  console.error('✗ unexpected error:', err)
  process.exit(1)
})
