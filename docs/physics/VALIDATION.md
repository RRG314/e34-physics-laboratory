# Physics validation

## Automated benchmark coverage

Run `npm test`.

Current benchmarks verify:

- Analytical constant-acceleration position and velocity.
- No-slip linear/angular wheel-speed consistency.
- Valid curriculum and mathematics directed graphs.
- Multidimensional progression requirements.
- Wheel-telemetry mastery gates.
- Explicit unresolved vehicle provenance values remain unresolved.
- 36 km/h converts to 10 m/s through the typed quantity system.
- Force and energy are rejected as dimensionally incompatible.
- Sign-convention and arithmetic errors receive different diagnoses.
- Seeded motion problems are reproducible, analytically consistent, and constrained to plausible ranges.
- Measurement CSV parses value, unit, timestamp, and uncertainty.

## Browser validation

`npm run test:e2e` resets the learner and verifies estimation gates, four motion calculations, persistent driving unlock, selected model level, acceleration, wheel checkpoints, telemetry, exploded view, knowledge map, experimental dataset import, and notebook persistence. Browser console errors fail the run.

## Required future benchmark families

- Solver convergence under timestep refinement.
- Energy and momentum conservation for applicable closed models.
- World/body/wheel coordinate transformations and rotating frames.
- Uncertainty propagation against analytical cases.
- Generated force, energy, rotation, thermal, fluid, electrical, and coupled-domain problems.
- Parameter calibration recovery from synthetic datasets and holdout residuals.
- Tire, suspension, drivetrain, thermal, fluid, electrical, and signal-model validation against sourced or measured reference cases.

Each solver must declare version, parameters, assumptions, validity range, tolerance, and source provenance before it can unlock an experimental-comparison level.
