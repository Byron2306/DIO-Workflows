# DIO Public Launch Implementation Plan

**Goal:** Ship an investor-grade DIO corporate front door with commercial product surfaces, Vesper chat entry, governed intake and full social distribution links.

**Architecture:** Keep the existing static-site deployment, existing public intake endpoint and existing Vesper chat API. Replace only the root narrative and presentation layer, keep dedicated launch CSS/JS, and expose Vesper as a first-class public surface without choosing her final portrait before the media audit.

## Global constraints

- Do not modify DIO product internals.
- Commercial names lead; HOMS, VAMP, Sophia, Evidex, META and Vesper remain lore / platform identity.
- Existing intake endpoint stays authoritative.
- Existing Vesper session/message API stays authoritative.
- External claims distinguish controlled engineering proof from market validation.
- Instagram, Facebook, LinkedIn and YouTube must all be linked.
- No final Vesper portrait or major new media asset is selected before the skeleton media audit.

## Task 1 — Root investor front door

- Replace `index.html` with the approved investor narrative.
- Use `assets/launch-v2.css` for the investor-grade visual layer.
- Use `assets/launch-v2.js` for navigation, reveal effects, social links, Vesper context links and governed intake submission.
- Reserve explicit media slots with fixed aspect ratios.
- Verify required sections, CTAs and form fields exist.

## Task 2 — Vesper public surface

- Add `vesper-intake.html` using the existing Vesper web-chat interaction model.
- Add `vesper-intake.js` preserving current API endpoints and attachment quarantine flow.
- Use a deliberate portrait placeholder until the media audit chooses the canonical Sister Vesper identity.
- Verify product hints still bind through the `incarnation` query parameter.

## Task 3 — Configuration and distribution

- Extend `assets/dio-config.js` with Vesper URL, public social URLs and expanded commercial product links.
- Keep the current intake endpoint and email fallback.
- Verify LinkedIn uses the public company URL rather than the admin dashboard URL.

## Task 4 — Media audit after skeleton

- Inventory every hero, product, proof, Vesper and YouTube visual slot.
- Decide asset type and source for each slot before generating or editing media.
- Produce only assets that have a defined slot, crop and public purpose.

## Verification

- Parse generated HTML with Python's HTML parser.
- Assert root page contains investor hero, six commercial product surfaces, Vesper CTA, intake form and all four social destinations.
- Assert Vesper page contains a portrait placeholder rather than the rejected joke image and preserves the chat script.
- Assert JS files parse under Node when available.
- Fetch written branch files back from GitHub before claiming completion.
