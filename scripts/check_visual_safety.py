#!/usr/bin/env python3
"""Guard DIO's premium visual layer against text/ornament collisions.

This is intentionally a source-level contract. It catches the exact regression class
that produced decorative artwork beneath readable copy, fixed-text SVG diagrams,
and stacked frames around Vesper's welcome surface.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def fail(message: str) -> None:
    raise SystemExit(f"VISUAL_SAFETY_REFUSE: {message}")


def rule_uses(css: str, selector_fragment: str, asset: str) -> bool:
    """Return True when a CSS rule containing selector_fragment references asset."""
    for selector, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css, flags=re.S):
        if selector_fragment in selector and asset in body:
            return True
    return False


def main() -> None:
    home = read("index.html")
    launch = read("assets/launch-v2.css")
    premium = read("assets/premium/premium.css")
    vesper = read("vesper-intake.html")

    # System-map labels must be responsive HTML, not text baked into a scaled SVG.
    if 'src="assets/dio-system-orbit.svg"' in home:
        fail("homepage system map still embeds fixed-text dio-system-orbit.svg")
    for token in ('class="map-core"', 'class="map-ring"', 'class="map-node'):
        if token not in home:
            fail(f"responsive system-map structure missing {token}")

    # Never stretch decorative banner artwork beneath readable portfolio CTA copy.
    if rule_uses(premium, ".portfolio-cta:before", "dio-title-banner.webp"):
        fail("portfolio CTA paints dio-title-banner.webp underneath copy")

    # Section ornaments may not protrude across section boundaries.
    for selector in (".launch-products:after", ".platform-thesis:after", ".launch-proof:after"):
        if rule_uses(premium, selector, "dio-eye-divider.webp"):
            fail(f"{selector} still uses protruding dio-eye-divider.webp")

    # Vesper gets one frame system, never the tracer plus a full bitmap frame.
    vesper_has_panel_frame = rule_uses(vesper, ".vesper-welcome:after", "dio-panel-frame.webp")
    vesper_has_tracer = rule_uses(premium, ".vesper-welcome", "dio-frame-tracer.svg")
    if vesper_has_panel_frame and vesper_has_tracer:
        fail("Vesper welcome surface stacks bitmap and tracer frames")
    if not vesper_has_panel_frame:
        fail("Vesper welcome surface lost its canonical panel frame")

    # The thesis gets its own readable measure rather than inheriting the giant global heading.
    if ".thesis-copy h2{" not in premium and ".thesis-copy h2{" not in launch:
        fail("investment thesis has no dedicated heading sizing rule")
    if "grid-template-columns:1.05fr .95fr" not in premium and "grid-template-columns:1.05fr .95fr" not in launch:
        fail("investment thesis has not reserved enough width for copy")

    print("DIO_VISUAL_SAFE_ZONE_VERIFIED")


if __name__ == "__main__":
    main()
