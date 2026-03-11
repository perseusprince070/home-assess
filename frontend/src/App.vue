<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-inner">
        <router-link to="/" class="navbar-brand">
          <span class="brand-icon">🏠</span>
          <span class="brand-name">PURE <span class="brand-accent">Home River</span></span>
        </router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-bg: #f7f5f0;
  --color-surface: #ffffff;
  --color-border: #e8e3da;
  --color-text: #1a1714;
  --color-text-muted: #7a7268;
  --color-primary: #2b5c3e;
  --color-primary-hover: #1e4430;
  --color-primary-light: #e8f2ec;
  --color-danger: #c0392b;
  --color-danger-hover: #a93226;
  --color-danger-light: #fdf0ef;
  --color-success: #27ae60;
  --color-success-light: #edfaf3;
  --color-accent: #d4a853;
  --radius: 10px;
  --shadow: 0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
}

html, body { height: 100%; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  font-size: 15px;
}

/* Navbar */
.navbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem;
}
.brand-icon { font-size: 1.3rem; }
.brand-accent { color: var(--color-primary); }

/* Layout */
.main-content { max-width: 1100px; margin: 0 auto; padding: 2.5rem 2rem; }

.page {}
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
}
.page-title {
  font-family: 'DM Serif Display', serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.2;
}
.page-subtitle { color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.25rem; }
.back-link {
  display: inline-block;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  transition: color 0.15s;
}
.back-link:hover { color: var(--color-primary); }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, transform 0.1s;
}
.btn:active { transform: scale(0.98); }
.btn-primary { background: var(--color-primary); color: #fff; }
.btn-primary:hover { background: var(--color-primary-hover); }
.btn-secondary { background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); }
.btn-secondary:hover { background: var(--color-bg); }
.btn-danger { background: var(--color-danger); color: #fff; }
.btn-danger:hover { background: var(--color-danger-hover); }
.btn-sm { padding: 0.4rem 0.85rem; font-size: 0.825rem; }
.btn:disabled { opacity: 0.55; cursor: not-allowed; pointer-events: none; }
.btn-icon { font-size: 1.1rem; line-height: 1; }

/* Alerts */
.alert {
  padding: 0.85rem 1.1rem;
  border-radius: var(--radius);
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
}
.alert-error { background: var(--color-danger-light); color: var(--color-danger); border: 1px solid #f5b7b1; }
.alert-success { background: var(--color-success-light); color: var(--color-success); border: 1px solid #a9dfbf; }

/* Loading */
.loading-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; color: var(--color-text-muted); }
.spinner {
  width: 36px; height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Empty state */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: var(--color-surface);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}
.empty-icon { font-size: 3rem; margin-bottom: 1rem; }
.empty-state h3 { font-family: 'DM Serif Display', serif; font-size: 1.5rem; font-weight: 400; margin-bottom: 0.5rem; }
.empty-state p { color: var(--color-text-muted); margin-bottom: 1.5rem; }

/* Agent Grid */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}
.agent-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.15s, box-shadow 0.15s;
}
.agent-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }

.agent-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
}
.agent-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Serif Display', serif;
  font-size: 1.1rem;
  font-weight: 400;
  flex-shrink: 0;
}
.agent-name { font-weight: 600; font-size: 1rem; }
.agent-id { font-size: 0.75rem; color: var(--color-text-muted); font-family: monospace; }

.agent-card-body { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; }
.agent-detail { display: flex; flex-direction: column; gap: 0.1rem; }
.detail-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); font-weight: 500; }
.detail-value { font-size: 0.9rem; color: var(--color-text); }

.agent-card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}

/* Form */
.agent-form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 640px;
  box-shadow: var(--shadow);
}
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group-full { grid-column: 1 / -1; }
.form-group label { font-size: 0.875rem; font-weight: 500; color: var(--color-text); }
.required { color: var(--color-danger); }

.form-group input {
  padding: 0.65rem 0.875rem;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--color-text);
  background: var(--color-bg);
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}
.form-group input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-light); background: #fff; }
.form-group input.input-error { border-color: var(--color-danger); }
.field-error { font-size: 0.8rem; color: var(--color-danger); }

.form-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
  padding: 1rem;
}
.modal {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
}
.modal h3 { font-family: 'DM Serif Display', serif; font-size: 1.4rem; font-weight: 400; margin-bottom: 0.75rem; }
.modal p { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.6; }
.modal p strong { color: var(--color-text); }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; }
</style>
