(() => {
  if (document.querySelector('link[data-dio-eye-strategy]')) return;
  const script = document.currentScript;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('eye-strategy.css', script?.src || document.baseURI).href;
  link.setAttribute('data-dio-eye-strategy', 'true');
  document.head.appendChild(link);
})();
