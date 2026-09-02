# Simulation architecture

## Shared state bus

The simulation bus has one authoritative value for time, vehicle position, longitudinal velocity, longitudinal acceleration, wheel angular velocity, and wheel angle. Renderers and instruments subscribe to snapshots; they do not integrate their own copies.

## Domain roadmap

| Domain | Initial model | Later coupled model |
| --- | --- | --- |
| Rigid-body | One-dimensional point mass kinematics | 6-DOF chassis, suspension and load transfer |
| Rotational drivetrain | Ideal no-slip wheel relation | Engine/clutch/gearbox/driveshaft/differential inertias |
| Tire | Nominal radius, no slip | Load-sensitive combined-slip model |
| Thermal | Not active | Brake, engine, coolant and ambient thermal network |
| Fluids | Not active | Brake hydraulic and cooling/lubrication approximations |
| Electrical | Not active | Battery/starter/alternator and lumped circuits |
| Vibration/signals | Motion history only | Quarter/half/full-car modes, sensors, FFT |
| Optics | PBR visualization only | Controlled reflection/refraction experiments |

## Fidelity labels

- A - educational idealization: isolates one law and states omissions.
- B - coupled educational model: connects multiple domains with defensible simplified parameters.
- C - engineering approximation: validated nonlinear component models and uncertainty ranges.
- D - advanced numerical model: research-oriented spatial or field models with benchmarks.

The current kinematics and wheel labs are Level A. They intentionally omit traction, drag, rolling resistance, compliance, loaded radius, and slip.

## Numerical policy

Analytical solutions are used where available. Time-dependent browser simulations use fixed time steps for determinism and cap catch-up work. Each solver has analytical benchmark tests before it can support assessment. Model changes require conservation or limiting-case tests where applicable.
