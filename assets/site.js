// ─────────────────────────────────────────────────────────────────
// PROJECTS
// Para añadir un proyecto: copia una entrada y edita los campos.
// El orden del array es el orden del grid (las 3 primeras = primera fila).
// vimeo_id: el número en la URL de Vimeo (vimeo.com/XXXXXXX)
// posthouse: solo se muestra en la sección POST
// ─────────────────────────────────────────────────────────────────
const PROJECTS = {
  editing: [
    {
      id: 'e20', vimeo_id: '1245049449',
      titulo: 'OYSHO Hike — Subway',
      director: 'Willy Rodríguez', production: 'Intricate'
    },
    {
      id: 'e21', vimeo_id: '1245049450',
      titulo: 'OYSHO Hike — Office',
      director: 'Willy Rodríguez', production: 'Intricate'
    },
    {
      id: 'e22', vimeo_id: '1245049448',
      titulo: 'OYSHO Hike — Supermarket',
      director: 'Willy Rodríguez', production: 'Intricate'
    },
    {
      id: 'e01', vimeo_id: '1062332542',
      titulo: 'GAMRFIRST — Online Casino',
      director: 'Lonan García', production: 'Papaya Films',
      thumbnail: 'https://i.vimeocdn.com/video/1989234370-c974a775e82ea3a0eea900d5190669c1e92c8648c3fdb427e694a4cace3ed518-d'
    },
    {
      id: 'e02', vimeo_id: '988481114',
      titulo: "Ebay — That's You",
      director: 'Lonan García', production: 'Markenfilm'
    },
    {
      id: 'e03', vimeo_id: '1166436852', vimeo_hash: '2d105c8e3f',
      titulo: 'Changan S05 — DC',
      director: 'Pol Penas', production: 'Coulant on Road'
    },
    {
      id: 'e04', vimeo_id: '1163024668',
      titulo: 'Bicentury — Saborizadas',
      director: 'Lonan García', production: 'Intricate'
    },
    {
      id: 'e05', vimeo_id: '988480228',
      titulo: 'The Fork — DC',
      director: 'Lonan García', production: 'Oxigeno'
    },
    {
      id: 'e06', vimeo_id: '1062334074',
      titulo: "DoorDash — Company's Coming",
      director: 'Lonan García', production: 'Alfredo Films'
    },
    {
      id: 'e07', vimeo_id: '1062343456',
      titulo: '400 Conejos — The Legend',
      director: 'Lonan García', production: 'Oxigeno'
    },
    {
      id: 'e08', vimeo_id: '1163023457',
      titulo: 'Idealista — Familia',
      director: 'Pedro Abreu', production: 'Blua'
    },
    {
      id: 'e09', vimeo_id: '641571686',
      titulo: 'Powerade — Tokyo Olympics 2020',
      director: 'Julien Zenier', production: 'DR Films'
    },
    {
      id: 'e10', vimeo_id: '641571409',
      titulo: 'The Boys — Prime Video Promo',
      director: 'Lonan García', production: 'Blua'
    },
    {
      id: 'e11', vimeo_id: '282088967',
      titulo: 'VW Padre — BRUMMM',
      director: 'Miguel Angulo', production: 'Good Company'
    },
    {
      id: 'e12', vimeo_id: '282090547',
      titulo: "Samsung — Smartgirl",
      director: 'Alex Llopis', production: 'Good Company'
    },
    {
      id: 'e13', vimeo_id: '1163028590',
      titulo: 'Glovo — New Song5',
      director: 'Lonan García', production: 'Blua'
    },
    {
      id: 'e14', vimeo_id: '1062334051',
      titulo: 'Kaufland — Epic Split',
      director: 'Lonan García', production: 'Markenfilm'
    },
    {
      id: 'e15', vimeo_id: '641571628',
      titulo: 'Bizum — Solo se activa una vez',
      director: 'Lonan García', production: 'Blua'
    },
    {
      id: 'e16', vimeo_id: '1062334095',
      titulo: 'Pfister — Hallo Vielfalt',
      director: '—', production: '—'
    },
    {
      id: 'e17', vimeo_id: '641607557',
      titulo: 'Wallapop — TRUE STORIES Fashion',
      director: 'Lonan García', production: 'Celofan'
    },
    {
      id: 'e18', vimeo_id: '282459638',
      titulo: 'HEAD Pro S — La Rompo',
      director: 'Albert Grabuleda', production: 'Good Company'
    },
    {
      id: 'e19', vimeo_id: '239666705',
      titulo: 'El Corte Inglés — Dia XL',
      director: 'Albert Grabuleda', production: 'Good Company'
    },
  ],
  post: [
    {
      id: 'p01', vimeo_id: '1117026137',
      titulo: 'EA Sports FC 2026 — Icons',
      director: 'Keane Shaw', production: 'Riff Raff Films', posthouse: 'Martes Studio'
    },
    {
      id: 'p02', vimeo_id: '1168881246',
      titulo: 'Audi — Icon',
      director: 'Nacho Gayán', production: 'Agosto', posthouse: 'La Metropolitana'
    },
    {
      id: 'p02b', vimeo_id: '1183346679',
      titulo: 'ECI — Fall 2025',
      director: 'Alvaro Colom', production: 'Cap Dept', posthouse: 'La Metropolitana'
    },
    {
      id: 'p03', vimeo_id: '1047172070',
      titulo: 'Terra Cene',
      director: 'Nono Ayuso & Rodrigo Inada', production: 'Landia / Impolite / Saltwater', posthouse: 'Eighty4'
    },
    {
      id: 'p04', vimeo_id: '736607023',
      titulo: 'Canon',
      director: 'Lubos Vacke', production: 'Truffle', posthouse: 'Eighty4'
    },
    {
      id: 'p05', vimeo_id: '1166436852', vimeo_hash: '2d105c8e3f',
      titulo: 'Changan S05',
      director: 'Pol Penas', production: 'Coulant', posthouse: 'Furiosa Studio'
    },
    {
      id: 'p06', vimeo_id: '413310910',
      titulo: 'Dua Lipa — Physical',
      director: 'CANADA (Lope Serrano)', production: 'CANADA', posthouse: 'Eighty4'
    },
    {
      id: 'p07', vimeo_id: '713311670',
      titulo: 'Línea Directa',
      director: 'Pep Bosch', production: 'Mamma Team', posthouse: 'Eighty4'
    },
    {
      id: 'p08', vimeo_id: '641571628',
      titulo: 'Bizum — Solo se activa una vez',
      director: 'Lonan García', production: 'Blua', posthouse: 'Furiosa Studio'
    },
    {
      id: 'p09', vimeo_id: '443369900',
      titulo: 'Ferran Palau — Flora Caic',
      director: 'Pablo Maestres', production: 'Bungard Film / Primo', posthouse: 'Eighty4'
    },
    {
      id: 'p10', vimeo_id: '429333240',
      titulo: 'Eclipse',
      director: 'Gasser Bros', production: '—', posthouse: 'Eighty4'
    },
    {
      id: 'p11', vimeo_id: '1062343456',
      titulo: '400 Conejos — The Legend',
      director: 'Lonan García', production: 'Oxigeno', posthouse: 'Eighty4'
    },
    {
      id: 'p12', vimeo_id: '349842200',
      titulo: 'La Mer',
      director: 'Victor Claramunt', production: '3TristeTeasers / Filmworks', posthouse: 'Eighty4'
    },
    {
      id: 'p13', vimeo_id: '1117739530',
      titulo: 'ECI — Summertime',
      director: 'Emir Eralp', production: 'Cap Dept', posthouse: 'Furiosa Studio'
    },
    {
      id: 'p14', vimeo_id: '1183341587',
      titulo: 'LOEWE x ON',
      director: 'Sofia Alazraki', production: 'Cap Dept', posthouse: 'Furiosa Studio'
    },
  ]
};

