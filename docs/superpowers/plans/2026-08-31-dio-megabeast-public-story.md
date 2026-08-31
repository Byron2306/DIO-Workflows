# DIO Megabeast Public Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the DIO Workflows public site so DIO itself is accurately explained as a proof-carrying governed intelligence organism, while exposing all 53 canonical product incarnations with public-safe production proof and the three launch films.

**Architecture:** Preserve the existing static GitHub Pages shell and its governed intake/Vesper contracts. Extend the shared product registry and renderer rather than creating isolated microsites. Add a curated proof manifest generated from the supplied Portfolio Suite Surface Model, publish representative safe artifacts, and use compressed visual/media assets behind a new homepage narrative sequence.

**Tech Stack:** Static HTML/CSS/JavaScript, GitHub Pages, GitHub Actions, WebP, H.264/AAC MP4, JSON proof manifest.

**Spec:** `docs/superpowers/specs/2026-08-22-product-page-editorial-evidence-design.md`, overridden where its historical 38-route ceiling conflicts with the current 53-product proof model.

## Global Constraints

- Preserve all existing permanent product URLs.
- Public product surface must contain exactly 53 canonical products from the supplied proof model.
- Controlled execution proof must never be presented as commercial validation.
- Human authority remains explicit.
- Public evidence must contain no secrets, private customer/source material, private email addresses, or local filesystem paths.
- ATLAS candidate directions remain candidates, not executable products or market demand.
- Main DIO trailer belongs on the homepage; HOMS and Evidex trailers belong on their flagship pages.
- Visual explainers must remain responsive and respect reduced motion.
- Existing Vesper/intake backend contracts remain unchanged.

---

### Task 1: Megabeast regression gate

**Files:**
- Create: `.github/workflows/megabeast-public-story.yml`

**Produces:** A failing CI contract that requires the DIO architecture story, 53 routes, proof manifest/artifacts, and three trailers.

- [x] Write the failing GitHub Actions gate.
- [x] Push it to `agent/dio-megabeast-public-story`.
- [x] Verify the run fails because the new public story is absent.

### Task 2: Curated proof catalogue

**Files:**
- Create: `products/proof/portfolio-proof-catalog.json`
- Create: `products/proof-artifacts/<slug>/<artifact>`
- Modify: `products/catalog.js`

**Produces:** A 53-row public commercial registry plus at least one real, public-safe production artifact per product.

- [ ] Generate 53 canonical product entries from `PORTFOLIO_SUITE_SURFACE_MODEL.json`.
- [ ] Preserve existing route names and URLs where already public.
- [ ] Publish safe representative artifacts with source hashes and execution state.
- [ ] Keep `commercial_validation=UNPROVED` visible.

### Task 3: Shared proof-rich product renderer

**Files:**
- Modify: `products/app.js`
- Modify: `products/product.css`
- Modify: `products/index.html`
- Create: missing `products/<slug>/index.html` routes.

**Produces:** Every product page explains who it is for, the concrete buyer job, controlled execution state, artifacts, authority boundary, and Vesper handoff.

- [ ] Render proof artifacts as real open/download actions.
- [ ] Show normal/messy/adversarial 3/3 proof where supplied.
- [ ] Separate engineering readiness, sellability state, and commercial validation.
- [ ] Preserve responsive Editorial Evidence hierarchy.

### Task 4: DIO architecture homepage

**Files:**
- Modify: `index.html`
- Create: `assets/megabeast/megabeast.css`
- Create: `assets/megabeast/*.webp`

**Produces:** A narrative sequence that explains governed consequence, constitutional laws, product factory, metamorphic cascade, the 53-product universe/ATLAS distinction, commercial metabolism, and proof.

- [ ] Lead with DIO as the organism rather than the portfolio.
- [ ] Integrate the approved gilded architecture visuals as explanatory layers.
- [ ] Keep ATLAS roadmap/candidate claims explicitly bounded.
- [ ] Retain fast buyer paths to products and Vesper.

### Task 5: Launch films

**Files:**
- Create: `assets/media/dio-launch-trailer.mp4`
- Create: `assets/media/homs-launch-trailer.mp4`
- Create: `assets/media/evidex-launch-trailer.mp4`
- Modify: `index.html`
- Modify: `products/homs/index.html`
- Modify: `products/evidex/index.html`

**Produces:** Responsive, preload-light launch-film surfaces with controls and poster/fallback treatment.

- [ ] Web-optimize HOMS and Evidex for GitHub Pages delivery.
- [ ] Add the DIO film to the homepage.
- [ ] Add HOMS and Evidex films to their flagship pages.
- [ ] Do not autoplay audio.

### Task 6: Verification and release

**Files:**
- Modify legacy storefront checks that still hard-code 38 routes.

**Produces:** Green CI and a reviewable launch PR.

- [ ] Update legacy 38-route assertions to 53 without weakening truth-boundary checks.
- [ ] Run megabeast gate and existing storefront/visual checks.
- [ ] Inspect final diff for private paths, secrets, broken links, and claim inflation.
- [ ] Open PR to `main` and merge only after checks are green.
