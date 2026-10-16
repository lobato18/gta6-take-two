# GTA 6 × Take-Two (TTWO)

Sitio web informativo sobre los avances de **GTA 6** y por qué fluctúa la acción de **Take-Two Interactive (NASDAQ: TTWO)** a causa de las noticias.

- **Web publicada:** https://lobato18.github.io/gta6-take-two/
- **Repositorio:** https://github.com/lobato18/gta6-take-two

## Estructura

```
.
├── index.html                      # Portada (resumen + cuenta atrás + gráfico)
├── noticias/index.html             # Listado de noticias
├── gta-6/
│   ├── fecha-de-lanzamiento.html
│   ├── trailer-de-lanzamiento.html
│   └── version-pc.html
├── bolsa/
│   ├── ttwo-volatilidad.html
│   └── datos-clave-ttwo.html
├── legal/
│   ├── aviso-legal.html
│   ├── privacidad.html
│   └── cookies.html
├── assets/
│   ├── css/site.css                # Estilos compartidos
│   ├── favicon.svg
│   └── js/
│       ├── config.js               # ⚙️ IDs de analítica y AdSense (¡rellenar!)
│       ├── consent.js              # Banner de cookies (RGPD)
│       ├── analytics.js            # Carga la analítica tras el consentimiento
│       ├── ads.js                  # Carga AdSense tras el consentimiento
│       └── home.js                 # Cuenta atrás + gráfico (solo portada)
├── robots.txt
├── sitemap.xml
├── ads.txt                         # Sustituir el pub-ID por el real
└── .nojekyll
```

## Ver en local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Cómo activar la monetización

Todo se configura en **`assets/js/config.js`**:

```js
window.SITE_CONFIG = {
  siteUrl: "https://lobato18.github.io/gta6-take-two/",
  ga4: "",                    // <-- tu ID de Google Analytics 4: "G-XXXXXXXXXX"
  plausibleDomain: "",        // alternativa sin cookies
  adsenseClient: "",          // <-- tu ID de AdSense: "ca-pub-0000000000000000"
  adsenseSlots: { top: "", mid: "", bottom: "" }
};
```

1. **Analítica:** crea una propiedad en https://analytics.google.com, copia el ID `G-…` en `ga4`.
2. **Publicidad:** crea una cuenta en https://adsense.google.com, copia el `ca-pub-…` en `adsenseClient` y crea tres unidades de anuncio (IDs en `adsenseSlots`).
3. **ads.txt:** sustituye `pub-0000000000000000` por tu ID real.
4. Tanto la analítica como la publicidad **solo se cargan si el usuario acepta las cookies** (cumplimiento RGPD).

## Publicar con GitHub Pages

1. **Settings → Pages**.
2. *Source*: rama **main**, carpeta **/ (root)**.
3. La web queda en `https://lobato18.github.io/gta6-take-two/`.

## Aviso

Contenido informativo. **No constituye asesoramiento financiero.** GTA, Rockstar y Take-Two son marcas de sus respectivos titulares; este sitio no está afiliado a ellos.
