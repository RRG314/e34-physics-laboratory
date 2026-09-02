import { wheelAngularSpeed } from '../physics/kinematics'
import { targetVehicle } from '../data/vehicle'
import type { ModelLevel } from '../data/modelHierarchy'

export type SimulationMode = 'idle' | 'experiment' | 'drive'

export interface VehicleSimulationSnapshot {
  mode: SimulationMode
  running: boolean
  position: number
  velocity: number
  acceleration: number
  elapsed: number
  duration: number | null
  wheelAngle: number
  wheelAngularVelocity: number
  throttle: number
  brake: number
  timeScale: 0.25 | 1 | 2
  modelLevel: ModelLevel
  history: { time: number; position: number; velocity: number }[]
}

type Listener = () => void

const initialSnapshot = (): VehicleSimulationSnapshot => ({
  mode: 'idle',
  running: false,
  position: 0,
  velocity: 0,
  acceleration: 0,
  elapsed: 0,
  duration: null,
  wheelAngle: 0,
  wheelAngularVelocity: 0,
  throttle: 0,
  brake: 0,
  timeScale: 1,
  modelLevel: 'idealized',
  history: [{ time: 0, position: 0, velocity: 0 }],
})

class VehicleSimulation {
  private snapshot = initialSnapshot()
  private listeners = new Set<Listener>()
  private historyAccumulator = 0

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getSnapshot = () => this.snapshot

  private publish(next: VehicleSimulationSnapshot) {
    this.snapshot = next
    this.listeners.forEach((listener) => listener())
  }

  reset(mode: SimulationMode = 'idle') {
    const timeScale = this.snapshot.timeScale
    const modelLevel = this.snapshot.modelLevel
    this.historyAccumulator = 0
    this.publish({ ...initialSnapshot(), mode, timeScale, modelLevel })
  }

  startExperiment(initialVelocity: number, acceleration: number, duration: number, initialPosition = 0) {
    const timeScale = this.snapshot.timeScale
    const modelLevel = this.snapshot.modelLevel
    this.historyAccumulator = 0
    this.publish({
      ...initialSnapshot(),
      mode: 'experiment',
      running: true,
      position: initialPosition,
      velocity: initialVelocity,
      acceleration,
      duration,
      timeScale,
      modelLevel,
      wheelAngularVelocity: wheelAngularSpeed(initialVelocity, targetVehicle.runningGear.unloadedWheelRadius.value),
      history: [{ time: 0, position: initialPosition, velocity: initialVelocity }],
    })
  }

  startDrive() {
    this.reset('drive')
    this.publish({ ...this.snapshot, running: true })
  }

  setDriveInput(throttle: number, brake: number) {
    if (this.snapshot.mode !== 'drive') return
    this.publish({ ...this.snapshot, throttle: Math.max(0, Math.min(1, throttle)), brake: Math.max(0, Math.min(1, brake)) })
  }

  pause() { this.publish({ ...this.snapshot, running: false }) }
  resume() { if (this.snapshot.mode !== 'idle') this.publish({ ...this.snapshot, running: true }) }
  togglePause() { this.snapshot.running ? this.pause() : this.resume() }
  setTimeScale(timeScale: 0.25 | 1 | 2) { this.publish({ ...this.snapshot, timeScale }) }
  setModelLevel(modelLevel: ModelLevel) { this.publish({ ...this.snapshot, modelLevel }) }

  stepFrame() {
    if (this.snapshot.mode === 'idle') return
    const running = this.snapshot.running
    this.publish({ ...this.integrate(this.snapshot, 1 / 60), running })
  }

  scrubTo(index: number) {
    const point = this.snapshot.history[Math.max(0, Math.min(this.snapshot.history.length - 1, index))]
    if (!point) return
    const radius = targetVehicle.runningGear.unloadedWheelRadius.value
    this.publish({ ...this.snapshot, running: false, elapsed: point.time, position: point.position, velocity: point.velocity, wheelAngle: -point.position / radius, wheelAngularVelocity: wheelAngularSpeed(point.velocity, radius) })
  }

  step(seconds: number) {
    if (!this.snapshot.running || seconds <= 0) return
    const scaledSeconds = seconds * this.snapshot.timeScale
    const capped = Math.min(scaledSeconds, this.snapshot.modelLevel === 'engineering' ? 0.05 : 0.1)
    const steps = Math.max(1, Math.ceil(scaledSeconds / capped))
    const dt = scaledSeconds / steps
    let next = this.snapshot
    for (let i = 0; i < steps; i += 1) next = this.integrate(next, dt)
    this.publish(next)
  }

  private integrate(state: VehicleSimulationSnapshot, dt: number): VehicleSimulationSnapshot {
    let acceleration = state.acceleration
    if (state.mode === 'drive') {
      acceleration = state.throttle * 2.4 - state.brake * 5.2
      if (state.modelLevel === 'intermediate') acceleration -= state.velocity > 0 ? 0.12 + 0.0025 * state.velocity ** 2 : 0
      if (state.modelLevel === 'engineering') acceleration -= state.velocity > 0 ? 0.16 + 0.0035 * state.velocity ** 2 : 0
      if (state.velocity <= 0 && acceleration < 0) acceleration = 0
    }

    let velocity = state.velocity + acceleration * dt
    if (state.mode === 'drive') velocity = Math.max(0, Math.min(24, velocity))
    const position = state.position + state.velocity * dt + 0.5 * acceleration * dt * dt
    const elapsed = state.elapsed + dt
    const radius = targetVehicle.runningGear.unloadedWheelRadius.value
    const angularVelocity = wheelAngularSpeed(velocity, radius)
    const wheelAngle = state.wheelAngle - angularVelocity * dt
    const done = state.duration !== null && elapsed >= state.duration

    this.historyAccumulator += dt
    let history = state.history
    if (this.historyAccumulator >= 0.15 || done) {
      this.historyAccumulator = 0
      history = [...history, { time: Math.min(elapsed, state.duration ?? elapsed), position, velocity }].slice(-100)
    }

    return {
      ...state,
      running: !done,
      position,
      velocity,
      acceleration,
      elapsed: done && state.duration !== null ? state.duration : elapsed,
      wheelAngle,
      wheelAngularVelocity: angularVelocity,
      history,
    }
  }
}

export const vehicleSimulation = new VehicleSimulation()
