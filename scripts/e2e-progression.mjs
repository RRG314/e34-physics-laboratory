import fs from 'node:fs'
import { chromium } from 'playwright'

const base = process.env.E34_LAB_URL ?? 'http://127.0.0.1:5173'
const route = (path) => `${base.replace(/\/$/, '')}/#${path}`
const output = process.env.E34_LAB_ARTIFACT_DIR
  ? new URL(`file://${process.env.E34_LAB_ARTIFACT_DIR.replace(/\/$/, '')}/`)
  : new URL('../test-results/e2e/', import.meta.url)
fs.mkdirSync(output, { recursive: true })

const browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
page.setDefaultTimeout(20_000)
page.setDefaultNavigationTimeout(45_000)
const errors = []
const externalRequests = []
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
page.on('pageerror', (error) => errors.push(String(error)))
page.on('request', (request) => {
  const url = new URL(request.url())
  if ((url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== new URL(base).origin) {
    externalRequests.push(request.url())
  }
})

const state = async () => JSON.parse(await page.evaluate(() => window.render_game_to_text()))
const shot = async (name) => {
  // Let an actively rendered WebGL frame settle before Playwright samples it.
  await page.waitForTimeout(name === '03-guided-drive' ? 2400 : 600)
  await page.screenshot({ path: new URL(`${name}.png`, output).pathname, fullPage: true, timeout: 30_000 })
}
const shotElement = async (name, selector) => {
  await page.locator(selector).screenshot({ path: new URL(`${name}.png`, output).pathname, timeout: 30_000 })
}
const requireState = (condition, message) => { if (!condition) throw new Error(message) }

try {
  await page.goto(route('/laboratory'), { waitUntil: 'commit' })
  await page.waitForFunction(() => Boolean(window.__E34_LAB__))
  await page.evaluate(() => window.__E34_LAB__.reset())
  await page.getByTestId('mission-1').waitFor()
  await shot('01-fresh-motion')

  await page.goto(route('/drive'), { waitUntil: 'commit' })
  await page.getByTestId('locked-controlled-drive').waitFor()
  await shot('02-drive-lock-reason')

  await page.goto(route('/laboratory'), { waitUntil: 'commit' })
  await page.getByRole('button', { name: 'Negative', exact: true }).click({ force: true })
  await page.getByLabel('Your calculated result').fill('-12')
  await page.getByRole('button', { name: 'Check calculation' }).click({ force: true })
  await page.getByRole('button', { name: 'A straight line falling left to right' }).click({ force: true })
  await page.getByRole('button', { name: /Complete investigation/ }).click({ force: true })
  await page.getByTestId('mission-2').waitFor()
  await page.getByRole('button', { name: 'Tens', exact: true }).click({ force: true })
  await page.getByLabel('Your calculated result').fill('36')
  await page.getByRole('button', { name: 'Check calculation' }).click({ force: true })
  await page.getByRole('button', { name: 'The car’s constant velocity' }).click({ force: true })
  await page.getByRole('button', { name: /Complete investigation/ }).click({ force: true })
  await page.getByTestId('mission-3').waitFor()
  await page.getByRole('button', { name: 'Negative', exact: true }).click({ force: true })
  await page.getByLabel('Your calculated result').fill('-12')
  await page.getByRole('button', { name: 'Check calculation' }).click({ force: true })
  await page.getByRole('button', { name: 'Velocity is constant and negative' }).click({ force: true })
  await page.getByRole('button', { name: /Complete investigation/ }).click({ force: true })
  await page.getByTestId('mission-4').waitFor()
  await page.getByRole('button', { name: 'Increase', exact: true }).click({ force: true })
  await page.getByLabel('Your calculated result').fill('12')
  await page.getByRole('button', { name: 'Check calculation' }).click({ force: true })
  await page.getByRole('button', { name: 'Its slope—velocity—is increasing' }).click({ force: true })
  await page.getByRole('button', { name: /Complete investigation/ }).click({ force: true })
  await page.getByTestId('mission-complete').waitFor()
  await page.getByText('Model assumptions').click({ force: true })
  await page.getByRole('button', { name: 'Intermediate road load', exact: true }).click({ force: true })
  const motionState = await state()
  requireState(motionState.learner.controlledDriveUnlocked, 'Motion sequence did not unlock controlled driving.')
  const persistedAfterMotion = await page.evaluate(() => localStorage.getItem('e34-physics-lab-learner-v3'))

  await page.goto(route('/drive'), { waitUntil: 'commit' })
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

  await page.goto(route('/explore'), { waitUntil: 'commit' })
  await page.getByRole('button', { name: /Front-left wheel/i }).click({ force: true })
  await page.getByTestId('wheel-check-1').waitFor()
  await shot('04-basic-wheel-access')
  await page.getByRole('button', { name: '2.03m', exact: true }).click({ force: true })
  await page.getByTestId('wheel-check-2').waitFor()
  await page.getByRole('button', { name: '31rad/s', exact: true }).click({ force: true })
  await page.getByTestId('wheel-telemetry').waitFor()
  const deepState = await state()
  requireState(deepState.learner.wheelTelemetryUnlocked, 'Wheel checkpoints did not unlock telemetry.')
  await page.getByRole('button', { name: 'Toggle exploded wheels' }).click({ force: true })
  await shot('05-wheel-telemetry-exploded')

  await page.goto(route('/learn'), { waitUntil: 'commit' })
  await page.getByText('Measurement, data & modeling').waitFor()
  await shot('06-knowledge-map')
  await shotElement('06a-integrated-curriculum-desktop', '.syllabus-spine')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(250)
  const mobileWidth = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }))
  requireState(mobileWidth.scroll <= mobileWidth.client + 1, `Course page overflows mobile width: ${JSON.stringify(mobileWidth)}`)
  await shotElement('06b-integration-loop-mobile', '.integration-loop')
  await shotElement('06c-first-domain-mobile', '.module-list details:first-child')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(route('/garage'), { waitUntil: 'commit' })
  await page.getByText('Learn it. Test it. Use it. Prove it.').waitFor()
  await shot('07-garage-progression')
  await page.goto(route('/track'), { waitUntil: 'commit' })
  await page.getByRole('tab', { name: 'Ramp' }).waitFor()
  await page.getByRole('slider', { name: 'Ramp angle' }).fill('24')
  await page.getByRole('tab', { name: 'Impact pulse' }).click({ force: true })
  await page.getByRole('slider', { name: 'Stopping time' }).fill('0.4')
  await page.getByText(/average restraint force/i).waitFor()
  await page.getByRole('tab', { name: 'Drop / cliff' }).click({ force: true })
  await page.getByRole('slider', { name: 'Drop height' }).fill('20')
  await page.getByText(/ideal impact speed/i).waitFor()
  await shot('08-proving-ground')
  await page.goto(route('/experiments'), { waitUntil: 'commit' })
  await page.getByRole('button', { name: /Import dataset/i }).click({ force: true })
  await page.getByText(/3 samples parsed/i).waitFor()
  await shot('09-experimental-method')
  await page.goto(route('/notebook'), { waitUntil: 'commit' })
  await page.getByLabel('New notebook entry').fill('The wheel residual should be interpreted with measurement uncertainty.')
  await page.getByRole('button', { name: /Add entry/i }).click({ force: true })
  await page.getByText('The wheel residual should be interpreted with measurement uncertainty.').waitFor()
  await shot('10-notebook')
  fs.writeFileSync(new URL('report.json', output), JSON.stringify({ motionState, driveState, deepState, consoleErrors: errors, externalRequests }, null, 2))
  if (errors.length) throw new Error(`Browser console errors: ${errors.join(' | ')}`)
  if (externalRequests.length) throw new Error(`Unexpected runtime network requests: ${externalRequests.join(' | ')}`)
  process.stdout.write('E2E progression passed: fresh learner -> motion gate -> drive -> wheel telemetry.\n')
} finally {
  await browser.close()
}
