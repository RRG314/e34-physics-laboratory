# Architecture

## Decision summary

The first release is a client-side TypeScript application built with Vite, React 19, React Three Fiber 9, Three.js, and Zustand. The 3D render loop and numerical simulation are not driven by React rerenders. React owns navigation and presentation; the simulation core owns authoritative time-dependent state.

This structure favors an immediately testable laboratory over a server-rendered shell. A future backend can synchronize learner state and authored content without moving the simulation into UI components.

## Boundaries

| Boundary | Owns | Must not own |
| --- | --- | --- |
| Data registries | Vehicle facts, concepts, components, evidence | Mutable simulation state |
| Curriculum domain | Prerequisites, access, mastery rules | Rendering |
| Physics core | Equations and deterministic solvers | Browser APIs |
| Simulation bus | Position, velocity, acceleration, wheel angle, time | Navigation or lesson copy |
| Learner store | Mastery, unlocks, selected component, preferences | Numerical integration |
| Renderer | Scene graph, camera, materials, selection | Canonical vehicle constants |
| UI | Navigation, labs, equations, feedback | Duplicated physics constants |

## State flow

`canonical registries -> curriculum/store configuration -> simulation inputs -> authoritative simulation state -> renderer + instruments`

The same vehicle velocity feeds the car translation, wheel angular velocity, numeric instruments, graph, and text-state test hook.

## Rendering

React Three Fiber is used because it is a maintained React renderer for Three.js, supports direct scene-graph composition and raycast pointer events, and keeps per-frame mutation inside `useFrame`. WebGL is the baseline. WebGPU is deferred until the Three.js/R3F path is no longer described as incomplete and the feature matrix is sufficient.

glTF/GLB is the production delivery format. The procedural shell establishes naming, transform, selection, material, and LOD contracts while licensed or owner-captured geometry is developed.

## Persistence

Learner state is persisted to local storage under a versioned key. Simulation transients are intentionally not persisted. A reset command returns the user to a reproducible new-learner state.

## Performance budgets

| Target | Draw calls | Runtime triangles | Texture memory | Frame target |
| --- | ---: | ---: | ---: | ---: |
| Desktop | <= 350 | <= 1.2 M | <= 256 MB | 60 fps at 1440p |
| Midrange mobile | <= 180 | <= 400 k | <= 96 MB | 45 fps at device resolution |
| Low-power fallback | <= 80 | <= 120 k | <= 48 MB | 30 fps at reduced DPR |

The initial proxy is far below these geometry budgets. Production assets will use mesh compression, KTX2 textures, geometry instancing, and meaningful LOD groups.

## Accessibility and testability

Every canvas-only interaction has a DOM control or text-state equivalent. `window.render_game_to_text()` exposes concise current state for browser automation. `window.advanceTime(ms)` advances simulation deterministically. Fullscreen uses `F`; Escape exits through the browser fullscreen API.
