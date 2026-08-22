# Editorial Evidence Product Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing 38-route product shell into the approved DIO Hybrid “Editorial Evidence” experience while wiring the canonical launch hero and Vesper portrait into the public launch surfaces.

**Architecture:** Keep `products/catalog.js` as the canonical 38-route commercial registry and extend the presentation layer in `products/app.js` with a small product-display metadata registry and safe fallbacks. Rebuild `products/product.css` around the approved black/graphite/warm-gold DIO Hybrid language, preserving stable route URLs and pricing. Wire the already-committed `assets/launch-hero.webp` and `assets/vesper-public.webp` into `index.html`, `vesper-intake.html`, and `vesper-intake.js` without changing backend/API semantics.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, GitHub Pages, GitHub Actions shell/Python contract checks.

**Spec:** `docs/superpowers/specs/2026-08-22-product-page-editorial-evidence-design.md`

## Global Constraints

- Sell the outcome. Reveal the lore. Prove the work.
- Black, graphite and restrained warm-gold foundation.
- Real product artifacts/interfaces over decorative stock imagery.
- Golden Eye is a small institutional seal, not a dominant fantasy emblem.
- No neon cyberpunk, game UI, sci-fi cosplay or gratuitous lore.
- Existing 38 permanent product URLs remain stable.
- Existing family launch prices remain unchanged.
- Customer outcome remains primary; DIO organ names are secondary provenance.
- Public evidence is curated; secrets, private source material, local filesystem paths, PII and unsupported authority claims must never be exposed.
- Controlled engineering proof must not be presented as commercial validation.
- Vesper remains `AI · DIO Presence Core`; API contracts remain unchanged.
- All decorative motion must respect `prefers-reduced-motion`.

---

### Task 1: Wire canonical launch media into homepage and Vesper

**Files:**
- Modify: `index.html`
- Modify: `assets/launch-v2.css`
- Modify: `vesper-intake.html`
- Modify: `vesper-intake.js`
- Test: `.github/workflows/launch-visual-assets.yml`

**Interfaces:**
- Consumes: `assets/launch-hero.webp`, `assets/vesper-public.webp`, `assets/dio-sigil.webp`
- Produces: `.hero-media-art`, `.hero-seal`, canonical public Vesper image usage in shell/message avatars

- [ ] **Step 1: Confirm the existing visual contract is red for wiring, not missing files**

Run in GitHub Actions or locally by executing the Python body from `.github/workflows/launch-visual-assets.yml`.

Expected failure before implementation:

```text
M01 wiring missing: assets/launch-hero.webp
```

- [ ] **Step 2: Replace the synthetic homepage stage with real M01 media while preserving the hero copy**

In `index.html`, replace the current `.investor-stage` contents with a media composition that includes these exact hooks:

```html
<div class="investor-stage hero-media reveal is-visible" aria-label="DIO platform overview">
  <img class="hero-media-art" src="assets/launch-hero.webp" alt="DIO orchestration environment">
  <div class="hero-media-vignette" aria-hidden="true"></div>
  <img class="hero-seal" src="assets/dio-sigil.webp" alt="">
  <div class="hero-media-caption">
    <small>DIO WORKFLOWS</small>
    <strong>From intelligence to accountable work.</strong>
  </div>
</div>
```

Do not change the approved homepage headline, truth boundaries or CTAs.

- [ ] **Step 3: Add restrained M01 layout/crop behavior**

In `assets/launch-v2.css`, define `.hero-media`, `.hero-media-art`, `.hero-media-vignette`, `.hero-seal`, and `.hero-media-caption`. Desktop should preserve the right-heavy composition; tablet/mobile should use `object-position:center` or a tested crop that keeps the orchestration spine visible. The Golden Eye seal must remain small and low-opacity.

- [ ] **Step 4: Replace all public Vesper placeholder references**

In `vesper-intake.html` change:

```html
src="assets/vesper-avatar.svg"
```

to:

```html
src="assets/vesper-public.webp"
```

for the main Vesper portrait.

In `vesper-intake.js` change the assistant message avatar assignment to:

```js
avatar.src = "assets/vesper-public.webp";
```

Do not change the existing `pulseVesper()` behavior.

- [ ] **Step 5: Verify the launch visual contract passes**

Expected:

```text
DIO_LAUNCH_VISUAL_ASSETS_VERIFIED
```

- [ ] **Step 6: Commit**

```bash
git add index.html assets/launch-v2.css vesper-intake.html vesper-intake.js
git commit -m "feat: wire canonical DIO launch media"
```

---

