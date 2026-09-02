# Instructional-design R&D decision record

## Decision

The laboratory will not grow by adding disconnected lesson cards. It uses a backward-designed, standards-anchored course spine with an explicit knowledge graph underneath it.

The first complete spine is a high-school course, not first-year university physics. OpenStax *Physics* provides the chapter sequence, NGSS provides performance expectations and scientific practices, and Common Core high-school mathematics provides the supporting math categories. AP Physics 1/2 and AP Precalculus/Calculus extend the high-school pathway; MIT OpenCourseWare supplies the university and graduate direction.

There is no defensible single “best curriculum for every learner and every year.” The product therefore combines authoritative scope documents with evidence-informed instructional practices and will validate outcomes with learner data rather than marketing the source list as proof of effectiveness.

## Course architecture

The canonical order is:

1. Measurement, units, and uncertainty
2. One-dimensional motion
3. Forces and Newton's laws
4. Circular and rotational motion
5. Momentum, impulse, and impact safety
6. Work, energy, and power
7. Thermal physics
8. Waves, sound, and vibration
9. Electricity, circuits, and magnetism
10. AP integrated mechanics studio
11. Calculus-based vehicle dynamics
12. Research-grade digital twin

The vehicle pathway is granular and tied to real distinctions in the E34 family: 518i → 520i → 525i, then the 525iX/Touring branches, 530i, 535i, 540i, the market-specific 540i M-Sport package, and M5. The sequence is pedagogical rather than chronological or a simple horsepower ladder. The 530i is especially useful because the E34 badge crossed from an early six-cylinder to a later V8, forcing learners to identify model year and evidence instead of treating a badge as a physical specification. These vehicles are motivational models, never claims that physical laws differ by trim.

## Mandatory lesson contract

Every lesson record must contain:

- prerequisite concepts and a prior-knowledge diagnostic;
- one observable outcome and learner-visible success criterion;
- a vehicle phenomenon and driving question;
- linked verbal, graphical, mathematical, and physical representations;
- a worked example followed by faded support;
- a prediction before the simulation runs;
- a known misconception and targeted feedback response;
- a formative check and a transfer assessment in a changed context;
- a delayed retrieval checkpoint;
- the capability, instrument, part, or facility the evidence unlocks;
- sources, assumptions, applicability, and model limitations.

This is enforced as a content schema before a future lesson-authoring pipeline can publish content.

## Evidence-to-design translation

| Research or standard | Product decision |
| --- | --- |
| Carnegie Mellon alignment triangle | Every outcome maps to an activity and an assessment; a change to one requires reviewing all three. |
| US Department of Education/IES study guide | Space retrieval, alternate worked examples with problems, combine graphics and words, connect concrete and abstract representations, and ask deep explanatory questions. |
| Modeling Instruction | Begin with phenomena and learner-built models; predictions and model evaluation precede formula selection. |
| PhET research approach | Controls are discoverable, representations move together, and the learner can explore before receiving an explanation. |
| CAST UDL 3.0 | Offer multiple means of engagement, representation, and action/expression without reducing the intellectual target. |
| Quality Matters public rubric summary | Treat objectives, assessment, materials, activities, technology, support, and accessibility as one aligned course system. |
| Active-learning meta-analysis | Make prediction, discussion, investigation, analysis, and feedback the default interaction—not passive reading. |
| Mastery-learning reviews | Allow variable practice time and prerequisite repair, while presenting mastery as a cautious evidence estimate rather than certainty. |

## Progression loop

`learn → predict → test → explain → certify → install → prove → retrieve later`

Certifications replace generic XP. An upgrade is granted only when its prerequisite evidence is present and its mechanical compatibility constraints pass. A learner can pursue different branches—grip, braking, powertrain, electrical/control—to reach similar performance outcomes, then compare the physics and tradeoffs.

## Evaluation plan

The course itself is not yet “proven.” It must be evaluated. Minimum validation stages:

1. expert review of alignment and physics accuracy;
2. usability tests with high-school learners at different math readiness levels;
3. pre/post concept measures plus transfer tasks, not completion rate alone;
4. comparison of delayed retention and misconception recurrence;
5. accessibility review and assistive-technology testing;
6. analysis of where prerequisite gates help, frustrate, or create false confidence;
7. revision based on evidence, with versioned curriculum records.

## Primary and authoritative references

- [OpenStax High School Physics](https://openstax.org/books/physics/pages/preface)
- [NGSS high-school forces and interactions](https://www.nextgenscience.org/topic-arrangement/hsforces-and-interactions)
- [AP Physics 1](https://apcentral.collegeboard.org/courses/ap-physics-1)
- [AP Physics 2](https://apcentral.collegeboard.org/courses/ap-physics-2)
- [AP Precalculus](https://apcentral.collegeboard.org/courses/ap-precalculus/about-ap-precalculus)
- [AP Calculus AB](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
- [Common Core high-school mathematics](https://corestandards.org/mathematics-standards/)
- [MIT 8.01 experimental classical mechanics](https://www.ocw.mit.edu/courses/8-01x-physics-i-classical-mechanics-with-an-experimental-focus-fall-2002/pages/syllabus/)
- [BMW Group 5 Series heritage release](https://www.press.bmwgroup.com/usa/article/attachment/T0079416EN_US/118688)
- [BMW M: the 1988 E34 M5](https://www.bmw-m.com/en/topics/magazine-article-pool/the-bmw-m5-of-1988.html)
- [Carnegie Mellon course alignment](https://www.cmu.edu/teaching/assessment/basics/alignment.html)
- [IES: Organizing Instruction and Study](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)
- [CAST Universal Design for Learning 3.0](https://udlguidelines.cast.org/)
- [Quality Matters course-design rubric overview](https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric)
- [Modeling Instruction effectiveness summary](https://www.modelinginstruction.org/effective/)
- [PhET research](https://phet.colorado.edu/en/research)
- [Freeman et al. active-learning meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/)
- [EEF mastery-learning evidence review](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/mastery-learning)
