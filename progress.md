Original prompt: Build a serious, high-fidelity, web-based interactive physics learning application centered initially on the exact 1995 BMW 525i E34 sedan. Research and implement the first coherent vertical slice: complete car -> motion -> wheels -> basic forces, with prerequisite mastery, progressive unlocking, provenance, simulation, testing, and professional engineering documentation.

## 2026-09-01

- Audited an empty repository and established Node 22.22.0 / npm 10.9.4.
- Read the full execution objective and relevant architecture, vehicle, source, 3D, simulation, and vertical-slice requirements.
- Extracted the 472-page Bentley E34 service manual and visually inspected its cover and engine specification table (physical PDF page 43, printed section 100-1).
- Confirmed that the supplied manual is an independent Bentley repair reference, not a BMW factory manual.
- Researched BMW Group Classic, MIT OpenCourseWare, OpenStax, Vite, React Three Fiber, Three.js, and Zustand primary/official sources.
- Selected a Vite + React 19 + TypeScript + React Three Fiber 9 architecture with a framework-independent deterministic simulation core.
- Completed source, curriculum, vehicle, component, and progression registries with provenance and confidence states.
- Implemented four predict-run-measure motion investigations covering displacement, average speed, signed velocity, graph interpretation, and acceleration.
- Added a multidimensional mastery engine, explicit lock explanations, persistent learner state, guided driving, four-wheel selection, two wheel checkpoints, live wheel telemetry, and an exploded-wheel view.
- Added the dual curriculum/vehicle knowledge maps, curriculum audit, architecture records, source registry, asset pipeline, simulation design, and service-manual ingestion notes.
- Verified the deterministic physics and progression engines with 7 unit tests; TypeScript checking and the production build pass.
- Verified the full browser path from a fresh learner through the motion gate, persistent driving unlock, acceleration, wheel checkpoints, telemetry, exploded view, and knowledge map with no browser console errors.
- Corrected the final guided-drive viewport defect found during full-page screenshot review.
- Remaining production work: licensed or measured E34 geometry, primary US-market specification sources, broader assessment coverage, deeper force/tire/drivetrain models, route-level code splitting, and account-backed state.

## 2026-09-01 — learning-quality expansion

- Added a separate 22-node mathematics prerequisite graph with contextual E34 modules and independent persisted evidence.
- Added categorized assessment diagnostics so conceptual, sign, arithmetic, unit, model, and equation-manipulation errors lead to different remediation.
- Added an estimation/plausibility gate before all four exact motion calculations.
- Added typed physical quantities, unit conversion, dimension checking, uncertainty/source/frame metadata, and reproducible seeded motion problems.
- Added an explicit five-level model hierarchy. Idealized, intermediate, and engineering levels now change longitudinal road-load behavior; unavailable deeper levels are labeled architecture targets.
- Added an assumption inspector, time scaling, pause/resume, frame stepping, history scrubbing, vector/energy overlays, and adaptive `Explain this moment` text.
- Added the nine-stage scientific-method workspace, safe stationary-wheel prediction/simulation/measurement comparison, residual reasoning, CSV import, and real-E34 dataset contract.
- Added a persistent physics notebook, diagnostic trail, progressive equation library, contextual search, and capstone architecture.
- Added `Start E34 Physics Lab.command` and a clear `file://` fallback page so the Vite app is no longer mistaken for a directly opened static HTML file.
- Expanded automated validation from 7 to 12 unit tests. Typecheck, tests, and production build pass in the stable verification copy.
- Full browser journey passed after correcting model-level hydration across reloads. It now covers estimation, motion, model selection, driving, wheel telemetry, the scientific-method import, and notebook persistence with zero console errors.
- Visually inspected the new laboratory, experimental-method, and notebook states; layout and content are readable at 1440 × 900.
- Created the standalone private GitHub repository at `https://github.com/RRG314/e34-physics-laboratory`, pushed `main`, and added project topics.
- Started the repository development server at `http://127.0.0.1:5173/`, opened it in the app browser, and corrected the narrow-screen landing/navigation layout found there.
- A separate GitHub Projects board remains pending because the current GitHub CLI token lacks `project` and `read:project` scopes.
- Remaining roadmap work: real-E34 dataset capture, calibrated parameters, deeper domain solvers/overlays, executable capstones, derivation trees, semantic search, route-level code splitting, and independent experimental validation.

## 2026-09-02 — curriculum and game-concept R&D

- Replaced the college-level starting language with a high-school-first course architecture.
- Researched and documented OpenStax High School Physics, NGSS, AP Physics 1/2, Common Core mathematics, AP Precalculus/Calculus, MIT OCW, Modeling Instruction, PhET, active learning, IES study guidance, CAST UDL, Quality Matters, and cautious mastery-learning evidence.
- Added a canonical 12-module syllabus from measurement through graduate experiment design. Each module aligns a driving question, measurable outcome, substantial mathematics, vehicle system, investigation, misconception check, assessment, standards, and unlock.
- Defined a mandatory nine-part lesson quality contract to prevent disconnected content accumulation.
- Reframed the game loop as `learn → predict → test → explain → certify → install → prove → retrieve later`, with compatibility-constrained modification branches rather than generic XP.
- Expanded the vehicle pathway to the real E34 family: 518i, 520i, 525i, 525iX/Touring branches, 530i, 535i, 540i, market-specific 540i M-Sport, and M5. The mapping follows added system/modeling complexity rather than price or horsepower alone.
- Added a virtual proving ground with adjustable ramp, impact-pulse, and ideal-drop scenarios, synchronized graphs, equations, assumptions, and a prominent simulation-only safety boundary.
- Added pure/tested ramp, impulse, and drop solvers; unit coverage now totals 15 passing tests.
- Researched open E34 geometry through the official Sketchfab API. Selected a CC BY 525i candidate and replaced the homepage's schematic hero with its attributed high-resolution reference render; authenticated archive acquisition remains required before integrating the actual mesh.
- Visually inspected the homepage, garage, course, and proving-ground pages at 1280 × 720. The full fresh-learner browser progression passed on the production preview.
- Cleared only regenerable npm and test/build caches after local free space fell below the amount required for browser verification.
