from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / "assets" / "straggler-closure.css"
CONFIG = ROOT / "assets" / "dio-config.js"
PROOF = ROOT / "products" / "proof-layer.css"


def test_straggler_layer_is_late_bound_everywhere():
    assert CSS.is_file()
    config = CONFIG.read_text(encoding="utf-8")
    proof = PROOF.read_text(encoding="utf-8")
    assert "couture-finish.css" in config and "straggler-closure.css" in config
    assert config.index("couture-finish.css") < config.index("straggler-closure.css")
    assert "data-dio-straggler-closure" in config
    assert "couture-finish.css" in proof and "straggler-closure.css" in proof
    assert proof.index("couture-finish.css") < proof.index("straggler-closure.css")


def test_stragglers_are_explicitly_closed():
    text = CSS.read_text(encoding="utf-8")
    for token in (
        "DIO STRAGGLER CLOSURE",
        "--dio-hero-lift:1.60",
        'body[data-view="portfolio"] .hero{',
        "linear-gradient(90deg,rgba(5,6,7,.72)",
        ".launch-v2 .product-bridge::after{",
        ".launch-v2 .suite-explainers::before{",
        ".launch-v2 .about-founder::before{",
        ".artifact-card .button+.text-link{",
        "@media(max-height:600px) and (orientation:landscape)",
        ".vesper-float span{display:none!important}",
        ".launch-v2 .product-bridge-head h2,",
        ".launch-v2 .about-copy h2{",
    ):
        assert token in text
