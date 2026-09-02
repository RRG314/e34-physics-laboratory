# E34 Physics Laboratory

An interactive physics laboratory organized around a persistent digital model of a US-market 1995 BMW 525i E34 sedan.

This standalone repository implements three coherent vertical slices: complete-car motion through wheel rotation; learning-quality and experimental-science infrastructure; and a high-school-first garage/proving-ground progression. It includes a 12-module aligned syllabus, the real E34-family learning path, compatibility-based upgrade branches, adjustable ramp/impact/drop telemetry labs, separate mathematics mastery, error diagnosis, estimation gates, model assumptions and fidelity levels, replay/time controls, data import, a notebook, typed physical quantities, reproducible problem generation, and physics validation benchmarks.

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

The interactive laboratory shell remains a calibrated visualization proxy, not production body geometry. The homepage and garage use an attributed real CC BY 525i model render, and `docs/vehicle/OPEN_MODEL_RESEARCH.md` records the selected downloadable mesh candidate and authenticated acquisition requirement. See `docs/PROJECT_STATUS.md` for current fidelity and open work.
