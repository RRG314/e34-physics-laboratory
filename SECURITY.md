# Security policy

## Reporting a vulnerability

Please do not open a public issue for a vulnerability that could expose data, execute unintended code, or put users at risk. Use the repository's [private vulnerability reporting form](https://github.com/RRG314/e34-physics-laboratory/security/advisories/new).

Include the affected version or commit, a clear reproduction, the likely impact, and any suggested mitigation. You should receive an acknowledgment through GitHub within seven days. Please allow time for a fix before publishing details.

## Current security boundary

The current application runs locally in the browser. It has no account system, remote database, payment flow, or production API. Learner progress and notebook entries are stored in the browser's local storage. Imported CSV data remains in the browser session unless the user exports or copies it.

This narrow boundary reduces exposure but does not eliminate risks in dependencies, file parsing, browser behavior, build tooling, or future hosting. Security reports about those areas are welcome.

## Supported version

Until the first stable release, security fixes are made on the latest commit of `main` only.

