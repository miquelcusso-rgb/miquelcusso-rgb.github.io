#!/usr/bin/env python3
"""Genera las páginas estáticas del portfolio desde una sola plantilla.

    python3 scripts/build-pages.py

Plantilla: templates/the-cut.html (diseño, estilos y JS de la web).
Salida: index.html (Editing), post/index.html, contact/index.html,
editing/index.html y v2/index.html (redirecciones a /) y sitemap.xml.
No edites los .html generados a mano: edita la plantilla o los metadatos
de aquí y vuelve a ejecutar. Los vídeos viven en assets/projects.js y sus
miniaturas en assets/thumbs.js (scripts/build-thumbs.py).
"""
import hashlib
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://miquelcusso-rgb.github.io'
# ?v=<hash>: WhatsApp/Facebook cachean la miniatura por URL; al cambiar la imagen cambia la URL
OG_IMAGE = SITE + '/og-image.jpg?v=' + hashlib.sha1((ROOT / 'og-image.jpg').read_bytes()).hexdigest()[:8]
SAME_AS = ["https://www.linkedin.com/in/miquelcusso/",
           "https://www.instagram.com/mikelkuss/",
           "https://vimeo.com/showcase/8984756"]

PAGES = {
    'editing': {
        'path': '/', 'file': 'index.html',
        'title': 'MIQUI CUSSÓ — Film Editor & Postproducer',
        'desc': 'Portfolio de Miqui Cussó, montador de cine y postproductor. Edición, postproducción y acabado de spots y piezas de marca para OYSHO, EA Sports, Audi y más.',
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


def load_projects():
    """Lee assets/projects.js (objetos JS planos) → {'editing': [...], 'post': [...]}."""
    src = (ROOT / 'assets/projects.js').read_text()
    out = {}
    for sec in ('editing', 'post'):
        body = re.search(sec + r': \[(.*?)\n  \]', src, re.S).group(1)
        items = []
        for block in re.findall(r'\{(.*?)\}', body, re.S):
            def field(k):
                m = re.search(k + r""":\s*(['"])(.*?)\1""", block)
                return m.group(2) if m else ''
            items.append({k: field(k) for k in ('id', 'titulo', 'director', 'production', 'posthouse')})
        out[sec] = items
    return out


def static_index(items, sec):
    """Índice pre-renderizado: lo ven buscadores e IA sin ejecutar JS (el JS lo sustituye)."""
    rows = []
    for i, p in enumerate(items, 1):
        t = html.escape(p['titulo'])
        co = p['posthouse'] if sec == 'post' and p['posthouse'] else p['production']
        rows.append(f'<li><a class="row" href="?p={p["id"]}" data-id="{p["id"]}"><span class="n">{i:03d}</span>'
                    f'<span class="t">{t}</span><span class="d">{html.escape(p["director"] or "—")}</span>'
                    f'<span class="c">{html.escape(co or "—")}</span><span class="len"></span></a></li>')
    return '\n'.join(rows)


def jsonld(key, page, items):
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
                   "name": page['title'], "url": url, "inLanguage": "es", "about": person,
                   "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
                       {"@type": "ListItem", "position": 1, "name": "Editing", "item": SITE + '/'},
                       {"@type": "ListItem", "position": 2, "name": name, "item": url}]}}]
    if items:
        blocks.append({"@context": "https://schema.org", "@type": "ItemList",
                       "name": ('Editing' if key == 'editing' else 'Post-production') + ' — Miqui Cussó',
                       "itemListElement": [{"@type": "ListItem", "position": i, "name": p['titulo'],
                                            "url": f"{url}?p={p['id']}"} for i, p in enumerate(items, 1)]})
    return '\n'.join('  <script type="application/ld+json">\n  %s\n  </script>' %
                     json.dumps(b, ensure_ascii=False, separators=(',', ':')) for b in blocks)


def seo_head(key, page, items):
    url = SITE + page['path']
    t, d = html.escape(page['title']), html.escape(page['desc'])
    return f'''  <title>{t}</title>
  <meta name="description" content="{d}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="profile">
  <meta property="og:title" content="{t}">
  <meta property="og:description" content="{d}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="MIQUI CUSSÓ — Film Editor &amp; Postproducer">
  <meta property="og:site_name" content="Miqui Cussó — Portfolio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{t}">
  <meta name="twitter:description" content="{d}">
  <meta name="twitter:image" content="{OG_IMAGE}">
{jsonld(key, page, items)}
'''


def bust(text):
    """/assets/x.js -> /assets/x.js?v=<hash del contenido>: GitHub Pages cachea los assets 10 min."""
    def sub(m):
        name = m.group(1)
        h = hashlib.sha1((ROOT / 'assets' / name).read_bytes()).hexdigest()[:8]
        return f'/assets/{name}?v={h}'
    return re.sub(r'/assets/([\w.-]+\.(?:css|js))(?:\?v=\w+)?', sub, text)


def redirect(title):
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
  <link rel="canonical" href="{SITE}/">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=/">
  <script>location.replace('/' + location.search + location.hash);</script>
</head>
<body><a href="/">MIQUI CUSSÓ</a></body>
</html>
'''


TEMPLATE = (ROOT / 'templates/the-cut.html').read_text()
PROJECTS = load_projects()

for key, page in PAGES.items():
    sec = 'post' if key == 'post' else 'editing'
    items = PROJECTS[sec] if key != 'contact' else []
    out = TEMPLATE.replace('<!--SEO-->\n', seo_head(key, page, items))
    out = out.replace('{{PAGE}}', key)
    out = out.replace('<ol class="index" id="index"></ol>',
                      '<ol class="index" id="index">\n' + static_index(PROJECTS[sec], sec) + '\n  </ol>')
    if key == 'post':  # el título de la sección arranca ya en Post
        out = out.replace('<h2 id="workTitle">Editing<sup', '<h2 id="workTitle">Post<sup')
    path = ROOT / page['file']
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(bust(out))

for folder, title in (('editing', 'Editing — MIQUI CUSSÓ'), ('v2', 'MIQUI CUSSÓ')):
    (ROOT / folder).mkdir(exist_ok=True)
    (ROOT / folder / 'index.html').write_text(redirect(title))

urls = ''.join(f'  <url><loc>{SITE}{p["path"]}</loc></url>\n' for p in PAGES.values())
(ROOT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n'
                                  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                  + urls + '</urlset>\n')
print('ok:', ', '.join(p['file'] for p in PAGES.values()), '+ editing/ y v2/ (redirecciones) + sitemap.xml')
print('proyectos:', {k: len(v) for k, v in PROJECTS.items()})
