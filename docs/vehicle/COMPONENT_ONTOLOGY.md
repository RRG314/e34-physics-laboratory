# Component ontology

The runtime ontology is `src/data/components.ts`.

Every component has a stable ID, parent assembly, system, selection rule, unlock concept, linked physics concepts, evidence status, and staged explosion metadata. Components are educational and simulation entities as well as render nodes.

## Initial hierarchy

```text
vehicle-shell
├── body-shell
├── wheel-fl
├── wheel-fr
├── wheel-rl (driven)
├── wheel-rr (driven)
├── tire-contact-patches
└── differential
```

Wheel removal is stage 1. Body/drivetrain isolation follows in stage 2. Explosion vectors are local assembly directions and are not random radial offsets. Future records will add mount points, fasteners, service-removal constraints, connections, mass properties, geometry node names, and source applicability.
