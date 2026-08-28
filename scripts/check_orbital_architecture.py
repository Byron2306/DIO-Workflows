from pathlib import Path

root = Path(__file__).resolve().parents[1]
config = (root / 'assets/dio-config.js').read_text(encoding='utf-8')
orbital_js = (root / 'assets/orbital-architecture.js').read_text(encoding='utf-8')
orbital_css = (root / 'assets/orbital-architecture.css').read_text(encoding='utf-8')

for token in ('orbital-architecture.css', 'orbital-architecture.js'):
    assert token in config, f'missing orbital loader token: {token}'

for token in (
    'dio-gilded-orbit-ring.webp',
    'dio-eye-premium.webp',
    'dio-gilded-trace-long.webp',
    'map-core-premium',
    "map.dataset.systemMap = 'premium-orbital'",
    "window.addEventListener('load'",
):
    assert token in orbital_js, f'missing premium orbital runtime token: {token}'

for token in (
    'dio-gilded-pill-frame.webp',
    '.platform-orbit-map .map-premium-ring',
    '.platform-orbit-map .map-node',
    '@media(max-width:760px)',
):
    assert token in orbital_css, f'missing premium orbital style token: {token}'

print('DIO_PREMIUM_ORBITAL_ARCHITECTURE_BOUND')
