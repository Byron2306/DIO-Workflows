from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / 'index.html').read_text(encoding='utf-8')
SOUP = BeautifulSoup(HTML, 'html.parser')
CSS_PATH = ROOT / 'assets' / 'cinematic-chapters.css'
CSS = CSS_PATH.read_text(encoding='utf-8') if CSS_PATH.exists() else ''


def test_cinematic_base_is_preserved_and_surgical_enhancement_loads_last():
    hrefs = [x.get('href') for x in SOUP.find_all('link', rel='stylesheet')]
    assert 'assets/cinematic-chapters.css' in hrefs
    assert 'assets/surgical-enhancements.css' in hrefs
    assert hrefs.index('assets/surgical-enhancements.css') < hrefs.index('assets/corpo-cult-polish.css')
    assert hrefs[-1] == 'assets/corpo-cult-polish.css'
    assert hrefs.index('assets/cinematic-chapters.css') < hrefs.index('assets/surgical-enhancements.css')


def test_kpi_strip_is_orbit_reliquary():
    stats = SOUP.select_one('.mega-stats.cinematic-reliquary')
    assert stats is not None
    assert 'dio-orbit-banner-wide.webp' in CSS
    assert '.cinematic-reliquary::before' in CSS


def test_youtube_player_has_no_ornamental_overlay():
    assert '.film-shell::after' in CSS
    rule = CSS.split('.film-shell::after', 1)[1].split('}', 1)[0]
    assert 'content:none' in rule.replace(' ', '')
    assert 'dio-panel-frame.webp' not in rule


def test_megabeast_diagrams_use_external_16x9_frame():
    figures = SOUP.select('.mega-section .mega-visual.cinematic-diagram')
    assert len(figures) >= 7
    assert 'dio-panel-frame.webp' in CSS
    assert '.cinematic-diagram::after' in CSS


def test_distinct_chapter_atmospheres_exist():
    atmospheres = {
        el.get('data-atmosphere')
        for el in SOUP.select('.mega-section[data-atmosphere]')
        if el.get('data-atmosphere')
    }
    assert {'home', 'product', 'portfolio', 'evidex', 'vamp'} <= atmospheres
    for asset in (
        'dio-hero-home-2026.webp',
        'dio-hero-product-2026.webp',
        'dio-hero-portfolio-2026.webp',
        'dio-hero-evidex-2026.webp',
        'dio-hero-vamp-2026.webp',
    ):
        assert asset in CSS


def test_vertical_orbit_anchor_is_used():
    anchor = SOUP.select_one('.chapter-orbit-vertical')
    assert anchor is not None
    assert 'dio-orbit-vertical.webp' in CSS


def test_product_bridge_is_image_led_and_uses_six_new_flagship_heroes():
    cards = SOUP.select('.mega-card.cinematic-product-card[data-suite]')
    assert len(cards) == 6
    assert all(card.select_one('.cinematic-product-media img') for card in cards)
    srcs = {card.select_one('.cinematic-product-media img').get('src') for card in cards}
    assert srcs == {
        'assets/cinematic/homs-hero-a.webp',
        'assets/cinematic/evidex-hero-a.webp',
        'assets/cinematic/sophia-hero-a.webp',
        'assets/cinematic/vamp-hero-a.webp',
        'assets/cinematic/document-hero-a.webp',
        'assets/cinematic/vesper-hero-a.webp',
    }


def test_cinematic_assets_resolve():
    for asset in (
        'dio-orbit-banner-wide.webp',
        'dio-panel-frame.webp',
        'dio-orbit-vertical.webp',
        'dio-premium-medallion-board.webp',
        'dio-vesper-market-panel.webp',
    ):
        assert (ROOT / 'assets' / 'premium' / asset).is_file()
