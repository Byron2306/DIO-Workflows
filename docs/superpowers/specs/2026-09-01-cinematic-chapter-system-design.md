# DIO Cinematic Chapter System Design

## Goal
Rebuild the post-hero homepage into a cinematic, asset-led sequence that uses the existing DIO premium library structurally rather than as disconnected decoration, while preserving content, public-safe claims, links, responsive behavior, and the Vesper `/api/vesper/web/*` contract.

## Visual thesis
The site remains obsidian, gold and institutional, but each chapter must read as a distinct visual scene rather than another text-and-diagram row. Premium ornaments are structural furniture: wide frames enclose bands, 16:9 frames enclose diagrams, vertical orbit art anchors tall compositions, and hero images create atmospheric chapter backdrops or card media. No ornamental frame may intrude inside the YouTube iframe viewport.

## Asset roles
- `dio-orbit-banner-wide.webp`: stretched ceremonial enclosure for the four-cell KPI strip.
- `dio-panel-frame.webp`: strong 16:9 ornamental frame around Megabeast diagrams, never inside the YouTube player.
- `dio-gilded-panel-frame.webp`: secondary portrait/tall card accents only.
- `dio-eye-divider.webp` and `dio-title-banner.webp`: restrained section punctuation, not primary content furniture.
- `dio-orbit-vertical.webp`: tall architecture anchor for the metamorphic / portfolio transition.
- `dio-premium-medallion-board.webp`: studio/product-family visual furniture.
- `dio-vesper-market-panel.webp`: Demand & Presence chapter / Vesper transition.
- Hero images (`dio-hero-*.webp`): cinematic atmospheric surfaces and product-card media, used intentionally across the body rather than only on route pages.

## Layout system
1. Hero remains the opening world.
2. KPI strip becomes an ornate full-width reliquary with the wide orbit banner stretched around its perimeter.
3. Launch film is visually clean: simple black-gold shell, no ornamental image over the iframe.
4. Architecture chapters alternate between:
   - text + strongly framed 16:9 diagram,
   - full-bleed atmospheric chapter with hero background,
   - special vertical-orbit split composition.
5. Product bridge becomes a cinematic showcase with image-led cards for HOMS/Sophia, Evidex, VAMP, programme/governance, AI/digital trust and Demand/Presence/Vesper.
6. Proof and intake remain readable, with only restrained ornaments.

## Typography and spacing
- Main chapter width: up to 1440px on large screens.
- Copy measure: 54–62ch depending on section.
- H2 scale: approximately 48–76px desktop, 34–52px tablet/mobile.
- Body copy minimum visible contrast against section surfaces; warm parchment rather than gray.
- Sections should feel dense enough to avoid dead black voids: roughly 72–110px vertical padding, with media occupying meaningful visual weight.
- Alternate alignment and media ratios to prevent repetitive template rhythm.

## Product showcase
Each product-family card uses a real hero image as media and a small premium family medallion. Card text sits below or over a controlled gradient, with readable copy and stable existing links. Vesper/Demand uses the Vesper market panel as its primary cinematic visual.

## Vesper boundary
Do not modify `vesper-intake.js` in this visual pass. The public browser contract remains `/api/vesper/web/session`, `/api/vesper/web/message`, and `/api/vesper/web/replies`. Live Worker invocation remains separately gated by Cloudflare quota and is not disguised as a visual defect.

## Acceptance criteria
- KPI orbit banner visibly encloses the KPI block edges, not floats between sections.
- YouTube iframe contains no premium frame overlay.
- Every Megabeast diagram uses the 16:9 ornamental panel as an outer frame.
- Previously underused hero/vertical/Vesper market assets appear in meaningful homepage roles.
- Product bridge is image-led and visibly differentiated from architecture chapters.
- Existing content/links remain present.
- Vesper JS hash remains unchanged during visual implementation.
- Local release-contract tests and static asset/link checks pass.