### Task 2: Add presentation metadata without changing the commercial registry

**Files:**
- Modify: `products/app.js`
- Test: create `.github/workflows/product-editorial-evidence.yml`

**Interfaces:**
- Consumes: existing `window.DIO_PRODUCT_CATALOG`, family pricing/ingress maps
- Produces: `DISPLAY_BY_SLUG`, `displayFor(product)`, `vesperHref(product)`, safe evidence presentation metadata

- [ ] **Step 1: Write the failing product-presentation contract**

Create `.github/workflows/product-editorial-evidence.yml` with a Python/Node check requiring these tokens in `products/app.js`:

```text
DISPLAY_BY_SLUG
function displayFor
function vesperHref
Built before it was pitched.
Controlled engineering evidence is shown as engineering evidence.
assets/vesper-public.webp
```

Also load `products/catalog.js` in Node and assert there are still exactly 38 unique slugs and the existing family prices remain `4900`, `5900`, `7900`, `8900`, `12900`, and `14900` in the correct families.

- [ ] **Step 2: Run the new workflow check and verify RED**

Expected: failure because the new presentation registry/helpers do not yet exist.

- [ ] **Step 3: Add a small optional display registry**

In `products/app.js`, add `DISPLAY_BY_SLUG` for launch flagships only. Initial entries should cover at least:

```js
const DISPLAY_BY_SLUG = {
  homs: {
    displayName: 'Exam & Assessment Studio',
    poweredBy: 'HOMS',
    heroAsset: 'homs.webp',
    pathway: ['Vesper', 'HOMS', 'Evidex', 'Human review']
  },
  vamp: {
    displayName: 'Performance Evidence Studio',
    poweredBy: 'VAMP',
    heroAsset: 'control-deck.webp',
    pathway: ['Vesper', 'VAMP', 'Evidex', 'Human review']
  },
  sophia: {
    displayName: 'Research Integrity Studio',
    poweredBy: 'Sophia',
    heroAsset: 'sophia.webp',
    pathway: ['Vesper', 'Sophia', 'Evidex', 'Seraph', 'Human review']
  },
  evidex: {
    displayName: 'Evidence Assurance',
    poweredBy: 'Evidex',
    heroAsset: 'evidex.webp',
    pathway: ['Vesper', 'Evidex', 'Human review']
  },
  programmeproof: {
    displayName: 'Programme Assurance',
    poweredBy: 'VAMP + META',
    heroAsset: 'control-deck.webp',
    pathway: ['Vesper', 'VAMP', 'META', 'Evidex', 'Human review']
  }
};
```

Do not invent product-specific evidence values that are not present in the catalog. Missing display metadata falls back to `p.name`, family asset, family kicker and a generic `['Vesper','DIO','Human review']` pathway.

- [ ] **Step 4: Add stable presentation helpers**

Implement:

```js
function displayFor(p) {
  const explicit = DISPLAY_BY_SLUG[p.slug] || {};
  const family = themeFor(p);
  return {
    displayName: explicit.displayName || p.headline || p.name,
    poweredBy: explicit.poweredBy || p.name,
    heroAsset: explicit.heroAsset || family.asset,
    pathway: explicit.pathway || ['Vesper', 'DIO', 'Human review']
  };
}

function vesperHref(p) {
  return `${rootHref()}vesper-intake.html?incarnation=${encodeURIComponent(p.slug)}`;
}
```

- [ ] **Step 5: Re-run the product-presentation contract**

Expected: metadata/helper assertions pass; rendering assertions may still fail until Task 3.

- [ ] **Step 6: Commit**

```bash
git add products/app.js .github/workflows/product-editorial-evidence.yml
git commit -m "feat: add editorial product presentation metadata"
```

---

### Task 3: Rebuild the shared product renderer as Editorial Evidence

**Files:**
- Modify: `products/app.js`
- Test: `.github/workflows/product-editorial-evidence.yml`
- Regression: `.github/workflows/storefront-check.yml`

**Interfaces:**
- Consumes: `displayFor(p)`, `vesperHref(p)`, catalog fields, family pricing
- Produces: reusable sections `.editorial-hero`, `.artifact-gallery`, `.evidence-ledger`, `.system-pathway`, `.delivery-flow`, `.pilot-scope`, `.vesper-conversion`

- [ ] **Step 1: Extend the failing contract with required rendered section hooks**

Require the following strings in `products/app.js`:

```text
editorial-hero
artifact-gallery
evidence-ledger
system-pathway
delivery-flow
pilot-scope
vesper-conversion
What you actually get
Evidence, not promises
What runs underneath
Bring this
DIO does this
You receive this
Human decides this
```

