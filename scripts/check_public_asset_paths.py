#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import re
from urllib.parse import urlsplit, unquote

ROOT=Path(__file__).resolve().parents[1]
errors=[]

class P(HTMLParser):
    def __init__(self,path):
        super().__init__(); self.path=path
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        for key in ('src','href','poster'):
            value=d.get(key)
            if not value: continue
            check_ref(self.path,value,f'{tag}[{key}]')

def check_ref(source,ref,kind):
    if not ref or ref.startswith(('#','mailto:','tel:','javascript:','data:')): return
    if ref.startswith(('http://','https://','//')): return
    if '${' in ref or '{{' in ref: return
    clean=unquote(urlsplit(ref).path)
    if not clean: return
    target=(source.parent/clean).resolve()
    try: target.relative_to(ROOT.resolve())
    except ValueError:
        errors.append(f'{source.relative_to(ROOT)}: escapes repo: {ref}')
        return
    if clean.endswith('/'):
        target=target/'index.html'
    if not target.exists():
        errors.append(f'{source.relative_to(ROOT)}: missing {kind} -> {ref}')

for html in ROOT.rglob('*.html'):
    P(html).feed(html.read_text(encoding='utf-8',errors='ignore'))

url_rx=re.compile(r'url\(([^)]+)\)')
for css in ROOT.rglob('*.css'):
    text=css.read_text(encoding='utf-8',errors='ignore')
    for raw in url_rx.findall(text):
        ref=raw.strip().strip('"\'')
        if ref.startswith(('data:','#','http://','https://','//')) or not ref: continue
        check_ref(css,ref,'css url()')

if errors:
    raise SystemExit('PUBLIC_ASSET_PATHS_REFUSE:\n- '+'\n- '.join(errors[:100]))
print('DIO_PUBLIC_ASSET_PATHS_VERIFIED')
