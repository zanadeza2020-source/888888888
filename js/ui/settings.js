// ═══════════════════════════════════════════
// SETTINGS UI — Theme, Font, Notifications
// ═══════════════════════════════════════════
const SettingsUI = {

  render() {
    const prefs = Session.get()?.prefs || {};
    const cont = document.getElementById('settings-content');
    if (!cont) return;

    cont.innerHTML = `
      <!-- Theme -->
      <div class="set-section">
        <div class="set-label">🎨 المظهر</div>
        <div class="set-theme-row">
          <button class="theme-btn ${prefs.theme !== 'light' ? 'active' : ''}"
                  onclick="SettingsUI.setTheme('dark')" style="--tc:#060d1c">
            <span class="tb-icon">🌙</span>
            <span>الوضع الداكن</span>
          </button>
          <button class="theme-btn ${prefs.theme === 'light' ? 'active' : ''}"
                  onclick="SettingsUI.setTheme('light')" style="--tc:#f0f4f8">
            <span class="tb-icon">☀️</span>
            <span>الوضع الفاتح</span>
          </button>
        </div>
      </div>

      <!-- Font Size -->
      <div class="set-section">
        <div class="set-label">🔤 حجم الخط</div>
        <div class="set-font-row">
          ${['sm','md','lg','xl'].map(size => `
            <button class="font-btn ${prefs.fontSize === size || (!prefs.fontSize && size === 'md') ? 'active' : ''}"
                    onclick="SettingsUI.setFontSize('${size}')">
              ${size === 'sm' ? 'صغير' : size === 'md' ? 'عادي' : size === 'lg' ? 'كبير' : 'أكبر'}
            </button>
          `).join('')}
        </div>
        <div class="set-preview" id="font-preview">
          نموذج للنص — Hand Washing
        </div>
      </div>

      <!-- Notifications -->
      <div class="set-section">
        <div class="set-label">🔔 تذكير المذاكرة اليومية</div>
        <div class="set-notif-row">
          <span class="set-notif-label">وقت التذكير اليومي</span>
          <input type="time" class="time-input" value="${prefs.notifTime || '20:00'}"
                 onchange="SettingsUI.setNotifTime(this.value)">
        </div>
        <button class="set-notif-btn" onclick="SettingsUI.requestNotif()">
          🔔 تفعيل الإشعارات
        </button>
        <div id="notif-status" class="notif-status"></div>
      </div>

      <!-- Reset -->
      <div class="set-section">
        <div class="set-label">⚠️ إعادة ضبط</div>
        <button class="reset-btn" onclick="SettingsUI.confirmReset()">
          🗑️ حذف جميع البيانات وإعادة البداية
        </button>
      </div>
    `;

    // Apply current settings
    this._applyTheme(prefs.theme || 'dark');
    this._applyFont(prefs.fontSize || 'md');
    this._checkNotifStatus();
  },

  setTheme(theme) {
    Session.setPref('theme', theme);
    this._applyTheme(theme);
    this.render();
  },

  _applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  },

  setFontSize(size) {
    Session.setPref('fontSize', size);
    this._applyFont(size);
    this.render();
  },

  _applyFont(size) {
    const map = { sm: '13px', md: '15px', lg: '17px', xl: '19px' };
    document.documentElement.style.setProperty('--base-font', map[size] || '15px');
    document.body.style.fontSize = map[size] || '15px';
  },

  setNotifTime(time) {
    Session.setPref('notifTime', time);
    this._scheduleNotif(time);
    App.toast('✅ تم حفظ وقت التذكير', 'success');
  },

  async requestNotif() {
    if (!('Notification' in window)) {
      document.getElementById('notif-status').textContent = '❌ المتصفح لا يدعم الإشعارات';
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      const time = Session.getPref('notifTime') || '20:00';
      this._scheduleNotif(time);
      document.getElementById('notif-status').textContent = '✅ تم تفعيل الإشعارات';
      App.toast('✅ الإشعارات مفعّلة!', 'success');
    } else {
      document.getElementById('notif-status').textContent = '❌ تم رفض الإذن';
    }
  },

  _checkNotifStatus() {
    const el = document.getElementById('notif-status');
    if (!el) return;
    if (!('Notification' in window)) { el.textContent = '❌ المتصفح لا يدعم الإشعارات'; return; }
    const perm = Notification.permission;
    el.textContent = perm === 'granted' ? '✅ الإشعارات مفعّلة'
                   : perm === 'denied'  ? '❌ تم رفض الإذن — غيّر الإعداد من المتصفح'
                   : '';
  },

  _scheduleNotif(time) {
    if (Notification.permission !== 'granted') return;
    const [h, m] = time.split(':').map(Number);
    const now  = new Date();
    const next = new Date(now);
    next.setHours(h, m, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const diff = next - now;
    setTimeout(() => {
      new Notification('🏥 تمريض عملي 1', {
        body: 'حان وقت المذاكرة! راجع بطاقاتك اليوم 💪',
        icon: '/icons/icon-192.png'
      });
      // Re-schedule for next day
      this._scheduleNotif(time);
    }, diff);
  },

  confirmReset() {
    App.openModal(`
      <div class="modal-inner">
        <h2>⚠️ تحذير</h2>
        <p style="text-align:center;color:var(--t2);margin-bottom:20px">
          سيتم حذف جميع بياناتك بما فيها التقدم والإنجازات والجلسة الحالية.<br>
          هل أنت متأكد؟
        </p>
        <div style="display:flex;gap:10px">
          <button class="btn-outline" onclick="App.closeModal()">إلغاء</button>
          <button class="btn-primary" style="background:#ef4444" onclick="SettingsUI.resetAll()">نعم، احذف كل شيء</button>
        </div>
      </div>
    `);
  },

  resetAll() {
    localStorage.clear();
    App.closeModal();
    App.toast('✅ تم إعادة ضبط التطبيق', 'success');
    setTimeout(() => location.reload(), 1000);
  },

  // Apply saved settings on app load
  applyOnLoad() {
    const prefs = Session.get()?.prefs || {};
    this._applyTheme(prefs.theme || 'dark');
    this._applyFont(prefs.fontSize || 'md');
  }
};
