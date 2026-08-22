# DIO Public Product Page — Editorial Evidence Design

**Date:** 2026-08-22  
**Branch:** `agent/dio-public-launch-rail`  
**Scope:** Reusable customer-facing product page shell for the 38 permanent DIO commercial routes, with richer media/evidence for flagship products.

## Objective

Turn the current proof-backed product shell into an elegant, investor-grade and buyer-grade product experience that sells the customer outcome first and progressively reveals DIO's evidence, provenance and reusable architecture.

The design law is:

> **Sell the outcome. Reveal the lore. Prove the work.**

The page must feel premium and editorial rather than like an internal control dashboard, while keeping DIO's strongest differentiator visible: the work is backed by inspectable evidence and explicit human authority boundaries.

## Visual Direction

Use the approved DIO Hybrid language: luxury editorial × machine infrastructure × real engineering.

- Black, graphite and restrained warm-gold foundation.
- Large negative space and museum-grade typography.
- Real product artifacts and interfaces instead of decorative stock imagery.
- Golden Eye used as a small institutional seal, not a dominant fantasy emblem.
- Subtle borders, evidence lines, hashes and receipt details used as texture only where meaningful.
- No neon cyberpunk, game UI, sci-fi cosplay or gratuitous lore.
- Responsive mobile design must retain hierarchy and proof readability rather than collapse into dense cards.

## Information Architecture

### 1. Outcome-led Hero

The first viewport sells the buyer problem, not the internal product code name.

Required content:

- Product market/family eyebrow.
- Outcome-led product name or commercial offer title.
- One strong pain-removal headline.
- Buyer/audience statement.
- Bounded launch-pilot price and scope.
- Primary CTA: **Start with Vesper**.
- Secondary CTA: **See the evidence**.
- Large right-side product artifact or interface image.
- Quiet provenance line such as `Powered by Sophia`, `Powered by HOMS`, `Powered by Evidex`, or equivalent route identity.
- Small Golden Eye institutional seal.

The hero must never imply independent market validation merely because the controlled route is proven.

### 2. What You Actually Get

A visual artifact gallery makes the offer concrete before technical proof appears.

Each artifact card contains:

- Artifact name.
- Short buyer-facing purpose.
- Artifact type or format.
- Evidence state where relevant.
- Preview image or representative real output.
- Optional safe download/open action when a public-safe artifact exists.

Flagship products receive richer real artifacts first. Non-flagship routes can fall back to family-level representative media until product-specific assets are available.

### 3. Evidence, Not Promises

This is the core proof layer.

Public presentation is curated rather than a raw internal dump. It shows:

- Controlled route proof state.
- Relevant product/route identity.
- Artifact provenance or source binding.
- Selected receipt identifiers/hashes where safe.
- Custody/lineage state where applicable.
- Human authority state.
- Explicit claim boundary.
- Clear distinction between controlled engineering proof and commercial validation.

Full internal proof files are not exposed automatically. Public pages may include selected downloadable **safe receipts** or sanitized proof artifacts. Raw operational paths, secrets, private source material and unnecessary internal implementation details remain private.

The section carries the launch line:

> **Built before it was pitched.**

And the truth statement:

> Controlled engineering evidence is shown as engineering evidence. Commercial validation is earned from customers.

### 4. What Runs Underneath

A restrained architecture reveal communicates moat without hijacking the sales story.

It shows only the relevant systems for the current product, for example:

`Vesper → Sophia → Evidex → Seraph → human review`

or the appropriate equivalent.

Rules:

- Customer outcome remains primary.
- Internal organ names are secondary provenance.
- Do not imply every organ participates in every product.
- Do not expose internal implementation details that are not useful to the buyer.

### 5. Practical Delivery Flow

A simple four-part flow replaces dense procedural copy:

1. **Bring this** — bounded authorised inputs.
2. **DIO does this** — controlled processing and evidence preparation.
3. **You receive this** — concrete review-ready artifacts.
4. **Human decides this** — explicit retained authority and release boundary.

