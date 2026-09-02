# Research and evidence methods

## Why provenance is part of the product

Vehicle specifications vary by market, model year, transmission, body style, option package, and production date. Educational claims also vary in strength. The project records where a claim came from, what it applies to, and how confidently it can be used.

Values in the application carry one of these states:

- **Verified** — supported by an applicable source and checked for context.
- **Provisional** — supported, but not yet by the preferred source or exact configuration.
- **Estimated** — derived from stated inputs and a reproducible method.
- **Needs measurement** — expected to vary by the individual vehicle.
- **Needs source** — deliberately left unresolved.
- **Placeholder** — present to support interface or software work and not evidence about the car.

## Source hierarchy

Manufacturer archives and applicable factory records are preferred for production facts. Independent technical manuals can provide valuable service data but are identified as independent sources. Open textbooks and university course materials inform academic scope. Peer-reviewed studies and evidence syntheses inform learning claims.

Commercial specification sites, forum posts, and unsourced tables may help locate a better source, but they do not settle an important parameter by themselves.

The privately supplied Bentley E34 service manual is used as an independent technical reference. It is not a BMW factory manual and is not distributed in this repository. Candidate facts are found through OCR and then checked against the rendered page, table headings, units, footnotes, and model applicability.

## Vehicle measurements

A useful measurement submission includes:

- vehicle model, market, production period, body style, transmission, and relevant options;
- the quantity, unit, instrument, method, and environmental or operating conditions;
- uncertainty or repeatability information;
- enough photographs or notes to reproduce the setup;
- a clear statement of rights for any media or dataset being contributed.

Personal information should be removed. VINs, number plates, addresses, faces, keys, and precise location metadata are not needed for most research questions.

## Simulation validation

Simple analytical models are preferred when they answer the learning question. Numerical complexity is added only when it introduces a meaningful physical effect.

Every assessed model should declare its equations, parameters, units, coordinates, assumptions, omissions, valid range, and source record. Validation begins with analytical cases, dimensions, signs, limiting behavior, and conservation laws. More advanced models also need timestep or mesh convergence, comparison with independent data, residual analysis, and a validation set that was not used for calibration.

A model that fits one dataset is not automatically an exact digital twin. The project reserves that language for a model with documented calibration, independent validation, uncertainty, and a defined relationship to a particular physical vehicle.

## Educational research

Future learner studies should publish their question, protocol, measures, inclusion criteria, analysis plan, and limitations. Research involving people requires appropriate consent, privacy protection, and institutional review where applicable. The repository must not contain identifiable learner records.

Meaningful outcomes include conceptual understanding, transfer, model selection, graph interpretation, experimental reasoning, delayed retention, and the ability to explain uncertainty. Usage and completion measures can support the analysis but cannot establish learning on their own.

## Principal references

- [OpenStax High School Physics](https://openstax.org/books/physics/pages/preface)
- [Next Generation Science Standards: High School Forces and Interactions](https://www.nextgenscience.org/topic-arrangement/hsforces-and-interactions)
- [College Board AP Physics 1](https://apcentral.collegeboard.org/courses/ap-physics-1)
- [MIT 8.01SC Classical Mechanics](https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/syllabus/)
- [Carnegie Mellon: aligning assessments, objectives, and instruction](https://www.cmu.edu/teaching/assessment/basics/alignment.html)
- [IES practice guide on instruction and study](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)
- [CAST Universal Design for Learning Guidelines](https://udlguidelines.cast.org/)
- [BMW Group: 5 Series heritage](https://www.press.bmwgroup.com/usa/article/attachment/T0079416EN_US/118688)
- [BMW M: the E34 M5](https://www.bmw-m.com/en/topics/magazine-article-pool/the-bmw-m5-of-1988.html)

