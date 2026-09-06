from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]

class ReleaseContract(unittest.TestCase):
    def test_final_polish_is_loaded_after_megabeast(self):
        html = (ROOT / 'index.html').read_text(encoding='utf-8')
        self.assertIn('assets/final-polish.css', html)
        self.assertLess(html.index('assets/megabeast/megabeast.css'), html.index('assets/final-polish.css'))

    def test_final_polish_uses_premium_assets_and_balanced_layout(self):
        css = (ROOT / 'assets/final-polish.css').read_text(encoding='utf-8')
        for token in (
            'DIO FINAL POLISH 2026-09-01',
            'dio-hero-home-2026.webp',
            'dio-orbit-banner-wide.webp',
            'dio-premium-medallion-board.webp',
            'dio-eye-divider.webp',
            '.mega-grid',
            '.mega-copy p',
            '.mega-visual img',
            '.messages .vesper-welcome',
        ):
            self.assertIn(token, css)


    def test_product_surfaces_load_final_polish_last(self):
        samples = {
            'products/index.html': '../assets/final-polish.css',
            'products/homs/index.html': '../../assets/final-polish.css',
            'products/homs-exam/index.html': '../../assets/final-polish.css',
        }
        for rel, href in samples.items():
            html = (ROOT / rel).read_text(encoding='utf-8')
            self.assertIn(href, html, rel)

    def test_vesper_uses_public_web_contract(self):
        js = (ROOT / 'vesper-intake.js').read_text(encoding='utf-8')
        self.assertNotIn('/api/vesper/chat/session', js)
        self.assertNotIn('/api/vesper/chat/message', js)
        self.assertNotIn('/api/vesper/chat/products', js)
        for token in (
            '/api/vesper/web/session',
            '/api/vesper/web/message',
            '/api/vesper/web/replies',
            'X-Vesper-Session-Token',
            'messageMode = "text"',
            'message_mode: messageMode',
        ):
            self.assertIn(token, js)

    def test_site_config_points_vesper_at_presence_public_worker(self):
        cfg = (ROOT / 'assets/dio-config.js').read_text(encoding='utf-8')
        self.assertIn('vesperPresenceApiOrigin', cfg)
        self.assertIn('https://dio-presence-gateway-public.dio-workflows.workers.dev', cfg)


    def test_vesper_text_limit_matches_public_worker(self):
        html = (ROOT / 'vesper-intake.html').read_text(encoding='utf-8')
        self.assertIn('id="message" maxlength="4000"', html)

    def test_vesper_final_polish_is_loaded_after_inline_style(self):
        html = (ROOT / 'vesper-intake.html').read_text(encoding='utf-8')
        self.assertIn('assets/final-polish.css', html)
        self.assertLess(html.rindex('</style>'), html.index('assets/final-polish.css'))

if __name__ == '__main__':
    unittest.main()
