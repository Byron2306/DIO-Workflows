(() => {
  const cfg = window.DIO_SITE_CONFIG || {};
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const requestedParent = (params.get('product') || '').trim();
  const requestedClass = (params.get('class') || '').trim();
  const requestedOffer = (params.get('offer') || '').trim();
  const requestedPrice = Number.parseInt(params.get('price') || '', 10);

  // Mobile nav.
  const menu = $('#menuButton'), links = $('#navLinks');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      links.dataset.open = String(!open);
    });
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
      menu.setAttribute('aria-expanded','false'); links.dataset.open='false';
    }));
  }

  // Proof-backed portfolio discovery.
  const portfolioHref = cfg.portfolioUrl || 'products/';
  if (links && !links.querySelector('[data-portfolio-link]')) {
    const a=document.createElement('a'); a.href=portfolioHref; a.textContent='38 PILOTS'; a.dataset.portfolioLink='true';
    links.insertBefore(a, links.querySelector('.nav-cta'));
  }
  const heroActions=$('.hero-actions');
  if(heroActions && !heroActions.querySelector('[data-portfolio-link]')){
    const a=document.createElement('a'); a.className='btn ghost'; a.href=portfolioHref; a.textContent='EXPLORE 38 PILOTS'; a.dataset.portfolioLink='true'; heroActions.appendChild(a);
  }

  // Product links configurable.
  Object.entries(cfg.products || {}).forEach(([key, href]) => {
    if (!href) return;
    $$(`[data-product-link="${key}"]`).forEach(a => a.href = href);
  });
  $$('[data-select-product]').forEach(a => a.addEventListener('click', () => {
    const p = $('#product'); if (p) p.value = a.dataset.selectProduct;
  }));

  // Reveal.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }), { threshold:.12, rootMargin:'0px 0px -30px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('is-visible'));

  // Cursor glow.
  const orb = $('#cursorOrb');
  if (orb && !reduce && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => { orb.style.left=e.clientX+'px'; orb.style.top=e.clientY+'px'; });
  } else if (orb) orb.style.display='none';

  // Canvas field, deliberately subtle.
  const canvas = $('#field');
  if (canvas && !reduce) {
    const ctx = canvas.getContext('2d'); let w=0,h=0,dpr=1,pts=[];
    function resize(){ dpr=Math.min(devicePixelRatio||1,2); w=innerWidth; h=innerHeight; canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(dpr,0,0,dpr,0,0); pts=Array.from({length:Math.min(80,Math.floor(w*h/19000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.2,a:Math.random()*.32+.05,v:Math.random()*.08+.02})); }
    function draw(){ ctx.clearRect(0,0,w,h); pts.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=h;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(225,195,120,${p.a})`;ctx.fill();}); requestAnimationFrame(draw); }
    resize(); addEventListener('resize',resize,{passive:true}); draw();
  }

  // Public demonstration event feed. It never claims live production telemetry.
  const feed = $('#eventFeed');
  const eventPool = [
    ['mail.received','conversation enters governed intake','MAIL'],
    ['lead.qualified','bounded request accepted for review','LEAD'],
    ['source.receipt_bound','evidence lineage attached','PROOF'],
    ['payment.succeeded','provider event settles commercial state','MONEY'],
    ['job.output_prepared','review-ready artifact produced','WORK'],
    ['human.review_required','consequential output pauses at authority gate','AUTH'],
    ['mail.draft_ready','approved workflow prepares customer communication','MAIL'],
    ['delivery.prepared','reviewed output reaches release boundary','SHIP'],
    ['campaign.outcome_observed','market experiment receives evidence','MARKET']
  ];
  if (feed) {
    let tick=0;
    const addRow = (animated=false) => {
      const [name,detail,type] = eventPool[tick % eventPool.length]; tick++;
      const row=document.createElement('div'); row.className='event-row'+(animated?' new':'');
      row.innerHTML=`<i></i><span><strong>${name}</strong><small>${detail}</small></span><time>${type} / now</time>`;
      feed.prepend(row); while(feed.children.length>7) feed.lastElementChild.remove();
      if(animated) setTimeout(()=>row.classList.remove('new'),600);
    };
    for(let i=0;i<6;i++) addRow(false);
    if(!reduce) setInterval(()=>addRow(true),3100);
  }

  // One public ingestion throat for every product page.
  const form=$('#pilotForm'), status=$('#formStatus'), submit=$('#submitPilot');
  if (form) {
    const productSelect=$('#product');
    if (requestedParent && productSelect && [...productSelect.options].some(o=>o.value===requestedParent)) {
      productSelect.value=requestedParent;
    }
    if (status && requestedClass) {
      const quoted=Number.isFinite(requestedPrice)?` · launch pilot R ${requestedPrice.toLocaleString('en-ZA')} ZAR`:'';
      status.textContent=`Preloaded: ${requestedClass}${quoted}`;
    }
    form.addEventListener('submit', async e => {
      e.preventDefault(); const fd=new FormData(form);
      const parentProduct=String(fd.get('product')||'').trim();
      const defaultOffer=`${parentProduct}_controlled_pilot`;
      const offer=(requestedOffer||defaultOffer).slice(0,80);
      const payload={
        schema:'dio.public_intake.v1',
        product:parentProduct,
        offer,
        contact:{name:fd.get('name'),email:fd.get('email'),organisation:fd.get('organisation')||''},
        request:{
          summary:fd.get('summary'),
          preferred_pilot:'bounded_pilot',
          product_class:requestedClass||null,
          product_slug:requestedClass||null,
          offer_label:requestedOffer||null,
          launch_price_zar:Number.isFinite(requestedPrice)?requestedPrice:null,
          pricing_basis:Number.isFinite(requestedPrice)?'public_launch_pilot_one_bounded_case':null
        },
        consents:{reply_requested:fd.get('replyConsent')==='on'},
        attribution:{page:location.pathname,referrer:document.referrer||'',source:'dio_public_site',product_class:requestedClass||null},
        submitted_at:new Date().toISOString()
      };
      if(!payload.consents.reply_requested){status.textContent='Confirm that DIO may reply to this request.';return;}
      submit.disabled=true; submit.textContent='BINDING INTAKE…'; status.textContent='Sending this request into the DIO lead pipeline…';
      try{
        if(cfg.intakeEndpoint){
          const res=await fetch(cfg.intakeEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
          if(!res.ok) throw new Error(`Intake endpoint returned ${res.status}`);
          const data=await res.json().catch(()=>({}));
          status.textContent=data.lead_id?`DIO received the request. Reference: ${data.lead_id}`:'DIO received the request.';
          form.reset();
        } else {
          throw new Error('public intake endpoint is not configured');
        }
      }catch(err){
        console.error(err);
        const address=cfg.fallbackEmail||'dio_workflows@outlook.com';
        const subject=`DIO CONTROLLED PILOT REQUEST / ${requestedClass||parentProduct}`;
        const body=['DIO CONTROLLED PILOT REQUEST','',`Parent lane: ${parentProduct}`,`Product class: ${requestedClass||'not specified'}`,`Offer: ${offer}`,`Launch price ZAR: ${Number.isFinite(requestedPrice)?requestedPrice:'scope required'}`,`Name: ${payload.contact.name}`,`Organisation: ${payload.contact.organisation||'Not specified'}`,`Reply email: ${payload.contact.email}`,'','Bounded problem:',String(payload.request.summary||''),'','Permission: You may reply to this specific request.'].join('\n');
        status.textContent='The governed endpoint refused or could not receive the request. Opening the controlled email fallback…';
        location.href=`mailto:${encodeURIComponent(address)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } finally {
        submit.disabled=false; submit.textContent='CREATE DIO INTAKE ↗';
      }
    });
  }
})();