// Página actual: <body data-page="editing|post|contact">
const PAGE = document.body.dataset.page;
const BASE_TITLE = document.title;

// ─────────────────────────────────────────────────────────────────
// TEMA black / white (se aplica antes del render en el <head>)
// ─────────────────────────────────────────────────────────────────
function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}
function syncThemeButtons() {
  const light = currentTheme() === 'light';
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.setAttribute('aria-pressed', String(light));
    b.setAttribute('aria-label', light ? 'Switch to black' : 'Switch to white');
    b.title = light ? 'Black' : 'White';
  });
}
function toggleTheme() {
  const next = currentTheme() === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncThemeButtons();
}
document.querySelectorAll('.theme-toggle').forEach(b => b.addEventListener('click', toggleTheme));
syncThemeButtons();

// ─────────────────────────────────────────────────────────────────
// Thumbnail via vumbnail.com — sin CORS, funciona en local
// ─────────────────────────────────────────────────────────────────
function thumbUrl(p) {
  if (p.thumbnail) return p.thumbnail;
  return p.vimeo_id ? `https://vumbnail.com/${p.vimeo_id}.jpg` : '';
}

// ─────────────────────────────────────────────────────────────────
// URL embed Vimeo (soporte para vídeos con hash privado)
// ─────────────────────────────────────────────────────────────────
function embedUrl(p) {
  if (!p.vimeo_id) return '';
  const hash = p.vimeo_hash ? `?h=${p.vimeo_hash}&` : '?';
  return `https://player.vimeo.com/video/${p.vimeo_id}${hash}autoplay=1&color=b8213a&title=0&byline=0&portrait=0&dnt=1`;
}

