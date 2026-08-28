#!/usr/bin/env python3
"""Guard DIO's public surfaces against ornament/text collisions.

The premium library may keep its reusable artwork. This contract verifies that the
public runtime installs a final safe-zone layer and replaces the fixed-text system
map with responsive DOM content before visitors interact with it.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def fail(message: str) -> None:
    raise SystemExit(f"VISUAL_SAFETY_REFUSE: {message}")


def rule_body(css: str, selector_fragment: str) -> str:
    for selector, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css, flags=re.S):
        if selector_fragment in selector:
            return body
    return ""


def require_rule(css: str, selector: str, *tokens: str) -> None:
    body = rule_body(css, selector)
    if not body:
        fail(f"visual safety rule missing: {selector}")
    for token in tokens:
        if token not in body:
            fail(f"{selector} does not enforce {token}")


def main() -> None:
    visual_path = ROOT / "assets/visual-safety.css"
    if not visual_path.exists():
        fail("final visual-safety stylesheet is missing")

    visual = visual_path.read_text(encoding="utf-8")
    config = read("assets/dio-config.js")
    launch_js = read("assets/launch-v2.js")
    home = read("index.html")
    vesper = read("vesper-intake.html")

    # The same late-loaded correction layer must protect both public surfaces.
    for token in ("visual-safety.css", "data-dio-visual-safety"):
        if token not in config:
            fail(f"dio-config.js does not install the final safe-zone layer: {token}")
    for page, source in (("homepage", home), ("Vesper", vesper)):
        if "assets/dio-config.js" not in source:
            fail(f"{page} does not load dio-config.js and cannot receive visual safety overrides")

    # Keep the SVG as a no-JS fallback, but replace it with real responsive labels at runtime.
    for token in ("installResponsiveSystemMap", "map-core", "map-ring", "map-node"):
        if token not in launch_js:
            fail(f"responsive system-map runtime missing {token}")

    # Never paint large decorative artwork underneath readable CTA copy.
    require_rule(visual, ".launch-v2 .portfolio-cta:before", "content:none!important", "background:none!important")

    # Never let ornamental section dividers trespass across section boundaries.
    for selector in (
        ".launch-v2 .launch-products:after",
        ".launch-v2 .platform-thesis:after",
        ".launch-v2 .launch-proof:after",
    ):
        require_rule(visual, selector, "content:none!important", "display:none!important")

    # Vesper gets one canonical frame and a protected interior text zone.
    require_rule(visual, ".messages .vesper-welcome", "padding:", "max-width:")
    require_rule(visual, ".messages .vesper-welcome:after", "dio-panel-frame.webp", "inset:")
    require_rule(visual, ".vesper-welcome h2", "font-size:clamp(", "max-width:")

    # Investment thesis gets readable measure instead of inheriting giant-heading geometry.
    require_rule(visual, ".launch-v2 .thesis-grid", "grid-template-columns:1.05fr .95fr")
    require_rule(visual, ".launch-v2 .thesis-copy h2", "font-size:clamp(", "line-height:")

    # DOM system map must have explicit responsive geometry, not browser-scaled SVG labels.
    require_rule(visual, ".launch-v2 .platform-map .map-node", "position:absolute", "min-width:")
    if "@media(max-width:760px)" not in visual:
        fail("visual safety layer has no compact viewport system-map/Vesper treatment")

    print("DIO_VISUAL_SAFE_ZONE_VERIFIED")


if __name__ == "__main__":
    main()
