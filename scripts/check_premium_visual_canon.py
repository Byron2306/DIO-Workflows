#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
product = (ROOT / 'products/product.css').read_text(encoding='utf-8')
premium = (ROOT / 'assets/premium/premium.css').read_text(encoding='utf-8')
visual = (ROOT / 'assets/dio-visual-system.css').read_text(encoding='utf-8')
mega = (ROOT / 'assets/megabeast/megabeast.css').read_text(encoding='utf-8')
app = (ROOT / 'products/app.js').read_text(encoding='utf-8')

errors=[]
selector='body:is([data-view="product"],[data-view="flagship"])'
for name,text in [('product.css',product),('premium.css',premium),('dio-visual-system.css',visual)]:
    if selector not in text:
        errors.append(f'{name}: flagship not bound to shared premium product shell')

for rel in ['privacy/index.html','terms/index.html','data-deletion/index.html']:
    text=(ROOT/rel).read_text(encoding='utf-8')
    if '../assets/premium/premium.css' not in text:
        errors.append(f'{rel}: premium library not loaded')
    if '../assets/premium/dio-eye-premium.webp' not in text:
        errors.append(f'{rel}: premium eye not used')

required_mega=(
    "font-family:'Noto Serif Display','Noto Serif',Georgia,'Times New Roman',serif",
    "background:url('../premium/dio-gilded-panel-frame.webp')",
    '.mega-section>.page{width:min(1320px',
    '.mega-grid{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.55fr)',
)
for token in required_mega:
    if token not in mega:
        errors.append(f'megabeast.css: missing premium/enlarged diagram rule: {token}')

if 'max-width:calc(50% - 24px)' not in visual:
    errors.append('dio-visual-system.css: mobile orbit plaques lack collision safe-zone')
if 'dio-eye-premium.webp' not in app:
    errors.append('products/app.js: premium eye/fallback not wired into product visuals')

if errors:
    raise SystemExit('PREMIUM_VISUAL_CANON_REFUSE:\n- ' + '\n- '.join(errors))
print('DIO_PREMIUM_VISUAL_CANON_VERIFIED')
