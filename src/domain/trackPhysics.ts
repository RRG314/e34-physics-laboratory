export const STANDARD_GRAVITY = 9.81

export function netForce(mass: number, acceleration: number) {
  return mass * acceleration
}

export function kineticEnergy(mass: number, speed: number) {
  return .5 * mass * speed ** 2
}

export function idealClimbHeight(speed: number, gravity = STANDARD_GRAVITY) {
  return speed ** 2 / (2 * gravity)
}

export function rampClimb(initialSpeed: number, angleDegrees: number, gravity = STANDARD_GRAVITY) {
  const accelerationMagnitude = gravity * Math.sin(angleDegrees * Math.PI / 180)
  const stopTime = initialSpeed / accelerationMagnitude
  const distance = initialSpeed * stopTime - .5 * accelerationMagnitude * stopTime ** 2
  return { accelerationMagnitude, stopTime, distance }
}

export function rectangularImpactPulse(mass: number, initialSpeed: number, stopTime: number) {
  const impulse = mass * initialSpeed
  const averageForce = impulse / stopTime
  return { impulse, averageForce }
}

export function idealDrop(height: number, gravity = STANDARD_GRAVITY) {
  const fallTime = Math.sqrt(2 * height / gravity)
  const impactSpeed = gravity * fallTime
  const specificEnergy = gravity * height
  return { fallTime, impactSpeed, specificEnergy }
}
