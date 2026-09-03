# Vehicle scope for the first production release

Last reviewed: 3 September 2026

## Release decision

The production course uses one vehicle: a 1995 US-market BMW 525i sedan with a five-speed manual transmission.

The learner keeps this car from the opening high-school lessons through university and research-level work. Progression comes from better questions, stronger mathematics, more complete component models, and better evidence. It does not come from replacing the car with a higher-performance badge.

Other E34 configurations are future work. They are not selectable vehicles, grade levels, or promised features in the first release.

## How the same car supports increasing depth

| Stage | Representation of the 525i | What the learner adds |
| --- | --- | --- |
| Visual reference | Licensed sedan mesh | Observation, coordinates, units, and component location |
| Model A | Point mass and idealized wheels | Algebra, graphs, motion, forces, energy, and momentum |
| Model B | Connected vehicle systems | Rotation, gearing, braking, suspension, heat, circuits, and uncertainty |
| Model C | Calibrated configuration | Calculus, parameter fitting, residuals, sensitivity, and validation |
| Research vehicle | One identified and measured 525i | Experimental design, state estimation, uncertainty propagation, and falsification |

This structure lets a learner revisit the same ramp, brake, wheel, or suspension system with more powerful tools. Familiarity with the car reduces needless context switching while the physics becomes more demanding.

## Evidence boundary

Every quantitative lesson must make one of these two claims clear:

1. **General physics using the 525i as the visible system.** Mass, angle, speed, surface, or other values are declared model inputs. The result demonstrates the model and is not presented as measured performance of a real 525i.
2. **A claim about the selected 525i configuration.** Every required value must have a source or measurement, units, configuration applicability, evidence status, and a stated limitation where needed.

The licensed 3D model supports recognition and interaction. It is not a dimensional scan and must not be used as measurement evidence. The supplied service manual supports selected specifications and system understanding; its copyrighted pages are cited but not redistributed.

## Data needed for the 525i

The current record verifies the engine identity, displacement, period US power and torque figures, manual gearbox application, and gearbox ratios. It does not yet justify every dynamics value a complete digital vehicle model would need.

Work should be driven by the next lesson rather than by an attempt to fill an enormous vehicle database. The near-term priorities are:

- exact mass and test condition for configuration-specific impact or acceleration claims;
- factory tire fitment and effective rolling radius for wheel-speed work;
- final-drive ratio for complete engine-to-road calculations;
- dimensional reference points for geometry-based investigations;
- measured braking, coast-down, suspension, and thermal datasets when those chapters are built.

Until those records exist, the application should keep the relevant values editable and label them as declared inputs, estimates, or values needing measurement.

## Release checklist

The first production release is ready only when:

- every learner-facing course stage names the same 525i;
- no other E34 configuration appears as an unlock or academic rank;
- each lesson distinguishes general-model inputs from vehicle-specific evidence;
- all displayed quantities include units and evidence status where applicable;
- the 525i visual attribution and adaptation notes remain available offline;
- tests cover calculations, curriculum-data integrity, the learning gate, driving, and static hosting;
- the public documentation describes present capabilities without promising future vehicles.

## Later vehicle work

Another E34 should be added only when it enables a clear comparison that cannot be taught as well with the 525i alone. That work will require its own exact configuration, lesson parameters, legally redistributable visuals, and validation. It is intentionally outside the first production release.

## Primary vehicle references

- **BMW 5-Series (E34) Service Manual: 1989–1995**, Bentley Publishers, user-supplied PDF. Facts and page references only; pages are not redistributed.
- [BMW 525i (E34)](https://www.bmwgroup-classic.com/en/models/bmw-classics/product-description-page.ad-152-1.bmw-525i-e34.html), BMW Group Classic / BMW Group Archive.
- [BMW 525i e34 | Project Zomboid](https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb), Uralvagonzavod on Sketchfab, licensed CC BY 4.0 and adapted for the interactive visual.
