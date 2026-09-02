# Progression architecture

## Principle

Physics understanding changes what the learner can physically do with the E34. A checkpoint is meaningful only when it reveals a new action, instrument, model layer, or system relationship.

## Core spine

The minimum early spine is measurement and units -> coordinates -> position -> distance/time -> displacement -> speed -> velocity -> acceleration. The first capability gate samples calculation, signed-direction understanding, graph interpretation, prediction, and experimental verification. It does not use XP.

After complete-car kinematics, basic wheel inspection opens. Wheel circumference and `v = rω` form the next gate; passing it reveals live angular telemetry and the first staged exploded view. Force/friction and torque are the next mechanics branch.

## Dual graph

The knowledge graph stores concepts and depth treatments. Edges encode required prerequisites plus future reinforcement and generalization relationships. The vehicle graph stores assemblies/components and physical edges such as `contains`, `drives`, `supports`, and `transfers-force-to`. Component `conceptAccess` mappings form the cross-graph edges.

Navigation therefore works in both directions:

- Physics -> vehicle: angular motion is demonstrated by all four wheels and later the crankshaft/drivetrain.
- Vehicle -> physics: a rear driven wheel exposes circumference first, then angular motion, friction, and torque as mastery permits.

## Mastery model

Each concept tracks exposure, conceptual understanding, calculation, graph interpretation, prediction, measurement, experiment, application, diagnosis, modeling, derivation, validation, confidence, attempts, recent performance, and last use. A target declares only the dimensions it actually needs.

Current thresholds use a 0-1 scale. For example, controlled driving requires speed calculation 0.65, velocity conceptual understanding 0.65, acceleration prediction 0.65, and acceleration graph interpretation 0.45. Thresholds are curriculum decisions and must be validated against learner evidence; they are not points totals.

Retention is lightweight. Recent performance and `lastUsed` identify a weak prerequisite. A later activity can recommend a focused wheel or motion refresher without revoking all access or restarting a chapter.

## Branching rules

- Required concepts block only academically invalid jumps.
- Recommended reinforcement improves retention but does not block.
- Optional enrichment offers alternate E34 contexts.
- Advanced specialization is excluded from the general spine.
- Cross-domain systems require multiple branches: alternator depth needs rotation, circuits, magnetism, and induction; braking depth needs force, torque, friction, energy, and pressure.

## Academic depth

- First year: predict a simple outcome with a supplied model and verify it.
- Undergraduate: choose/derive relationships and handle interacting variables.
- Graduate: construct a coupled model and justify approximations.
- Research: decide what to measure, compare models, analyze residuals/uncertainty, and judge adequacy.

Velocity is one concept with four treatments, not four disconnected lessons. Instructional scaffolding falls with tier: equation supplied -> equation selected/derived -> model constructed -> experiment and validation strategy designed.

## Physical capability sequence

| Understanding | Capability |
| --- | --- |
| Complete-car kinematics across required mastery dimensions | Controlled guided driving; basic wheel selection |
| Circumference and linear/angular relation | Wheel telemetry and staged wheel explosion |
| Newton's laws, friction, applied angular motion | Surface/grip experiments |
| Torque, angular motion, friction | Drivetrain torque path |
| Future: energy/work | Power-flow overlay |
| Future: pressure | Tire/brake/fluid pressure instruments |
| Future: oscillation + signals | Suspension waveforms and diagnostic FFT |

## Why locked

Every locked target is inspectable. The progression service returns the concept, mastery dimension, current value, threshold, and physical effect. Missing prerequisites link back to their concept path. UI pages do not duplicate gate logic.

## Progression service

`src/domain/progressionEngine.ts` implements concept, component, instrument, experiment, depth, missing-prerequisite, recommendation, newly unlocked capability, weak prerequisite, and vehicle-example queries. `src/data/progression.ts` owns target requirements.
