from __future__ import annotations

import re
from pathlib import Path

APP = Path("products/app.js")
VISUAL = Path("assets/dio-visual-system.css")
PROOF = Path("products/proof-layer.css")


def replace_once(text: str, pattern: str, replacement: str, label: str) -> str:
    text, count = re.subn(pattern, lambda _m: replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"{label} replacements={count}")
    return text


def patch_app() -> None:
    app = APP.read_text(encoding="utf-8")
    loader = """  async function loadProofCatalog(path,label) {
    try {
      const response=await fetch(`${rootHref()}${path}`, {cache:'no-cache'});
      if(!response.ok) throw new Error(`${label} ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn(`DIO ${label} unavailable`, error);
      return {products:[]};
    }
  }

  async function loadProof() {
    const [base,extensions]=await Promise.all([
      loadProofCatalog('products/proof/portfolio-proof-catalog.json','base-canon proof catalog'),
      loadProofCatalog('products/proof/canon-extension-proof-catalog.json','canon-extension proof catalog')
    ]);
    return {products:[...(base.products||[]),...(extensions.products||[])]};
  }

  if(document.body.dataset.view==='portfolio')"""
    app = replace_once(
        app,
        r"  async function loadProof\(\) \{.*?\n  \}\n\n  if\(document\.body\.dataset\.view==='portfolio'\)",
        loader,
        "loader",
    )

    fallback = """      if(!entry){
        if(isExtension(product)){
          target.innerHTML=`<article class=\"proof-job-card proof-missing\"><small>PUBLIC PROOF MISSING</small><h3>Verified state withheld.</h3><p>This canon extension cannot display a ProductGrade success state without its public artifact-and-receipt row. The renderer fails closed instead of substituting a badge or summary.</p></article><article class=\"proof-state-card\"><small>EVIDENCE GATE</small><strong>REFUSE</strong><span>Public proof must be restored before a verified state is shown.</span><p>Market validation remains separate.</p></article>`;
        }
        return;
      }
      const artifactCards="""
    app = replace_once(
        app,
        r"      if\(!entry\)\{.*?        return;\n      \}\n      const artifactCards=",
        fallback,
        "fallback",
    )

    render = """      const artifactCards=(entry.artifacts||[]).map((a,i)=>`<article class=\"proof-artifact-card corner-glow\"><div><small>${a.variant?`${esc(a.variant).toUpperCase()} JOURNEY`:`REAL CONTROLLED ARTIFACT · ${String(i+1).padStart(2,'0')}`}</small><h3>${esc(a.name)}</h3><p>${esc(a.proof_relation==='public_preview_of_native_artifact'?'Public preview derived from the native production artifact.':'Customer-facing artifact from the controlled production run.')}</p><code>${esc(a.sha256||'hash recorded')}</code></div><a class=\"button\" href=\"${proofHref(a)}\" target=\"_blank\" rel=\"noopener\">OPEN / DOWNLOAD ↗</a></article>`).join('');
      const receiptCards=(entry.evidence_receipts||[]).map(r=>`<article class=\"evidence-receipt-card\"><small>HASH-BOUND RECEIPT</small><h3>${esc(r.name)}</h3><code>${esc(r.sha256||'hash recorded')}</code><a href=\"${proofHref(r)}\" target=\"_blank\" rel=\"noopener\">OPEN RECEIPT ↗</a></article>`).join('');
      const evidenceLedger=isExtension(product)?`<div class=\"proof-evidence-actions\"><a class=\"button\" href=\"${rootHref()}products/proof/extension-evidence/\" target=\"_blank\" rel=\"noopener\">FULL 455-FILE EVIDENCE LEDGER ↗</a><a class=\"button ghost\" href=\"${rootHref()}products/proof/extension-evidence/dio-canon-68x3-productgrade-evidence.zip\">DOWNLOAD EXACT CI BUNDLE ↗</a></div>`:'';
      const buyerJob=entry.buyer_job||product.headline;
      const buyerContext=entry.buyer_context||product.buyerContext;
      const exceptionCase=entry.exception_case||product.exceptionCase;
      target.innerHTML=`<article class=\"proof-job-card\"><small>BUYER JOB</small><h3>${esc(buyerJob)}</h3><p><b>Context:</b> ${esc(buyerContext)}</p><p><b>Adversarial / messy case:</b> ${esc(exceptionCase)}</p></article>${artifactCards}<article class=\"proof-state-card\"><small>CONTROLLED EXECUTION</small><strong>${entry.execution_variants}/${entry.execution_variant_count}</strong><span>normal · messy · adversarial</span><p>Authority created: <b>${entry.authority_created?'YES':'NO'}</b><br>External effects: <b>${entry.external_effects?'YES':'NO'}</b><br>Commercial validation: <b>${esc(entry.commercial_validation)}</b></p></article>${receiptCards}${evidenceLedger}`;
"""
    app = replace_once(
        app,
        r"      const artifactCards=.*?\n      target\.innerHTML=`.*?`;\n",
        render,
        "renderer",
    )
    APP.write_text(app, encoding="utf-8")


