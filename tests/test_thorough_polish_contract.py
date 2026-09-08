from pathlib import Path
from bs4 import BeautifulSoup
import hashlib

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / 'index.html').read_text(encoding='utf-8')
SOUP = BeautifulSoup(HOME, 'html.parser')
POLISH = ROOT / 'assets' / 'corpo-cult-polish.css'
BASE_VESPER_SHA256 = 'e765756ae65a78ec401e1bbcf88ceed3d782ef7c6daf4558dc9abc24f3d1b96c'


def test_polish_layer_is_loaded_last_without_replacing_site_spine():
    hrefs = [x.get('href') for x in SOUP.find_all('link', rel='stylesheet')]
    assert hrefs[-1] == 'assets/corpo-cult-polish.css'
    expected = [
        'governed-consequence','constitutional-laws','product-factory','metamorphic-cascade',
        'portfolio-universe','studios','commercial-metabolism','products','suite-explainers',
        'proof','about','intake'
    ]
    positions = [HOME.index(f'id="{section_id}"') for section_id in expected]
    assert positions == sorted(positions)


def test_homepage_uses_transparent_eye_asset():
    eye = SOUP.select_one('.mega-hero-seal img')
    assert eye is not None
    assert eye.get('src') == 'assets/premium/dio-eye-transparent.png'
    assert (ROOT / eye.get('src')).is_file()


def test_light_beige_chapters_are_removed_from_additive_polish():
    css = POLISH.read_text(encoding='utf-8')
    for selector in ('.launch-v2 .suite-explainers', '.family-workflow-section', '.launch-v2 .about-founder'):
        assert selector in css
    for pale in ('#f0eadf','#e7dfd1','#eee8dd','#e4dccf','#eee5d5','#d9cdbb','rgba(255,252,246'):
        assert pale not in css.lower()
    assert '--cult-obsidian' in css
    assert '--cult-bronze' in css


def test_large_headings_get_wider_copy_columns():
    css = POLISH.read_text(encoding='utf-8').replace(' ', '')
    assert 'grid-template-columns:minmax(460px,.92fr)minmax(0,1.08fr)' in css
    assert '.mega-copy{max-width:760px' in css
    assert '.suite-explainer-head{grid-template-columns:minmax(0,1.25fr)minmax(360px,.75fr)' in css


def test_uploaded_hero_banners_are_distributed_across_homepage_chapters():
    css = POLISH.read_text(encoding='utf-8')
    required = {
        'governed-consequence':'chapter-governance.webp',
        'constitutional-laws':'chapter-constitution.webp',
        'product-factory':'chapter-product-factory.webp',
        'portfolio-universe':'chapter-portfolio.webp',
        'studios':'chapter-studios.webp',
        'commercial-metabolism':'chapter-market.webp',
    }
    for section_id, asset in required.items():
        assert f'#{section_id}' in css
        assert asset in css
        assert (ROOT / 'assets' / 'polish' / asset).is_file()


def test_explainer_cards_remain_dark_not_paper_cards():
    css = POLISH.read_text(encoding='utf-8')
    assert '.launch-v2 .family-explainer{' in css
    explainer = css.split('.launch-v2 .family-explainer{',1)[1].split('}',1)[0]
    assert '#0b0c0e' in explainer or 'rgba(11,12,14' in explainer
    assert '255,252,246' not in explainer


def test_vesper_transport_remains_byte_identical():
    actual = hashlib.sha256((ROOT / 'vesper-intake.js').read_bytes()).hexdigest()
    assert actual == BASE_VESPER_SHA256
