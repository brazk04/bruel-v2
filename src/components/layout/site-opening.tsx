import "./site-opening.css";

const openingScript = `(() => {
  const opening = document.getElementById('site-opening');
  const key = 'bruel-opening-seen';

  if (!opening || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch {
    return;
  }

  function finish() {
    if (!opening.dataset.siteOpening) return;
    window.clearTimeout(deadline);
    window.removeEventListener('keydown', finish);
    delete opening.dataset.siteOpening;
    window.setTimeout(() => { opening.hidden = true; }, 220);
  }

  async function waitForHero() {
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      });
    }

    const image = document.querySelector('.home-hero .hero-image');
    if (image instanceof HTMLImageElement) {
      await image.decode().catch(() => {});
    }
  }

  const deadline = window.setTimeout(finish, 2000);
  opening.dataset.siteOpening = 'active';
  opening.hidden = false;
  window.addEventListener('keydown', finish, { once: true });
  const minimum = new Promise(resolve => window.setTimeout(resolve, 1400));
  Promise.all([waitForHero(), minimum]).then(finish);
})();`;

export function SiteOpening() {
  return <>
    <div id="site-opening" className="site-opening" role="status" hidden suppressHydrationWarning>
      <span className="site-opening-mark" aria-hidden="true">BRUEL<span>.</span></span>
      <span className="site-opening-track" aria-hidden="true" />
      <span className="sr-only">Carregando o site</span>
    </div>
    <script dangerouslySetInnerHTML={{ __html: openingScript }} />
  </>;
}
