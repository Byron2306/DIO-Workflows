from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPO = ROOT / "assets" / "corpo-cult-polish.css"


def test_full_elegance_pass_is_bound_to_shared_live_style():
    css = CORPO.read_text(encoding="utf-8")
    assert "DIO FULL ELEGANCE PASS" in css
    for token in (
        '--dio-display-serif:"Iowan Old Style","Baskerville","Palatino Linotype","Book Antiqua",Georgia,serif',
        '--dio-ui-sans:Inter,Aptos,"Segoe UI",Arial,sans-serif',
        '--dio-copy-parchment:#d2c3a0',
        '--dio-copy-lead:#e6d7b5',
    ):
        assert token in css


def test_flagship_heroes_use_elegant_type_and_balanced_mobile_scale():
    css = CORPO.read_text(encoding="utf-8")
    for token in (
        'body:is([data-view="flagship"],[data-view="product"]) .editorial-copy h1',
        'font-family:var(--dio-display-serif)!important',
        'font-size:clamp(3.25rem,6.4vw,6.5rem)!important',
        'max-width:11.5ch!important',
        '@media(max-width:820px)',
        'font-size:clamp(2.7rem,11.8vw,4.7rem)!important',
    ):
        assert token in css


def test_background_art_is_quiet_enough_for_reading():
    css = CORPO.read_text(encoding="utf-8")
    for token in (
        '.product-orbit-eye,.product-matrix',
        'filter:saturate(.84) contrast(1.03) brightness(.86)',
        '.family-workflow-figure img',
        'filter:saturate(.82) contrast(1.04) brightness(.88)',
        '.launch-v2 .suite-explainers::after',
    ):
        assert token in css


def test_gold_rectangles_share_one_geometry_and_fit_mobile():
    css = CORPO.read_text(encoding="utf-8")
    for token in (
        '.orbit-label',
        'min-height:34px!important',
        'padding:0 12px!important',
        'white-space:nowrap!important',
        'text-overflow:ellipsis!important',
        'max-width:46%!important',
        '.navlinks .cta',
        'min-height:46px',
        '.hero-actions .button',
    ):
        assert token in css


def test_home_family_story_uses_same_elegant_hierarchy():
    css = CORPO.read_text(encoding="utf-8")
    for token in (
        '.launch-v2 .suite-explainer-head h2',
        '.launch-v2 .suite-explainer-head p',
        'font-family:var(--dio-display-serif)!important',
        'color:var(--dio-copy-parchment)!important',
    ):
        assert token in css


if __name__ == "__main__":
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
    print(f"DIO_FULL_ELEGANCE_POLISH_VERIFIED tests={len(tests)}")
