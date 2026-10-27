import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_public_evidence_export_covers_all_catalogue_products_without_private_fields():
    payload = json.loads((ROOT / "products/proof/public-offer-evidence.json").read_text(encoding="utf-8"))
    assert payload["schema"] == "dio.public_offer_evidence.v1"
    assert len(payload["offers"]) == 68
    assert len({row["product_name"] for row in payload["offers"]}) == 68
    rendered = json.dumps(payload)
    assert "/workspace/" not in rendered
    assert "source_path" not in rendered


def test_product_surface_loads_and_labels_public_offer_evidence():
    source = (ROOT / "products/app.js").read_text(encoding="utf-8")
    assert "public-offer-evidence.json" in source
    assert "PUBLIC OFFER EVIDENCE" in source
    assert "Named-product artifact:" in source
