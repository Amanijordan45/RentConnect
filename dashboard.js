/* =============================================
   RentConnect — dashboard.js
   Landlord dashboard: stats, table, add/edit property
   ============================================= */

let dashProps = [];
let editingId = null;

function initDashboard() {
  if (!requireAuth()) return;

  const user = getUser();
  // Populate user info
  document.querySelectorAll('.dash-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.dash-user-role').forEach(el => el.textContent = user.role === 'landlord' ? '🏠 Landlord' : '🔑 Renter');
  document.querySelectorAll('.dash-user-initial').forEach(el => el.textContent = user.name.charAt(0).toUpperCase());

  // Load saved properties for this "landlord" from localStorage
  const saved = localStorage.getItem('rc_dash_props');
  dashProps = saved ? JSON.parse(saved) : PROPERTIES.slice(0, 4).map(p => ({ ...p, ownerId: user.id }));
  saveDashProps();

  renderDashStats();
  renderPropsTable();
  initDashNav();
  initAddPropertyForm();
  initTableSearch();
  initLogout();
}

function saveDashProps() {
  localStorage.setItem('rc_dash_props', JSON.stringify(dashProps));
}

// ── Navigation tabs ───────────────────────────
function initDashNav() {
  document.querySelectorAll('.dash-nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.dash-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      const tab = document.getElementById(tabId);
      if (tab) { tab.classList.add('active'); tab.classList.add('slide-in-up'); }
      updateDashTitle(tabId);
    });
  });
}

function updateDashTitle(tabId) {
  const titles = {
    'tab-overview':    ['Overview', 'Your property performance at a glance'],
    'tab-properties':  ['My Properties', 'Manage and update your listings'],
    'tab-add':         ['Add Property', 'List a new rental property'],
    'tab-favorites':   ['Saved Properties', 'Properties you\'ve bookmarked'],
    'tab-settings':    ['Account Settings', 'Manage your profile and preferences']
  };
  const [title, sub] = titles[tabId] || ['Dashboard', ''];
  const titleEl = document.querySelector('.dash-title');
  const subEl   = document.querySelector('.dash-subtitle');
  if (titleEl) titleEl.textContent = title;
  if (subEl)   subEl.textContent = sub;
}

// ── Stats ─────────────────────────────────────
function renderDashStats() {
  const total     = dashProps.length;
  const available = dashProps.filter(p => p.available).length;
  const rented    = total - available;
  const revenue   = dashProps.filter(p => !p.available).reduce((s, p) => s + p.price, 0);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('stat-total',     total);
  set('stat-available', available);
  set('stat-rented',    rented);
  set('stat-revenue',   'UGX ' + revenue.toLocaleString());
}

// ── Properties Table ──────────────────────────
function renderPropsTable(filter = '') {
  const tbody = document.getElementById('props-tbody');
  if (!tbody) return;

  const filtered = filter
    ? dashProps.filter(p => p.title.toLowerCase().includes(filter) || p.location.toLowerCase().includes(filter))
    : dashProps;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">No properties found</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:12px">
          <img src="${p.images[0]}" alt="" class="table-prop-thumb">
          <div>
            <div class="table-prop-name">${p.title}</div>
            <div class="table-prop-loc">📍 ${p.location}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-indigo">${p.type}</span></td>
      <td style="font-weight:700;color:var(--indigo-mid)">UGX ${p.price.toLocaleString()}</td>
      <td>
        <span class="status-pill ${p.available ? 'available' : 'rented'}">
          ${p.available ? 'Available' : 'Rented'}
        </span>
      </td>
      <td style="font-size:0.8rem;color:var(--text-muted)">${new Date(p.dateAdded).toLocaleDateString('en-UG')}</td>
      <td>
        <div class="table-actions">
          <button class="action-btn edit" onclick="editProperty(${p.id})" title="Edit">✏️</button>
          <button class="action-btn" onclick="toggleAvailability(${p.id})" title="Toggle availability">
            ${p.available ? '🔒' : '🔓'}
          </button>
          <button class="action-btn delete" onclick="deleteProperty(${p.id})" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function initTableSearch() {
  const input = document.getElementById('table-search');
  if (input) {
    input.addEventListener('input', e => renderPropsTable(e.target.value.toLowerCase().trim()));
  }
}

// ── Toggle availability ───────────────────────
function toggleAvailability(id) {
  const idx = dashProps.findIndex(p => p.id === id);
  if (idx === -1) return;
  dashProps[idx].available = !dashProps[idx].available;
  saveDashProps();
  renderPropsTable();
  renderDashStats();
  showToast(dashProps[idx].available ? 'Property marked as available' : 'Property marked as rented', 'success');
}

// ── Delete ────────────────────────────────────
function deleteProperty(id) {
  if (!confirm('Are you sure you want to delete this property? This cannot be undone.')) return;
  dashProps = dashProps.filter(p => p.id !== id);
  saveDashProps();
  renderPropsTable();
  renderDashStats();
  showToast('Property deleted', 'info');
}

// ── Add / Edit Property ───────────────────────
function initAddPropertyForm() {
  const form = document.getElementById('add-prop-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const amenities = Array.from(form.querySelectorAll('[name="amenities"]:checked')).map(cb => cb.value);

    const prop = {
      id: editingId || Date.now(),
      title: data.get('title'),
      location: data.get('location'),
      city: data.get('city') || 'Kampala',
      price: parseInt(data.get('price')) || 0,
      currency: 'UGX',
      type: data.get('type'),
      bedrooms: parseInt(data.get('bedrooms')) || 0,
      bathrooms: parseInt(data.get('bathrooms')) || 1,
      area: parseInt(data.get('area')) || 0,
      description: data.get('description'),
      amenities,
      images: [
        data.get('image1') || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'
      ],
      landlord: { name: getUser().name, phone: getUser().phone || '+256 700 000 000', rating: 5.0, reviews: 0 },
      available: data.get('available') === 'true',
      featured: false,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    // Validate required
    if (!prop.title || !prop.location || !prop.price || !prop.type) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingId) {
      const idx = dashProps.findIndex(p => p.id === editingId);
      if (idx !== -1) dashProps[idx] = prop;
      showToast('Property updated successfully ✅', 'success');
      editingId = null;
    } else {
      dashProps.unshift(prop);
      showToast('Property listed successfully! 🎉', 'success');
    }

    saveDashProps();
    renderPropsTable();
    renderDashStats();
    form.reset();
    updateFormTitle(false);

    // Switch to properties tab
    document.querySelector('.dash-nav-item[data-tab="tab-properties"]')?.click();
  });

  document.getElementById('cancel-edit')?.addEventListener('click', () => {
    editingId = null;
    document.getElementById('add-prop-form')?.reset();
    updateFormTitle(false);
  });
}

