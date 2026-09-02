import type { SourcedValue } from '../domain/model'

export interface E34VehicleConfiguration {
  id: string
  identity: {
    manufacturer: string
    model: string
    chassis: string
    modelYear: number
    body: string
    market: string
    transmissionVariant: string
  }
  engine: {
    code: SourcedValue<string>
    layout: SourcedValue<string>
    displacement: SourcedValue<number>
    compressionRatio: SourcedValue<number>
    power: SourcedValue<number>
    torque: SourcedValue<number>
  }
  dimensions: {
    length: SourcedValue<number>
    width: SourcedValue<number>
    height: SourcedValue<number>
    wheelbase: SourcedValue<number>
    curbMass: SourcedValue<number>
  }
  drivetrain: {
    drivenWheels: SourcedValue<string>
    transmission: SourcedValue<string>
    forwardRatios: SourcedValue<number[]>
    finalDriveRatio: SourcedValue<number | null>
  }
  runningGear: {
    nominalTire: SourcedValue<string>
    unloadedWheelRadius: SourcedValue<number>
  }
}

export const targetVehicle: E34VehicleConfiguration = {
  id: 'bmw-e34-1995-525i-us-manual',
  identity: {
    manufacturer: 'BMW',
    model: '525i',
    chassis: 'E34',
    modelYear: 1995,
    body: '4-door sedan',
    market: 'United States',
    transmissionVariant: '5-speed manual',
  },
  engine: {
    code: { value: 'M50TU (M50B25TU)', unit: '', status: 'VERIFIED', sourceIds: ['bmw-classic-525i-e34', 'bentley-e34-service-manual'], pageOrSection: 'BMW: from 09/1992; Bentley: 100-1, physical PDF p. 43' },
    layout: { value: 'naturally aspirated inline-six, DOHC, 24-valve, intake VANOS', unit: '', status: 'VERIFIED', sourceIds: ['bmw-classic-525i-e34', 'bentley-e34-service-manual'], pageOrSection: '100-1 through 100-3' },
    displacement: { value: 2494, unit: 'cm3', status: 'VERIFIED', sourceIds: ['bmw-classic-525i-e34', 'bentley-e34-service-manual'], pageOrSection: '100-1, physical PDF p. 43' },
    compressionRatio: { value: 10.5, unit: ':1', status: 'VERIFIED', sourceIds: ['bentley-e34-service-manual'], pageOrSection: '100-1, physical PDF p. 43' },
    power: { value: 188, unit: 'hp SAE net', status: 'VERIFIED', sourceIds: ['bentley-e34-service-manual'], pageOrSection: '100-1, physical PDF p. 43', note: 'US manual value; BMW Group Classic lists 192 hp for the European-market M50 era.' },
    torque: { value: 184, unit: 'lb-ft SAE net', status: 'VERIFIED', sourceIds: ['bentley-e34-service-manual'], pageOrSection: '100-1, physical PDF p. 43' },
  },
  dimensions: {
    length: { value: 4.72, unit: 'm', status: 'PROVISIONAL', sourceIds: [], note: 'Cross-source agreement exists, but a primary US-market sheet is still required.' },
    width: { value: 1.751, unit: 'm', status: 'PROVISIONAL', sourceIds: [], note: 'Width without mirrors; awaiting primary US-market sheet.' },
    height: { value: 1.412, unit: 'm', status: 'PROVISIONAL', sourceIds: [], note: 'Configuration-dependent; awaiting primary US-market sheet.' },
    wheelbase: { value: 2.761, unit: 'm', status: 'PROVISIONAL', sourceIds: [], note: 'Awaiting primary US-market sheet.' },
    curbMass: { value: 1580, unit: 'kg', status: 'PROVISIONAL', sourceIds: [], note: 'Manual-transmission secondary-source value; equipment affects mass.' },
  },
  drivetrain: {
    drivenWheels: { value: 'rear', unit: '', status: 'VERIFIED', sourceIds: ['bentley-e34-service-manual'], pageOrSection: '200 Transmission-General and 260 Driveshaft' },
    transmission: { value: 'Getrag S5D 250 G', unit: '', status: 'VERIFIED', sourceIds: ['bentley-e34-service-manual'], pageOrSection: '200-2 and 230-1, physical PDF p. 224' },
    forwardRatios: { value: [4.2, 2.49, 1.66, 1.24, 1], unit: ':1', status: 'VERIFIED', sourceIds: ['bentley-e34-service-manual'], pageOrSection: 'Table b, 200-2, physical PDF p. 224' },
    finalDriveRatio: { value: null, unit: ':1', status: 'NEEDS_SOURCE', sourceIds: [], note: 'Do not assume a ratio until the market/transmission configuration is confirmed.' },
  },
  runningGear: {
    nominalTire: { value: '205/65 R15', unit: '', status: 'NEEDS_SOURCE', sourceIds: ['simulation-wheel-assumption-v1'], note: 'Commonly reported baseline size; not yet accepted as factory configuration.' },
    unloadedWheelRadius: { value: 0.32325, unit: 'm', status: 'ESTIMATED', sourceIds: ['simulation-wheel-assumption-v1'], derivation: '(15 × 25.4 mm + 2 × 205 mm × 0.65) / 2' },
  },
}
