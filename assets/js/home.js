/* =====================================================================
   Portada: cuenta atrás, gráfico del precio de TTWO y lista de eventos.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Cuenta atrás ---------- */
  (function () {
    var el = document.getElementById("countdown");
    if (!el) return;
    var launch = new Date("2026-11-19T00:00:00");
    var cap = document.getElementById("cd-caption");
    function tick() {
      var diff = launch - new Date();
      var done = diff <= 0;
      if (done) diff = 0;
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600);  s -= h * 3600;
      var m = Math.floor(s / 60);    s -= m * 60;
      document.getElementById("cd-d").textContent = d;
      document.getElementById("cd-h").textContent = String(h).padStart(2, "0");
      document.getElementById("cd-m").textContent = String(m).padStart(2, "0");
      document.getElementById("cd-s").textContent = String(s).padStart(2, "0");
      if (cap && done) cap.textContent = "¡GTA 6 ya está disponible!";
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ---------- Datos de la acción ---------- */
  var series = [
    { d: "1 oct",  c: 203.62, note: "" },
    { d: "2 oct",  c: 202.73, note: "Ficha PEGI 18 publicada y retirada" },
    { d: "5 oct",  c: 203.46, note: "" },
    { d: "6 oct",  c: 202.53, note: "Reporte (falso) de exclusiva en la nube de Xbox" },
    { d: "7 oct",  c: 204.01, note: "Xbox desmiente la exclusiva en la nube" },
    { d: "8 oct",  c: 209.37, note: "Rockstar revela 6 emisoras de radio" },
    { d: "9 oct",  c: 213.44, note: "" },
    { d: "12 oct", c: 208.82, note: "Wells Fargo reitera 300 $ pero recorta estimaciones" },
    { d: "13 oct", c: 200.32, note: "−4/5%: rumor port de PC Q1 2027 + filtraciones" },
    { d: "14 oct", c: 201.23, note: "Bloomberg: desarrollo de GTA 6 y coste ≤1.500 M$" },
    { d: "15 oct", c: 209.38, note: "+4%: tráiler de lanzamiento y notas de BofA/StoneX/Raymond James" },
    { d: "16 oct", c: 204.12, note: "Sesión en curso: −2,5% (toma de beneficios)", intraday: true }
  ];

  /* ---------- Render del gráfico ---------- */
  (function () {
    var wrap = document.getElementById("chartWrap");
    if (!wrap) return;
    var W = 980, H = 340, PL = 54, PR = 18, PT = 24, PB = 42;
    var iw = W - PL - PR, ih = H - PT - PB;
    var vals = series.map(function (p) { return p.c; });
    var min = Math.min.apply(null, vals) - 5;
    var max = Math.max.apply(null, vals) + 5;
    var n = series.length;
    var x = function (i) { return PL + (iw * i / (n - 1)); };
    var y = function (v) { return PT + ih * (1 - (v - min) / (max - min)); };

    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Gráfico del precio de cierre de TTWO del 1 al 16 de octubre de 2026");

    function el(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

    var defs = el("defs", {});
    var lg = el("linearGradient", { id: "areaGrad", x1: "0", y1: "0", x2: "0", y2: "1" });
    lg.appendChild(el("stop", { offset: "0%", "stop-color": "#ff2d92", "stop-opacity": "0.35" }));
    lg.appendChild(el("stop", { offset: "100%", "stop-color": "#a259ff", "stop-opacity": "0.02" }));
    defs.appendChild(lg);
    svg.appendChild(defs);

    var steps = 4;
    for (var g = 0; g <= steps; g++) {
      var v = min + (max - min) * g / steps;
      var yy = y(v);
      svg.appendChild(el("line", { x1: PL, y1: yy, x2: W - PR, y2: yy, stroke: "rgba(255,255,255,0.07)", "stroke-width": 1 }));
      var t = el("text", { x: PL - 10, y: yy + 4, fill: "#a89fc0", "font-size": "11", "text-anchor": "end" });
      t.textContent = "$" + v.toFixed(0);
      svg.appendChild(t);
    }

    var areaD = "M" + x(0) + "," + y(series[0].c);
    for (var i2 = 1; i2 < n; i2++) areaD += " L" + x(i2) + "," + y(series[i2].c);
    areaD += " L" + x(n - 1) + "," + (PT + ih) + " L" + x(0) + "," + (PT + ih) + " Z";
    svg.appendChild(el("path", { d: areaD, fill: "url(#areaGrad)" }));

    var lineD = "M" + x(0) + "," + y(series[0].c);
    for (var i3 = 1; i3 < n; i3++) lineD += " L" + x(i3) + "," + y(series[i3].c);
    svg.appendChild(el("path", { d: lineD, fill: "none", stroke: "#ff2d92", "stroke-width": "2.5", "stroke-linejoin": "round", "stroke-linecap": "round" }));

    series.forEach(function (p, i) {
      if (i % 2 === 0 || i === n - 1) {
        var tx = el("text", { x: x(i), y: H - 16, fill: "#a89fc0", "font-size": "11", "text-anchor": "middle" });
        tx.textContent = p.d;
        svg.appendChild(tx);
      }
    });

    var tip = document.getElementById("ctip");
    series.forEach(function (p, i) {
      var prev = i > 0 ? series[i - 1].c : p.c;
      var up = p.c >= prev;
      var col = up ? "#38e07b" : "#ff5c6c";
      var cx = x(i), cy = y(p.c);

      var hit = el("circle", { cx: cx, cy: cy, r: 16, fill: "transparent", style: "cursor:pointer" });
      var dot = el("circle", { cx: cx, cy: cy, r: i === n - 1 ? 6 : 4.5, fill: col, stroke: "#0b0712", "stroke-width": 2 });
      svg.appendChild(dot);
      svg.appendChild(hit);

      if (p.note) {
        svg.appendChild(el("circle", { cx: cx, cy: cy, r: 9, fill: "none", stroke: "#22e0ff", "stroke-width": 1.5, opacity: "0.85" }));
      }

      function show() {
        var chg = (i > 0) ? ((p.c - series[i - 1].c) / series[i - 1].c * 100) : 0;
        var sign = chg >= 0 ? "+" : "";
        if (!tip) return;
        tip.innerHTML = "<b>" + p.d + "</b> · $" + p.c.toFixed(2) +
          "<br><span class='" + (chg >= 0 ? "up" : "down") + "'>" + sign + chg.toFixed(2) + "%</span>" +
          (p.intraday ? " <span style='color:#a89fc0'>(intradía)</span>" : "") +
          (p.note ? "<br><span style='color:#a89fc0'>" + p.note + "</span>" : "");
        tip.style.opacity = 1;
        var rect = svg.getBoundingClientRect();
        var scale = rect.width / W;
        tip.style.left = (cx * scale) + "px";
        tip.style.top = (cy * scale) + "px";
      }
      function hide() { if (tip) tip.style.opacity = 0; }
      hit.addEventListener("mouseenter", show);
      hit.addEventListener("mousemove", show);
      hit.addEventListener("mouseleave", hide);
      hit.addEventListener("touchstart", show, { passive: true });
    });

    wrap.appendChild(svg);
  })();

  /* ---------- Lista de eventos ---------- */
  (function () {
    var wrap = document.getElementById("events");
    if (!wrap) return;
    var ev = [
      { d: "2 oct", type: "neu", t: "<strong>Ficha PEGI 18</strong> publicada y retirada: señal del tono adulto del juego." },
      { d: "7 oct", type: "neu", t: "<strong>Xbox desmiente</strong> la exclusiva en la nube: GTA 6 sigue solo en consola." },
      { d: "8 oct", type: "pos", t: "Rockstar revela <strong>seis emisoras de radio</strong>; la acción sube +2,6%." },
      { d: "12 oct", type: "neg", t: "<strong>Wells Fargo</strong> mantiene «Overweight» y 300 $ pero recorta NBA 2K y móvil." },
      { d: "13 oct", type: "neg", t: "<strong>−4/5%:</strong> rumor de port de PC Q1 2027, ansiedad por filtraciones y puts. Volumen de 5,2 M." },
      { d: "14 oct", type: "neu", t: "<strong>Bloomberg</strong> publica el reportaje de desarrollo (Project Americas, coste ≤1.500 M$)." },
      { d: "15 oct", type: "pos", t: "<strong>+4%:</strong> tráiler de lanzamiento + BofA (368 $), StoneX y Raymond James (300 $)." },
      { d: "16 oct", type: "neg", t: "<strong>Sesión en curso −2,5%:</strong> toma de beneficios tras el rebote, en un mercado sin impulso." }
    ];
    wrap.innerHTML = ev.map(function (e) {
      return '<div class="event"><div class="d">' + e.d + '</div><div class="t"><span class="tag ' + e.type + '">' +
        (e.type === "pos" ? "Alcista" : e.type === "neg" ? "Bajista" : "Neutral") + '</span>' + e.t + '</div></div>';
    }).join("");
  })();
})();
