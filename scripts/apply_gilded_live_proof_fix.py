from pathlib import Path
import runpy

path = Path('scripts/apply_gilded_live_proof.py')
text = path.read_text(encoding='utf-8')
old = 'r"      if\\(!entry\\)\\{.*?        return;\\n      \\}\\n      const artifactCards=",'
new = 'r"      if\\(!entry\\)\\{.*?      const artifactCards=",'
if old not in text:
    raise SystemExit('fallback regex source not found')
path.write_text(text.replace(old, new, 1), encoding='utf-8')
runpy.run_path(str(path), run_name='__main__')
