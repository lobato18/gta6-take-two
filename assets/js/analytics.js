/* =====================================================================
   Analítica. Se carga SOLO tras el consentimiento del usuario.
   Soporta Google Analytics 4 (config.ga4) y Plausible (config.plausibleDomain).
   ===================================================================== */
(function () {
  "use strict";
  var loaded = false;

  function injected() {
    var c = window.SITE_CONFIG || {};
    if (c.ga4) {
      if (document.getElementById("ga4-lib")) return;
      var s = document.createElement("script");
      s.id = "ga4-lib";
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(c.ga4);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", c.ga4, { anonymize_ip: true });
    }
    if (c.plausibleDomain) {
      if (document.getElementById("plausible-lib")) return;
      var p = document.createElement("script");
      p.id = "plausible-lib";
      p.defer = true;
      p.setAttribute("data-domain", c.plausibleDomain);
      p.src = "https://plausible.io/js/script.js";
      document.head.appendChild(p);
    }
  }

  function load() {
    if (loaded) return;
    loaded = true;
    injected();
  }

  document.addEventListener("consentchange", function (e) {
    if (e.detail === "granted") load();
  });

  if (window.CookieConsent && window.CookieConsent.granted()) load();
})();
