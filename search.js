/* =============================================
   RentConnect — search.js
   Hero search bar and quick search
   ============================================= */

function initHeroSearch() {
  const form = document.getElementById('hero-search-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const location = form.querySelector('#search-location')?.value.trim() || '';
    const type     = form.querySelector('#search-type')?.value || '';
    const price    = form.querySelector('#search-price')?.value || '';

    const params = new URLSearchParams();
    if (location) params.set('q', location);
    if (type)     params.set('type', type);
    if (price)    params.set('maxPrice', price);

    window.location.href = `properties.html?${params.toString()}`;
  });

  // Read URL params on properties page and pre-fill filters
  if (window.location.pathname.includes('properties')) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const type = params.get('type');
    const maxPrice = params.get('maxPrice');

    if (q)        { const el = document.getElementById('props-search'); if (el) el.value = q; }
    if (type)     { const el = document.querySelector(`[data-filter-type][value="${type}"]`); if (el) { el.checked = true; } }
    if (maxPrice) { const el = document.getElementById('price-max'); if (el) el.value = maxPrice; }
  }
}

// Search tabs (Rent / Buy / Commercial)
function initSearchTabs() {
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// Autocomplete suggestions (location)
const LOCATIONS = ['Kampala', 'Kololo', 'Nakasero', 'Muyenga', 'Ntinda', 'Bugolobi', 'Lubowa', 'Kisaasi', 'Munyonyo', 'Entebbe', 'Jinja', 'Gulu'];

function initLocationAutocomplete() {
  const input = document.getElementById('search-location');
  if (!input) return;

  const list = document.createElement('ul');
  list.className = 'autocomplete-list';
  list.style.cssText = `
    position:absolute; top:100%; left:0; right:0; background:var(--card-bg);
    border:1.5px solid var(--border); border-radius:var(--radius-md);
    box-shadow:var(--shadow-lg); z-index:200; display:none; margin-top:4px;
    list-style:none; padding:6px;
  `;
  input.parentElement.style.position = 'relative';
  input.parentElement.appendChild(list);

  input.addEventListener('input', () => {
    const val = input.value.toLowerCase().trim();
    if (!val) { list.style.display = 'none'; return; }

    const matches = LOCATIONS.filter(l => l.toLowerCase().includes(val));
    if (!matches.length) { list.style.display = 'none'; return; }

    list.innerHTML = matches.map(m => `
      <li style="padding:9px 12px;border-radius:8px;cursor:pointer;font-size:0.875rem;
        display:flex;align-items:center;gap:8px;transition:background 0.15s"
        onmouseover="this.style.background='var(--off-white)'"
        onmouseout="this.style.background=''"
        onclick="selectLocation('${m}')">
        📍 ${m}
      </li>
    `).join('');
    list.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!input.parentElement.contains(e.target)) list.style.display = 'none';
  });

  window.selectLocation = (loc) => {
    input.value = loc;
    list.style.display = 'none';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroSearch();
  initSearchTabs();
  initLocationAutocomplete();
});
