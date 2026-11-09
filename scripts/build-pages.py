#!/usr/bin/env python3
"""Genera las páginas estáticas del portfolio desde una sola plantilla.

    python3 scripts/build-pages.py

Salida: index.html (Editing), post/index.html, contact/index.html y
editing/index.html (redirección a /). Edita cabecera, footer o metadatos
AQUÍ y vuelve a ejecutar; no edites los .html generados a mano.
Los proyectos (vídeos) viven en assets/site.js.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://miquelcusso-rgb.github.io'
OG_IMAGE = SITE + '/og-image.jpg'
SAME_AS = ["https://www.linkedin.com/in/miquelcusso/",
           "https://www.instagram.com/mikelkuss/",
           "https://vimeo.com/showcase/8984756"]

# Footer: se reutiliza tal cual del index.html actual (iconos SVG).
FOOTER = re.search(r'<footer>.*?</footer>', (ROOT / 'index.html').read_text(), re.S).group(0)

PAGES = {
    'editing': {
        'path': '/', 'file': 'index.html',
        'title': 'MIQUI CUSSÓ — Film Editor & Postproducer',
        'desc': 'Portfolio de Miqui Cussó, montador de cine y postproductor. Edición, postproducción y acabado de proyectos audiovisuales.',
    },
    'post': {
        'path': '/post/', 'file': 'post/index.html',
        'title': 'Post-production — MIQUI CUSSÓ',
        'desc': 'Trabajos de postproducción y acabado de Miqui Cussó (aka Furiosa Studio): spots, videoclips y piezas de marca para productoras y post houses.',
    },
    'contact': {
        'path': '/contact/', 'file': 'contact/index.html',
        'title': 'Contact — MIQUI CUSSÓ',
        'desc': 'Contacta con Miqui Cussó, montador de cine y postproductor freelance, para proyectos de edición, postproducción y acabado.',
    },
}
NAV = [('editing', 'Editing', '/'), ('post', 'Post', '/post/'), ('contact', 'Contact', '/contact/')]

THEME_BOOT = ("<script>try{if(localStorage.getItem('theme')==='light')"
              "document.documentElement.dataset.theme='light'}catch(e){}</script>")

TOGGLE = ('<button class="theme-toggle" type="button" aria-pressed="false" aria-label="Switch to white">'
          '<span class="tt-track" aria-hidden="true"><span class="tt-knob"></span></span>'
          '<span class="tt-label">B/W</span></button>')

GRID_SECTION = '''  <section id="section-{key}" class="section active">
    <div class="grid" id="grid-{key}"></div>
  </section>

  <div id="project-view" class="project-view">
    <a class="project-back" id="back-btn" href="{path}">Back</a>
    <div class="project-layout">
      <div class="project-meta">
        <h2 id="pv-title"></h2>
        <div class="meta-item" id="wrap-director">
          <div class="meta-label">Director</div>
          <div class="meta-value" id="pv-director"></div>
        </div>
        <div class="meta-item" id="wrap-production">
          <div class="meta-label">Prod Co</div>
          <div class="meta-value" id="pv-production"></div>
        </div>
        <div class="meta-item" id="wrap-posthouse" style="display:none">
          <div class="meta-label">Post House</div>
          <div class="meta-value" id="pv-posthouse"></div>
        </div>
      </div>
      <div class="video-col">
        <div class="video-wrapper">
          <iframe id="pv-iframe" src="" title="Video player" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="project-nav">
          <button class="project-nav-btn prev" id="btn-prev" type="button">Prev</button>
          <button class="project-nav-btn next" id="btn-next" type="button">Next</button>
        </div>
      </div>
    </div>
    <div class="related-grid" id="related-grid"></div>
  </div>'''

CONTACT_SECTION = '''  <section id="section-contact" class="section active">
    <div class="contact-wrap">
      <h2>Contact</h2>
      <p>Let's work together. You can also find me on <a href="https://www.linkedin.com/in/miquelcusso/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">LinkedIn</a>.</p>
      <div class="form-group">
        <label for="f-name">Name</label>
        <input type="text" id="f-name" autocomplete="name">
      </div>
      <div class="form-group">
        <label for="f-email">Email</label>
        <input type="email" id="f-email" autocomplete="email">
      </div>
      <div class="form-group">
        <label for="f-msg">Message</label>
        <textarea id="f-msg"></textarea>
      </div>
      <button class="btn-submit" id="btn-submit" type="button">Send message</button>
      <p class="form-success" id="form-success">Message sent — I'll get back to you soon.</p>
    </div>
  </section>'''


def jsonld(key, page):
    url = SITE + page['path']
    person = {"@type": "Person", "name": "Miqui Cussó", "url": SITE + '/',
              "jobTitle": "Film Editor & Postproducer",
              "knowsAbout": ["Film editing", "Post-production", "Color grading", "Video editing"],
              "sameAs": SAME_AS}
    if key == 'editing':
        blocks = [dict({"@context": "https://schema.org"}, **person),
                  {"@context": "https://schema.org", "@type": "WebSite", "name": "Miqui Cussó — Portfolio",
                   "url": SITE + '/', "inLanguage": "es", "about": {"@type": "Person", "name": "Miqui Cussó"}}]
    else:
        name = 'Post-production' if key == 'post' else 'Contact'
        blocks = [{"@context": "https://schema.org",
                   "@type": "ContactPage" if key == 'contact' else "CollectionPage",
                   "name": page['title'], "url": url, "inLanguage": "es",
                   "about": person,
                   "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
                       {"@type": "ListItem", "position": 1, "name": "Editing", "item": SITE + '/'},
                       {"@type": "ListItem", "position": 2, "name": name, "item": url}]}}]
    return '\n'.join('  <script type="application/ld+json">\n  %s\n  </script>' %
                     json.dumps(b, ensure_ascii=False, separators=(',', ':')) for b in blocks)


def head(key, page):
    url = SITE + page['path']
    t, d = page['title'], page['desc']
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{t}</title>
  <meta name="description" content="{d}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="profile">
  <meta property="og:title" content="{t}">
  <meta property="og:description" content="{d}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="MIQUI CUSSÓ — Film Editor & Postproducer">
  <meta property="og:site_name" content="Miqui Cussó — Portfolio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{t}">
  <meta name="twitter:description" content="{d}">
  <meta name="twitter:image" content="{OG_IMAGE}">
{jsonld(key, page)}
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✂</text></svg>">
  {THEME_BOOT}
  <link rel="stylesheet" href="/assets/site.css">
</head>'''


def nav(key):
    def link(k, label, href, prefix):
        cls = ' class="active" aria-current="page"' if k == key else ''
        return f'<a id="{prefix}-{k}" href="{href}"{cls}>{label}</a>'
    desk = '\n'.join(f'    <li>{link(k, l, h, "nav")}</li>' for k, l, h in NAV)
    mob = '\n'.join(f'  {link(k, l, h, "mob")}' for k, l, h in NAV)
    return f'''<div class="nav-outer" id="navOuter">
<nav id="mainNav">
  <a class="nav-brand" href="/">
    <h1>Miqui Cussó <span class="nav-aka-desktop">AKA FURIOSA STUDIO</span></h1>
    <p>Film editor &amp; postproducer</p>
    <p class="nav-aka-mobile">AKA FURIOSA STUDIO</p>
  </a>
  <ul class="nav-links">
    <li>{TOGGLE}</li>
{desk}
  </ul>
  <div class="nav-right-mobile">
    {TOGGLE}
    <button class="nav-hamburger" id="hamburger" type="button" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
</div>

<!-- Mobile menu -->
<div class="nav-mobile" id="navMobile">
{mob}
</div>'''


def page_html(key, page):
    main = CONTACT_SECTION if key == 'contact' else GRID_SECTION.format(key=key, path=page['path'])
    return f'''{head(key, page)}
<body data-page="{key}">

{nav(key)}

<main>
{main}
</main>

{FOOTER}

<script src="/assets/site.js"></script>
</body>
</html>
'''


REDIRECT = f'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Editing — MIQUI CUSSÓ</title>
  <link rel="canonical" href="{SITE}/">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=/">
  <script>location.replace('/' + location.search + location.hash);</script>
</head>
<body><a href="/">Editing</a></body>
</html>
'''

for key, page in PAGES.items():
    out = ROOT / page['file']
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page_html(key, page))
(ROOT / 'editing').mkdir(exist_ok=True)
(ROOT / 'editing/index.html').write_text(REDIRECT)

urls = ''.join(f'  <url><loc>{SITE}{p["path"]}</loc></url>\n' for p in PAGES.values())
(ROOT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n'
                                  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                  + urls + '</urlset>\n')
print('ok:', ', '.join(p['file'] for p in PAGES.values()), '+ editing/index.html + sitemap.xml')