Expected: RED before renderer changes.

- [ ] **Step 2: Replace the current product-page template only**

Inside the existing `if(document.body.dataset.view==='product')` branch, retain slug resolution, canonical URL, meta description, family pricing and error handling. Replace the generated markup with this information order:

```text
Outcome-led hero
→ What you actually get
→ Evidence, not promises
→ What runs underneath
→ Bring / DIO does / You receive / Human decides
→ Pilot scope and pricing
→ Vesper conversion
```

The hero must use `displayFor(p).displayName` as the primary commercial title and show `Powered by ${display.poweredBy}` as provenance.

Primary CTA:

```html
<a class="button" href="${vesperHref(p)}">START WITH VESPER ↗</a>
```

Secondary CTA:

```html
<a class="button ghost" href="#evidence">SEE THE EVIDENCE</a>
```

- [ ] **Step 3: Render “What you actually get” from existing deliverables**

Use `p.deliverables` as the source of truth. Each deliverable becomes an `.artifact-card`. Do not invent downloadable files. Label the state as `Review-ready deliverable` unless the catalog explicitly supports a stronger statement.

- [ ] **Step 4: Render curated proof, not raw internals**

The `.evidence-ledger` must present only:

```text
Route proof: p.proof
Authority boundary: p.boundary
Evidence posture: Hash-bound receipt where applicable
Commercial validation: Earned from customers, not inferred from controlled proof
```

Include the exact lines:

```text
Built before it was pitched.
Controlled engineering evidence is shown as engineering evidence. Commercial validation is earned from customers.
```

Do not render local paths, raw JSON, email addresses, secrets or unpublished customer material.

- [ ] **Step 5: Render the pathway from display metadata**

Map `display.pathway` into `.system-pathway` nodes. Organ names are secondary labels and must never replace the customer-facing title.

- [ ] **Step 6: Render the four-part practical delivery flow**

Use:

```text
Bring this → p.bring
DIO does this → controlled processing, evidence preparation, bounded route execution
You receive this → p.deliverables
Human decides this → p.boundary
```

Avoid claiming autonomous release, certification or consequential authority.

- [ ] **Step 7: Preserve fixed pilot pricing and one-ingress truth**

Use `priceText(p)` and existing family pricing unchanged. Keep structured intake available as the secondary conversion option, but make Vesper the primary conversational CTA.

- [ ] **Step 8: Re-run product and storefront contracts**

Expected:

```text
38 unique product routes
pricing unchanged
Editorial Evidence hooks present
storefront regression success
```

- [ ] **Step 9: Commit**

```bash
git add products/app.js .github/workflows/product-editorial-evidence.yml
git commit -m "feat: render editorial evidence product pages"
```

---

### Task 4: Apply the DIO Hybrid visual system to the shared product shell

**Files:**
- Modify: `products/product.css`
- Test: `.github/workflows/product-editorial-evidence.yml`

**Interfaces:**
- Consumes: section/class hooks from Task 3
- Produces: desktop/tablet/mobile visual hierarchy, safe responsive behavior, reduced-motion support

- [ ] **Step 1: Extend the failing contract for CSS hooks and accessibility**

Require these selectors/tokens in `products/product.css`:

```text
.editorial-hero
.artifact-gallery
.artifact-card
.evidence-ledger
.system-pathway
.delivery-flow
.pilot-scope
.vesper-conversion
prefers-reduced-motion
:focus-visible
@media(max-width:980px)
@media(max-width:640px)
```

Expected: RED before styling.

- [ ] **Step 2: Replace the light SaaS product-page aesthetic with DIO Hybrid**

Use a dark foundation for product detail pages:

```css
--black:#050607;
--graphite:#0b0d10;
--panel:#111318;
--gold:#d9b66f;
--gold2:#f1d79b;
--ink:#f3efe7;
--muted:#aaa69e;
```

Retain family accent variables only as subtle secondary cues. Do not make each family feel like a different website.

- [ ] **Step 3: Style the hero as luxury editorial, not dashboard UI**

Desktop: large left typography + right product artifact/media; strong negative space; small Golden Eye seal. Tablet/mobile: copy first, CTA, media, then proof summary.

- [ ] **Step 4: Style artifacts as gallery objects**

Cards should feel like document/artifact exhibits: subtle borders, compact state label, generous whitespace, no excessive rounded SaaS cards.

- [ ] **Step 5: Style evidence as an inspectable ledger**

