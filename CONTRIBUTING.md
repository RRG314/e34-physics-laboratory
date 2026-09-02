# Contributing

Thank you for considering a contribution to E34 Physics Laboratory. The project sits between education, physics, vehicle research, and interactive software, so useful work comes in many forms.

## Before you begin

Please search the existing issues before opening a new one. For a substantial change, start with an issue that explains the problem, the people it would help, and how the result could be checked. This prevents two contributors from solving the same problem in incompatible ways.

Small corrections, accessibility improvements, source repairs, and focused test additions can go directly to a pull request.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

### Lessons and learning design

A lesson proposal should identify:

- the learner level and prerequisite knowledge;
- one observable learning outcome;
- the vehicle phenomenon or question that motivates it;
- the mathematics the learner must use;
- a prediction or investigation;
- a likely misconception and the feedback it needs;
- an assessment that asks the learner to transfer the idea;
- the curriculum and research sources behind the design.

Avoid adding isolated fact cards or a quiz that measures only recall when the stated outcome is analysis, modeling, or experimental reasoning.

### Physics and simulation

New models must state their equations, parameters, units, reference frame, assumptions, validity range, and known omissions. Add analytical, limiting-case, or conservation tests before using a model to grade a learner.

Do not replace an unknown value with a plausible-looking number. Record it as unresolved or provisional and explain what evidence would resolve it.

### Vehicle research and measurements

Always identify model, production period, market, body style, transmission, and relevant options. For a measurement, include the method, instrument, units, conditions, and uncertainty. Remove personal information such as license plates, VINs, addresses, and location metadata unless you deliberately want it published.

Only submit photographs, scans, geometry, or datasets that you have the right to license for the project. Do not upload copyrighted service manuals or ripped 3D models.

### Interface and accessibility

Interactive graphics need a keyboard-accessible or ordinary HTML alternative. Important state must not be communicated by color alone. Changes should remain usable at narrow viewport sizes and with reduced-motion preferences.

## Local setup

```bash
git clone https://github.com/RRG314/e34-physics-laboratory.git
cd e34-physics-laboratory
npm ci
npm run dev
```

Node.js 22 or later is required.

Before opening a pull request, run:

```bash
npm run check
npx playwright install chromium
npm run test:e2e
```

The browser test writes screenshots and a report under `test-results/`; that directory is ignored by Git.

## Pull requests

Keep each pull request focused enough to review. Explain the learner or research problem first, then describe the change. Include screenshots for visual work and sources for factual or curricular claims. If a result is provisional, say so in the interface and the pull request.

Pull requests should:

- pass type checking, unit tests, the production build, and relevant browser tests;
- add tests when behavior or equations change;
- update public documentation when the learner experience changes;
- preserve attribution and license notices;
- avoid unrelated formatting or dependency changes.

Generative tools may be used, but the contributor remains responsible for accuracy, licensing, originality, and testing. Disclose materially generated datasets, lesson text, images, or models so reviewers can evaluate provenance.

## Commit and review style

Write short commit subjects that describe the result, such as `Add uncertainty to wheel measurements`. Review discussion should focus on evidence, clarity, and the work itself. Maintainers may ask for educational, physical, accessibility, or provenance changes even when the code is technically correct.

Unless stated otherwise, contributions are accepted under the project's [MIT License](LICENSE).

