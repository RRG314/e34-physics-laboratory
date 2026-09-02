import type { VehicleGraphEdge } from '../domain/model'

export const vehicleGraphEdges: VehicleGraphEdge[] = [
  { from: 'vehicle-shell', to: 'wheel-fl', relation: 'contains' },
  { from: 'vehicle-shell', to: 'wheel-fr', relation: 'contains' },
  { from: 'vehicle-shell', to: 'wheel-rl', relation: 'contains' },
  { from: 'vehicle-shell', to: 'wheel-rr', relation: 'contains' },
  { from: 'vehicle-shell', to: 'differential', relation: 'contains' },
  { from: 'differential', to: 'wheel-rl', relation: 'drives' },
  { from: 'differential', to: 'wheel-rr', relation: 'drives' },
  { from: 'wheel-rl', to: 'vehicle-shell', relation: 'transfers-force-to' },
  { from: 'wheel-rr', to: 'vehicle-shell', relation: 'transfers-force-to' },
  { from: 'wheel-fl', to: 'vehicle-shell', relation: 'supports' },
  { from: 'wheel-fr', to: 'vehicle-shell', relation: 'supports' },
  { from: 'wheel-rl', to: 'vehicle-shell', relation: 'supports' },
  { from: 'wheel-rr', to: 'vehicle-shell', relation: 'supports' },
]
