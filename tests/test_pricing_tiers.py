from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load_pricing():
    text = (ROOT / "products" / "pricing.js").read_text(encoding="utf-8")
    match = re.search(r"window\.DIO_PRICING_CENSUS\s*=\s*(\{.*\})\s*;?\s*\}\)\(\);", text, re.S)
    if not match:
        match = re.search(r"window\.DIO_PRICING_CENSUS\s*=\s*(\{.*\})\s*;", text, re.S)
    assert match, "pricing.js must expose window.DIO_PRICING_CENSUS as JSON-compatible data"
    return json.loads(match.group(1))


def test_public_pricing_census_covers_all_68_products_and_three_tiers_each():
    pricing = load_pricing()
    assert pricing["schema"] == "dio.public_pricing_census.v1"
    assert pricing["product_count"] == 68
    assert pricing["source_repo"] == "Byron2306/DIO-Full-Audit"
    assert pricing["source_commit"]

    tier_ids = [
        "individual_professional",
        "team_department",
        "enterprise_programme",
    ]
    assert pricing["tier_policy"]["tier_ids"] == tier_ids

    products = pricing["products"]
    assert len(products) == 68
    assert len({row["slug"] for row in products}) == 68

    for row in products:
        assert [tier["tier_id"] for tier in row["commercial_tiers"]] == tier_ids
        band = row["governed_reference_band_zar"]
        for tier in row["commercial_tiers"]:
            assert tier["market_validation"] == "UNPROVED"
            assert tier["quote_issue_authority"] is False
            if tier["available"]:
                assert band["min"] <= tier["reference_amount_zar"] <= band["max"]
            else:
                assert tier["reference_amount_zar"] is None


def test_storefront_loads_canonical_pricing_and_does_not_render_stale_fixed_price():
    index = (ROOT / "products" / "index.html").read_text(encoding="utf-8")
    assert index.index('pricing.js') < index.index('catalog.js') < index.index('app.js')

    app = (ROOT / "products" / "app.js").read_text(encoding="utf-8")
    assert "window.DIO_PRICING_CENSUS" in app
    assert "commercial_tiers" in app
    assert "Individual / Professional" in app
    assert "Team / Department" in app
    assert "Enterprise / Programme" in app
    assert "money(p.price)" not in app
    assert "money(product.price)" not in app
    assert "Governed reference band" in app
    assert "Commercial validation remains unproved" in app


if __name__ == "__main__":
    test_public_pricing_census_covers_all_68_products_and_three_tiers_each()
    test_storefront_loads_canonical_pricing_and_does_not_render_stale_fixed_price()
    print("DIO_PUBLIC_PRICING_TIERS_VERIFIED")
