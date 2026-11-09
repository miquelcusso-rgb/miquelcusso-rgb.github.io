#!/usr/bin/env python3
"""Guarda las miniaturas oficiales de Vimeo de todos los proyectos.

    python3 scripts/build-thumbs.py

Lee los vimeo_id de assets/projects.js, pide a Vimeo (oEmbed) la miniatura
de cada vídeo y escribe assets/thumbs.js. Ejecútalo tras añadir vídeos.
Si Vimeo aún no ha generado la miniatura (vídeo recién subido), ese vídeo
se omite y la web la pide a Vimeo en vivo hasta que vuelvas a ejecutarlo.
"""
import json
import pathlib
import re
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / 'assets/projects.js').read_text()

videos = {}
for m in re.finditer(r"vimeo_id:\s*'(\d+)'(?:,\s*vimeo_hash:\s*'(\w+)')?", src):
    videos[m.group(1)] = m.group(2)

thumbs, missing = {}, []
for vid, h in videos.items():
    page = f'https://vimeo.com/{vid}' + (f'/{h}' if h else '')
    url = 'https://vimeo.com/api/oembed.json?width=960&url=' + urllib.parse.quote(page, safe='')
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'portfolio-thumbs/1.0'})
        with urllib.request.urlopen(req, timeout=20) as r:
            d = json.load(r)
        t = d.get('thumbnail_url') or ''
        if t and '/default-' not in t:
            thumbs[vid] = t
        else:
            missing.append(vid)
    except Exception as e:
        missing.append(f'{vid} ({e})')

(ROOT / 'assets/thumbs.js').write_text(
    '// Generado por scripts/build-thumbs.py — no editar a mano.\n'
    'window.THUMBS = ' + json.dumps(thumbs, indent=2, sort_keys=True) + ';\n')
print(f'{len(thumbs)}/{len(videos)} miniaturas guardadas')
if missing:
    print('Sin miniatura todavía:', ', '.join(missing))
