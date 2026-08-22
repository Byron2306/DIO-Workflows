(() => {
  const catalog = window.DIO_PRODUCT_CATALOG || [];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  const PRICE_BY_FAMILY = {
    'Documents & Rooms':4900,
    'Performance & People':4900,
    'Education':5900,
    'Research & Learning':5900,
    'Evidence & Assurance':7900,
    'Obligations':8900,
    'AI & Digital Trust':12900,
    'High-Risk Review':12900,
    'Regulated Operations':14900
  };

  const INGRESS_BY_FAMILY = {
    'Documents & Rooms':'document_studio','Performance & People':'vamp','Education':'homs','Research & Learning':'sophia',
    'Evidence & Assurance':'evidex','Obligations':'evidex','AI & Digital Trust':'evidex','High-Risk Review':'evidex','Regulated Operations':'evidex'
  };

  const ICON_BY_FAMILY = {
    'Documents & Rooms':'document','Performance & People':'performance','Education':'document','Research & Learning':'research',
    'Evidence & Assurance':'shield','Obligations':'route','AI & Digital Trust':'network','High-Risk Review':'shield','Regulated Operations':'authority'
  };

  const FAMILY_MARKET = {
    'Evidence & Assurance':{accent:'#b99355',dark:'#0a0c0f',soft:'#15181d',kicker:'GRC · audit readiness · evidence automation',value:'Replace evidence archaeology with a traceable first pass: requirements, source material, gaps and review questions in one decision-ready view.'},
    'Obligations':{accent:'#c0a06b',dark:'#0a0c0f',soft:'#17181b',kicker:'obligation intelligence · deadline control · compliance readiness',value:'Turn dense agreements, tenders, permits and policies into a working obligation spine so mandatory requirements and missing proof surface before the deadline.'},
    'Documents & Rooms':{accent:'#b7a778',dark:'#0a0c0f',soft:'#15181b',kicker:'controlled documents · review rooms · provenance',value:'Move from scattered files to a governed review package with visible lineage, cleaner hand-offs and fewer document-control surprises.'},
    'Performance & People':{accent:'#c5a16e',dark:'#0a0c0f',soft:'#191719',kicker:'performance evidence · career proof · human review',value:'Prepare the evidence before the review meeting. Map achievements to criteria, expose missing proof and keep the employment judgment with the people authorised to make it.'},
    'Education':{accent:'#c3a65f',dark:'#0a0c0f',soft:'#171914',kicker:'assessment intelligence · curriculum provenance · quality readiness',value:'Reduce assessment and programme-review admin while keeping educator and institutional authority explicit. Review-ready artifacts arrive with the evidence trail attached.'},
    'Research & Learning':{accent:'#c0ab7b',dark:'#0a0c0f',soft:'#18151b',kicker:'research intelligence · source provenance · authorship protection',value:'Strengthen source, citation and review workflows without blurring authorship. Give supervisors and researchers a cleaner technical first pass with traceable evidence.'},
    'AI & Digital Trust':{accent:'#c4ab73',dark:'#0a0c0f',soft:'#14191d',kicker:'AI governance · model risk · agent authority · auditability',value:'Make AI decisions challengeable. Bind identity, controls, evaluations, changes and authority into an inspectable trail before confidence becomes policy by accident.'},
    'High-Risk Review':{accent:'#bd9763',dark:'#0a0c0f',soft:'#1b1614',kicker:'risk intelligence · control evidence · human escalation',value:'Create a governed review room for high-stakes evidence without pretending software has the missing professional or regulatory authority. Surface gaps early and escalate visibly.'},
    'Regulated Operations':{accent:'#b7a36d',dark:'#0a0c0f',soft:'#171914',kicker:'regulatory operations · prerequisite control · evidence readiness',value:'Know what is missing before the regulator-facing step. Track prerequisites, evidence, deadlines and professional escalation without confusing readiness with legal clearance.'}
  };

  const DEFAULT_THEME = {accent:'#d9b66f',dark:'#0a0c0f',soft:'#15171a',kicker:'governed workflow intelligence · decision-grade evidence',value:'Prepare a traceable first pass that reduces review drag while keeping consequential authority with the people who own it.'};

  const DISPLAY_BY_SLUG = {
    'homs-moderate':{displayName:'Assessment Moderation Studio',poweredBy:'HOMS',pathway:['Vesper','HOMS','Evidex','Human review']},
    'homs-curriculum':{displayName:'Curriculum Provenance Studio',poweredBy:'HOMS',pathway:['Vesper','HOMS','Evidex','Human review']},
    'homs-accreditation':{displayName:'Accreditation Readiness Studio',poweredBy:'HOMS',pathway:['Vesper','HOMS','Evidex','Human review']},
    'sophia-integrity':{displayName:'Research Integrity Studio',poweredBy:'Sophia',pathway:['Vesper','Sophia','Evidex','Seraph','Human review']},
    'sophia-research':{displayName:'Research Evidence Studio',poweredBy:'Sophia',pathway:['Vesper','Sophia','Evidex','Seraph','Human review']},
    'programmeproof':{displayName:'Programme Assurance',poweredBy:'VAMP + META',pathway:['Vesper','VAMP','META','Evidex','Human review']},
    'auditproof':{displayName:'Audit Evidence Studio',poweredBy:'Evidex',pathway:['Vesper','Evidex','Human review']},
    'promotionproof':{displayName:'Performance Evidence Studio',poweredBy:'VAMP',pathway:['Vesper','VAMP','Evidex','Human review']}
  };

  const priceFor = product => PRICE_BY_FAMILY[product.family] || 7900;
  const priceText = product => `R ${priceFor(product).toLocaleString('en-ZA')} ZAR`;
  const rootHref = () => document.body.dataset.product ? '../../' : '../';
  const portfolioHref = () => document.body.dataset.product ? '../' : './';
  const themeFor = product => FAMILY_MARKET[product.family] || DEFAULT_THEME;
  const themeStyle = theme => `--accent:${theme.accent};--accent-dark:${theme.dark};--accent-soft:${theme.soft}`;
  const iconId = product => ICON_BY_FAMILY[product.family] || 'network';
  const iconUse = (product, className='family-icon') => `<svg class="${className}" aria-hidden="true"><use href="${rootHref()}assets/dio-icons.svg#${iconId(product)}"></use></svg>`;

  const visualStyles = document.createElement('link');
  visualStyles.rel = 'stylesheet';
  visualStyles.href = `${rootHref()}assets/dio-visual-system.css`;
  document.head.appendChild(visualStyles);

  function displayFor(product) {
    const explicit = DISPLAY_BY_SLUG[product.slug] || {};
    return {displayName:explicit.displayName || product.headline || product.name,poweredBy:explicit.poweredBy || product.name,pathway:explicit.pathway || ['Vesper','DIO','Human review']};
  }

  function vesperHref(product) { return `${rootHref()}vesper-intake.html?incarnation=${encodeURIComponent(product.slug)}`; }

  const intakeHref = product => {
    const query = new URLSearchParams({product:INGRESS_BY_FAMILY[product.family] || 'evidex',class:product.slug,offer:product.offer,price:String(priceFor(product))});
    return `${rootHref()}?${query.toString()}#contact`;
  };

  const families = ['All', ...new Set(catalog.map(product => product.family))];

  if (document.body.dataset.view === 'portfolio') {
    const grid = document.querySelector('#grid');
    const search = document.querySelector('#search');
    const filters = document.querySelector('#filters');
    let active = 'All';
    filters.innerHTML = families.map(family => `<button class="filter${family === 'All' ? ' active' : ''}" data-family="${esc(family)}">${esc(family)}</button>`).join('');

    const render = () => {
      const query = (search.value || '').trim().toLowerCase();
      const rows = catalog.filter(product => (active === 'All' || product.family === active) && (!query || [product.name,product.headline,product.buyer,product.offer,product.family,themeFor(product).kicker].join(' ').toLowerCase().includes(query)));
      grid.innerHTML = rows.length ? rows.map(product => {
        const theme = themeFor(product);
        return `<article class="card corner-glow" style="${themeStyle(theme)}">
          <div class="card-visual card-orbit"><img class="card-eye" src="${rootHref()}assets/dio-eye-orbit.svg" alt="">${iconUse(product)}<span>${esc(theme.kicker)}</span></div>
          <div class="card-body"><span class="badge dio-pill">Controlled route proof</span><div class="family">${esc(product.family)}</div><h2>${esc(product.headline)}</h2><p class="headline">DIO route · ${esc(product.name)}</p><p class="buyer"><b>Built for:</b> ${esc(product.buyer)}</p><div class="price-line">${esc(priceText(product))}<small>Launch pilot · one bounded case</small></div><div class="card-actions"><a class="button" href="${encodeURIComponent(product.slug)}/">SEE THE OFFER</a><a class="button ghost" href="${intakeHref(product)}">START ↗</a></div></div>
        </article>`;
      }).join('') : '<div class="empty">No product matches that search.</div>';
    };
    filters.addEventListener('click', event => { const button=event.target.closest('[data-family]'); if(!button)return; active=button.dataset.family; filters.querySelectorAll('.filter').forEach(node=>node.classList.toggle('active',node===button)); render(); });
    search.addEventListener('input', render); render();
  }

  if (document.body.dataset.view === 'product') {
    const slug = document.body.dataset.product || new URLSearchParams(location.search).get('product');
    const product = catalog.find(item => item.slug === slug);
    const root = document.querySelector('#product');
    if (!product) { root.innerHTML = `<div class="wrap producthero"><h1>Product not found.</h1><p><a class="button" href="${portfolioHref()}">Return to the 38-product portfolio</a></p></div>`; return; }

    const theme = themeFor(product), display = displayFor(product), price = priceText(product);
    const vesperPortrait = `${rootHref()}assets/vesper-public.webp`;
    const orbitAsset = `${rootHref()}assets/dio-eye-orbit.svg`;
    const matrixAsset = `${rootHref()}assets/dio-product-matrix.svg`;
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-dark', theme.dark);
    document.documentElement.style.setProperty('--accent-soft', theme.soft);
    document.title = `${display.displayName} | DIO Workflows`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', `${product.headline} ${product.offer} from ${price} for one bounded, human-reviewed case.`);

    if (document.body.dataset.product && !document.querySelector('link[rel="canonical"]')) { const canonical=document.createElement('link'); canonical.rel='canonical'; canonical.href=`https://dioworkflows.co.za/products/${encodeURIComponent(product.slug)}/`; document.head.appendChild(canonical); }
    const topCta = document.querySelector('.navlinks .cta'); if(topCta){topCta.href=vesperHref(product);topCta.textContent='START WITH VESPER';}
    document.querySelectorAll('a[href^="mail' + 'to:"]').forEach(link => { link.href=intakeHref(product); if(link.closest('footer')) link.textContent='Governed intake'; });

    const artifacts = product.deliverables.map((deliverable,index)=>`<article class="artifact-card corner-glow"><div class="artifact-index">0${index+1}</div><div><small>REVIEW-READY DELIVERABLE</small><h3>${esc(deliverable)}</h3><p>Prepared as part of the bounded pilot and returned for authorised human review.</p></div></article>`).join('');
    const pathway = display.pathway.map((node,index)=>`<div class="pathway-node"><small>${String(index+1).padStart(2,'0')}</small><b>${esc(node)}</b></div>`).join('<span class="pathway-arrow" aria-hidden="true">→</span>');
    const bring = product.bring.map(item=>`<li>${esc(item)}</li>`).join('');
    const receive = product.deliverables.map(item=>`<li>${esc(item)}</li>`).join('');

    root.innerHTML = `
      <section class="editorial-hero"><div class="wrap editorial-hero-grid"><div class="editorial-copy"><div class="breadcrumb"><a href="${portfolioHref()}">38-product portfolio</a><span>/</span>${esc(product.family)}</div><p class="eyebrow">${esc(product.family)}</p><h1>${esc(display.displayName)}</h1><p class="lead">${esc(product.headline)}</p><p class="buyer-line"><span>Built for</span>${esc(product.buyer)}</p><div class="provenance-line">Powered by <strong>${esc(display.poweredBy)}</strong></div><div class="hero-price"><b>${esc(price)}</b><span>Launch pilot · one bounded case · scope confirmed before work begins</span></div><div class="hero-actions"><a class="button" href="${vesperHref(product)}">START WITH VESPER ↗</a><a class="button ghost" href="#evidence">SEE THE EVIDENCE</a></div></div>
        <figure class="product-orbit-stage corner-glow"><img class="product-matrix" src="${matrixAsset}" alt=""><img class="product-orbit-eye" src="${orbitAsset}" alt="DIO governed product route">${iconUse(product,'product-route-icon')}<span class="orbit-label a">${esc(product.family)}</span><span class="orbit-label b">EVIDENCE-BOUND</span><span class="orbit-label c">BOUNDED PILOT</span><span class="orbit-label d">HUMAN AUTHORITY</span><figcaption><span>DIO PRODUCT ROUTE</span><strong>${esc(product.name)}</strong></figcaption></figure>
      </div></section>
      <section class="product-proof-strip"><div class="wrap proof-strip-grid"><div><small>Route</small><b>Controlled proof</b></div><div><small>Delivery</small><b>Review-ready</b></div><div><small>Evidence posture</small><b>Hash-bound where applicable</b></div><div><small>Authority</small><b>Human-held</b></div></div></section>
      <section class="editorial-section" id="artifacts"><div class="wrap"><div class="section-intro"><p class="eyebrow">WHAT YOU ACTUALLY GET</p><h2>Concrete work, not an AI promise.</h2><p>${esc(theme.value)}</p></div><div class="artifact-gallery">${artifacts}</div></div></section>
      <section class="editorial-section evidence-section" id="evidence"><div class="wrap evidence-layout"><div class="section-intro"><p class="eyebrow">EVIDENCE, NOT PROMISES</p><h2>Built before it was pitched.</h2><p>Controlled engineering evidence is shown as engineering evidence. Commercial validation is earned from customers.</p></div><div class="evidence-ledger"><article><small>ROUTE PROOF</small><p>${esc(product.proof)}</p></article><article><small>AUTHORITY BOUNDARY</small><p>${esc(product.boundary)}</p></article><article><small>EVIDENCE POSTURE</small><p>Hash-bound receipt where applicable; public presentation is curated rather than a raw internal dump.</p></article><article><small>COMMERCIAL VALIDATION</small><p>Earned from customers, repeat demand and measured delivery — never inferred from controlled proof.</p></article></div></div></section>
      <section class="editorial-section system-section"><div class="wrap"><div class="section-intro compact"><p class="eyebrow">WHAT RUNS UNDERNEATH</p><h2>The outcome is public. The machinery stays backstage.</h2></div><div class="system-pathway">${pathway}</div></div></section>
      <section class="editorial-section flow-section"><div class="wrap"><div class="section-intro compact"><p class="eyebrow">BOUNDED DELIVERY</p><h2>One clear case. One inspectable handoff.</h2></div><div class="delivery-flow"><article><span>01</span><h3>Bring this</h3><ul>${bring}</ul></article><article><span>02</span><h3>DIO does this</h3><p>Runs controlled processing, evidence preparation and the bounded product route while preserving provenance and explicit authority limits.</p></article><article><span>03</span><h3>You receive this</h3><ul>${receive}</ul></article><article><span>04</span><h3>Human decides this</h3><p>${esc(product.boundary)}</p></article></div></div></section>
      <section class="editorial-section pilot-scope"><div class="wrap pilot-grid"><div><p class="eyebrow">PILOT SCOPE</p><h2>Start small enough to measure.</h2><p>Bring one bounded, authorised case. Larger datasets, recurring operations, custom integrations and third-party costs are scoped separately before work begins.</p></div><div class="pilot-card corner-glow"><small>LAUNCH PILOT</small><strong>${esc(price)}</strong><span>One bounded case</span><span>Scope confirmed first</span><span>Review-ready delivery</span><span>Human-held release</span><a class="button" href="${vesperHref(product)}">TALK TO VESPER ↗</a><a class="text-link" href="${intakeHref(product)}">Use structured intake instead</a></div></div></section>
      <section class="vesper-conversion"><div class="wrap vesper-conversion-grid"><div class="vesper-portrait-frame"><div class="vesper-bloom" aria-hidden="true"></div><img src="${vesperPortrait}" alt="Vesper, AI · DIO Presence Core"></div><div><p class="eyebrow">AI · DIO PRESENCE CORE</p><h2>Tell me what you're trying to achieve.</h2><p>Vesper already has this product context. Start with the real problem and she will route the conversation into the governed DIO handoff.</p><div class="hero-actions"><a class="button" href="${vesperHref(product)}">START WITH VESPER ↗</a><a class="button ghost" href="${intakeHref(product)}">STRUCTURED INTAKE</a></div></div></div></section>`;
  }
})();
