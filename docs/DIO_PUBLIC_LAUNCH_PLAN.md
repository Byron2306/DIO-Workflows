# DIO Public Launch Implementation Plan

**Goal:** Ship an investor-grade DIO corporate front door with commercial product surfaces, Vesper chat identity, governed intake and full social distribution links.

**Architecture:** Keep the existing static-site deployment, existing public intake endpoint and existing Vesper chat API. Replace only the root narrative and presentation layer, add a dedicated launch stylesheet/script, and add the Vesper chat assets as a first-class public surface.

## Global constraints

- Do not modify DIO product internals.
- Commercial names lead; HOMS, VAMP, Sophia, Evidex, META and Vesper remain lore / platform identity.
- Existing intake endpoint stays authoritative.
- Existing Vesper session/message API stays authoritative.
- External claims must distinguish controlled engineering proof from market validation.
- Instagram, Facebook, LinkedIn and YouTube must all be linked.

## Task 1 — Root investor front door

- Replace `index.html` with the approved investor narrative.
- Add `assets/launch-v2.css` for the investor-grade visual layer.
- Add `assets/launch-v2.js` for navigation, reveal effects, social links, Vesper context links and governed intake submission.
- Verify required sections, CTAs and form fields exist.

## Task 2 — Vesper public surface

- Add the supplied Vesper portrait as `assets/vesper-avatar.svg`.
- Add `vesper-intake.html` using the existing Vesper web-chat interaction model.
- Add `vesper-intake.js` preserving current API endpoints and attachment quarantine flow.
- Verify product hints still bind through the `incarnation` query parameter.

## Task 3 — Configuration and distribution

- Extend `assets/dio-config.js` with Vesper URL, public social URLs and expanded commercial product links.
- Keep legal-link injection and current intake endpoint.
- Verify LinkedIn uses the public company URL rather than the admin dashboard URL.

## Verification

- Parse all generated HTML with Python's HTML parser.
- Assert root page contains investor hero, six commercial product surfaces, Vesper CTA, intake form and all four social destinations.
- Assert Vesper page references the stable avatar and chat script.
- Assert JS files parse under Node when available.
- Fetch written branch files back from GitHub before claiming completion.
