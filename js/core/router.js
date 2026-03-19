// ═══════════════════════════════════════════
// ROUTER v2 — Hash-based URL navigation
// Supports: back button, deep links, history
// ═══════════════════════════════════════════
const Router = {
  _views:   {},
  _history: [],
  current:  null,

  // Register a view handler
  register(id, fn) { this._views[id] = fn; },

  // Navigate to a view — updates URL hash
  go(viewId, data = null, opts = {}) {
    const prev = this.current;

    // Build hash
    const hashData = data !== null ? `/${data}` : '';
    const newHash  = `#${viewId}${hashData}`;

    if (!opts.replace && prev) {
      this._history.push({ id: prev, hash: location.hash });
    }

    // Update URL without page reload
    if (opts.replace) {
      history.replaceState({ viewId, data }, '', newHash);
    } else {
      history.pushState({ viewId, data }, '', newHash);
    }

    this._activate(viewId, data);
  },

  // Go back
  back() {
    if (this._history.length > 0) {
      history.back(); // triggers popstate → _handlePop
    } else {
      this.go('home');
    }
  },

  // Activate a view (called by go() and popstate)
  _activate(viewId, data) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const el = document.getElementById(`view-${viewId}`);
    if (!el) { this.go('home', null, { replace: true }); return; }

    el.classList.add('active');
    this.current = viewId;

    // Update bottom nav active state
    document.querySelectorAll('[data-nav]').forEach(b =>
      b.classList.toggle('active', b.dataset.nav === viewId)
    );

    // Show/hide back button in header
    const backBtn = document.getElementById('header-back');
    if (backBtn) backBtn.style.display = this._history.length > 0 ? 'flex' : 'none';

    // Run handler
    if (this._views[viewId]) this._views[viewId](data);

    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  // Handle browser back/forward
  _handlePop(e) {
    if (e.state?.viewId) {
      // Remove last history entry since browser handled it
      Router._history.pop();
      Router._activate(e.state.viewId, e.state.data);
    } else {
      // Parse hash
      Router._parseHash();
    }
  },

  // Parse current URL hash on load
  _parseHash() {
    const hash = location.hash.slice(1); // remove #
    if (!hash) { this.go('home', null, { replace: true }); return; }

    const [viewId, ...rest] = hash.split('/');
    const data = rest.length > 0 ? (isNaN(rest[0]) ? rest[0] : Number(rest[0])) : null;
    this._activate(viewId, data);
  },

  // Init — parse URL on load, listen to popstate
  init() {
    window.addEventListener('popstate', e => this._handlePop(e));
    this._parseHash();
  },

  // HTML sanitizer
  sanitize(str) {
    if (str === null || str === undefined) return '';
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }
};
