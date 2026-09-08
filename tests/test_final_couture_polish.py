from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COUTURE = ROOT / "assets" / "couture-final.css"
FINISH = ROOT / "assets" / "couture-finish.css"
PROOF = ROOT / "products" / "proof-layer.css"
CONFIG = ROOT / "assets" / "dio-config.js"


def css() -> str:
    parts = [COUTURE.read_text(encoding="utf-8")]
    if FINISH.is_file():
        parts.append(FINISH.read_text(encoding="utf-8"))
    return "\n".join(parts)


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


def test_finish_layer_is_loaded_after_existing_couture_everywhere():
    assert FINISH.is_file()
    proof = PROOF.read_text(encoding="utf-8")
    config = CONFIG.read_text(encoding="utf-8")
    assert "couture-final.css" in proof and "couture-finish.css" in proof
    assert proof.index("couture-final.css") < proof.index("couture-finish.css")
    assert "couture-final.css" in config and "couture-finish.css" in config
    assert config.index("couture-final.css") < config.index("couture-finish.css")
    assert "data-dio-couture-finish" in config


def test_final_hero_lighting_mini_patch_improves_contrast_without_flattening_art():
    text = css()
    for token in (
        "DIO FINAL HERO LIGHTING MINI PATCH",
        "--dio-hero-gold:#f3d77d",
        "--dio-hero-gold-hot:#ffe29a",
        "--dio-hero-copy:#eee6d7",
        "background:linear-gradient(90deg,rgba(5,6,8,.76)",
        ".editorial-copy h1{",
        "text-shadow:0 0 1px rgba(255,226,154,.18),0 0 14px rgba(215,175,74,.10)",
        ".editorial-copy .lead,.editorial-copy .buyer-line{color:var(--dio-hero-copy)!important",
        "box-shadow:inset 0 1px 0 rgba(255,226,154,.08),0 14px 36px rgba(0,0,0,.38),0 0 24px rgba(215,175,74,.06)!important",
    ):
        assert token in text


def test_magnum_opus_visual_canon_separates_gold_and_lifts_real_hero_art():
    text = css()
    for token in (
        "DIO MAGNUM OPUS VISUAL CANON",
        "--dio-magnum-headline-top:#f0dfb1",
        "--dio-magnum-ui:#d99a36",
        "--dio-magnum-ornament:#8b622c",
        "--dio-hero-lift:1.42",
        'data-product="document-studio"]{--dio-hero-lift:1.18}',
        "background-image:radial-gradient(circle at 74% 44%,rgba(225,165,67,.11),transparent 34%)",
        "filter:brightness(var(--dio-hero-lift)) contrast(1.06) saturate(.98)!important",
        "DIO MAGNUM OPUS PRODUCT FRAME",
        "url('dio-frame-tracer.svg') center/100% 100% no-repeat",
        "border:1px solid rgba(207,146,48,.38)!important",
        "brightness(.86) contrast(1.08) saturate(.72) sepia(.16)",
    ):
        assert token in text
    assert "DIO WARM GOLD + HERO LIGHTING FINAL PASS" not in text


if __name__ == "__main__":
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
    print(f"DIO_FINAL_COUTURE_POLISH_VERIFIED tests={len(tests)}")
