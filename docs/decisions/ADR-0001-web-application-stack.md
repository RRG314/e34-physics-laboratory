# ADR-0001: Web application stack

Status: accepted, 2026-09-01

## Context

The laboratory needs a persistent multi-page UI, interactive 3D, deterministic simulation, local learner state, and browser automation. It does not initially need server rendering or public content indexing.

## Decision

Use Vite, React 19, TypeScript, React Three Fiber 9, Three.js, and Zustand. Keep equations and solvers framework-independent. Use React Router for application areas and glTF/GLB as the production asset format.

R3F's official documentation describes it as a React renderer for Three.js, supports raycast pointer events and per-frame mutation outside ordinary React state, and pairs major version 9 with React 19. Vite supplies the TypeScript/React development and production pipeline. Zustand's persistence middleware supports local storage for learner state.

## Consequences

- Fast client-side iteration and an explicit render-loop boundary.
- Browser features require client execution; a future content/backend layer is separate.
- WebGL is the default renderer. WebGPU is experimental and not a release dependency.
- Simulation accuracy depends on project solvers and validation, not the 3D engine alone.
