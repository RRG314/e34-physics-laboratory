# Learning validation plan

Last reviewed: 6 September 2026

The application can verify calculations, selected interpretations, progression state, and whether a learner supplied a written response. It cannot establish that its teaching is effective by inspecting its own code. That claim requires review and observation with people.

## What is ready to evaluate

The current study object is the eight-chapter high-school mechanics route, followed by one delayed mixed-retrieval check. Every instructional chapter now has a bounded objective, prerequisite gate, worked example using different values, learner response, corrective feedback, evidence record, and next step. Motion and Path 02 chapters add changed values, transfer prompts, and written reasoning. The route makes no claim to course credit, certification, or validated mastery.

## Review 1: content and curriculum

Recruit at least two current high-school physics teachers, one mathematics educator familiar with algebra through introductory trigonometry, and one physicist or physics-education researcher. Give reviewers the playable route, the source registry, and the model assumptions—not only screenshots.

For each chapter, reviewers should record:

- whether the stated objective, task, and evidence actually align;
- prerequisite mathematics that is missing, premature, or unnecessarily repeated;
- incorrect physics, ambiguous signs, hidden assumptions, misleading vehicle language, or unsafe implications;
- whether each distractor represents a plausible misconception;
- whether feedback helps a learner repair the reasoning without giving away the next answer;
- whether the transfer item changes context while preserving the intended relationship;
- a recommendation: retain, revise, replace, or remove.

No chapter passes because reviewers “like” it. It passes when all factual issues are resolved, objectives and evidence align, and remaining disagreements are documented with the decision taken.

## Review 2: learner usability and understanding

Run moderated sessions with learners spanning the intended entry range, including students with algebra gaps and students who have already completed a physics course. A useful first round is 8–12 learners; it is a defect-finding study, not proof of population-level effectiveness.

Ask learners to think aloud without coaching. Observe:

- where they stop, guess, or repeatedly reread;
- whether they can explain variables and units before calculating;
- whether graphs function as evidence or decoration;
- whether they distinguish the ideal model from claims about a real 525i;
- whether a correct in-app response survives a changed-context question;
- whether controls, progression, and the reason for a lock are understandable;
- time on task, retries, abandoned tasks, requested hints, and unaided completions.

After each chapter, ask the learner to explain the result verbally and solve one paper or whiteboard transfer problem. Compare that response with the app’s recorded evidence. This is the main check against the app overstating mastery.

## Review 3: delayed retention

Have learners return after at least 24 hours without reviewing their notes. Use the built-in mixed retrieval laboratory, followed by one novel problem that is not in the application. Record correctness before feedback, correction after feedback, confidence, and the quality of the written connection across chapters.

The current 24-hour interval is a product default, not a researched optimum for this population. Later studies can compare longer spacing and repeated retrieval schedules.

## Accessibility evaluation

The automated suite checks serious and critical WCAG A/AA findings, horizontal overflow on representative routes, and presence of a visible first-tab focus indicator. That catches regressions but does not replace human evaluation.

Complete keyboard-only, VoiceOver and NVDA, 200–400% zoom, high-contrast, reduced-motion, and color-vision checks. Include the Three.js car view, SVG graphs, feedback announcements, disabled progression states, and long written responses. Record the assistive technology, browser, operating system, route, exact failure, severity, and retest result.

## Decision rules

A first production learning release requires:

1. no unresolved factual or safety-critical reviewer findings;
2. every learner-facing vehicle value labeled as verified, provisional, measured, or a declared teaching input;
3. no chapter in which most observed learners can advance by guessing without explaining the relationship;
4. successful task completion by keyboard and screen reader with no critical barrier;
5. documented revisions and retests for every high-severity issue;
6. public wording that describes learning practice and evidence, not accreditation or guaranteed mastery.

Quantitative learning-effect claims require a later pre/post or comparison study with a declared analysis plan. Repository tests establish software behavior only.

## Issue record

Use one row per finding:

| Field | Required entry |
| --- | --- |
| Context | Chapter, number set, device, and learner/reviewer group |
| Evidence | What was observed or measured, without interpretation |
| Interpretation | Likely conceptual, mathematical, interface, accessibility, or model issue |
| Severity | Blocks learning, materially misleads, causes friction, or cosmetic |
| Change | Exact content, interaction, or model revision |
| Retest | Who retested, when, and outcome |
| Status | Open, revised, verified, or deliberately deferred with reason |

Negative findings belong in the record. Removing a weak interaction or narrowing a claim is a valid research outcome.
