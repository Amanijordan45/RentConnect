/* =============================================
   RentConnect — auth.js
   Login, Register, form validation
   ============================================= */

// ── Auth state helpers ────────────────────────
function getUser() {
  const u = localStorage.getItem('rc_user');
  return u ? JSON.parse(u) : null;
}
function setUser(user) {
  localStorage.setItem('rc_user', JSON.stringify(user));
}
function logout() {
  localStorage.removeItem('rc_user');
  showToast('Logged out successfully', 'info');
  setTimeout(() => window.location.href = 'index.html', 800);
}

// ── Login ─────────────────────────────────────
function initLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  // Show/hide password
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.textContent = isText ? '👁️' : '🙈';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);

    const email    = form.email.value.trim();
    const password = form.password.value;
    let valid = true;

    if (!isValidEmail(email)) {
      showFieldError('email-error', 'Please enter a valid email address');
      valid = false;
    }
    if (password.length < 6) {
      showFieldError('password-error', 'Password must be at least 6 characters');
      valid = false;
    }
    if (!valid) return;

    // Simulate login
    const submitBtn = form.querySelector('[type="submit"]');
    setLoading(submitBtn, true);

    setTimeout(() => {
      setLoading(submitBtn, false);
      // Accept any email/password for demo
      const user = {
        id: 'user_001',
        name: email.split('@')[0].replace(/\./g, ' '),
        email,
        role: localStorage.getItem('rc_reg_role') || 'renter',
        joinedAt: new Date().toISOString()
      };
      setUser(user);
      showToast(`Welcome back, ${user.name}! 👋`, 'success');
      setTimeout(() => {
        const redirect = new URLSearchParams(window.location.search).get('redirect') || 'dashboard.html';
        window.location.href = redirect;
      }, 900);
    }, 1200);
  });
}

// ── Register ──────────────────────────────────
function initRegister() {
  const form = document.getElementById('register-form');
  if (!form) return;

  // Account type tabs
  let selectedRole = 'renter';
  document.querySelectorAll('.account-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedRole = tab.dataset.role;
    });
  });

  // Password strength
  const pwdInput = form.querySelector('#reg-password');
  if (pwdInput) {
    pwdInput.addEventListener('input', () => {
      checkPasswordStrength(pwdInput.value);
    });
  }

  // Show/hide password
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.for);
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.textContent = isText ? '👁️' : '🙈';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);

    const firstName = form['first-name'].value.trim();
    const lastName  = form['last-name'].value.trim();
    const email     = form['reg-email'].value.trim();
    const phone     = form['reg-phone'].value.trim();
    const password  = form['reg-password'].value;
    const confirm   = form['reg-confirm'].value;
    let valid = true;

    if (!firstName) { showFieldError('first-name-error', 'First name is required'); valid = false; }
    if (!lastName)  { showFieldError('last-name-error', 'Last name is required'); valid = false; }
    if (!isValidEmail(email)) { showFieldError('reg-email-error', 'Enter a valid email'); valid = false; }
    if (!phone) { showFieldError('reg-phone-error', 'Phone number is required'); valid = false; }
    if (password.length < 8) { showFieldError('reg-password-error', 'Password must be at least 8 characters'); valid = false; }
    if (password !== confirm) { showFieldError('reg-confirm-error', 'Passwords do not match'); valid = false; }
    if (!form.terms.checked) { showFieldError('terms-error', 'You must accept the terms'); valid = false; }
    if (!valid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    setLoading(submitBtn, true);

    setTimeout(() => {
      setLoading(submitBtn, false);
      const user = {
        id: 'user_' + Date.now(),
        name: `${firstName} ${lastName}`,
        email,
        phone,
        role: selectedRole,
        joinedAt: new Date().toISOString()
      };
      setUser(user);
      localStorage.setItem('rc_reg_role', selectedRole);
      showToast(`Account created! Welcome, ${firstName}! 🎉`, 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    }, 1400);
  });
}

// ── Utilities ─────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  const input = el?.previousElementSibling?.querySelector('input');
  if (input) input.classList.add('error');
}
function clearErrors(form) {
  form.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}
function setLoading(btn, loading) {
  if (loading) {
    btn.dataset.orig = btn.innerHTML;
    btn.innerHTML = '<span class="loader" style="width:18px;height:18px;border-width:2px"></span> Please wait…';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.orig || btn.innerHTML;
    btn.disabled = false;
  }
}
function checkPasswordStrength(pwd) {
  const fill = document.getElementById('strength-fill');
  const text = document.getElementById('strength-text');
  if (!fill || !text) return;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  fill.className = 'strength-fill';
  if (score <= 1) { fill.classList.add('weak');   text.textContent = 'Weak password'; }
  else if (score <= 2) { fill.classList.add('medium'); text.textContent = 'Medium strength'; }
  else { fill.classList.add('strong'); text.textContent = 'Strong password ✓'; }
}

// ── Guard routes ──────────────────────────────
function requireAuth(redirect = 'login.html') {
  if (!getUser()) {
    window.location.href = `${redirect}?redirect=${encodeURIComponent(window.location.pathname.split('/').pop())}`;
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initRegister();
});
