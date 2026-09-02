export interface TireSize {
  sectionWidthMm: number
  aspectRatioPercent: number
  rimDiameterIn: number
}

export interface TireGeometry {
  sidewallHeightMm: number
  rimDiameterMm: number
  unloadedDiameterMm: number
  unloadedRadiusM: number
  circumferenceM: number
}

export const teachingTire: TireSize = {
  sectionWidthMm: 205,
  aspectRatioPercent: 65,
  rimDiameterIn: 15,
}

export function deriveTireGeometry(size: TireSize): TireGeometry {
  const sidewallHeightMm = size.sectionWidthMm * size.aspectRatioPercent / 100
  const rimDiameterMm = size.rimDiameterIn * 25.4
  const unloadedDiameterMm = rimDiameterMm + 2 * sidewallHeightMm
  const unloadedRadiusM = unloadedDiameterMm / 2000
  return {
    sidewallHeightMm,
    rimDiameterMm,
    unloadedDiameterMm,
    unloadedRadiusM,
    circumferenceM: 2 * Math.PI * unloadedRadiusM,
  }
}

export function wheelRpm(speedKmh: number, circumferenceM: number) {
  return speedKmh / 3.6 / circumferenceM * 60
}

export function distanceAfterRevolutions(revolutions: number, radiusM: number) {
  return revolutions * 2 * Math.PI * radiusM
}

export function withinTolerance(value: number, expected: number, tolerance: number) {
  return Number.isFinite(value) && Math.abs(value - expected) <= tolerance
}
