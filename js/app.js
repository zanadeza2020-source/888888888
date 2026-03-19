// ═══════════════════════════════════════════
// APP v4.1 — with Search + Analytics Consent
// ═══════════════════════════════════════════
const App = {
  state: {
    chapter: null, slideIdx: 0,
    visitedSlides: new Set(),
    quiz: null, vocabChapter: null
  },

  init() {
    Session.init();
    SettingsUI.applyOnLoad();
    this._setupPWA();
    this._setupSpeech();
    this._registerRoutes();
    this._setupSwipe();
    this._updateHeaderSessionId();
    Router.init();

    // Show welcome on first visit
    if (!localStorage.getItem('nv3_welcomed')) {
      localStorage.setItem('nv3_welcomed', '1');
      setTimeout(() => this._showWelcome(), 800);
    }

    // Show consent after short delay (only if not decided)
    if (!localStorage.getItem('nursing_consent_decided')) {
      setTimeout(() => ConsentManager.show(), 3000);
    }
  },

  _updateHeaderSessionId() {
    const s = Session.get();
    const el = document.getElementById('top-session-id');
    if (el && s) el.textContent = s.id;
    const el2 = document.getElementById('home-session-id');
    if (el2 && s) el2.textContent = s.id;
  },

  _setupPWA() {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this._deferredPrompt = e;
      document.getElementById('install-bar').classList.add('show');
      document.getElementById('fab-install').style.display = 'flex';
    });

    window.addEventListener('appinstalled', () => {
      this.toast('✅ تم تثبيت التطبيق!', 'success');
      document.getElementById('install-bar').classList.remove('show');
      // Notify Telegram on PWA install
      if (localStorage.getItem('nursing_consent') === 'yes') {
        TelegramAnalytics.sendPWAInstall();
      }
    });

    setTimeout(() => {
      if (!window.matchMedia('(display-mode: standalone)').matches)
        document.getElementById('fab-install').style.display = 'flex';
    }, 5000);
  },

  async promptInstall() {
    if (this._deferredPrompt) {
      this._deferredPrompt.prompt();
      const r = await this._deferredPrompt.userChoice;
      if (r.outcome === 'accepted') this._deferredPrompt = null;
    } else { this._showIOSInstall(); }
  },

  _showIOSInstall() {
    this.openModal(`
      <div class="modal-inner">
        <h2>📱 تثبيت التطبيق</h2>
        <div class="ios-steps">
          <div class="ios-step"><span class="ios-num">1</span><div>اضغط زر <strong>المشاركة ⬆️</strong></div></div>
          <div class="ios-step"><span class="ios-num">2</span><div>اختر <strong>إضافة إلى الشاشة الرئيسية 📎</strong></div></div>
          <div class="ios-step"><span class="ios-num">3</span><div>اضغط <strong>إضافة ✅</strong></div></div>
        </div>
        <button class="btn-primary" onclick="App.closeModal()">فهمت!</button>
      </div>`);
  },

  _setupSpeech() {
    this._synth = window.speechSynthesis;
    this._voices = [];
    this._speaking = false; this._lastSpoken = '';
    const load = () => { this._voices = this._synth?.getVoices() || []; };
    load(); this._synth?.addEventListener('voiceschanged', load);
  },

  speak(text, lang = 'en-US') {
    if (!this._synth || !text) return;
    if (this._speaking && this._lastSpoken === text) {
      this._synth.cancel(); this._speaking = false; return;
    }
    this._synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = 0.82; u.pitch = 1; u.volume = 1;
    const v = this._voices.find(x => x.lang.startsWith(lang.split('-')[0]));
    if (v) u.voice = v;
    u.onstart = () => { this._speaking = true; this._lastSpoken = text; };
    u.onend = u.onerror = () => { this._speaking = false; };
    this._synth.speak(u);
  },

  _setupSwipe() {
    let sx = 0;
    document.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - sx;
      if (Math.abs(diff) > 55 && Router.current === 'chapter-detail') SlideUI.go(diff > 0 ? -1 : 1);
    }, { passive: true });
  },

  _registerRoutes() {
    Router.register('home',           ()  => HomeUI.render());
    Router.register('chapters',       ()  => ChaptersUI.renderList());
    Router.register('chapter-detail', id  => ChaptersUI.renderDetail(Number(id)));
    Router.register('vocab-chapter',  id  => VocabUI.renderChapter(Number(id)));
    Router.register('vocab',          ()  => VocabUI.renderAll());
    Router.register('search',         ()  => SearchUI.render());
    Router.register('flashcards',     id  => {
      if (id) FlashcardsUI.start('due', Number(id));
      else    FlashcardsUI.renderModeSelect();
    });
    Router.register('quiz-select',    ()  => QuizUI._renderModeSelect());
    Router.register('quiz',           ()  => { if (App.state.quiz) QuizUI.renderQuestion(); });
    Router.register('progress',       ()  => ProgressUI.render());
    Router.register('settings',       ()  => SettingsUI.render());
    Router.register('more',           ()  => MoreUI.render());
  },

  openModal(html) {
    const m = document.getElementById('modal');
    m.querySelector('.modal-wrap').innerHTML = html;
    m.style.display = 'flex';
  },

  closeModal() { document.getElementById('modal').style.display = 'none'; },

  _showWelcome() {
    const s = Session.get();
    this.openModal(`
      <div class="modal-inner welcome-modal">
        <div class="wm-icon">🏥</div>
        <h2>أساسيات التمريض العملي 1</h2>
        <p>منصتك التعليمية الشاملة لطلاب التمريض</p>
        <div class="wm-feats">
          <div class="wm-f">📖 4 فصول شاملة</div>
          <div class="wm-f">🧠 بطاقات ذكية SRS</div>
          <div class="wm-f">🔍 بحث شامل</div>
          <div class="wm-f">📱 يعمل offline</div>
        </div>
        <div class="wm-sid-wrap">
          <div class="wm-sid-l">معرّف جلستك الفريد</div>
          <div class="wm-sid">${Router.sanitize(s?.id || '')}</div>
        </div>
        <button class="btn-primary" onclick="App.closeModal()">ابدأ التعلم 🚀</button>
      </div>`);
  },

  toast(msg, type = 'info') {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 2800);
  }
};

