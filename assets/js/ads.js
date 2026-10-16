/* =====================================================================
   Publicidad (Google AdSense). Se carga SOLO tras el consentimiento.
   Los bloques del HTML llevan data-slot="top|mid|bottom"; este script los
   rellena con el ID configurado en assets/js/config.js.
   ===================================================================== */
(function () {
  "use strict";
  var loaded = false;

  function fill() {
    var c = window.SITE_CONFIG || {};
    if (!c.adsenseClient) return;

    // Librería de AdSense
    if (!document.getElementById("adsbygoogle-lib")) {
      var s = document.createElement("script");
      s.id = "adsbygoogle-lib";
      s.async = true;
      s.crossOrigin = "anonymous";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
        encodeURIComponent(c.adsenseClient);
      document.head.appendChild(s);
    }

    // Rellenar cada bloque
    document.querySelectorAll(".ad[data-slot]").forEach(function (box) {
      var key = box.getAttribute("data-slot");
      var slot = (c.adsenseSlots || {})[key];
      if (!slot) return; // sin ID configurado -> se deja el marcador
      box.setAttribute("data-loaded", "1");
      box.innerHTML =
        '<ins class="adsbygoogle" style="display:block" ' +
        'data-ad-client="' + c.adsenseClient + '" ' +
        'data-ad-slot="' + slot + '" ' +
        'data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  function load() {
    if (loaded) return;
    loaded = true;
    fill();
  }

  document.addEventListener("consentchange", function (e) {
    if (e.detail === "granted") load();
  });

  if (window.CookieConsent && window.CookieConsent.granted()) load();
})();