This section should make high-risk boundaries understandable without reading like legal boilerplate.

### 6. Pilot Scope and Pricing

Present the existing fixed launch-pilot pricing clearly.

Required information:

- Launch price.
- One bounded case.
- Scope confirmation before work begins.
- Larger datasets/integrations/recurring operations quoted separately.
- Review-ready delivery posture.
- Human-held external release where applicable.

No false urgency, fake discounts or invented market proof.

### 7. Final Vesper Conversion Panel

End the page with a strong conversational handoff.

- Canonical transparent Vesper portrait.
- Product context pre-bound in the Vesper URL.
- Short copy: `Tell me what you're trying to achieve.`
- Primary CTA opens Vesper.
- Secondary structured-intake CTA remains available.
- Vesper is explicitly labelled `AI · DIO Presence Core`.
- Existing soft warm-gold speaking pulse remains part of her interaction language.

## Reusable Data Model

The existing `products/catalog.js` remains the canonical commercial route registry for the 38 permanent routes.

The reusable renderer should continue to derive at least:

- `slug`
- `name`
- `family`
- `headline`
- `buyer`
- `offer`
- `bring[]`
- `deliverables[]`
- `boundary`
- `proof`
- family pricing
- family ingress/product context

A new optional presentation layer may add product-specific display metadata such as:

- customer-facing display name
- powered-by label
- hero media asset
- artifact gallery entries
- safe proof excerpts
- relevant organ/pathway labels
- flagship status

Missing optional presentation metadata must gracefully fall back to the existing family-level visual system rather than breaking a route.

## Evidence Safety Rules

Public evidence must never include:

- secrets, credentials or tokens
- private customer/source material
- local filesystem paths that disclose unnecessary internals
- personally identifying test fixtures
- private email addresses or unpublished contact data
- authority claims that the underlying proof does not support

Hashes and receipt identifiers may be shown when they are public-safe and useful for provenance.

## Responsive Behaviour

Desktop hero uses an editorial split layout with artifact media on the right.

Tablet collapses the hero into copy followed by artifact media while preserving CTAs above the fold where practical.

Mobile uses a single-column hierarchy:

- name/headline
- primary CTA
- product media
- core artifact outcomes
- proof summary
- delivery flow
- pricing
- Vesper conversion

Raw proof details remain expandable so the page does not become an unreadable wall of evidence.

## Accessibility

- Maintain semantic heading hierarchy.
- Meaningful artifact images receive useful alt text; decorative media uses empty alt text.
- Evidence state must not be encoded by colour alone.
- Keyboard navigation and visible focus state are required.
- Respect `prefers-reduced-motion` for all decorative motion and Vesper pulse behaviour.
- Text/background contrast must remain readable across dark and light evidence surfaces.

## Implementation Boundaries

This redesign changes the public rendering/presentation layer only.

It does **not** reopen:

- product execution semantics
- proof generation internals
- DIO authority rules
- market-validation state
- pricing logic beyond presentation
- Vesper backend/API contracts

The 38 permanent product routes remain stable URLs.

## Verification

Implementation must add or update automated checks so the shared product shell proves:

- all 38 permanent routes still resolve
- required buyer/offer/proof/boundary fields remain present
- product-context Vesper links are generated correctly
- pricing does not drift
- public-safe evidence sections exist
- no raw secrets/private filesystem paths are introduced
- mobile/responsive CSS hooks exist
- flagship routes support product-specific media while ordinary routes retain graceful fallbacks

After CI, perform visual QA at desktop, tablet and mobile widths before merging the launch PR.

## Release Sequence

1. Keep all work on `agent/dio-public-launch-rail`.
2. Integrate the approved launch hero and Vesper media on that branch.
3. Implement the reusable Editorial Evidence product shell.
4. Add flagship product media/evidence progressively.
5. Run structural and launch CI.
6. Perform browser visual QA and CTA/Vesper/intake click-through.
7. Merge PR #5 only when the complete public launch experience is coherent and green.
