# Knowledge graph

The machine-readable graph is `src/data/curriculum.ts`. Tests reject missing prerequisite identifiers and cycles.

## Implemented spine

```text
units ─┬─> coordinates ─> position ─> displacement ─┐
       └─> distance + time ─> speed ────────────────┴─> velocity ─> acceleration
                                                        │              ├─> Newton's laws
                                                        │              └─> motion mastery ─> drive access
                                                        │                                  └─> wheel geometry
                                                        └─────────────────────────────────────> angular motion

Newton's laws + angular motion -> friction -> torque
```

`motion-mastery` is an assessment gate rather than a content lecture. It requires the learner to predict, run, and interpret complete-car experiments.

## Planned branches

- Mechanics: force -> work/energy -> momentum -> rigid-body rotation -> analytical mechanics.
- Thermal/fluids: pressure and temperature -> gas laws -> thermodynamics -> heat transfer/fluid mechanics -> combustion and cooling approximations.
- Electrical: charge -> voltage/current -> circuits -> fields -> induction -> starter/alternator/sensors.
- Waves/controls: oscillation -> waves -> Fourier concepts -> signals -> control systems -> diagnostics.
- Materials: stress/strain -> elasticity/plasticity -> fatigue/contact/tribology -> continuum models.

Branches reconnect through shared authoritative state. For example, road speed drives wheel rotation; brake work creates thermal input; alternator speed derives from engine speed rather than being separately authored.
