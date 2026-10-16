/* =====================================================================
   Banner de consentimiento de cookies (RGPD / LSSI).
   - Guarda la decisión en localStorage (clave: cookie-consent-v1).
   - Emite el evento "consentchange" con detail = "granted" | "denied".
   - La analítica y la publicidad SOLO se cargan si se acepta.
   ===================================================================== */
(function () {
  "use strict";
  var KEY = "cookie-consent-v1";
  var banner = null;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function base() {
    return (window.SITE_BASE || "");
  }
  function emit(v) {
    document.dispatchEvent(new CustomEvent("consentchange", { detail: v }));
  }
  function decide(v) {
    store(v);
    hide();
    emit(v);
  }
  function hide() { if (banner) banner.hidden = true; }

  window.CookieConsent = {
    get: read,
    granted: function () { return read() === "granted"; },
    denied: function () { return read() === "denied"; },
    open: function () { if (banner) banner.hidden = false; },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} this.open(); }
  };

  function build() {
    banner = document.createElement("div");
    banner.className = "cc";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      '<div class="wrap">' +
        '<p>Usamos cookies propias y de terceros con fines de <b>análisis</b> y <b>publicidad</b>. ' +
        'Puedes aceptarlas o rechazarlas; si rechazas, el sitio seguirá funcionando igual. ' +
        'Más información en la <a href="' + base() + 'legal/cookies.html">política de cookies</a>.</p>' +
        '<div class="actions">' +
          '<button type="button" class="btn" data-cc="deny">Rechazar</button>' +
          '<button type="button" class="btn primary" data-cc="accept">Aceptar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    banner.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cc]");
      if (!t) return;
      decide(t.getAttribute("data-cc") === "accept" ? "granted" : "denied");
    });
  }

  function init() {
    if (!read()) { build(); }
    // Enlaces "Configurar cookies" que reabren el banner.
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cookie-settings]");
      if (!t) return;
      e.preventDefault();
      window.CookieConsent.open();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
