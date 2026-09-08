from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COUTURE = ROOT / "assets" / "couture-final.css"


def css() -> str:
    return COUTURE.read_text(encoding="utf-8")


def test_orbit_caption_and_brand_material_are_contained_inside_panel():
    text = css()
    for token in (
        "DIO COUTURE CONTENT CONTAINMENT",
        ".product-orbit-stage figcaption{",
        "box-sizing:border-box!important",
        "max-width:90%!important",
        "overflow:hidden!important",
        ".product-orbit-stage figcaption strong{",
        "max-width:100%!important",
        "overflow-wrap:anywhere!important",
        "text-overflow:ellipsis",
    ):
        assert token in text


def test_hero_background_motif_tracks_the_visual_panel_not_the_viewport():
    text = css()
    for token in (
        "--family-hero-position:72% center",
        '[data-product="document-studio"]{--family-hero-position:76% center}',
        ".editorial-hero::before{",
        "background-position:var(--family-hero-position)!important",
    ):
        assert token in text


def test_orbit_panel_has_inner_safe_zone_for_chips_and_caption():
    text = css()
    for token in (
        "--dio-orbit-safe:clamp(18px,3vw,30px)",
        "padding:var(--dio-orbit-safe)!important",
        ".orbit-label.a{left:var(--dio-orbit-safe)!important",
        ".orbit-label.b{right:var(--dio-orbit-safe)!important",
        ".orbit-label.c{left:var(--dio-orbit-safe)!important",
        ".orbit-label.d{right:var(--dio-orbit-safe)!important",
    ):
        assert token in text


def test_sitewide_reading_and_card_rhythm_are_consistent():
    text = css()
    for token in (
        "DIO FINAL SITEWIDE FINISH",
        "--dio-copy-measure-tight:58ch",
        ".truthgrid,.evidence-layout,.pilot-grid{",
        "gap:clamp(30px,4.6vw,72px)!important",
        ".card-body,.artifact-card,.proof-artifact-card,.evidence-receipt-card{",
        "min-width:0!important",
        ".card h2,.artifact-card h3,.proof-artifact-card h3{",
        "text-wrap:balance!important",
    ):
        assert token in text


def test_mobile_controls_and_orbit_content_remain_inside_viewport():
    text = css()
    for token in (
        "@media(max-width:560px)",
        ".product-orbit-stage{width:100%!important;max-width:100%!important",
        ".orbit-label{max-width:40%!important",
        ".hero-actions{display:grid!important;grid-template-columns:1fr!important",
        ".hero-actions .button{width:100%!important",
    ):
        assert token in text


if __name__ == "__main__":
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
    print(f"DIO_FINAL_COUTURE_POLISH_VERIFIED tests={len(tests)}")
