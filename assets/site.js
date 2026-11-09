// Datos en assets/projects.js (se carga antes)
const PROJECTS = window.PROJECTS;

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
