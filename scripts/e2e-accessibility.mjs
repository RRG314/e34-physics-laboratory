import { AxeBuilder } from '@axe-core/playwright'
import fs from 'node:fs'
import { chromium } from 'playwright'

const base = process.env.E34_LAB_URL ?? 'http://127.0.0.1:5173'
const route = (path) => `${base.replace(/\/$/, '')}/#${path}`
const systemChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = await chromium.launch({ headless: true, executablePath: fs.existsSync(systemChrome) ? systemChrome : undefined, args: ['--use-gl=angle', '--use-angle=swiftshader'] })
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const page = await context.newPage()
const failures = []

try {
  await page.goto(route('/'), { waitUntil: 'commit' })
  await page.waitForFunction(() => Boolean(window.__E34_LAB__))
  await page.evaluate(() => { window.__E34_LAB__.reset(); window.__E34_LAB__.unlockAll(); window.__E34_LAB__.makeReviewDue() })

  for (const path of ['/', '/learn', '/laboratory', '/track', '/review', '/garage']) {
    await page.goto(route(path), { waitUntil: 'commit' })
    await page.waitForTimeout(250)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    for (const violation of results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))) {
      const samples = violation.nodes.slice(0, 6).map((node) => `${node.target.join(' ')}: ${node.failureSummary?.replace(/\s+/g, ' ')}`).join(' | ')
      failures.push(`${path}: ${violation.id} (${violation.impact}) — ${violation.help}; ${violation.nodes.length} node(s); ${samples}`)
    }
    await page.setViewportSize({ width: 390, height: 844 })
    const width = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }))
    if (width.scroll > width.client + 1) failures.push(`${path}: horizontal overflow ${width.scroll}px > ${width.client}px`)
    await page.setViewportSize({ width: 1280, height: 800 })
  }

  await page.goto(route('/review'), { waitUntil: 'commit' })
  await page.keyboard.press('Tab')
  const focus = await page.evaluate(() => {
    const element = document.activeElement
    if (!(element instanceof HTMLElement)) return { tag: '', outline: 'none' }
    return { tag: element.tagName, outline: getComputedStyle(element).outlineStyle }
  })
  if (!focus.tag || focus.tag === 'BODY' || focus.outline === 'none') failures.push(`Keyboard focus is not visibly exposed: ${JSON.stringify(focus)}`)

  if (failures.length) throw new Error(`Accessibility verification failed:\n${failures.join('\n')}`)
  process.stdout.write('Accessibility verification passed: no serious/critical WCAG A/AA axe findings, mobile overflow, or missing first-tab focus indicator.\n')
} finally {
  await browser.close()
}
