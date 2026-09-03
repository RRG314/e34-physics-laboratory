# Vehicle data and visual assets

## Reference vehicle

The first detailed configuration is a United States-market 1995 BMW 525i E34 sedan with a five-speed manual transmission. European figures and automatic-transmission data are not silently merged into this record.

### Verified working data

| Item | Value | Applicability and source |
| --- | --- | --- |
| Engine | M50TU/M50B25TU inline-six with intake VANOS | 1993-on 525i; BMW Group Classic and Bentley manual |
| Displacement | 2,494 cm³ | E34 525i M50 era; BMW Group Classic and Bentley manual |
| Compression ratio | 10.5:1 | US 1993-on 525i; Bentley manual, section 100-1 |
| Rated power | 188 hp SAE net at 5,900 rpm | US reference; Bentley manual, section 100-1 |
| Rated torque | 184 lb-ft SAE net at 4,200 rpm | US reference; Bentley manual, section 100-1 |
| Manual gearbox | Getrag S5D 250 G | 525i from July 1992; Bentley manual, sections 200-2 and 230-1 |
| Forward ratios | 4.20, 2.49, 1.66, 1.24, 1.00 | S5D 250 G; Bentley manual, section 200-2 |

[BMW Group Classic's 525i page](https://www.bmwgroup-classic.com/en/models/bmw-classics/product-description-page.ad-152-1.bmw-525i-e34.html) confirms the September 1992 introduction of the M50TU with intake VANOS and lists the 2,494 cm³ displacement. Its output figure reflects a different market convention; the US-oriented Bentley value is used for the selected configuration.

### Still provisional

Overall dimensions, equipment-specific curb mass, factory wheel and tire fitment, final-drive ratio, spring and damper rates, center of gravity, frontal area, and model-specific drag remain provisional or unresolved. The application's current 205/65 R15 wheel is an explicit teaching assumption, not a claim about every 1995 525i.

## Release scope

The first production release is deliberately limited to the selected 525i. Other E34 configurations are future work and do not appear as teaching vehicles, because the repository does not yet contain equally complete configuration records and approved visuals for them. The [vehicle evidence plan](VEHICLE_EVIDENCE_PLAN.md) defines what the 525i can honestly support now and what still needs to be measured or sourced.

## Current visuals

The interactive laboratory uses an adapted copy of **BMW 525i e34 | Project Zomboid** by [Uralvagonzavod](https://sketchfab.com/UVZZZ). The [Sketchfab model page](https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb) reports a Creative Commons Attribution 4.0 license. The same work supplies the homepage image, so the opening view and interactive vehicle now share one visual source.

The downloaded multi-vehicle scene was reduced to one white 525i sedan. Its body and wheel were aligned to the laboratory axes, the source display floor and unused variants were removed, and the wheel was separated so four instances can rotate, be selected, and move outward in the first exploded-view lesson. The rendered scale is set from the laboratory's documented unloaded-wheel-radius assumption.

This is a visual teaching mesh, not a metrology model or a verified digital replica of a particular VIN. Its panel geometry, wheelbase, track, materials, interior, and movable-part pivots have not been checked against factory CAD or physical measurements. Physics calculations continue to use the sourced and explicitly provisional values in the vehicle record rather than dimensions inferred from the mesh. Adaptation and licensing details are recorded in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) and beside the model files.

## Contributing owner references

Reference photography is most useful when taken on a level surface with diffuse light, a fixed focal length where practical, and a scale object in the scene. A complete exterior set includes centered front, rear, and side views; consistent three-quarter views; wheel and tire markings; and clearly defined measurement points.

Never work under an unsupported vehicle, use the factory jack as a work stand, run an engine in an enclosed space, or dismantle a safety-critical system for this project. Existing service work performed with appropriate equipment is the right opportunity to document inaccessible areas.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for submission and privacy requirements and [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) for attribution.
