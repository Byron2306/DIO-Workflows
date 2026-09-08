from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPO = ROOT / "assets" / "corpo-cult-polish.css"


def css() -> str:
    return CORPO.read_text(encoding="utf-8")


def test_full_elegance_pass_is_bound_to_shared_live_style():
    text = css()
    assert "DIO FULL ELEGANCE PASS" in text
    for token in (
        '--dio-display-serif:"Iowan Old Style","Baskerville","Palatino Linotype","Book Antiqua",Georgia,serif',
        '--dio-ui-sans:Inter,Aptos,"Segoe UI",Arial,sans-serif',
        '--dio-copy-parchment:#d2c3a0',
        '--dio-copy-lead:#e6d7b5',
    ):
        assert token in text


def test_flagship_heroes_use_elegant_type_and_balanced_mobile_scale():
    text = css()
    for token in (
        'body:is([data-view="flagship"],[data-view="product"]) .editorial-copy h1',
        'font-family:var(--dio-display-serif)!important',
        'font-size:clamp(3.25rem,6.4vw,6.5rem)!important',
        'max-width:11.5ch!important',
        '@media(max-width:820px)',
        'font-size:clamp(2.7rem,11.8vw,4.7rem)!important',
    ):
        assert token in text


def test_background_art_is_quiet_enough_for_reading():
    text = css()
    for token in (
        '.product-orbit-eye,.product-matrix',
        'filter:saturate(.84) contrast(1.03) brightness(.86)',
        '.family-workflow-figure img',
        'filter:saturate(.82) contrast(1.04) brightness(.88)',
        '.launch-v2 .suite-explainers::after',
    ):
        assert token in text


def test_orbit_art_is_mathematically_centered_inside_the_stage():
    text = css()
    assert "DIO COUTURE ORBIT ALIGNMENT" in text
    for token in (
        '.product-orbit-stage{',
        'display:grid!important',
        'place-items:center!important',
        '.product-matrix,.product-orbit-eye{',
        'left:50%!important',
        'top:50%!important',
        'transform:translate(-50%,-50%)!important',
        'transform-origin:center center!important',
        'object-position:center center!important',
    ):
        assert token in text


def test_gold_rectangles_are_content_aware_and_never_overflow():
    text = css()
    for token in (
        '.orbit-label{',
        'min-width:clamp(104px,13vw,148px)!important',
        'max-width:clamp(124px,17vw,184px)!important',
        'min-height:38px!important',
        'padding:8px 12px!important',
        'white-space:normal!important',
        'overflow-wrap:anywhere!important',
        'line-height:1.12!important',
        'text-align:center!important',
        '.orbit-label.c{',
        '.navlinks .cta',
        '.hero-actions .button',
    ):
        assert token in text
    assert 'white-space:nowrap!important' not in text.split("DIO COUTURE ORBIT ALIGNMENT", 1)[1]


def test_sitewide_couture_rhythm_unifies_sections_cards_and_controls():
    text = css()
    assert "DIO SITEWIDE COUTURE RHYTHM" in text
    for token in (
        '--dio-section-space:clamp(72px,8vw,118px)',
        '--dio-card-pad:clamp(22px,2.4vw,32px)',
        '.editorial-section{padding:var(--dio-section-space) 0!important',
        '.proof-artifact-card,.evidence-receipt-card,.artifact-card,.pilot-card{',
        'padding:var(--dio-card-pad)!important',
        '.section-intro,.product-film-grid,.family-workflow-grid{',
        'gap:clamp(28px,4.4vw,66px)!important',
    ):
        assert token in text


def test_home_family_story_uses_same_elegant_hierarchy():
    text = css()
    for token in (
        '.launch-v2 .suite-explainer-head h2',
        '.launch-v2 .suite-explainer-head p',
        'font-family:var(--dio-display-serif)!important',
        'color:var(--dio-copy-parchment)!important',
    ):
        assert token in text


if __name__ == "__main__":
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
    print(f"DIO_FULL_ELEGANCE_POLISH_VERIFIED tests={len(tests)}")
