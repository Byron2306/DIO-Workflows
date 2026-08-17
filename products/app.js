(() => {
  const catalog=window.DIO_PRODUCT_CATALOG||[];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const PRICE_BY_FAMILY={
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
  const INGRESS_BY_FAMILY={
    'Documents & Rooms':'document_studio',
    'Performance & People':'vamp',
    'Education':'homs',
    'Research & Learning':'sophia',
    'Evidence & Assurance':'evidex',
    'Obligations':'evidex',
    'AI & Digital Trust':'evidex',
    'High-Risk Review':'evidex',
    'Regulated Operations':'evidex'
  };
  const FAMILY_MARKET={
    'Evidence & Assurance':{
      accent:'#185f47',dark:'#104533',soft:'#e8f4ee',asset:'evidex.webp',
      kicker:'GRC · audit readiness · evidence automation',
      value:'Replace evidence archaeology with a traceable first pass: requirements, source material, gaps and review questions in one decision-ready view.'
    },
    'Obligations':{
      accent:'#0b6d67',dark:'#07514d',soft:'#e7f4f2',asset:'evidex.webp',
      kicker:'obligation intelligence · deadline control · compliance readiness',
      value:'Turn dense agreements, tenders, permits and policies into a working obligation spine so mandatory requirements and missing proof surface before the deadline.'
    },
    'Documents & Rooms':{
      accent:'#3f6675',dark:'#294652',soft:'#eaf1f3',asset:'control-deck.webp',
      kicker:'controlled documents · review rooms · provenance',
      value:'Move from scattered files to a governed review package with visible lineage, cleaner hand-offs and fewer document-control surprises.'
    },
    'Performance & People':{
      accent:'#a64e54',dark:'#71363b',soft:'#f8ecee',asset:'control-deck.webp',
      kicker:'performance evidence · career proof · human review',
      value:'Prepare the evidence before the review meeting. Map achievements to criteria, expose missing proof and keep the employment judgment with the people authorised to make it.'
    },
    'Education':{
      accent:'#075f5b',dark:'#064542',soft:'#e7f3f1',asset:'homs.webp',
      kicker:'assessment intelligence · curriculum provenance · quality readiness',
      value:'Reduce assessment and programme-review admin while keeping educator and institutional authority explicit. Review-ready artifacts arrive with the evidence trail attached.'
    },
    'Research & Learning':{
      accent:'#70527f',dark:'#4d3858',soft:'#f2edf5',asset:'sophia.webp',
      kicker:'research intelligence · source provenance · authorship protection',
      value:'Strengthen source, citation and review workflows without blurring authorship. Give supervisors and researchers a cleaner technical first pass with traceable evidence.'
    },
    'AI & Digital Trust':{
      accent:'#315b79',dark:'#203e54',soft:'#eaf1f6',asset:'dio-sigil.webp',
      kicker:'AI governance · model risk · agent authority · auditability',
      value:'Make AI decisions challengeable. Bind identity, controls, evaluations, changes and authority into an inspectable trail before confidence becomes policy by accident.'
    },
    'High-Risk Review':{
      accent:'#8a4a35',dark:'#603326',soft:'#f6ece8',asset:'control-deck.webp',
      kicker:'risk intelligence · control evidence · human escalation',
      value:'Create a governed review room for high-stakes evidence without pretending software has the missing professional or regulatory authority. Surface gaps early and escalate visibly.'
    },
    'Regulated Operations':{
      accent:'#4d642f',dark:'#354620',soft:'#eef3e7',asset:'control-deck.webp',
      kicker:'regulatory operations · prerequisite control · evidence readiness',
      value:'Know what is missing before the regulator-facing step. Track prerequisites, evidence, deadlines and professional escalation without confusing readiness with legal clearance.'
    }
  };
  const DEFAULT_THEME={accent:'#185f47',dark:'#104533',soft:'#e8f4ee',asset:'dio-sigil.webp',kicker:'governed workflow intelligence · decision-grade evidence',value:'Prepare a traceable first pass that reduces review drag while keeping consequential authority with the people who own it.'};

  const priceFor=p=>PRICE_BY_FAMILY[p.family]||7900;
  const priceText=p=>`R ${priceFor(p).toLocaleString('en-ZA')} ZAR`;
  const rootHref=()=>document.body.dataset.product?'../../':'../';
  const portfolioHref=()=>document.body.dataset.product?'../':'./';
  const themeFor=p=>FAMILY_MARKET[p.family]||DEFAULT_THEME;
  const assetHref=p=>`${rootHref()}assets/${themeFor(p).asset}`;
  const intakeHref=p=>{
    const q=new URLSearchParams({
      product:INGRESS_BY_FAMILY[p.family]||'evidex',
      class:p.slug,
      offer:p.offer,
      price:String(priceFor(p))
    });
    return `${rootHref()}?${q.toString()}#contact`;
  };
  const themeStyle=t=>`--accent:${t.accent};--accent-dark:${t.dark};--accent-soft:${t.soft}`;
  const families=['All',...new Set(catalog.map(p=>p.family))];

  if(document.body.dataset.view==='portfolio'){
    const grid=document.querySelector('#grid'),search=document.querySelector('#search'),filters=document.querySelector('#filters');
    let active='All';
    filters.innerHTML=families.map(f=>`<button class="filter${f==='All'?' active':''}" data-family="${esc(f)}">${esc(f)}</button>`).join('');
    const render=()=>{
      const q=(search.value||'').trim().toLowerCase();
      const rows=catalog.filter(p=>(active==='All'||p.family===active)&&(!q||[p.name,p.headline,p.buyer,p.offer,p.family,themeFor(p).kicker].join(' ').toLowerCase().includes(q)));
      grid.innerHTML=rows.length?rows.map(p=>{
        const t=themeFor(p);
        return `<article class="card" style="${themeStyle(t)}"><div class="card-visual"><img src="${assetHref(p)}" alt=""><span>${esc(t.kicker)}</span></div><div class="card-body"><span class="badge">38/38 route proof</span><div class="family">${esc(p.family)}</div><h2>${esc(p.name)}</h2><p class="headline">${esc(p.headline)}</p><p class="buyer"><b>Built for:</b> ${esc(p.buyer)}</p><div class="price-line">${esc(priceText(p))}<small>Launch pilot · one bounded case</small></div><div class="card-actions"><a class="button" href="${encodeURIComponent(p.slug)}/">SEE THE OFFER</a><a class="button ghost" href="${intakeHref(p)}">START ↗</a></div></div></article>`;
      }).join(''):'<div class="empty">No product matches that search.</div>';
    };
    filters.addEventListener('click',e=>{const b=e.target.closest('[data-family]');if(!b)return;active=b.dataset.family;filters.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render()});
    search.addEventListener('input',render);
    render();
  }

  if(document.body.dataset.view==='product'){
    const slug=document.body.dataset.product||new URLSearchParams(location.search).get('product');
    const p=catalog.find(x=>x.slug===slug);
    const root=document.querySelector('#product');
    if(!p){root.innerHTML=`<div class="wrap producthero"><h1>Product not found.</h1><p><a class="button" href="${portfolioHref()}">Return to the 38-product portfolio</a></p></div>`;return;}

    const t=themeFor(p);
    document.documentElement.style.setProperty('--accent',t.accent);
    document.documentElement.style.setProperty('--accent-dark',t.dark);
    document.documentElement.style.setProperty('--accent-soft',t.soft);
    document.title=`${p.name} | DIO ${p.offer}`;
    const description=`${p.headline} ${p.offer} from ${priceText(p)} for one bounded, human-reviewed case.`;
    let meta=document.querySelector('meta[name="description"]');
    if(meta)meta.setAttribute('content',description);
    if(document.body.dataset.product && !document.querySelector('link[rel="canonical"]')){const c=document.createElement('link');c.rel='canonical';c.href=`https://byron2306.github.io/DIO-Workflows/products/${encodeURIComponent(p.slug)}/`;document.head.appendChild(c);}
    const topCta=document.querySelector('.navlinks .cta');
    if(topCta){topCta.href=intakeHref(p);topCta.textContent='START PILOT';}
    const li=xs=>xs.map(x=>`<li>${esc(x)}</li>`).join('');
    const price=priceText(p);
    const keywords=t.kicker.split(' · ');

    root.innerHTML=`
      <section class="producthero"><div class="wrap producthero-grid"><div class="hero-copy">
        <div class="breadcrumb"><a href="${portfolioHref()}">38-product portfolio</a> / ${esc(p.family)}</div>
        <p class="eyebrow">${esc(p.family)}</p>
        <h1>${esc(p.name)}</h1>
        <p class="lead">${esc(p.headline)}</p>
        <p><b>Built for:</b> ${esc(p.buyer)}</p>
        <div class="market-keywords">${keywords.map(k=>`<span>${esc(k)}</span>`).join('')}</div>
        <div class="hero-price"><b>${esc(price)}</b><span>launch pilot · one bounded case · scope confirmed before work starts</span></div>
        <div class="card-actions"><a class="button" href="${intakeHref(p)}">START THE PILOT ↗</a><a class="button ghost" href="#proof">SEE WHAT IS PROVEN</a></div>
      </div><div class="producthero-media"><img src="${assetHref(p)}" alt=""></div></div></section>
      <section class="market-strip"><div class="wrap market-strip-grid"><div><small>Route</small><b>38/38 proof campaign</b></div><div><small>Commercial shape</small><b>Fixed ZAR launch pilot</b></div><div><small>Evidence</small><b>Hash-bound receipts</b></div><div><small>Authority</small><b>Human-held</b></div></div></section>
      <div class="wrap offergrid"><main>
        <section class="panel"><p class="eyebrow">THE OFFER</p><h2 class="offer">${esc(p.offer)}</h2><p>Bring one bounded, authorised case. DIO runs the product's proof-backed route, binds the artifacts and evidence, and returns a professional human-review pack. The first engagement is intentionally narrow so you can measure useful work before committing to a larger rollout.</p><div class="facts"><div class="fact"><small>Launch price</small><b>${esc(price)}</b></div><div class="fact"><small>Scope</small><b>One bounded case</b></div><div class="fact"><small>Delivery posture</small><b>Review-ready</b></div><div class="fact"><small>Scale-up</small><b>Quoted after pilot</b></div></div><p><small>Launch pricing covers the bounded pilot described here. Larger datasets, custom integrations, recurring operations and third-party costs are scoped separately before work begins.</small></p></section>
        <section class="panel"><p class="eyebrow">BUSINESS VALUE</p><h2>Less admin drag. Better evidence at the decision point.</h2><div class="value-box"><h3>${esc(t.kicker)}</h3><p>${esc(t.value)}</p></div><p>DIO is built for evidence-heavy work where speed matters but traceability matters more. The commercial promise is practical: prepare a stronger first pass, make gaps visible sooner and give the authorised reviewer something inspectable instead of another opaque AI answer.</p></section>
        <section class="panel"><h2>Bring this</h2><ul>${li(p.bring)}</ul></section>
        <section class="panel"><h2>Get this</h2><ul>${li(p.deliverables)}<li>Hash-bound DIO processing or proof receipt where applicable</li></ul></section>
        <section class="panel" id="proof"><p class="eyebrow">PROOF BEFORE PROMISES</p><h2>What “proven” means here</h2><p>${esc(p.proof)} in DIO's 38/38 controlled-route proof campaign. The route has executed against controlled fixtures or governed upstream receipts and produced verified artifacts. Customer material still requires explicit authority and human review.</p><div class="boundary"><b>Authority boundary.</b> ${esc(p.boundary)}</div></section>
      </main><aside><section class="panel cta-panel"><p class="eyebrow">START SMALL. PROVE VALUE.</p><h2>Put one real case through ${esc(p.name)}.</h2><p><b>${esc(price)}</b> launch pilot. Send the bounded problem, what material you can authorise, and the output you need prepared.</p><a class="button" href="${intakeHref(p)}">REQUEST ${esc(p.name.toUpperCase())} PILOT ↗</a><p><small>Every request enters the same governed DIO public intake, lead record and event spine. No separate product inboxes hiding under the floorboards.</small></p><p><a href="${portfolioHref()}">← Explore all 38 pilots</a></p></section></aside></div>`;
  }
})();
