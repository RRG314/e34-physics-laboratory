# Service-manual ingestion

## Source classification

The supplied PDF is Bentley Publishers' independent `BMW 5-Series (E34) Service Manual: 1989-1995`, not a BMW factory manual. It is a 472-page OCR scan. Values are classified as independent authoritative technical data unless the page explicitly attributes a value to BMW.

## Pipeline

1. Register document identity, edition, coverage, checksum, and licensing constraint.
2. Extract layout-preserving OCR text for discovery only.
3. Identify candidate tables and applicable model/year rows.
4. Render the cited physical PDF page and visually verify text, row/column alignment, units, and footnotes.
5. Create a structured record with parameter, value, unit, market/model/year, component, printed section, physical PDF page, direct/derived flag, status, confidence, and notes.
6. Add a second-source cross-check when a value affects simulation behavior.
7. Reject ambiguous OCR or record it as `NEEDS_SOURCE`; never silently infer a missing digit.

## Initial verified pages

- Physical PDF page 43, printed 100-1: E34 525i engine application/specification table.
- Physical PDF page 224, printed 200-2: manual-transmission application and ratio table.

The PDF remains outside the repository. Copyrighted page images and extracted manual text are not distributed with the application.
