from pathlib import Path
from bs4 import BeautifulSoup
import hashlib

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / 'index.html').read_text(encoding='utf-8')
SOUP = BeautifulSoup(HOME, 'html.parser')

BASE_VESPER_SHA256 = 'e765756ae65a78ec401e1bbcf88ceed3d782ef7c6daf4558dc9abc24f3d1b96c'
CORE_ORDER = [
    'governed-consequence',
    'constitutional-laws',
    'product-factory',
    'metamorphic-cascade',
    'portfolio-universe',
    'studios',
    'commercial-metabolism',
    'products',
    'suite-explainers',
    'proof',
    'about',
    'intake',
]
SUITES = {
    'homs': 'assets/cinematic/homs-hero-a.webp',
    'evidex': 'assets/cinematic/evidex-hero-a.webp',
    'sophia': 'assets/cinematic/sophia-hero-a.webp',
    'vamp': 'assets/cinematic/vamp-hero-a.webp',
    'document-studio': 'assets/cinematic/document-hero-a.webp',
    'vesper': 'assets/cinematic/vesper-hero-a.webp',
}
WORKFLOWS = {
    'homs': 'assets/cinematic/homs-workflow.webp',
    'evidex': 'assets/cinematic/evidex-workflow.webp',
    'sophia': 'assets/cinematic/sophia-workflow.webp',
    'vamp': 'assets/cinematic/vamp-workflow.webp',
    'document-studio': 'assets/cinematic/document-workflow.webp',
    'vesper': 'assets/cinematic/vesper-workflow.webp',
}


def test_original_homepage_spine_is_preserved_with_one_deliberate_insertion():
    positions = {}
    for section_id in CORE_ORDER:
        node = SOUP.find(id=section_id)
        assert node is not None, section_id
        positions[section_id] = HOME.index(f'id="{section_id}"')
    assert [k for k, _ in sorted(positions.items(), key=lambda row: row[1])] == CORE_ORDER
    for marker in (
        'Most AI optimizes for plausible output.',
        'Meet the organism.',
        'Intelligence is cheap. Consequence is expensive.',
        'The customer buys an outcome. DIO runs backstage.',
    ):
        assert marker in HOME


def test_enhancement_css_is_additive_and_loaded_last():
    hrefs = [x.get('href') for x in SOUP.find_all('link', rel='stylesheet')]
    assert 'assets/final-polish.css' in hrefs
    assert 'assets/cinematic-chapters.css' in hrefs
    assert 'assets/surgical-enhancements.css' in hrefs
    assert hrefs.index('assets/surgical-enhancements.css') < hrefs.index('assets/corpo-cult-polish.css')
    assert hrefs[-1] == 'assets/corpo-cult-polish.css'


def test_existing_product_bridge_becomes_six_equal_flagship_portals():
    product = SOUP.select_one('#products')
    assert product is not None
    cards = product.select('.cinematic-product-card[data-suite]')
    assert len(cards) == 6
    assert {card.get('data-suite') for card in cards} == set(SUITES)
    srcs = {card.select_one('.cinematic-product-media > img').get('src') for card in cards}
    assert srcs == set(SUITES.values())


def test_compact_suite_explainer_adds_six_workflows_without_replacing_architecture():
    section = SOUP.select_one('#suite-explainers')
    assert section is not None
    rows = section.select('.family-explainer[data-suite]')
    assert len(rows) == 6
    assert {row.get('data-suite') for row in rows} == set(WORKFLOWS)
    images = {row.select_one('img').get('src') for row in rows}
    assert images == set(WORKFLOWS.values())
    assert SOUP.select_one('#governed-consequence .mega-visual') is not None
    assert SOUP.select_one('#metamorphic-cascade .mega-visual') is not None


def test_problematic_general_diagram_frame_overlay_is_removed():
    css = (ROOT / 'assets' / 'surgical-enhancements.css').read_text(encoding='utf-8')
    assert '.mega-section .mega-visual.cinematic-diagram::after' in css
    block = css.split('.mega-section .mega-visual.cinematic-diagram::after', 1)[1].split('}', 1)[0]
    assert 'content:none' in block.replace(' ', '')


def test_existing_flagship_pages_keep_their_native_structure_and_gain_explanation():
    expected_views = {'homs':'flagship','evidex':'flagship','sophia':'product','vamp':'product'}
    for slug, expected_view in expected_views.items():
        html = (ROOT / 'products' / slug / 'index.html').read_text(encoding='utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        assert soup.body.get('data-view') == expected_view
        assert soup.select_one('.editorial-hero') is not None
        if slug in ('homs', 'evidex'):
            assert soup.select_one('.film-section') is not None
        else:
            assert soup.select_one('.product-proof-strip') is not None
        assert soup.select_one('.vesper-conversion') is not None
        assert soup.select_one('.family-workflow-section') is not None
        assert soup.select_one('.family-production-transition') is not None
        hrefs = [x.get('href') for x in soup.find_all('link', rel='stylesheet')]
        assert '../../assets/surgical-enhancements.css' in hrefs
        assert hrefs.index('../../assets/surgical-enhancements.css') < hrefs.index('../../assets/corpo-cult-polish.css')
        assert hrefs[-1] == '../../assets/corpo-cult-polish.css'


def test_document_studio_and_vesper_receive_small_native_overview_pages():
    for slug in ('document-studio', 'vesper'):
        path = ROOT / 'products' / slug / 'index.html'
        assert path.is_file()
        soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
        assert soup.body.get('data-view') == 'flagship'
        assert soup.select_one('.editorial-hero') is not None
        assert soup.select_one('.family-workflow-section') is not None
        assert soup.select_one('.family-production-transition') is not None


def test_vesper_transport_is_byte_for_byte_preserved():
    actual = hashlib.sha256((ROOT / 'vesper-intake.js').read_bytes()).hexdigest()
    assert actual == BASE_VESPER_SHA256


def test_enhancement_styles_cover_native_flagship_and_product_family_views():
    css = (ROOT / 'assets' / 'surgical-enhancements.css').read_text(encoding='utf-8')
    assert 'body:is([data-view=\"flagship\"],[data-view=\"product\"])' in css

def test_text_safe_hero_art_is_repositioned_when_cropped_into_home_cards():
    css = (ROOT / 'assets' / 'surgical-enhancements.css').read_text(encoding='utf-8')
    for token in (
        '.cinematic-product-card[data-suite="homs"] .cinematic-product-media>img:first-child{object-position:76% center}',
        '.cinematic-product-card[data-suite="vesper"] .cinematic-product-media>img:first-child{object-position:72% center}',
    ):
        assert token in css
