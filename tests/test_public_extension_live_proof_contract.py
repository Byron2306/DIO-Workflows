from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_PROOF_CATALOG = ROOT / "products" / "proof" / "portfolio-proof-catalog.json"
EXTENSION_PROOF_CATALOG = ROOT / "products" / "proof" / "canon-extension-proof-catalog.json"
EVIDENCE_MANIFEST = ROOT / "products" / "proof" / "extension-evidence" / "evidence-manifest.json"
EVIDENCE_ROOT = ROOT / "products" / "proof" / "extension-evidence" / "raw"
FULL_BUNDLE = ROOT / "products" / "proof" / "extension-evidence" / "dio-canon-68x3-productgrade-evidence.zip"
APP = ROOT / "products" / "app.js"
DIO_CONFIG = ROOT / "assets" / "dio-config.js"
VISUAL_CSS = ROOT / "assets" / "dio-visual-system.css"
PROOF_CSS = ROOT / "products" / "proof-layer.css"
CANON_SHEEN_CSS = ROOT / "assets" / "canon-gold-sheen.css"
EXPECTED_SOURCE_ARTIFACT_SHA256 = "cd49538d3a6eece75cbb8b4a3458269a21c84f9da5760e1b3e4f92b76e096ed1"

EXTENSION_SLUGS = {
    "article-publication",
    "article-publication-studio",
    "contract-desk",
    "corporate-readiness",
    "entrepreneurproof",
    "finance-readiness",
    "finance-readiness-studio",
    "fundingfinder",
    "investorproof",
    "launch-studio",
    "popia-readiness",
    "professional-correspondence",
    "professional-correspondence-studio",
    "report-pitch-studio",
    "site-studio",
}

