# DIO Cinematic Chapter System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the DIO homepage body into a cinematic, asset-led chapter sequence while preserving claims, links, Vesper transport code and responsive behavior.

**Architecture:** Add one final homepage-specific cinematic stylesheet loaded after all existing visual layers, and make targeted semantic markup changes in `index.html` to expose chapter variants and media-led product cards. Existing premium and Megabeast assets are reused in assigned structural roles; no new image generation is required for this pass.

**Tech Stack:** Static HTML5, CSS3, vanilla JavaScript, Python/Pytest release-contract tests.

**Spec:** `docs/superpowers/specs/2026-09-01-cinematic-chapter-system-design.md`

## Global Constraints
- Preserve public-safe claims and all existing link destinations.
- Preserve `vesper-intake.js` bytes exactly during this visual pass.
- `dio-orbit-banner-wide.webp` must enclose the KPI strip.
- `dio-panel-frame.webp` must frame diagrams externally and must not overlay the YouTube iframe.
- Use existing premium assets before generating any new art.
- Maintain responsive behavior at 900px and 640px breakpoints.

---

### Task 1: Cinematic contract tests
**Files:**
- Create: `tests/test_cinematic_homepage_contract.py`
- Test: `index.html`, `assets/cinematic-chapters.css`

**Interfaces:**
- Consumes: current homepage DOM and premium asset library.
- Produces: a failing contract defining required classes/assets and forbidden video overlay behavior.

- [ ] Write tests for KPI reliquary, diagram frame, chapter atmospheres, product media, Vesper market panel and video-clean rule.
- [ ] Run tests and observe RED against current site.
- [ ] Keep failure messages specific to missing visual roles.

### Task 2: Homepage structural markup
**Files:**
- Modify: `index.html`
- Test: `tests/test_cinematic_homepage_contract.py`

**Interfaces:**
- Consumes: existing section IDs/content/links.
- Produces: semantic classes and image-led product-card markup consumed by cinematic CSS.

- [ ] Add `assets/cinematic-chapters.css` after `final-polish.css`.
- [ ] Mark KPI strip as `mega-stats cinematic-reliquary`.
- [ ] Add chapter variant classes and data-atmosphere attributes to major Megabeast sections.
- [ ] Convert six product cards to contain media figures using existing heroes/medallions while preserving copy and hrefs.
- [ ] Add dedicated Vesper/Demand media card using `dio-vesper-market-panel.webp`.
- [ ] Run contract tests and verify remaining failures are CSS-role failures only.

### Task 3: Cinematic visual system
**Files:**
- Create: `assets/cinematic-chapters.css`
- Test: `tests/test_cinematic_homepage_contract.py`

**Interfaces:**
- Consumes: semantic classes from Task 2 and existing premium assets.
- Produces: final homepage visual composition loaded last in cascade.

- [ ] Style the KPI strip as an ornate edge-wrapped reliquary using `dio-orbit-banner-wide.webp`.
- [ ] Remove all ornamental pseudo-elements from `.film-shell` and make the player shell clean.
- [ ] Frame `.mega-visual` externally with `dio-panel-frame.webp` at `background-size:100% 100%`.
- [ ] Add distinct atmospheric section treatments using hero images and dark readability gradients.
- [ ] Build the vertical-orbit special chapter with `dio-orbit-vertical.webp`.
- [ ] Build image-led product showcase cards and use `dio-premium-medallion-board.webp` as supporting studio furniture.
- [ ] Use `dio-vesper-market-panel.webp` for Demand & Presence.
- [ ] Add responsive breakpoints at 900px and 640px.
- [ ] Run contract tests to GREEN.

### Task 4: Release verification and packaging
**Files:**
- Verify: `index.html`, `assets/cinematic-chapters.css`, `vesper-intake.js`, premium assets.
- Create: packaged ZIP in `/mnt/data`.

**Interfaces:**
- Consumes: completed visual tree.
- Produces: tested downloadable website artifact.

- [ ] Verify Vesper JS SHA matches pre-pass SHA.
- [ ] Run JS syntax checks for site scripts and Vesper.
- [ ] Run cinematic contract tests and any existing local tests that do not require external services.
- [ ] Run static reference checker for local `src`/`href`/CSS `url()` assets.
- [ ] Serve locally and verify HTTP 200 for homepage, Vesper, products and flagship product pages.
- [ ] Package ZIP and run `unzip -t`.