// URL compartible de un proyecto: /post/?p=p01
function projectHref(id) {
  return location.pathname + '?p=' + encodeURIComponent(id);
}

function makeCard(p, extraClass) {
  const card = document.createElement('a');
  card.className = 'card' + (extraClass ? ' ' + extraClass : '');
  card.href = projectHref(p.id);
  card.innerHTML = `
    <img src="${thumbUrl(p)}" alt="${p.titulo}" loading="lazy">
    <div class="card-overlay">
      <div class="card-title">${p.titulo}</div>
    </div>
  `;
  card.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // nueva pestaña
    e.preventDefault();
    openProject(p.id, true);
  });
  return card;
}

// ─────────────────────────────────────────────────────────────────
// RENDER GRID
// ─────────────────────────────────────────────────────────────────
function renderGrid() {
  const container = document.getElementById('grid-' + PAGE);
  if (!container) return;
  container.innerHTML = '';
  PROJECTS[PAGE].forEach(p => container.appendChild(makeCard(p)));
}

// ─────────────────────────────────────────────────────────────────
// NAVEGACIÓN dentro de la página (grid ↔ proyecto)
// ─────────────────────────────────────────────────────────────────
let currentId = null;

function showGrid(push) {
  if (push) history.pushState({}, '', location.pathname);
  document.getElementById('project-view').classList.remove('active');
  document.getElementById('section-' + PAGE).classList.add('active');
  document.getElementById('pv-iframe').src = '';
  document.title = BASE_TITLE;
  currentId = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openProject(id, push) {
  const list = PROJECTS[PAGE];
  const p    = list.find(x => x.id === id);
  if (!p) { showGrid(false); return; }
  const idx = list.indexOf(p);
  currentId = id;
  if (push) history.pushState({ p: id }, '', projectHref(id));

  document.getElementById('section-' + PAGE).classList.remove('active');
  document.getElementById('project-view').classList.add('active');
  document.title = p.titulo + ' — Miqui Cussó';

  document.getElementById('pv-title').textContent      = p.titulo;
  document.getElementById('pv-director').textContent   = p.director  || '—';
  document.getElementById('pv-production').textContent = p.production || '—';

  // Post house: solo visible en la página post y si tiene valor
  const phWrap = document.getElementById('wrap-posthouse');
  const phVal  = document.getElementById('pv-posthouse');
  if (PAGE === 'post' && p.posthouse && p.posthouse !== '—') {
    phVal.textContent = p.posthouse;
    phWrap.style.display = 'block';
  } else {
    phWrap.style.display = 'none';
  }

  document.getElementById('pv-iframe').src = embedUrl(p);
  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').disabled = idx === list.length - 1;

  const rel = document.getElementById('related-grid');
  rel.innerHTML = '';
  list.forEach(rp => rel.appendChild(makeCard(rp, rp.id === id ? 'active-card' : '')));

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateProject(dir) {
  const list = PROJECTS[PAGE];
  const idx  = list.findIndex(x => x.id === currentId);
  const next = list[idx + dir];
  if (next) openProject(next.id, true);
}

function routeFromUrl() {
  const id = new URLSearchParams(location.search).get('p');
  if (id) openProject(id, false); else showGrid(false);
}

if (PROJECTS[PAGE]) {
  renderGrid();
  document.getElementById('back-btn').addEventListener('click', e => { e.preventDefault(); showGrid(true); });
  document.getElementById('btn-prev').addEventListener('click', () => navigateProject(-1));
  document.getElementById('btn-next').addEventListener('click', () => navigateProject(1));
  window.addEventListener('popstate', routeFromUrl);
  if (new URLSearchParams(location.search).get('p')) routeFromUrl();
}

function toggleMenu() {
  document.getElementById('navMobile').classList.toggle('open');
}
document.getElementById('hamburger').addEventListener('click', toggleMenu);

// ─────────────────────────────────────────────────────────────────
// FORMULARIO
// ─────────────────────────────────────────────────────────────────
function submitForm() {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();
  if (!name || !email || !msg) return;
  const subject = encodeURIComponent('Portfolio contact — ' + name);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  // Dirección ensamblada en runtime (no aparece literal en el fuente → los
  // scrapers de emails no la cosechan; el mailto sigue funcionando igual).
  const to = ['miquelcusso', String.fromCharCode(64), 'gmail', '.', 'com'].join('');
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  document.getElementById('form-success').style.display = 'block';
}
const submitBtn = document.getElementById('btn-submit');
if (submitBtn) submitBtn.addEventListener('click', submitForm);

// ─────────────────────────────────────────────────────────────────
// SCROLL NAV BORDER
// ─────────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navOuter').classList.toggle('scrolled', window.scrollY > 10);
});