FLAGSHIP_SLUGS = (
    "homs",
    "evidex",
    "sophia",
    "vamp",
    "document-studio",
    "vesper",
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_extension_catalog() -> dict:
    return json.loads(EXTENSION_PROOF_CATALOG.read_text(encoding="utf-8"))


def load_manifest() -> dict:
    return json.loads(EVIDENCE_MANIFEST.read_text(encoding="utf-8"))


def test_historic_53_catalog_stays_immutable_while_extension_catalog_completes_68x3_truth():
    base = json.loads(BASE_PROOF_CATALOG.read_text(encoding="utf-8"))
    ext = load_extension_catalog()
    assert base["canonical_product_count"] == 53
    assert base["execution_journey_count"] == 159
    assert len(base["products"]) == 53
    assert ext["canon_extension_count"] == 15
    assert ext["execution_journey_count"] == 45
    assert ext["execution_verified_journey_count"] == 45
    assert ext["combined_canonical_product_count"] == 68
    assert ext["combined_execution_journey_count"] == 204
    assert ext["combined_execution_verified_journey_count"] == 204
    assert ext["commercial_validation"] == "UNPROVED"
    assert ext["authority_created"] is False
    assert len(ext["products"]) == 15


def test_all_455_ci_evidence_files_are_permanently_public_with_exact_hashes():
    manifest = load_manifest()
    assert manifest["file_count"] == 455
    assert len(manifest["files"]) == 455
    assert manifest["source_artifact_sha256"].removeprefix("sha256:") == EXPECTED_SOURCE_ARTIFACT_SHA256
    for key, meta in manifest["files"].items():
        path = EVIDENCE_ROOT / key
        assert path.is_file(), key
        assert path.stat().st_size == meta["bytes"], key
        assert sha256(path) == meta["sha256"].removeprefix("sha256:"), key
    assert FULL_BUNDLE.is_file()
    assert sha256(FULL_BUNDLE) == EXPECTED_SOURCE_ARTIFACT_SHA256


def test_all_15_extensions_have_three_real_hash_bound_public_buyer_artifacts():
    data = load_extension_catalog()
    rows = {row["slug"]: row for row in data["products"]}
    assert set(rows) == EXTENSION_SLUGS

    for slug, row in rows.items():
        assert row["status"] == "PRODUCT_GRADE_VERIFIED", slug
        assert row["commercial_validation"] == "UNPROVED", slug
        assert row["authority_created"] is False, slug
        assert row["external_effects"] is False, slug
        artifacts = row["artifacts"]
        assert {a["variant"] for a in artifacts} == {"normal", "messy", "adversarial"}, slug
        assert len(artifacts) == 3, slug
        for artifact in artifacts:
            path = ROOT / artifact["path"]
            assert path.is_file(), f"{slug}: missing {artifact['variant']} artifact"
            assert artifact["sha256"].removeprefix("sha256:") == sha256(path), f"{slug}: hash mismatch {artifact['variant']}"


def test_all_15_extensions_publish_direct_verification_receipts():
    data = load_extension_catalog()
    rows = {row["slug"]: row for row in data["products"]}
    for slug, row in rows.items():
        receipt_kinds = {receipt["kind"] for receipt in row["evidence_receipts"]}
        assert "product_grade" in receipt_kinds, slug
        assert {"variant_normal", "variant_messy", "variant_adversarial"} <= receipt_kinds, slug
        for receipt in row["evidence_receipts"]:
            path = ROOT / receipt["path"]
            assert path.is_file(), f"{slug}: missing receipt {receipt['kind']}"
            assert receipt["sha256"].removeprefix("sha256:") == sha256(path), f"{slug}: receipt hash mismatch {receipt['kind']}"


def test_extension_renderer_merges_two_proof_families_and_has_no_prose_only_success_fallback():
    app = APP.read_text(encoding="utf-8")
    assert "canon-extension-proof-catalog.json" in app
    assert "ProductGrade verified.</h3>" not in app
    assert "PUBLIC PROOF MISSING" in app
    assert "evidence_receipts" in app
    assert "FULL 455-FILE EVIDENCE LEDGER" in app


def test_gilded_corpo_cult_typography_uses_gold_for_display_text_and_ivory_for_body_copy():
    visual = VISUAL_CSS.read_text(encoding="utf-8")
    proof = PROOF_CSS.read_text(encoding="utf-8")
    for token in ("--dio-gold-rich", "--dio-gold-bright", "--dio-ivory", "--dio-parchment"):
        assert token in visual
    for token in (
        ".editorial-copy h1",
        ".section-intro h2",
        ".card-body h2",
        ".proof-job-card h3",
        ".proof-artifact-card h3",
        ".evidence-receipt-card h3",
    ):
        assert token in visual + proof
    assert "color:var(--dio-gold-rich)" in visual + proof
    assert "color:var(--dio-ivory)" in visual + proof


def test_canon_gold_sheen_uses_layered_metallic_gold_and_selective_panel_glints():
    assert CANON_SHEEN_CSS.is_file()
    css = CANON_SHEEN_CSS.read_text(encoding="utf-8")
    config = DIO_CONFIG.read_text(encoding="utf-8")
    proof = PROOF_CSS.read_text(encoding="utf-8")

    palette = (
        "--canon-gold-antique:#b8922e",
        "--canon-gold-rich:#e7c45a",
        "--canon-gold-bright:#f5d77a",
        "--canon-gold-champagne:#ebd9a3",
        "--canon-parchment:#cfc2a2",
    )
    for token in palette:
        assert token in css

    for selector in (
        ".proof-job-card",
        ".proof-state-card",
        ".proof-artifact-card",
        ".evidence-receipt-card",
        ".proof-job-card::before",
        ".proof-job-card::after",
    ):
        assert selector in css

    assert "linear-gradient" in css
    assert "radial-gradient" in css
    assert "box-shadow" in css
    assert "canon-gold-sheen.css" in config
    assert "canon-gold-sheen.css" in proof


def test_flagship_product_pages_load_canon_gold_after_legacy_polish_layers():
    for slug in FLAGSHIP_SLUGS:
        page = (ROOT / "products" / slug / "index.html").read_text(encoding="utf-8")
        canon = '../../assets/canon-gold-sheen.css'
        legacy = '../../assets/corpo-cult-polish.css'
        assert canon in page, f"{slug}: canon gold stylesheet missing"
        assert legacy in page, f"{slug}: legacy polish stylesheet missing"
        assert page.rfind(canon) > page.rfind(legacy), f"{slug}: canon gold must load last"


if __name__ == "__main__":
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
    print(f"DIO_PUBLIC_EXTENSION_LIVE_PROOF_CONTRACT_VERIFIED tests={len(tests)}")