def patch_visual() -> None:
    css = VISUAL.read_text(encoding="utf-8")
    if "--dio-gold-rich" in css:
        return
    css += """

/* Gilded corpo-cult typography: gold carries hierarchy; ivory carries reading load. */
:root{--dio-gold-rich:#d8ad54;--dio-gold-bright:#f3d98c;--dio-ivory:#eee3ce;--dio-parchment:#cabb9b}
body:is([data-view="product"],[data-view="flagship"],[data-view="portfolio"]){color:var(--dio-ivory)!important}
body[data-view="portfolio"] .hero h1,.editorial-copy h1,.section-intro h2,.card-body h2,.truth h2,.vesper-conversion h2,.delivery-flow h3,.evidence-ledger h3{color:var(--dio-gold-rich)!important;text-shadow:0 0 22px rgba(216,173,84,.10)}
.editorial-copy .lead,.section-intro>p,.evidence-ledger p,.delivery-flow p,.delivery-flow li,.vesper-conversion p,.card .headline,.card .buyer{color:var(--dio-parchment)!important}
.breadcrumb,.buyer-line,.provenance-line,.hero-price span,.product-proof-strip small,.evidence-ledger small,.price-line small{color:#ad9d7f!important}
.eyebrow,.canon-extension-label,.product-proof-strip b,.hero-price b,.price-line,.card-body .badge,.card-body .family,.orbit-label,.product-orbit-stage figcaption strong{color:var(--dio-gold-bright)!important}
.editorial-copy strong,.buyer-line span,.provenance-line strong,.evidence-ledger b,.delivery-flow>article>span{color:var(--dio-gold-rich)!important}
body[data-view="portfolio"] .navlinks a{color:var(--dio-parchment)!important}body[data-view="portfolio"] .navlinks a:hover{color:var(--dio-gold-bright)!important}
"""
    VISUAL.write_text(css, encoding="utf-8")


def patch_proof() -> None:
    css = PROOF.read_text(encoding="utf-8")
    if ".evidence-receipt-card{" in css:
        return
    css += """

/* Extension evidence ledger and gilded proof hierarchy. */
.proof-job-card h3,.proof-artifact-card h3,.evidence-receipt-card h3{color:var(--dio-gold-rich);font-family:Georgia,serif}
.proof-job-card p,.proof-artifact-card p,.proof-state-card p,.evidence-receipt-card p{color:var(--dio-ivory)}
.proof-state-card span,.proof-artifact-card code,.evidence-receipt-card code{color:var(--dio-parchment)}
.proof-job-card small,.proof-state-card small,.proof-artifact-card small,.evidence-receipt-card small{color:var(--dio-gold-bright)}
.evidence-receipt-card{border:1px solid rgba(216,173,84,.22);background:linear-gradient(145deg,rgba(216,173,84,.045),rgba(5,6,7,.96));padding:20px;min-height:150px;display:flex;flex-direction:column;gap:10px}
.evidence-receipt-card h3{margin:0;font-size:1rem}.evidence-receipt-card code{font-size:.65rem;overflow-wrap:anywhere}.evidence-receipt-card a{margin-top:auto;color:var(--dio-gold-bright);text-decoration:none;font-size:.72rem;letter-spacing:.08em}.evidence-receipt-card a:hover{color:#fff0bf}
.proof-evidence-actions{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:12px;padding-top:8px;border-top:1px solid rgba(216,173,84,.18)}
.proof-missing{border-color:rgba(216,173,84,.45);background:linear-gradient(145deg,rgba(216,173,84,.08),rgba(8,9,10,.98))}
@media(max-width:700px){.proof-evidence-actions .button{width:100%;text-align:center}}
"""
    PROOF.write_text(css, encoding="utf-8")


if __name__ == "__main__":
    patch_app()
    patch_visual()
    patch_proof()
    print("DIO_GILDED_LIVE_PROOF_PATCH_APPLIED")
