#!/usr/bin/env python3
"""Source contract for the homepage orbital map and product-hero halo."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
visual = (ROOT / "assets/visual-safety.css").read_text(encoding="utf-8")
premium = (ROOT / "assets/premium/premium.css").read_text(encoding="utf-8")

required_visual = (
    ".platform-map .map-node{left:auto!important;right:auto!important;top:auto!important;bottom:auto!important",
    ".platform-map:before{content:none!important",
    "background:url('premium/dio-gilded-orbit-ring.webp')",
)
required_premium = (
    "body[data-view=\"product\"] .editorial-hero:after{content:none!important",
    ".editorial-hero-grid:after",
    "background:url('dio-gilded-orbit-ring.webp')",
    ".product-orbit-stage{position:relative;z-index:2",
)

missing = [token for token in required_visual if token not in visual]
missing += [token for token in required_premium if token not in premium]
if missing:
    raise SystemExit("ORBITAL_LAYOUT_REFUSE: " + " | ".join(missing))

print("DIO_ORBITAL_LAYOUT_VERIFIED")