Use clear typography, restrained lines and expandable/detail-friendly spacing. Evidence state must be understandable without colour alone.

- [ ] **Step 6: Style pathway and four-part delivery flow**

Desktop may use horizontal progression; mobile must collapse to a readable single-column sequence.

- [ ] **Step 7: Style Vesper conversion panel**

Use `../assets/vesper-public.webp` as the portrait source in generated markup, with a restrained warm-gold background bloom. Do not add constant animation; existing speaking animation remains limited to the chat surface.

- [ ] **Step 8: Add responsive and reduced-motion behavior**

At `980px` collapse split layouts. At `640px` enforce single-column order matching the spec. Keep `:focus-visible` treatment and add `@media(prefers-reduced-motion:reduce)` to disable decorative transitions.

- [ ] **Step 9: Re-run contract checks**

Expected: product editorial workflow green.

- [ ] **Step 10: Commit**

```bash
git add products/product.css .github/workflows/product-editorial-evidence.yml
git commit -m "style: apply DIO Hybrid product evidence system"
```

---

### Task 5: Bring flagship static routes onto the shared evidence experience

**Files:**
- Inspect/modify only where required: `products/homs/index.html`, `products/vamp/index.html`, `products/sophia/index.html`, `products/evidex/index.html`, `products/programmeproof/index.html`
- Test: `.github/workflows/product-editorial-evidence.yml`
- Regression: `.github/workflows/storefront-check.yml`

**Interfaces:**
- Consumes: `products/catalog.js`, `products/app.js`, `products/product.css`
- Produces: flagship pages using the same shared renderer without changing their permanent URLs

- [ ] **Step 1: Write a failing flagship-shell check**

For each flagship route that exists, require its HTML to load:

```html
<script src="../catalog.js"></script>
<script src="../app.js"></script>
```

and expose:

```html
<body data-view="product" data-product="SLUG">
<div id="product"></div>
```

Expected: at least legacy handcrafted pages fail this check.

- [ ] **Step 2: Convert only the legacy flagship shells**

Replace bespoke static content with the same minimal stable shell used by the ordinary 38 routes. Preserve useful route-specific `<meta name="description">` text when it remains accurate, but let `app.js` own rendered page content.

- [ ] **Step 3: Verify all 38 permanent routes still resolve**

Run existing storefront checks and the new editorial-evidence workflow.

Expected:

```text
PERMANENT_PRODUCT_SHELLS_READY=38
```

- [ ] **Step 4: Commit**

```bash
git add products/homs/index.html products/vamp/index.html products/sophia/index.html products/evidex/index.html products/programmeproof/index.html .github/workflows/product-editorial-evidence.yml
git commit -m "refactor: unify flagship product shells"
```

Only stage files that actually exist and changed.

---

### Task 6: Final verification and visual QA gate

**Files:**
- No production code unless a verification failure requires a targeted fix
- Check: all launch/product workflows

**Interfaces:**
- Consumes: completed Tasks 1–5
- Produces: merge-ready evidence for PR #5

- [ ] **Step 1: Verify JavaScript syntax locally**

```bash
node --check assets/launch-v2.js
node --check vesper-intake.js
node --check products/app.js
```

Expected: no output and exit code 0.

- [ ] **Step 2: Run/observe all GitHub Actions checks**

Required green checks:

```text
Validate proof-backed commercial storefront
Validate public product portfolio
Validate Vesper speaking state
Validate launch visual assets
Validate editorial evidence product pages
```

- [ ] **Step 3: Desktop visual QA**

At approximately `1440×900`, inspect:

```text
homepage hero crop
Golden Eye restraint
Vesper portrait crop
product hero hierarchy
artifact gallery
proof readability
Vesper CTA
```

- [ ] **Step 4: Tablet visual QA**

At approximately `900×1200`, verify split layouts collapse cleanly and CTAs remain obvious.

- [ ] **Step 5: Mobile visual QA**

At approximately `390×844`, verify order:

```text
name/headline → primary CTA → media → artifacts → proof → delivery → pricing → Vesper
```

Check for horizontal overflow and unreadable proof text.

- [ ] **Step 6: CTA and route click-through**

Verify homepage → portfolio → flagship product → Vesper with `?incarnation=...`; structured intake remains functional; no product CTA bypasses governed ingress.

- [ ] **Step 7: Final commit only if QA required fixes**

```bash
git add <only-files-changed-by-QA>
git commit -m "fix: complete DIO launch visual QA"
```

- [ ] **Step 8: Do not merge automatically**

Report the final all-green state and visual QA result. PR #5 is merged only after explicit human go-ahead.
