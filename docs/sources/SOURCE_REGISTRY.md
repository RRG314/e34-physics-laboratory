# Source registry

The canonical machine-readable registry is `src/data/sources.ts`.

| ID | Class | Reliability | Contribution | Constraints |
| --- | --- | --- | --- | --- |
| `bmw-classic-525i-e34` | Manufacturer archive | Primary | Production period, 2494 cm3, M50/M50TU history | European-market output context; facts cited, images not redistributed |
| `bentley-e34-service-manual` | Independent technical manual | Authoritative secondary | US engine table, transmission applications/ratios, repair data | User-supplied copyrighted PDF; structured facts and citations only |
| `openstax-university-physics-v1` | Open textbook | Primary academic source | Broad introductory scope and order | CC BY 4.0 |
| `mit-8-01sc` | University curriculum | Primary academic source | Mechanics sequence and prerequisites | Linked/summarized under OCW terms |
| `mit-8-02x` | University curriculum | Primary academic source | Experimental E&M sequence | Linked/summarized under OCW terms |
| `mit-8-03sc` | University curriculum | Primary academic source | Vibrations, waves, optics prerequisites | Linked/summarized under OCW terms |
| `simulation-wheel-assumption-v1` | Simulation assumption | Assumption | Nominal wheel radius for vertical slice | Must not be represented as a factory specification |

## Reliability policy

Manufacturer documentation is preferred for model applicability and specifications. University syllabi and open textbooks establish academic ordering. Independent manuals can verify repair and application data but are not relabeled as manufacturer sources. Commercial aggregators may identify leads; unresolved values remain provisional until a stronger source is registered.
