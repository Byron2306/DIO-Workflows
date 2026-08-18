window.DIO_SITE_CONFIG = {
  intakeEndpoint: "https://dio-edge-gateway-live.dio-workflows.workers.dev/api/public/intake",
  fallbackEmail: "dio_workflows@outlook.com",
  portfolioUrl: "products/",
  products: {
    homs: "products/homs/",
    evidex: "products/evidex/",
    sophia: "products/sophia/",
    vamp: "products/vamp/"
  }
};

(() => {
  const footer = document.querySelector('.footer-links');
  if (!footer || footer.querySelector('[data-dio-legal-link]')) return;

  [
    ['Privacy', 'privacy/'],
    ['Terms', 'terms/'],
    ['Data deletion', 'data-deletion/']
  ].forEach(([label, href]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    link.dataset.dioLegalLink = 'true';
    footer.appendChild(link);
  });
})();
