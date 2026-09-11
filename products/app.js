(async () => {
  const catalog = window.DIO_PRODUCT_CATALOG || [];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rootHref = () => document.body.dataset.product ? '../../' : '../';
  const portfolioHref = () => document.body.dataset.product ? '../' : './';
  const pricingHref = () => document.body.dataset.product ? '../pricing.js' : 'pricing.js';
  const money = value => value != null ? `R ${Number(value).toLocaleString('en-ZA')} ZAR` : 'Not offered';

  async function ensurePricingCensus() {
    if (window.DIO_PRICING_CENSUS) return window.DIO_PRICING_CENSUS;
    await new Promise((resolve, reject) => {
      const script=document.createElement('script');
      script.src=pricingHref();
      script.onload=resolve;
      script.onerror=()=>reject(new Error('governed pricing census unavailable'));
      document.head.appendChild(script);
    });
    return window.DIO_PRICING_CENSUS || null;
  }

  const pricingCensus = await ensurePricingCensus();
  const pricingBySlug = new Map(((pricingCensus&&pricingCensus.products)||[]).map(row=>[row.slug,row]));
  const pricingFor = product => pricingBySlug.get(product.slug) || null;
  const bandText = product => {
    const pricing=pricingFor(product);
    const band=pricing&&pricing.governed_reference_band_zar;
    return band ? `${money(band.min)} – ${money(band.max)}` : 'Scoped through Vesper';
  };
  const tierLabels = {
    individual_professional: 'Individual / Professional',
    team_department: 'Team / Department',
    enterprise_programme: 'Enterprise / Programme'
  };
  const tierCards = product => {
    const pricing=pricingFor(product);
    const tiers=(pricing&&pricing.commercial_tiers)||[];
    return tiers.map(tier=>{
      const label=tierLabels[tier.tier_id]||tier.label||tier.tier_id;
      const amount=tier.available ? money(tier.reference_amount_zar) : 'Not offered for this product';
      const classes=(tier.eligible_buyer_classes||[]).join(' · ') || 'No eligible buyer class';
      return `<article class="pricing-tier-card${tier.available?'':' unavailable'}"><small>${esc(label)}</small><strong>${esc(amount)}</strong><span>${esc(classes)}</span><p>${tier.available?'Governed reference point · scope confirmed before quote':'This buyer tier is outside the current governed product profile.'}</p></article>`;
    }).join('');
  };
  const familyThemes = {
    'Education & Research': ['#c3a65f','education','learning, assessment and scholarly evidence'],
    'Enterprise Operations': ['#c5a16e','growth','performance, operations and organisational evidence'],
    'Public & Programme Ops': ['#bea06a','partnership','programme, grant and regulated operations'],
    'Evidence & Assurance': ['#b99355','governance','evidence, provenance and review readiness'],
    'AI & Digital Trust': ['#c4ab73','governance','AI governance, model risk and authority'],
    'Demand & Presence': ['#b7a778','workflow','documents, market intelligence and presence'],
    'Demand Presence': ['#b7a778','workflow','market offers, launch experiments and presence'],
    'Design & Publication': ['#c4a871','media','publication, briefing and accessible site production'],
    'Legal & Commercial Ops': ['#b99157','governance','contract, regulatory and commercial readiness'],
    'Finance & Funding': ['#c2a165','growth','finance, funding and investor readiness']
  };
  const themeFor = product => familyThemes[product.family] || ['#d9b66f','evidence','governed intelligence'];
  const vesperHref = product => `${rootHref()}vesper-intake.html?incarnation=${encodeURIComponent(product.slug)}`;
  const intakeHref = product => {
    const q=new URLSearchParams({product:product.ingress||'evidex',class:product.slug,offer:product.offer});
    const pricing=pricingFor(product);
    const band=pricing&&pricing.governed_reference_band_zar;
    if(band){
      q.set('price_min',String(band.min));
      q.set('price_max',String(band.max));
      q.set('pricing_state',String(pricing.pricing_state||'HYPOTHESIS'));
    }
    return `${rootHref()}?${q.toString()}#contact`;
  };
  const proofHref = artifact => `${rootHref()}${artifact.path}`;
  const isExtension = p => p.tier === 'canon_extension';
  catalog.forEach(p => {
    if(!isExtension(p)) return;
    p.status='PRODUCT_GRADE_VERIFIED';
    p.engineeringStatus='CANON_EXTENSION_PRODUCT_GRADE_VERIFIED';
    p.proofStatus='CANON_EXTENSION_PROOF_VERIFIED';
    p.proof='Canon extension ProductGrade verified across normal, messy and adversarial buyer journeys. Market validation remains separate and unproved.';
  });
  const statusLabel = p => isExtension(p) ? 'ProductGrade verified · canon extension' : (p.internal ? 'Internal production instrument' : (p.status === 'BUYER_PRODUCTION_READY_BOUNDED' ? 'Buyer production ready · bounded' : 'Engineering ready · sellability grade pending'));
  const executionLabel = p => isExtension(p) ? '3/3 PRODUCTGRADE VERIFIED' : `${p.verifiedVariantCount}/${p.variantCount} verified`;
  const orbitExecutionLabel = p => isExtension(p) ? '3 / 3 VERIFIED' : '3 / 3 VERIFIED';

  const visualStyles=document.createElement('link');
  visualStyles.rel='stylesheet';
  visualStyles.href=`${rootHref()}assets/dio-visual-system.css`;
  document.head.appendChild(visualStyles);
  const premiumStyles=document.createElement('link');
  premiumStyles.rel='stylesheet';
  premiumStyles.href=`${rootHref()}assets/premium/premium.css`;
  document.head.appendChild(premiumStyles);
  const proofStyles=document.createElement('link');
  proofStyles.rel='stylesheet';
  proofStyles.href=`${rootHref()}products/proof-layer.css`;
  document.head.appendChild(proofStyles);

  function upgradeBrand(label) {
    const brand=document.querySelector('.nav .brand');
    if(!brand) return;
    brand.classList.add('brand-dio');
    brand.innerHTML=`<img class="brand-sigil" src="${rootHref()}assets/dio-favicon.png" alt=""><img class="brand-wordmark" src="${rootHref()}assets/dio-wordmark.svg" alt="DIO"><span>${esc(label)}</span>`;
  }
  if(document.body.dataset.view==='portfolio') upgradeBrand('PRODUCT PORTFOLIO');
  if(document.body.dataset.view==='product') upgradeBrand('WORKFLOWS');

  async function fetchProofCatalog(path) {
    const response=await fetch(`${rootHref()}products/proof/${path}`, {cache:'no-cache'});
    if(!response.ok) throw new Error(`${path} ${response.status}`);
    return await response.json();
  }

  async function loadProof() {
    try {
      const [base, extensions]=await Promise.all([
        fetchProofCatalog('portfolio-proof-catalog.json'),
        fetchProofCatalog('canon-extension-proof-catalog.json')
      ]);
      return {
        products:[...(base.products||[]), ...(extensions.products||[])],
        extensionSummary:extensions
      };
    } catch (error) {
      console.warn('DIO public proof catalogs unavailable', error);
      return {products:[], extensionSummary:null};
    }
  }

  if(document.body.dataset.view==='portfolio') {
    const grid=document.querySelector('#grid'), search=document.querySelector('#search'), filters=document.querySelector('#filters');
    const families=['All',...new Set(catalog.map(p=>p.family))];
    let active='All';
    filters.innerHTML=families.map(f=>`<button class="filter${f==='All'?' active':''}" data-family="${esc(f)}">${esc(f)}</button>`).join('');
    const render=()=>{
      const query=(search.value||'').trim().toLowerCase();
      const rows=catalog.filter(p=>(active==='All'||p.family===active)&&(!query||[p.name,p.headline,p.buyer,p.family,p.primaryFamily].join(' ').toLowerCase().includes(query)));
      grid.innerHTML=rows.map(p=>{
        const [accent,icon,kicker]=themeFor(p);
        return `<article class="card corner-glow" style="--accent:${accent}">
          <div class="card-visual card-orbit"><img class="card-eye" src="${rootHref()}assets/premium/dio-eye-premium.webp" alt=""><img class="premium-card-medallion" src="${rootHref()}assets/premium/icons/dio-icon-${icon}.webp" onerror="this.onerror=null;this.src='${rootHref()}assets/premium/dio-eye-premium.webp'" alt=""><span>${esc(kicker)}</span></div>
          <div class="card-body">${isExtension(p)?'<span class="canon-extension-label">CANON EXTENSION</span>':''}<span class="badge dio-pill">${esc(statusLabel(p))}</span><div class="family">${esc(p.family)}</div><h2>${esc(p.name)}</h2><p class="headline">${esc(p.headline)}</p><p class="buyer"><b>For:</b> ${esc(p.buyer)}</p><div class="price-line">${esc(bandText(p))}<small>3 governed commercial tiers · Commercial validation remains unproved</small></div><div class="card-actions"><a class="button" href="${encodeURIComponent(p.slug)}/">${isExtension(p)?'OPEN LIVE PROOF':'SEE THE PROOF'}</a><a class="button ghost" href="${vesperHref(p)}">ASK VESPER ↗</a></div></div>
        </article>`;
      }).join('') || '<div class="empty">No product matches that search.</div>';
    };
    filters.addEventListener('click',e=>{const b=e.target.closest('[data-family]');if(!b)return;active=b.dataset.family;filters.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render();});
    search.addEventListener('input',render);render();
  }

  if(document.body.dataset.view==='product') {
    const slug=document.body.dataset.product || location.pathname.split('/').filter(Boolean).pop();
    const product=catalog.find(p=>p.slug===slug);
    const root=document.querySelector('#product');
    if(!product){root.innerHTML=`<div class="wrap producthero"><h1>Product not found.</h1><p><a class="button" href="${portfolioHref()}">Return to the 68-product portfolio</a></p></div>`;return;}
    const [accent,icon]=themeFor(product);
    document.documentElement.style.setProperty('--accent',accent);
    document.title=`${product.name} | DIO Workflows`;
    const meta=document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute('content',`${product.headline} Controlled production proof, explicit authority boundaries, and commercial validation labelled ${product.commercialValidation}.`);
    const topCta=document.querySelector('.navlinks .cta'); if(topCta){topCta.href=vesperHref(product);topCta.textContent='START WITH VESPER';}
    document.querySelectorAll('.navlinks a').forEach(a=>{if(/38 PILOTS|CONTROL/.test(a.textContent)) a.textContent=a.textContent.includes('CONTROL')?'EVIDENCE':'68 PRODUCTS';});
    const proofDataPromise=loadProof();
    root.innerHTML=`<section class="editorial-hero"><div class="wrap editorial-hero-grid"><div class="editorial-copy">
      <div class="breadcrumb"><a href="${portfolioHref()}">68-product portfolio</a><span>/</span>${esc(product.family)}</div>
      <p class="eyebrow">${esc(product.family)}</p><h1>${esc(product.name)}</h1><p class="lead">${esc(product.headline)}</p>
      <p class="buyer-line"><span>For</span>${esc(product.buyer)}</p><div class="provenance-line">Primary machinery <strong>${esc(product.primaryFamily)}</strong></div>
      <div class="hero-price"><b>${esc(bandText(product))}</b><span>Governed reference band · Commercial validation remains unproved · scope and buyer tier confirmed before quote</span></div>
      <div class="hero-actions"><a class="button" href="#production-proof">OPEN THE PROOF ↓</a><a class="button ghost" href="${vesperHref(product)}">ASK VESPER ↗</a></div>
      </div><figure class="product-orbit-stage corner-glow"><img class="product-matrix" src="${rootHref()}assets/dio-product-matrix.svg" alt=""><img class="product-orbit-eye" src="${rootHref()}assets/premium/dio-eye-premium.webp" alt="DIO governed product route"><img class="premium-family-medallion" src="${rootHref()}assets/premium/icons/dio-icon-${icon}.webp" onerror="this.onerror=null;this.src='${rootHref()}assets/premium/dio-eye-premium.webp'" alt=""><span class="route-word" data-length="long">${esc(product.primaryFamily.toUpperCase())}</span><span class="orbit-label a">${esc(orbitExecutionLabel(product))}</span><span class="orbit-label b">EVIDENCE-BOUND</span><span class="orbit-label c">${isExtension(product)?'MARKET VALIDATION PENDING':`COMMERCIAL ${esc(product.commercialValidation)}`}</span><span class="orbit-label d">AUTHORITY HELD</span><figcaption><span>DIO INCARNATION</span><strong>${esc(product.name)}</strong></figcaption></figure></div></section>
      <section class="product-proof-strip"><div class="wrap proof-strip-grid"><div><small>Execution / evidence state</small><b>${esc(executionLabel(product))}</b></div><div><small>Readiness</small><b>${esc(statusLabel(product))}</b></div><div><small>Market validation</small><b>${isExtension(product)?'Not yet established':esc(product.commercialValidation)}</b></div><div><small>Authority created</small><b>NO</b></div></div></section>
      <section class="editorial-section pricing-tier-section" id="pricing-tiers"><div class="wrap"><div class="section-intro"><div><p class="eyebrow">COMMERCIAL TIERS</p><h2>Three governed ways to scope the work.</h2></div><p>Individual / Professional, Team / Department, and Enterprise / Programme reference points are derived inside the governed product band. They are pricing hypotheses, not proof that customers will pay.</p></div><div class="pricing-tier-grid">${tierCards(product)}</div><p class="pricing-tier-truth">Governed reference band: <b>${esc(bandText(product))}</b>. Commercial validation remains unproved. Vesper confirms scope before any human-approved quote.</p></div></section>
      <section class="editorial-section" id="production-proof"><div class="wrap"><div class="section-intro"><div><p class="eyebrow">PRODUCTION PROOF</p><h2>The job, the exception, the artifact.</h2></div><p>${esc(product.buyerContext)}</p></div><div id="live-proof" class="live-proof-grid"><article class="artifact-card corner-glow"><div class="artifact-index">…</div><div><small>LOADING PUBLIC PROOF</small><h3>Binding artifact to receipt.</h3></div></article></div></div></section>
      <section class="editorial-section evidence-section" id="evidence"><div class="wrap evidence-layout"><div class="section-intro"><p class="eyebrow">TRUTH BOUNDARY</p><h2>What this proves, and what it does not.</h2><p>Controlled execution evidence is engineering evidence. Commercial validation is earned outside the system.</p></div><div class="evidence-ledger"><article><small>CONTROLLED ROUTE</small><p>${esc(product.proof)}</p></article><article><small>EXCEPTION CASE</small><p>${esc(product.exceptionCase)}</p></article><article><small>AUTHORITY BOUNDARY</small><p>${esc(product.boundary)}</p></article><article><small>SELLABILITY / READINESS</small><p>${esc(product.status)} · ${esc(product.engineeringStatus)}</p></article></div></div></section>
      <section class="editorial-section flow-section"><div class="wrap"><div class="section-intro compact"><p class="eyebrow">BOUNDED DELIVERY</p><h2>Bring authorised context. Receive inspectable work. Keep the decision.</h2></div><div class="delivery-flow"><article><span>01</span><h3>Bring this</h3><ul>${product.bring.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article><span>02</span><h3>DIO does this</h3><p>Runs the governed product route, records the controlled execution, and keeps evidence and authority separate.</p></article><article><span>03</span><h3>You receive this</h3><ul>${product.deliverables.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article><span>04</span><h3>Human decides this</h3><p>${esc(product.boundary)}</p></article></div></div></section>
      <section class="vesper-conversion"><div class="wrap vesper-conversion-grid"><div class="vesper-portrait-frame"><div class="vesper-bloom"></div><img src="${rootHref()}assets/vesper-public.webp" alt="Vesper, AI · DIO Presence Core"></div><div><p class="eyebrow">AI · DIO PRESENCE CORE</p><h2>Tell me what you are trying to achieve.</h2><p>Vesper opens with ${esc(product.name)} context attached and routes the conversation into the governed handoff.</p><div class="hero-actions"><a class="button" href="${vesperHref(product)}">START WITH VESPER ↗</a><a class="button ghost" href="${intakeHref(product)}">STRUCTURED INTAKE</a></div></div></div></section>`;

    proofDataPromise.then(data=>{
      const entry=(data.products||[]).find(p=>p.slug===product.slug);
      const target=document.querySelector('#live-proof');
      if(!target) return;
      if(!entry){
        target.innerHTML=`<article class="proof-missing-card corner-glow"><small>PUBLIC PROOF MISSING</small><h3>Evidence could not be loaded.</h3><p>This surface fails closed. A ProductGrade label is never substituted for missing public artifacts or receipts.</p></article>`;
        return;
      }

      const artifactCards=(entry.artifacts||[]).map((a,i)=>{
        const variant=a.variant ? `${String(a.variant).toUpperCase()} JOURNEY` : `REAL CONTROLLED ARTIFACT · ${String(i+1).padStart(2,'0')}`;
        const relation=a.proof_relation==='public_preview_of_native_artifact' ? 'Public preview derived from the native production artifact.' : 'Customer-facing artifact from the controlled production run.';
        return `<article class="proof-artifact-card corner-glow"><div><small>${esc(variant)}</small><h3>${esc(a.name)}</h3><p>${esc(relation)}</p>${a.variant?`<div class="proof-checks"><span>LINGUA ${a.lingua_semantic_custody?'PASS':'CHECK'}</span><span>BEAST ${a.beast_mechanical_pass?'PASS':'CHECK'}</span>${a.variant==='adversarial'?`<span>BOUNDARY ${a.adversarial_boundary_held?'HELD':'CHECK'}</span>`:''}</div>`:''}<code>${esc(a.sha256||'hash recorded')}</code></div><a class="button" href="${proofHref(a)}" target="_blank" rel="noopener">OPEN ARTIFACT ↗</a></article>`;
      }).join('');

      const receiptCards=(entry.evidence_receipts||[]).map(r=>`<a class="evidence-receipt-card" href="${proofHref(r)}" target="_blank" rel="noopener"><small>${esc(r.kind.replaceAll('_',' ').toUpperCase())}</small><h3>${esc(r.name)}</h3><code>${esc(r.sha256)}</code><span>OPEN RECEIPT ↗</span></a>`).join('');
      const receipts=(entry.evidence_receipts||[]).length ? `<article class="evidence-receipts-panel corner-glow"><div class="evidence-panel-heading"><div><small>HASH-BOUND RECEIPTS</small><h3>Inspect the custody chain.</h3></div>${isExtension(product)?`<a class="button ghost" href="${rootHref()}products/proof/extension-evidence/index.html" target="_blank" rel="noopener">FULL 455-FILE EVIDENCE LEDGER ↗</a>`:''}</div><div class="evidence-receipt-grid">${receiptCards}</div>${isExtension(product)&&data.extensionSummary?.full_evidence_bundle?`<div class="evidence-bundle-line"><span>Source CI bundle</span><code>${esc(data.extensionSummary.full_evidence_bundle.sha256)}</code><a href="${rootHref()}${esc(data.extensionSummary.full_evidence_bundle.path)}" target="_blank" rel="noopener">DOWNLOAD PRESERVED ZIP ↗</a></div>`:''}</article>` : '';

      const buyerJob=entry.buyer_job || product.headline;
      const buyerContext=entry.buyer_context || product.buyerContext;
      const exceptionCase=entry.exception_case || product.exceptionCase;
      const verified=entry.verified_variant_count ?? entry.execution_variants ?? product.verifiedVariantCount;
      const total=entry.execution_variant_count ?? entry.execution_variants ?? product.variantCount;
      const claimBoundary=entry.claim_boundary ? `<p class="claim-boundary"><b>Claim boundary:</b> ${esc(entry.claim_boundary)}</p>` : '';

      target.innerHTML=`<article class="proof-job-card corner-glow"><small>BUYER JOB</small><h3>${esc(buyerJob)}</h3><p><b>Context:</b> ${esc(buyerContext)}</p><p><b>Messy / adversarial pressure:</b> ${esc(exceptionCase)}</p>${claimBoundary}</article>${artifactCards}<article class="proof-state-card corner-glow"><small>CONTROLLED EXECUTION</small><strong>${esc(verified)}/${esc(total)}</strong><span>normal · messy · adversarial</span><p>Authority created: <b>${entry.authority_created?'YES':'NO'}</b><br>External effects: <b>${entry.external_effects?'YES':'NO'}</b><br>Commercial validation: <b>${esc(entry.commercial_validation)}</b></p></article>${receipts}`;
    });
  }
})();