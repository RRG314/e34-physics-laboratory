import fs from 'node:fs'
import { chromium } from 'playwright'

const base = process.env.E34_LAB_URL ?? 'http://127.0.0.1:5173'
const output = process.env.E34_LAB_ARTIFACT_DIR
  ? new URL(`file://${process.env.E34_LAB_ARTIFACT_DIR.replace(/\/$/, '')}/`)
  : new URL('../test-results/e2e/', import.meta.url)
fs.mkdirSync(output, { recursive: true })

const browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
page.on('pageerror', (error) => errors.push(String(error)))

const state = async () => JSON.parse(await page.evaluate(() => window.render_game_to_text()))
const shot = async (name) => {
  // Let an actively rendered WebGL frame settle before Playwright samples it.
  await page.waitForTimeout(600)
  await page.screenshot({ path: new URL(`${name}.png`, output).pathname, fullPage: true })
}
const requireState = (condition, message) => { if (!condition) throw new Error(message) }

try {
  await page.goto(`${base}/laboratory`, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => window.__E34_LAB__.reset())
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.getByTestId('mission-1').waitFor()
  await shot('01-fresh-motion')

  await page.goto(`${base}/drive`, { waitUntil: 'domcontentloaded' })
  await page.getByTestId('locked-controlled-drive').waitFor()
  await shot('02-drive-lock-reason')

  await page.goto(`${base}/laboratory`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Negative', exact: true }).click()
  await page.getByRole('button', { name: '-12 m', exact: true }).click()
  await page.getByTestId('mission-2').waitFor()
  await page.getByRole('button', { name: 'Tens', exact: true }).click()
  await page.getByRole('button', { name: '36 m', exact: true }).click()
  await page.getByTestId('mission-3').waitFor()
  await page.getByRole('button', { name: 'Negative', exact: true }).click()
  await page.getByRole('button', { name: '-12 m', exact: true }).click()
  await page.getByTestId('mission-4').waitFor()
  await page.getByRole('button', { name: 'Increase', exact: true }).click()
  await page.getByRole('button', { name: '12 m/s', exact: true }).click()
  await page.getByTestId('mission-complete').waitFor()
  await page.getByText('Model assumptions').click()
  await page.getByRole('button', { name: 'Intermediate road load', exact: true }).click()
  const motionState = await state()
  requireState(motionState.learner.controlledDriveUnlocked, 'Motion sequence did not unlock controlled driving.')
  const persistedAfterMotion = await page.evaluate(() => localStorage.getItem('e34-physics-lab-learner-v2'))

  await page.goto(`${base}/drive`, { waitUntil: 'domcontentloaded' })
  await page.locator('.drive-hud, [data-testid="locked-controlled-drive"]').first().waitFor()
  const hydratedDriveState = await state()
  if (!hydratedDriveState.learner.controlledDriveUnlocked) {
    await shot('debug-drive-hydration-failure')
    throw new Error(`Persisted motion mastery did not hydrate. persisted=${persistedAfterMotion}`)
  }
  await page.locator('.drive-hud').waitFor()
  await page.keyboard.down('KeyW')
  await page.evaluate(() => window.advanceTime(1400))
  await page.keyboard.up('KeyW')
  const driveState = await state()
  requireState(driveState.simulation.velocity_mps > 0, 'Throttle did not increase velocity.')
  requireState(driveState.simulation.modelLevel === 'intermediate', 'Selected model hierarchy level was not applied to driving.')
  await shot('03-guided-drive')

  await page.goto(`${base}/explore`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: /Front-left wheel/i }).click()
  await page.getByTestId('wheel-check-1').waitFor()
  await shot('04-basic-wheel-access')
  await page.getByRole('button', { name: '2.03m', exact: true }).click()
  await page.getByTestId('wheel-check-2').waitFor()
  await page.getByRole('button', { name: '31rad/s', exact: true }).click()
  await page.getByTestId('wheel-telemetry').waitFor()
  const deepState = await state()
  requireState(deepState.learner.wheelTelemetryUnlocked, 'Wheel checkpoints did not unlock telemetry.')
  await page.getByRole('button', { name: 'Toggle exploded wheels' }).click()
  await shot('05-wheel-telemetry-exploded')

  await page.goto(`${base}/learn`, { waitUntil: 'domcontentloaded' })
  await shot('06-knowledge-map')
  await page.goto(`${base}/experiments`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: /Import dataset/i }).click()
  await page.getByText(/3 samples parsed/i).waitFor()
  await shot('07-experimental-method')
  await page.goto(`${base}/notebook`, { waitUntil: 'domcontentloaded' })
  await page.getByLabel('New notebook entry').fill('The wheel residual should be interpreted with measurement uncertainty.')
  await page.getByRole('button', { name: /Add entry/i }).click()
  await page.getByText('The wheel residual should be interpreted with measurement uncertainty.').waitFor()
  await shot('08-notebook')
  fs.writeFileSync(new URL('report.json', output), JSON.stringify({ motionState, driveState, deepState, consoleErrors: errors }, null, 2))
  if (errors.length) throw new Error(`Browser console errors: ${errors.join(' | ')}`)
  process.stdout.write('E2E progression passed: fresh learner -> motion gate -> drive -> wheel telemetry.\n')
} finally {
  await browser.close()
}
