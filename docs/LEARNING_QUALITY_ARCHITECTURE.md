# Learning quality and experimental-science architecture

## Integrated graphs

Physics concepts remain in the curriculum graph. Mathematics now has a separate directed graph because mathematical readiness and physical understanding are different evidence. Each mathematics node links to the physics concepts that need it. A contextual module can be launched at the point of failure and returns the learner to the original vehicle problem.

## Diagnostic evidence

Assessment events record the response, concept, error category, remediation, optional mathematics concept, and timestamp. A wrong sign therefore produces sign-convention remediation; an arithmetic failure produces a short mathematics intervention. Correct numerical output is still accompanied by conceptual, prediction, graph, measurement, or application evidence rather than treated as universal mastery.

## Models and representations

The simulation exposes a five-level hierarchy: idealized, intermediate, engineering approximation, high-fidelity numerical, and experimental comparison. The first three are executable. Each profile declares assumptions, neglected effects, governing equations, numerical method, timestep, validity, limitations, confidence, and parameter provenance.

Time controls and history are owned by the deterministic simulation core. 3D behavior, vector or energy overlays, numerical instruments, equations, explanations, and replay all consume the same snapshot.

## Experimental data contract

`MeasurementDataset` captures samples plus instrument, calibration, frame, coordinate system, metadata, source, timestamp, uncertainty, and safety classification. The intended pipeline is:

`prediction → simulation → real measurement → residual → explanation → model revision`

The first UI experiment is deliberately stationary and low-risk. Moving-vehicle measurements must be passenger-collected or logged without driver interaction.

## Digital-twin boundary

Imported measurements can eventually calibrate effective rolling resistance, drag, or drivetrain loss. A fitted model remains a calibrated approximation with fit statistics and uncertainty. It must not be called an exact digital twin without independent validation.

## Mapped future capabilities

The current schemas support capstones, whole-car synthesis, equation derivation trees, additional force/thermal/fluid/electrical/signal overlays, comparative and counterfactual experiments, and semantic Physics ↔ Vehicle search. These remain roadmap items until their solvers, content, and validation benchmarks exist.
