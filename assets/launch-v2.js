(() => {
  const cfg = window.DIO_SITE_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

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

  const social = cfg.social || {};
  $$('[data-social]').forEach(link => {
    const url = social[link.dataset.social];
    if (url) link.href = url;
  });

  const vesperUrl = cfg.vesperUrl || 'vesper-intake.html';
  $$('[data-vesper-link]').forEach(link => { link.href = vesperUrl; });
  $$('[data-vesper-product]').forEach(link => {
    const incarnation = link.dataset.vesperProduct;
    link.href = `${vesperUrl}?incarnation=${encodeURIComponent(incarnation)}`;
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

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const interest = String(data.get('interest') || '').trim();
    const product = routeMap[interest] || 'dio_workflows';
    const payload = {
      schema: 'dio.public_intake.v1',
      product,
      offer: interest === 'investor' ? 'strategic_partnership_conversation' : `${product}_public_enquiry`,
      contact: {
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        organisation: String(data.get('organisation') || '').trim()
      },
      request: {
        summary: String(data.get('summary') || '').trim(),
        preferred_pilot: interest === 'investor' ? 'strategic_conversation' : 'bounded_pilot',
        product_class: interest || null,
        product_slug: interest || null,
        offer_label: interest || null,
        launch_price_zar: null,
        pricing_basis: null
      },
      consents: { reply_requested: data.get('replyConsent') === 'on' },
      attribution: {
        page: location.pathname,
        referrer: document.referrer || '',
        source: 'dio_investor_front_door',
        product_class: interest || null
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
      const subject = `DIO PUBLIC ENQUIRY / ${interest || 'general'}`;
      const body = [
        'DIO PUBLIC ENQUIRY', '', `Interest: ${interest || 'general'}`, `Product route: ${product}`,
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
