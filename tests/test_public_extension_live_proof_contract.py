from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROOF_CATALOG = ROOT / "products" / "proof" / "portfolio-proof-catalog.json"
APP = ROOT / "products" / "app.js"
VISUAL_CSS = ROOT / "assets" / "dio-visual-system.css"
PROOF_CSS = ROOT / "products" / "proof-layer.css"
FULL_BUNDLE = ROOT / "products" / "proof" / "extension-evidence" / "dio-canon-68x3-productgrade-evidence.zip"
EXPECTED_BUNDLE_SHA256 = "cd49538d3a6eece75cbb8b4a3458269a21c84f9da5760e1b3e4f92b76e096ed1"

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


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def test_public_proof_catalog_promotes_full_68x3_truth():
    data = json.loads(PROOF_CATALOG.read_text(encoding="utf-8"))
    assert data["canonical_product_count"] == 68
    assert data["execution_journey_count"] == 204
    assert data["execution_verified_journey_count"] == 204
    assert data["commercial_validation"] == "UNPROVED"
    assert data["authority_created"] is False
    assert len(data["products"]) == 68


def test_all_15_extensions_have_three_real_hash_bound_public_buyer_artifacts():
    data = json.loads(PROOF_CATALOG.read_text(encoding="utf-8"))
    rows = {row["slug"]: row for row in data["products"] if row["slug"] in EXTENSION_SLUGS}
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


def test_all_15_extensions_publish_verification_receipts_and_full_ci_bundle():
    data = json.loads(PROOF_CATALOG.read_text(encoding="utf-8"))
    rows = {row["slug"]: row for row in data["products"] if row["slug"] in EXTENSION_SLUGS}
    for slug, row in rows.items():
        receipt_kinds = {receipt["kind"] for receipt in row["evidence_receipts"]}
        assert "product_grade" in receipt_kinds, slug
        assert {"variant_normal", "variant_messy", "variant_adversarial"} <= receipt_kinds, slug
        for receipt in row["evidence_receipts"]:
            path = ROOT / receipt["path"]
            assert path.is_file(), f"{slug}: missing receipt {receipt['kind']}"
            assert receipt["sha256"].removeprefix("sha256:") == sha256(path), f"{slug}: receipt hash mismatch {receipt['kind']}"

    assert FULL_BUNDLE.is_file()
    assert sha256(FULL_BUNDLE) == EXPECTED_BUNDLE_SHA256


def test_extension_renderer_has_no_prose_only_success_fallback():
    app = APP.read_text(encoding="utf-8")
    assert "ProductGrade verified.</h3>" not in app
    assert "PUBLIC PROOF MISSING" in app
    assert "evidence_receipts" in app
    assert "FULL 68×3 EVIDENCE BUNDLE" in app


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


if __name__ == "__main__":
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
    print(f"DIO_PUBLIC_EXTENSION_LIVE_PROOF_CONTRACT_VERIFIED tests={len(tests)}")
