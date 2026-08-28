(() => {
  const cfg = window.DIO_SITE_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const params = new URLSearchParams(location.search);
  const requestedProduct = (params.get('product') || '').trim();
  const requestedClass = (params.get('class') || '').trim();
  const requestedOffer = (params.get('offer') || '').trim();
  const parsedPrice = Number.parseInt(params.get('price') || '', 10);
  const requestedPrice = Number.isFinite(parsedPrice) ? parsedPrice : null;

  const menu = $('#menuButton');
  const navLinks = $('#navLinks');
  if (menu && navLinks) {
    menu.addEventListener('click', () => {
      const next = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(next));
      navLinks.dataset.open = String(next);
    });
    $$('#navLinks a').forEach(link => link.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', 'false');
      navLinks.dataset.open = 'false';
    }));
  }

  const installResponsiveSystemMap = () => {
    const map = $('.platform-map');
    if (!map || map.dataset.systemMap === 'responsive-dom') return;

    map.innerHTML = `
      <div class="map-orbits" aria-hidden="true">
        <span class="map-orbit a"></span>
        <span class="map-orbit b"></span>
        <span class="map-orbit c"></span>
        <span class="map-orbit d"></span>
        <span class="map-wire w1"></span>
        <span class="map-wire w2"></span>
        <span class="map-wire w3"></span>
        <span class="map-wire w4"></span>
      </div>
      <div class="map-core"><strong>DIO</strong><span>ORCHESTRATION</span></div>
      <div class="map-ring">
        <div class="map-node homs"><b>HOMS</b><small>assessment</small></div>
        <div class="map-node seraph"><b>SERAPH</b><small>challenge &amp; assurance</small></div>
        <div class="map-node sophia"><b>SOPHIA</b><small>research integrity</small></div>
        <div class="map-node vamp"><b>VAMP</b><small>achievement evidence</small></div>
        <div class="map-node evidex"><b>EVIDEX</b><small>evidence assurance</small></div>
        <div class="map-node vesper"><b>VESPER</b><small>presence &amp; intake</small></div>
        <div class="map-node meta"><b>META</b><small>governance primitives</small></div>
        <div class="map-node arda"><b>ARDA</b><small>execution identity</small></div>
      </div>`;
    map.dataset.systemMap = 'responsive-dom';
  };
  installResponsiveSystemMap();

  const social = cfg.social || {};
  $$('[data-social]').forEach(link => {
    const url = social[link.dataset.social];
    if (url) link.href = url;
  });

  const programmeUrl = (cfg.products || {}).programmeproof;
  if (programmeUrl) {
    $$('a[href="products/programmeproof/"]').forEach(link => { link.href = programmeUrl; });
  }

  const vesperUrl = cfg.vesperUrl || 'vesper-intake.html';
  const vesperHints = {
    homs: 'HOMS Exam',
    vamp: 'VAMP Performance',
    sophia: 'Sophia Integrity',
    evidex: 'Evidex EvidenceOps',
    programmeproof: 'ProgrammeProof'
  };
  $$('[data-vesper-link]').forEach(link => { link.href = vesperUrl; });
  $$('[data-vesper-product]').forEach(link => {
    const key = link.dataset.vesperProduct;
    const incarnation = vesperHints[key] || '';
    link.href = incarnation ? `${vesperUrl}?incarnation=${encodeURIComponent(incarnation)}` : vesperUrl;
  });

  $$('[data-select-interest]').forEach(link => link.addEventListener('click', () => {
    const select = $('#interest');
    if (select) select.value = link.dataset.selectInterest || '';
  }));

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px' });
    $$('.reveal').forEach(node => observer.observe(node));
  } else {
    $$('.reveal').forEach(node => node.classList.add('is-visible'));
  }

  const canvas = $('#field');
  if (canvas && !reduce) {
    const context = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1, points = [];
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      width = innerWidth; height = innerHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = Array.from({ length: Math.min(90, Math.floor(width * height / 17000)) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        r: Math.random() * 1.25 + 0.2, a: Math.random() * 0.3 + 0.04,
        v: Math.random() * 0.07 + 0.015
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach(point => {
        point.y -= point.v;
        if (point.y < 0) point.y = height;
        context.beginPath();
        context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(225,195,120,${point.a})`;
        context.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener('resize', resize, { passive: true }); draw();
  }

  const form = $('#launchIntakeForm');
  const status = $('#launchFormStatus');
  const submit = $('#submitLaunchIntake');
  if (!form) return;

  const routeMap = {
    investor: 'dio_workflows', homs: 'homs', vamp: 'vamp', sophia: 'sophia',
    evidex: 'evidex', programmeproof: 'programmeproof', site_studio: 'site_studio',
    other: 'dio_workflows'
  };
  const ingressToInterest = {
    homs: 'homs', vamp: 'vamp', sophia: 'sophia', evidex: 'evidex',
    programmeproof: 'programmeproof', site_studio: 'site_studio',
    document_studio: 'other', dio_workflows: 'other'
  };
  const interestSelect = $('#interest');
  if (requestedProduct && interestSelect) {
    const interest = ingressToInterest[requestedProduct] || 'other';
    if ([...interestSelect.options].some(option => option.value === interest)) interestSelect.value = interest;
  }
  if (requestedClass && status) {
    const priceNote = requestedPrice === null ? '' : ` · launch pilot R ${requestedPrice.toLocaleString('en-ZA')} ZAR`;
    status.textContent = `Preloaded from product page: ${requestedClass}${priceNote}`;
  }
  if (location.hash === '#contact') {
    requestAnimationFrame(() => $('#intake')?.scrollIntoView({ block: 'start' }));
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const interest = String(data.get('interest') || '').trim();
    const product = requestedProduct || routeMap[interest] || 'dio_workflows';
    const offer = requestedOffer || (interest === 'investor' ? 'strategic_partnership_conversation' : `${product}_public_enquiry`);
    const payload = {
      schema: 'dio.public_intake.v1',
      product,
      offer,
      contact: {
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        organisation: String(data.get('organisation') || '').trim()
      },
      request: {
        summary: String(data.get('summary') || '').trim(),
        preferred_pilot: interest === 'investor' ? 'strategic_conversation' : 'bounded_pilot',
        product_class: requestedClass || interest || null,
        product_slug: requestedClass || interest || null,
        offer_label: requestedOffer || interest || null,
        launch_price_zar: requestedPrice,
        pricing_basis: requestedPrice === null ? null : 'public_launch_pilot_one_bounded_case'
      },
      consents: { reply_requested: data.get('replyConsent') === 'on' },
      attribution: {
        page: location.pathname,
        referrer: document.referrer || '',
        source: requestedClass ? 'dio_product_storefront' : 'dio_investor_front_door',
        product_class: requestedClass || interest || null
      },
      submitted_at: new Date().toISOString()
    };

    if (!payload.consents.reply_requested) {
      status.textContent = 'Confirm that DIO may reply to this request.';
      return;
    }

    submit.disabled = true;
    submit.textContent = 'BINDING INTAKE…';
    status.textContent = 'Sending this request into the governed DIO intake…';

    try {
      if (!cfg.intakeEndpoint) throw new Error('public intake endpoint is not configured');
      const response = await fetch(cfg.intakeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`Intake endpoint returned ${response.status}`);
      const body = await response.json().catch(() => ({}));
      status.textContent = body.lead_id ? `DIO received the request. Reference: ${body.lead_id}` : 'DIO received the request.';
      form.reset();
    } catch (error) {
      console.error(error);
      const address = cfg.fallbackEmail || 'dio_workflows@outlook.com';
      const subject = `DIO PUBLIC ENQUIRY / ${requestedClass || interest || 'general'}`;
      const body = [
        'DIO PUBLIC ENQUIRY', '', `Interest: ${interest || 'general'}`, `Product route: ${product}`,
        `Product class: ${requestedClass || 'not specified'}`, `Offer: ${offer}`,
        `Launch price ZAR: ${requestedPrice === null ? 'scope required' : requestedPrice}`,
        `Name: ${payload.contact.name}`, `Organisation: ${payload.contact.organisation || 'Not specified'}`,
        `Reply email: ${payload.contact.email}`, '', 'Request:', payload.request.summary, '',
        'Permission: You may reply to this specific request.'
      ].join('\n');
      status.textContent = 'The governed endpoint could not receive the request. Opening the email fallback…';
      location.href = `mailto:${encodeURIComponent(address)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } finally {
      submit.disabled = false;
      submit.textContent = 'SEND GOVERNED INTAKE ↗';
    }
  });
})();
