# 3D asset pipeline

## Stages

1. Reference registry: licensed drawings, owner images, measurements, and applicability metadata.
2. High-resolution source: non-destructive Blender files in vehicle coordinates, real-world meters.
3. Semantic hierarchy: body, glazing, lamps, wheels, steering, suspension, drivetrain, engine, and service assemblies with stable component IDs.
4. Validation: wheelbase, track, overhang, ride height, aperture and component relationship checks against sources.
5. Runtime optimization: LODs, instancing, baked/trim materials, mesh compression, KTX2 textures.
6. glTF/GLB export: transforms frozen where appropriate, PBR material slots, collision/selection proxies, animation clips, metadata manifest.
7. Automated checks: dimensions, missing IDs, texture budgets, triangle/draw-call budgets, animation bounds, and screenshot regressions.

## Coordinate convention

Meters; X points vehicle-forward, Y points up, Z points vehicle-left. The vehicle origin is the ground-plane projection of the front-axle centerline in source assets; runtime placement may use an explicit root transform.

## Current proxy

The procedural shell proves component naming, wheel transforms, selection, materials, camera behavior, and motion coupling. It is not a substitute for final exterior geometry and remains tagged `PLACEHOLDER`.
