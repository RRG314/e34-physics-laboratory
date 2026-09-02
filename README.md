# E34 Physics Laboratory

An interactive physics laboratory organized around a persistent digital model of a US-market 1995 BMW 525i E34 sedan.

This standalone repository implements two coherent vertical slices: complete-car motion through wheel rotation, plus learning-quality and experimental-science infrastructure. It now includes separate mathematics mastery, error diagnosis, estimation gates, model assumptions and fidelity levels, replay/time controls, scientific-method and data-import workflows, a notebook, an equation library, typed physical quantities, reproducible problem generation, and physics validation benchmarks.

## Run locally

Requirements: Node.js 22 or newer.

On macOS, double-click `Start E34 Physics Lab.command`. It starts the required local server and opens the correct URL. Do not open `index.html` directly as a `file://` page.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Verification

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Project boundaries

- `src/data`: authoritative curriculum, component, vehicle, and source registries.
- `src/domain`: schemas and prerequisite logic.
- `src/physics`: framework-independent analytical models.
- `src/simulation`: deterministic runtime state and solvers.
- `src/scene`: 3D rendering and interaction.
- `src/ui`: application pages and learning interactions.
- `docs`: research, architecture, provenance, and project status.

The application deliberately separates idealized, intermediate, engineering, high-fidelity, and experimental models. Only the first three are currently executable; the remaining levels are explicit architecture targets rather than simulated claims.

The current procedural E34 shell is a calibrated visualization proxy, not production body geometry. See `docs/PROJECT_STATUS.md` for current fidelity and open work.
