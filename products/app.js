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
  const priceFor=p=>PRICE_BY_FAMILY[p.family]||7900;
  const priceText=p=>`R ${priceFor(p).toLocaleString('en-ZA')} ZAR`;
  const rootHref=()=>document.body.dataset.product?'../../':'../';
  const portfolioHref=()=>document.body.dataset.product?'../':'./';
  const intakeHref=p=>{
    const q=new URLSearchParams({
      product:INGRESS_BY_FAMILY[p.family]||'evidex',
      class:p.slug,
      offer:p.offer,
      price:String(priceFor(p))
    });
    return `${rootHref()}?${q.toString()}#contact`;
  };
  const families=['All',...new Set(catalog.map(p=>p.family))];
  if(document.body.dataset.view==='portfolio'){
    const grid=document.querySelector('#grid'),search=document.querySelector('#search'),filters=document.querySelector('#filters');let active='All';
    filters.innerHTML=families.map(f=>`<button class="filter${f==='All'?' active':''}" data-family="${esc(f)}">${esc(f)}</button>`).join('');
    const render=()=>{const q=(search.value||'').trim().toLowerCase();const rows=catalog.filter(p=>(active==='All'||p.family===active)&&(!q||[p.name,p.headline,p.buyer,p.offer,p.family].join(' ').toLowerCase().includes(q)));grid.innerHTML=rows.length?rows.map(p=>`<article class="card"><span class="badge">PROOF-BACKED · CONTROLLED ROUTE</span><div class="family">${esc(p.family)}</div><h2>${esc(p.name)}</h2><p class="headline">${esc(p.headline)}</p><p class="buyer"><b>Built for:</b> ${esc(p.buyer)}</p><p class="buyer"><b>Launch pilot:</b> ${esc(priceText(p))} · one bounded case</p><div class="card-actions"><a class="button" href="${encodeURIComponent(p.slug)}/">VIEW PILOT</a><a class="button ghost" href="${intakeHref(p)}">START ↗</a></div></article>`).join(''):'<div class="empty">No product matches that search.</div>'};
    filters.addEventListener('click',e=>{const b=e.target.closest('[data-family]');if(!b)return;active=b.dataset.family;filters.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render()});search.addEventListener('input',render);render();
  }
  if(document.body.dataset.view==='product'){
    const slug=document.body.dataset.product||new URLSearchParams(location.search).get('product');const p=catalog.find(x=>x.slug===slug);const root=document.querySelector('#product');
    if(!p){root.innerHTML=`<div class="wrap producthero"><h1>Product not found.</h1><p><a class="button" href="${portfolioHref()}">Return to the 38-product portfolio</a></p></div>`;return;}
    document.title=`${p.name} | DIO Proof-Backed Pilot`;
    if(document.body.dataset.product && !document.querySelector('link[rel="canonical"]')){const c=document.createElement('link');c.rel='canonical';c.href=`https://byron2306.github.io/DIO-Workflows/products/${encodeURIComponent(p.slug)}/`;document.head.appendChild(c);}
    const li=xs=>xs.map(x=>`<li>${esc(x)}</li>`).join('');
    const price=priceText(p);
    root.innerHTML=`<section class="producthero"><div class="wrap"><div class="breadcrumb"><a href="${portfolioHref()}">38-product portfolio</a> / ${esc(p.family)}</div><p class="eyebrow">${esc(p.family)} · PROOF-BACKED WORKFLOW INTELLIGENCE</p><h1>${esc(p.name)}</h1><p class="lead">${esc(p.headline)}</p><p><b>For:</b> ${esc(p.buyer)}</p><p><span class="badge">AUDIT-READY RECEIPTS</span> <span class="badge">HUMAN-IN-THE-LOOP</span> <span class="badge">CONTROLLED ROUTE PROVEN</span></p></div></section><div class="wrap offergrid"><main><section class="panel"><p class="eyebrow">THE LAUNCH OFFER</p><h2 class="offer">${esc(p.offer)}</h2><p>Bring one bounded, authorised case. DIO runs the product's proof-backed controlled route, binds the resulting artifacts and evidence, and returns a decision-grade human-review pack. We start narrow on purpose so the first engagement produces inspectable value instead of a long transformation programme.</p><div class="facts"><div class="fact"><small>Launch price</small><b>${esc(price)}</b></div><div class="fact"><small>Scope</small><b>One bounded case</b></div><div class="fact"><small>Proof</small><b>Hash-bound receipts</b></div><div class="fact"><small>Decision</small><b>Human-owned</b></div></div><p><small>Launch pricing covers the bounded pilot described here. Larger datasets, custom integrations, recurring operations and expanded delivery scopes are quoted separately before work begins.</small></p></section><section class="panel"><h2>Bring this</h2><ul>${li(p.bring)}</ul></section><section class="panel"><h2>Get this</h2><ul>${li(p.deliverables)}<li>Hash-bound DIO processing / proof receipt where applicable</li></ul></section><section class="panel"><h2>Why buyers care</h2><p>Less evidence archaeology. Fewer spreadsheet handoffs. A visible chain from requirement to source to issue to human decision. The route is designed for auditability, governance and review speed without handing consequential authority to software.</p></section><section class="panel"><h2>What “proven” means</h2><p>${esc(p.proof)} in DIO's 38/38 controlled-route proof campaign. The route has executed against controlled fixtures or governed upstream receipts and produced verified artifacts. A customer pilot still requires authorised material and human review.</p><div class="boundary"><b>Authority boundary.</b> ${esc(p.boundary)}</div></section></main><aside><section class="panel cta-panel"><p class="eyebrow">START SMALL. PROVE VALUE.</p><h2>Put one real case through ${esc(p.name)}.</h2><p><b>${esc(price)}</b> launch pilot. Send the bounded problem, what material you can authorise for review, and the outcome you need prepared.</p><a class="button" href="${intakeHref(p)}">START ${esc(p.name.toUpperCase())} PILOT ↗</a><p><small>One governed intake. One lead record. One DIO event spine. Consequential decisions and external release remain human-authority bound.</small></p><p><a href="${portfolioHref()}">← Explore all 38 pilots</a></p></section></aside></div>`;
  }
})();
