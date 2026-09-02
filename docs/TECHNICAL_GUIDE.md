# Technical guide

## Application shape

The laboratory is a client-side TypeScript application built with React, Vite, Three.js, React Three Fiber, and Zustand. The interface and 3D scene consume simulation state; they do not own the equations that produce it.

This separation allows a physics model to be tested without a browser and keeps graphs, instruments, wheels, and vehicle motion tied to the same values.

```text
source and curriculum records
            ↓
physics and progression rules
            ↓
deterministic simulation state
            ↓
3D scene · controls · graphs · explanations · tests
```

## Repository map

| Path | Purpose |
| --- | --- |
| `src/data` | Curriculum, vehicle, component, progression, and source records |
| `src/domain` | Mastery, prerequisite, diagnostic, experiment, and quantity rules |
| `src/physics` | Small analytical physics functions |
| `src/simulation` | Time-dependent vehicle state and model selection |
| `src/scene` | Three.js scene composition and selectable vehicle parts |
| `src/store` | Persisted learner evidence and notebook state |
| `src/ui` | Pages, controls, graphs, feedback, and ordinary HTML alternatives |
| `tests` | Unit and cross-domain validation |
| `scripts` | Browser journey and screenshot verification |

## Model boundaries

The current motion sequence begins with analytical one-dimensional kinematics. Intermediate modes add simplified road load, but their coefficients are teaching values rather than calibrated E34 parameters. Wheel rotation uses the no-slip relation `v = rω` with an explicitly assumed radius.

Each model level should add one meaningful effect and state what it still ignores. A higher level is not inherently better: the simplest model that answers the question is usually the clearest lesson.

The simulation keeps one authoritative value for elapsed time, position, velocity, acceleration, wheel angle, and wheel angular speed. The scene and instruments subscribe to snapshots from that state. Browser animation timing never changes the expected analytical result.

## Persistence and privacy

Learner evidence, preferences, and notebook entries are stored in browser local storage under versioned keys. Simulation transients are not persisted. There is no server account or remote database in the current release.

Any future synchronization service will require a separate privacy design, data-retention policy, consent model, and migration path. Do not add learner telemetry to a remote service as an incidental feature.

## Accessibility

Canvas interactions need an equivalent DOM control or text representation. `window.render_game_to_text()` exposes a concise state description for browser verification and nonvisual inspection. `window.advanceTime(ms)` advances the simulation deterministically during tests.

Keyboard access, focus order, labels, contrast, reduced motion, narrow screens, and non-color status indicators are part of feature acceptance rather than later polish.

## Testing

```bash
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Unit tests cover analytical motion, rotation, dimensions, graph validity, progression requirements, diagnostic categories, generated problems, CSV parsing, energy consistency, impact impulse, and ramp kinematics. The browser test follows a new learner through motion, driving, wheel telemetry, the course and garage pages, all three proving-ground modes, data import, and notebook persistence. Console errors fail the journey.

When adding physics, include an analytical case or another defensible benchmark. When changing a learner interaction, add a browser assertion and inspect the resulting screenshot.

## Performance

The current build loads the 3D dependencies in the main bundle. Route-level code splitting is a near-term task. Future production geometry will need level-of-detail groups, compressed meshes and textures, stable component IDs, selection proxies, and explicit desktop and mobile budgets.

## Adding a lesson or model

Start with the learner outcome and source record. Add prerequisites and the vehicle relationship to the data registry, keep calculations in a pure domain or physics module, and let the interface consume the result. Do not duplicate constants in UI components.

The requirements for lesson contributions are in [CONTRIBUTING.md](../CONTRIBUTING.md), while evidence and validation expectations are in [RESEARCH_METHODS.md](RESEARCH_METHODS.md).

