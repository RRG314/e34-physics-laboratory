export interface MotionState {
  position: number
  velocity: number
  acceleration: number
  elapsed: number
}

export function constantAcceleration(initialPosition: number, initialVelocity: number, acceleration: number, elapsed: number): MotionState {
  return {
    position: initialPosition + initialVelocity * elapsed + 0.5 * acceleration * elapsed * elapsed,
    velocity: initialVelocity + acceleration * elapsed,
    acceleration,
    elapsed,
  }
}

export function averageSpeed(distance: number, elapsed: number) {
  if (elapsed <= 0) throw new RangeError('Elapsed time must be positive')
  return distance / elapsed
}

export function wheelAngularSpeed(linearSpeed: number, radius: number) {
  if (radius <= 0) throw new RangeError('Wheel radius must be positive')
  return linearSpeed / radius
}

export function radiansPerSecondToRpm(angularSpeed: number) {
  return (angularSpeed * 60) / (2 * Math.PI)
}

export function wheelCircumference(radius: number) {
  if (radius <= 0) throw new RangeError('Wheel radius must be positive')
  return 2 * Math.PI * radius
}
