# Project status

Last reviewed: 3 September 2026

Current stage: research prototype

E34 Physics Laboratory has a working browser application and a coherent direction, but it is not yet a complete course or a validated digital twin. This page is the plain-language boundary between what someone can use now, what has only been designed, and what still needs evidence.

## What works now

The current build supports a first learning journey through motion and wheel rotation. A new learner can:

- investigate position, displacement, speed, velocity, acceleration, and motion graphs through qualitative estimates, entered calculations, and graph-reading checks;
- complete a scaffolded wheel-and-tire mathematics investigation using free-response quantities, unit conversion, circle geometry, RPM, and an interactive model-comparison graph;
- make a qualitative prediction before calculating and running an experiment;
- unlock guided driving after showing several kinds of evidence;
- select individual wheels and connect road speed to circumference, angular velocity, RPM, and revolutions;
- run idealized ramp, impact-pulse, and drop experiments with synchronized plots;
- compare model assumptions, import simple measurements, and save notebook entries locally;
- inspect the proposed curriculum, 525i model-fidelity progression, prerequisite map, and evidence boundary.

The application also distinguishes conceptual, arithmetic, sign, unit, model-selection, and algebra errors. Progress is recorded across explanation, calculation, prediction, graph reading, and application instead of being reduced to a single completion flag.

## Maturity by area

| Area | Current maturity | What that means |
| --- | --- | --- |
| High-school mechanics sequence | Working opening chapter | Motion and introductory rotation are playable; later mechanics chapters remain planned |
| Broader curriculum | Structured design | Twelve modules and their prerequisites are mapped, but most are not yet lessons |
| Physics models | Educational prototypes | Core analytical cases are tested; road-load and crash models are simplified and uncalibrated |
| E34 vehicle data | Mixed evidence | Several engine and transmission facts are sourced; mass, dimensions, gearing, and dynamics data still need variant-specific confirmation |
| Vehicle graphics | Licensed interactive 525i teaching mesh | Detailed and selectable, but not factory CAD or measured production geometry |
| Learning effectiveness | Not yet established | The design follows published practice, but no learner study has demonstrated outcomes |
| Persistence | Local browser storage | There are no accounts, cloud sync, or remote learner analytics |
| Hosting | Static build | GitHub Pages and local static serving require no application backend |
| Accessibility | Partial | Ordinary controls and text state exist, but a full keyboard and assistive-technology audit is still required |

## Vehicle evidence

The reference configuration is a US-market 1995 BMW 525i E34 with a manual transmission. The current source record supports the M50TU/M50B25TU engine family, 2,494 cm³ displacement, period US output figures, and the Getrag S5D 250 G application and ratios. These facts are useful anchors, not permission to assume that every E34 shares the same specifications.

The exact example-car mass, dimensions, factory wheel and tire fitment, final-drive ratio, suspension rates, damping, center of gravity, frontal area, and drag coefficient remain provisional or unresolved. Other E34 variants shown in earlier planning are now research candidates, not teaching vehicles. See [Vehicle data](VEHICLE_DATA.md) and the [vehicle evidence plan](VEHICLE_EVIDENCE_PLAN.md).

## Important limitations

- Driving is presently a controlled longitudinal experiment, not a tire-force or handling simulation.
- Ramp and drop modes are idealized teaching models. The impact mode uses an adjustable pulse, not a structural crash or injury model.
- Road-load coefficients are sensitivity-study values and have not been calibrated against a real E34.
- Wheel rolling assumes no slip and begins with nominal unloaded tire geometry.
- The opening motion gate now separates estimation, entered calculation, and graph-reading evidence, but it still needs generated variants, written explanation, transfer, and delayed retrieval before it can support a strong mastery claim.
- Mastery thresholds are unvalidated design hypotheses. The current build should be read as evidence-gated progression, not a psychometrically validated assessment.
- Most mathematics cards are an honest roadmap only. They are labeled as planned and award no evidence; the wheel-and-tire investigation is the first implemented mathematics sequence.
- The curriculum map extends far beyond the amount of finished teaching content.
- Local progress can be cleared by the browser and does not transfer between devices.
- The hosted copy is not yet an installable offline web app; offline use currently means running the static build locally after dependencies have been installed.
- The project must not be used for vehicle repair, road safety, crash prediction, or engineering certification.

## What would justify the next release

Version 0.2 should deliver a complete, teachable high-school mechanics arc rather than another broad set of placeholders. That means connected chapters on measurement, motion, forces, energy, momentum, and rotation; worked mathematics and practice; useful feedback and remediation; reviewed sources; accessible interaction paths; and evaluation with real learners.

Software passing its tests is necessary, but it will not by itself establish that the course teaches effectively. The [educational audit](EDUCATIONAL_AUDIT.md), [roadmap](ROADMAP.md), and [research methods](RESEARCH_METHODS.md) describe both kinds of work.
