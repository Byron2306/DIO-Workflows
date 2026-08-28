#!/usr/bin/env python3
"""Source contract for the homepage orbital map and shared product-hero halo."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
visual = (ROOT / "assets/visual-safety.css").read_text(encoding="utf-8")
shared = (ROOT / "assets/dio-visual-system.css").read_text(encoding="utf-8")

required_visual = (
    ".platform-map .map-node{left:auto!important;right:auto!important;top:auto!important;bottom:auto!important",
    ".platform-map:before{content:none!important",
    "background:url('premium/dio-gilded-orbit-ring.webp')",
)
required_shared = (
    "body[data-view=\"product\"] .editorial-hero:after{content:none!important",
    ".editorial-hero-grid:after",
    "background:url('premium/dio-gilded-orbit-ring.webp')",
    ".product-orbit-stage{position:relative;z-index:2!important",
)

missing = [token for token in required_visual if token not in visual]
missing += [token for token in required_shared if token not in shared]
if missing:
    raise SystemExit("ORBITAL_LAYOUT_REFUSE: " + " | ".join(missing))

print("DIO_ORBITAL_LAYOUT_VERIFIED")
