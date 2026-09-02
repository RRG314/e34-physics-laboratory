# Curriculum audit

Generated for the 2026-09-01 vertical slice. The corresponding executable checks are in `src/domain/curriculumAudit.ts` and `tests/physics.test.ts`.

## Result

| Check | Result |
| --- | --- |
| Missing prerequisite references | Pass |
| Circular prerequisite dependencies | Pass |
| Academic-tier inversions | Pass |
| Component mappings to nonexistent concepts | Pass |
| Impossible component capability gates | Pass |
| Impossible instrument/experiment gates | Pass |
| Duplicate concept titles that should be depth treatments | Pass |
| Research-depth treatments without modeling/validation expectations | Pass |

## Scope notes

This report audits the 15-concept implemented slice, four mapped wheel components, and five progression targets. It does not claim that the long-term curriculum is complete. As new registries are added, the same checks must run in CI and the report should include warning counts, unreachable nodes, orphan experiments, and source coverage.

The velocity concept currently demonstrates four academic depth treatments. Angular motion demonstrates first-year and undergraduate treatments. Other concepts must receive depth treatments as their advanced activities are implemented; they are not duplicated as separate lesson nodes in the interim.
