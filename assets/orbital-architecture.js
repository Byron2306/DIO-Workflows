(() => {
  const installPremiumOrbitalMap = () => {
    const map = document.querySelector('.platform-map');
    if (!map || map.dataset.systemMap === 'premium-orbital') return;

    map.classList.add('platform-orbit-map');
    map.innerHTML = `
      <img class="map-premium-ring" src="assets/premium/dio-gilded-orbit-ring.webp" alt="">
      <img class="map-premium-eye" src="assets/premium/dio-eye-premium.webp" alt="">
      <img class="map-premium-trace t1" src="assets/premium/dio-gilded-trace-long.webp" alt="">
      <img class="map-premium-trace t2" src="assets/premium/dio-gilded-trace-long.webp" alt="">
      <img class="map-premium-trace t3" src="assets/premium/dio-gilded-trace-long.webp" alt="">
      <img class="map-premium-trace t4" src="assets/premium/dio-gilded-trace-long.webp" alt="">
      <div class="map-core-premium"><strong>DIO</strong><span>ORCHESTRATION</span></div>
      <div class="map-ring-premium">
        <div class="map-node homs"><b>HOMS</b><small>assessment intelligence</small></div>
        <div class="map-node seraph"><b>SERAPH</b><small>challenge &amp; assurance</small></div>
        <div class="map-node sophia"><b>SOPHIA</b><small>research integrity</small></div>
        <div class="map-node vamp"><b>VAMP</b><small>achievement evidence</small></div>
        <div class="map-node evidex"><b>EVIDEX</b><small>evidence assurance</small></div>
        <div class="map-node vesper"><b>VESPER</b><small>presence &amp; intake</small></div>
        <div class="map-node meta"><b>META</b><small>governance primitives</small></div>
        <div class="map-node arda"><b>ARDA</b><small>execution identity</small></div>
      </div>`;
    map.dataset.systemMap = 'premium-orbital';
  };

  const schedule = () => requestAnimationFrame(() => requestAnimationFrame(installPremiumOrbitalMap));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once:true });
  else schedule();
})();
