window.DIO_SITE_CONFIG = {
  intakeEndpoint: "https://dio-edge-gateway-live.dio-workflows.workers.dev/api/public/intake",
  vesperApiOrigin: "https://dio-edge-gateway-live.dio-workflows.workers.dev",
  fallbackEmail: "dio_workflows@outlook.com",
  portfolioUrl: "products/",
  vesperUrl: "vesper-intake.html",
  social: {
    instagram: "https://www.instagram.com/dio_workflows/",
    facebook: "https://www.facebook.com/profile.php?id=61593271043069",
    linkedin: "https://www.linkedin.com/company/139354569/",
    youtube: "https://www.youtube.com/channel/UCc916iuoPLseg05t5J5leaQ"
  },
  products: {
    homs: "products/homs/",
    evidex: "products/evidex/",
    sophia: "products/sophia/",
    vamp: "products/vamp/",
    programmeproof: "products/pilot.html?product=programmeproof",
    site_studio: "#intake"
  }
};

(() => {
  const script = document.currentScript;
  const assetUrl = name => new URL(name, script?.src || document.baseURI).href;

  const addStylesheet = (name, marker) => {
    if (document.querySelector(`link[${marker}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = assetUrl(name);
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  };

  addStylesheet('visual-safety.css', 'data-dio-visual-safety');
  addStylesheet('orbital-architecture.css', 'data-dio-orbital-architecture');
  addStylesheet('eye-strategy.css', 'data-dio-eye-strategy');

  if (!document.querySelector('script[data-dio-orbital-architecture]')) {
    const orbital = document.createElement('script');
    orbital.src = assetUrl('orbital-architecture.js');
    orbital.setAttribute('data-dio-orbital-architecture', 'true');
    document.head.appendChild(orbital);
  }
})();