function editProperty(id) {
  const prop = dashProps.find(p => p.id === id);
  if (!prop) return;
  editingId = id;

  // Switch to add tab
  document.querySelector('.dash-nav-item[data-tab="tab-add"]')?.click();
  updateFormTitle(true);

  const form = document.getElementById('add-prop-form');
  if (!form) return;

  form.title.value = prop.title;
  form.location.value = prop.location;
  form.city.value = prop.city || 'Kampala';
  form.price.value = prop.price;
  form.type.value = prop.type;
  form.bedrooms.value = prop.bedrooms;
  form.bathrooms.value = prop.bathrooms;
  form.area.value = prop.area;
  form.description.value = prop.description;
  form.available.value = prop.available ? 'true' : 'false';
  if (form.image1) form.image1.value = prop.images[0] || '';

  // Check amenities
  form.querySelectorAll('[name="amenities"]').forEach(cb => {
    cb.checked = prop.amenities.includes(cb.value);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateFormTitle(isEdit) {
  const title  = document.getElementById('add-form-title');
  const submit = document.getElementById('add-form-submit');
  const cancel = document.getElementById('cancel-edit');
  if (title)  title.textContent  = isEdit ? '✏️ Edit Property' : '➕ Add New Property';
  if (submit) submit.textContent = isEdit ? 'Update Property' : 'List Property';
  if (cancel) cancel.style.display = isEdit ? 'inline-flex' : 'none';
}

// ── Favorites tab ─────────────────────────────
function renderFavoritesTab() {
  const container = document.getElementById('favs-grid');
  if (!container) return;
  const favIds = getFavorites();
  const favProps = PROPERTIES.filter(p => favIds.includes(p.id));
  if (!favProps.length) {
    container.innerHTML = `<div class="no-results" style="grid-column:1/-1"><div class="no-results-icon">🤍</div><h3>No saved properties</h3><p>Browse properties and tap the heart to save them here</p><a href="properties.html" class="btn btn-primary" style="margin-top:16px">Browse Properties</a></div>`;
    return;
  }
  container.innerHTML = favProps.map(p => buildPropertyCard(p)).join('');
  setTimeout(() => container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 50);
}

// ── Settings ──────────────────────────────────
function initSettings() {
  const form = document.getElementById('settings-form');
  if (!form) return;

  const user = getUser();
  if (user) {
    form.querySelector('#s-name').value  = user.name  || '';
    form.querySelector('#s-email').value = user.email || '';
    form.querySelector('#s-phone').value = user.phone || '';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const updated = { ...getUser(), name: form['s-name'].value, email: form['s-email'].value, phone: form['s-phone'].value };
    setUser(updated);
    document.querySelectorAll('.dash-user-name').forEach(el => el.textContent = updated.name);
    showToast('Settings saved successfully ✅', 'success');
  });
}

// ── Logout ────────────────────────────────────
function initLogout() {
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', logout);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dash-main')) {
    initDashboard();
    initSettings();
    // Render favs when tab clicked
    document.querySelector('.dash-nav-item[data-tab="tab-favorites"]')?.addEventListener('click', renderFavoritesTab);
  }
});
