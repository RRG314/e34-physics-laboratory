import { useSyncExternalStore } from 'react'
import { vehicleSimulation } from '../simulation/vehicleSimulation'

export function useVehicleSimulation() {
  return useSyncExternalStore(vehicleSimulation.subscribe, vehicleSimulation.getSnapshot, vehicleSimulation.getSnapshot)
}
