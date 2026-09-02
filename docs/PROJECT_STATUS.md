# Project status

Status date: 2026-09-01

## Working vertical slice

The application supports an initial learner moving from observation of the complete car through four motion investigations. Passing the multidimensional motion gate unlocks guided driving and four selectable wheels. Two wheel checkpoints then unlock live circumference, angular velocity, RPM, and revolution telemetry from a shared canonical radius and road speed.

Mastery is represented as evidence across conceptual understanding, calculation, prediction, graph interpretation, and application—not a single completion flag. Every blocked capability explains its unmet prerequisites and the vehicle behavior that will become available.

The learning-quality expansion adds:

- A separate 22-node mathematics prerequisite graph with contextual just-in-time modules.
- Diagnostic classification of conceptual, arithmetic, sign, unit, model-selection, and mathematical-manipulation failures.
- Qualitative estimation before each exact motion calculation.
- Idealized, intermediate road-load, and engineering-approximation model levels with an inspectable assumption hierarchy.
- Pause, slow motion, real time, accelerated time, frame stepping, replay scrubbing, vector/energy representations, and `Explain this moment`.
- A nine-stage scientific-method workspace, safe stationary-wheel comparison, CSV measurement import, residual analysis, and future real-E34 dataset schema.
- Persistent notebook, diagnostic trail, and progressively unlocked equation library.
- Typed quantities, dimensions, uncertainty and reference-frame metadata, reproducible seeded problem generation, and 12 automated physics/learning-quality tests.

## Evidence maturity

Verified now:

- 1993-on E34 525i use of the M50TU with intake VANOS.
- 2494 cm3 displacement.
- US repair-manual ratings of 188 hp at 5900 rpm and 184 lb-ft at 4200 rpm.
- Getrag S5D 250 G application from 7/1992 and its five forward ratios.

Provisional or unresolved:

- US equipment-specific curb mass and body dimensions.
- Factory wheel/tire fitment for the exact example car.
- Final-drive ratio.
- Suspension rates, damping, center of gravity, frontal area, and model-specific drag coefficient.

## Visual fidelity

The current exterior is a dimensionally scaled procedural visualization proxy. It deliberately includes E34-recognizable proportions and features—three-box body, long hood, four doors, upright greenhouse, twin round lamps, kidney grille, lower black rub strips, and four independently selectable wheels—but it is marked `PLACEHOLDER` because the surface geometry has not been validated against owner measurements or licensed CAD/scan data.

## Known limitations

- Driving is a controlled one-dimensional kinematics experiment, not a tire-force vehicle-dynamics model.
- Intermediate and engineering road-load coefficients are provisional sensitivity-study values, not calibrated real-E34 performance parameters.
- Wheel rolling assumes no slip and uses unloaded nominal radius.
- Mastery evidence is deliberately compact and deterministic for this vertical slice; it validates the non-binary progression architecture but is not yet a complete course or psychometric model.
- The production bundle currently includes the Three.js scene on initial load and should be route-split as the laboratory expands.
- The supplied Bentley manual is OCR-scanned; structured extraction requires human verification against rendered pages.