// ═══════════════════════════════════════════
// CONSENT MANAGER
// ═══════════════════════════════════════════
const ConsentManager = {
  show() {
    const el = document.getElementById('consent-modal');
    if (!el) return;
    el.style.display = 'flex';
    // Animate in
    requestAnimationFrame(() => {
      el.querySelector('.consent-sheet').style.transform = 'translateY(0)';
    });
  },

  hide() {
    const el = document.getElementById('consent-modal');
    if (!el) return;
    const sheet = el.querySelector('.consent-sheet');
    sheet.style.transform = 'translateY(100%)';
    setTimeout(() => { el.style.display = 'none'; }, 350);
  },

  accept() {
    localStorage.setItem('nursing_consent', 'yes');
    localStorage.setItem('nursing_consent_decided', '1');
    this.hide();
    App.toast('✅ شكراً! هذا يساعدنا على تحسين التطبيق', 'success');
    // Fire analytics
    TelegramAnalytics.init();
  },

  decline() {
    localStorage.setItem('nursing_consent', 'no');
    localStorage.setItem('nursing_consent_decided', '1');
    this.hide();
  }
};

// ═══════════════════════════════════════════
// MORE MENU
// ═══════════════════════════════════════════
const MoreUI = {
  render() {
    const cont = document.getElementById('more-content');
    if (!cont) return;
    cont.innerHTML = `
      <div class="more-list">
        <button class="more-item" onclick="Router.go('chapters')"><span class="mi-icon">📚</span><span>الفصول الدراسية</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="Router.go('search')"><span class="mi-icon">🔍</span><span>البحث الشامل</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="Router.go('flashcards')"><span class="mi-icon">🧠</span><span>بطاقات التكرار المتباعد</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="Router.go('quiz-select')"><span class="mi-icon">🎯</span><span>الاختبارات</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="Router.go('vocab')"><span class="mi-icon">📖</span><span>جميع المصطلحات</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="Router.go('progress')"><span class="mi-icon">📊</span><span>تقدمي وإنجازاتي</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="Router.go('settings')"><span class="mi-icon">⚙️</span><span>الإعدادات</span><span class="mi-arr">→</span></button>
        <div class="more-sep">مجموعات الواتساب 💬</div>
        <a class="more-item wa-item" href="https://chat.whatsapp.com/GF0lqOtmMaEFxybTDdN5YF?mode=hq2tcla" target="_blank" rel="noopener"><span class="mi-icon">👨‍🎓</span><span>مجموعة الطلاب</span><span class="mi-arr wa-arr">↗</span></a>
        <a class="more-item wa-item" href="https://chat.whatsapp.com/HtJwGUlGX0E3QeGcnRlfjO?mode=gi_t" target="_blank" rel="noopener"><span class="mi-icon">👩‍🎓</span><span>مجموعة الطالبات</span><span class="mi-arr wa-arr">↗</span></a>
        <div class="more-sep">التطبيق</div>
        <button class="more-item" onclick="App.promptInstall()"><span class="mi-icon">📲</span><span>تثبيت التطبيق</span><span class="mi-arr">→</span></button>
        <button class="more-item" onclick="ProgressUI.exportData()"><span class="mi-icon">📤</span><span>تصدير بياناتي</span><span class="mi-arr">→</span></button>
      </div>`;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
