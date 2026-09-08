from pathlib import Path
from bs4 import BeautifulSoup
import re

ROOT = Path(__file__).resolve().parents[1]

EXTENSIONS = {
    'article-publication': 'Article Publication',
    'article-publication-studio': 'Article Publication Studio',
    'contract-desk': 'Contract Desk',
    'corporate-readiness': 'Corporate Readiness',
    'entrepreneurproof': 'EntrepreneurProof',
    'finance-readiness': 'Finance Readiness',
    'finance-readiness-studio': 'Finance Readiness Studio',
    'fundingfinder': 'FundingFinder',
    'investorproof': 'InvestorProof',
    'launch-studio': 'Launch Studio',
    'popia-readiness': 'POPIA Readiness',
    'professional-correspondence': 'Professional Correspondence',
    'professional-correspondence-studio': 'Professional Correspondence Studio',
    'report-pitch-studio': 'Report & Pitch Studio',
    'site-studio': 'Site Studio',
}

FILMS = {
    'products/sophia/index.html': 'KmlCiHd9Ues',
    'products/vamp/index.html': 'pcMOl9tJFKA',
    'products/document-studio/index.html': 'a1kJiqDCRQk',
    'products/vesper/index.html': '5C4UcGjLJBE',
}


def test_runtime_catalog_is_68_unique_routes_with_15_canon_extensions():
    catalog = (ROOT / 'products' / 'catalog.js').read_text(encoding='utf-8')
    slugs = re.findall(r'"slug"\s*:\s*"([^"]+)"', catalog)
    assert len(slugs) == 68
    assert len(set(slugs)) == 68
    assert set(EXTENSIONS) <= set(slugs)
    assert 'window.DIO_PRODUCT_CATALOG.length!==68' in catalog.replace(' ', '')
    assert 'base canon + 15 canon extensions' in catalog.lower()
    for slug, name in EXTENSIONS.items():
        block = catalog.split(f'"slug": "{slug}"', 1)[1].split('\n  },', 1)[0]
        assert f'"name": "{name}"' in block
        assert '"tier": "canon_extension"' in block


def test_portfolio_surface_explains_68_as_53_base_plus_15_extensions():
    html = (ROOT / 'products' / 'index.html').read_text(encoding='utf-8')
    assert '68 canonical product incarnations' in html
    assert '53 base canon + 15 canon extensions' in html
    assert '68 mapped incarnations' in html
    assert '159-journey production gauntlet' in html
    assert '45/45 controlled ProductGrade journeys' in html
    assert '204 / 204 controlled journeys verified' in html


def test_homepage_promotes_68_without_rewriting_historic_53x3_proof():
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    assert 'EXPLORE 68 PRODUCTS' in html
    assert '<strong>68</strong>' in html
    assert '53 base canon + 15 canon extensions' in html
    assert 'OPEN THE 68-PRODUCT PORTFOLIO' in html
    assert 'EXPLORE ALL 68 PRODUCT ROUTES' in html
    # Historical proof claims remain explicitly bound to the original base-canon gauntlet.
    assert '53-product production gauntlet records 159 controlled journeys' in html
    assert 'PROFESSIONAL_EVIDENCE_53_X3_RECEIPT.json' in html


def test_all_15_extension_pages_exist_and_label_the_extension_tier():
    for slug in EXTENSIONS:
        path = ROOT / 'products' / slug / 'index.html'
        assert path.is_file(), slug
        html = path.read_text(encoding='utf-8')
        assert f'data-product="{slug}"' in html
        assert '68 PRODUCTS' in html
        assert 'CANON EXTENSION' in html


def test_four_requested_flagships_embed_correct_youtube_films_and_watch_ctas():
    for rel, video_id in FILMS.items():
        html = (ROOT / rel).read_text(encoding='utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        film = soup.select_one('.product-film-section iframe')
        assert film is not None, rel
        assert video_id in film.get('src', ''), rel
        assert 'youtube-nocookie.com/embed/' in film.get('src', ''), rel
        hrefs = [a.get('href', '') for a in soup.select('a') if 'WATCH THE FILM' in a.get_text(' ', strip=True)]
        assert any(video_id in href for href in hrefs), rel


def test_flagship_and_portfolio_surfaces_use_more_background_banner_art():
    css = (ROOT / 'assets' / 'surgical-enhancements.css').read_text(encoding='utf-8')
    for token in (
        '.product-film-section',
        '.family-workflow-section::before',
        '.vesper-conversion::before',
        'chapter-portfolio.webp',
    ):
        assert token in css
    portfolio = (ROOT / 'products' / 'index.html').read_text(encoding='utf-8')
    assert 'portfolio-cinematic-banner' in portfolio


def test_ci_and_launch_registry_distinguish_68_surface_from_53_proof_corpus():
    public_ci = (ROOT / '.github' / 'workflows' / 'public-portfolio-check.yml').read_text(encoding='utf-8')
    storefront_ci = (ROOT / '.github' / 'workflows' / 'storefront-check.yml').read_text(encoding='utf-8')
    editorial_ci = (ROOT / '.github' / 'workflows' / 'product-editorial-evidence.yml').read_text(encoding='utf-8')
    megabeast_ci = (ROOT / '.github' / 'workflows' / 'megabeast-public-story.yml').read_text(encoding='utf-8')
    assert 'rows.length!==68' in public_ci
    assert 'rows.length!==68' in storefront_ci
    assert 'rows.length!==68' in editorial_ci
    assert 'rows.length!==68' in megabeast_ci
    assert "const base=rows.filter(p=>p.tier!=='canon_extension')" in storefront_ci
    assert 'base.length!==53' in storefront_ci
    assert 'extensions.length!==15' in storefront_ci
    # The old production-proof catalog is intentionally still 53 entries.
    assert 'if len(rows)!=53:' in megabeast_ci

    registry = (ROOT / 'products' / 'launch-registry.json').read_text(encoding='utf-8')
    assert '"canon_level_product_count": 68' in registry
    assert '"base_canon_product_count": 53' in registry
    assert '"canon_extension_count": 15' in registry


def test_historic_53_proof_surfaces_are_explicitly_labeled_base_canon():
    home = (ROOT / 'index.html').read_text(encoding='utf-8')
    proof = (ROOT / 'products' / 'proof' / 'public-production-proof.html').read_text(encoding='utf-8')
    assert 'for every base-canon incarnation' in home
    assert '53 base-canon incarnations. 159 controlled journeys.' in proof
