// ═══════════════════════════════════════════
// FLASHCARDS — Spaced Repetition System UI
// ═══════════════════════════════════════════
const FlashcardsUI = {
  _deck:    [],
  _idx:     0,
  _flipped: false,
  _session: { total: 0, done: 0, correct: 0 },

  // Build full vocab list with keys
  _buildVocabList(chapterId = null) {
    const list = [];
    DB.chapters.forEach(ch => {
      if (chapterId && ch.id !== chapterId) return;
      ch.vocab.forEach(v => {
        list.push({ ...v, key: `${ch.id}_${v.en}`, chId: ch.id, chTitle: ch.title, chAccent: ch.accent });
      });
    });
    return list;
  },

  // Start a session
  start(mode = 'due', chapterId = null) {
    const allVocab = this._buildVocabList(chapterId);
    let deck = [];

    if (mode === 'due') {
      deck = Session.getDueCards(allVocab);
      if (deck.length === 0) {
        // Nothing due — show new cards or all
        deck = Session.getNewCards(allVocab);
        if (deck.length === 0) deck = allVocab; // all reviewed, show all
      }
    } else if (mode === 'new') {
      deck = Session.getNewCards(allVocab);
    } else if (mode === 'all') {
      deck = [...allVocab];
    } else if (mode === 'weak') {
      // Cards marked as "review" (not known)
      const s = Session.get();
      deck = allVocab.filter(v => {
        const saved = s?.progress?.vocab?.[v.key];
        return saved && !saved.known;
      });
      if (deck.length === 0) deck = allVocab;
    }

    // Shuffle
    deck = deck.sort(() => Math.random() - 0.5);
    // Limit to 20 cards per session
    deck = deck.slice(0, 20);

    if (deck.length === 0) {
      App.toast('لا توجد بطاقات للمراجعة 🎉', 'success');
      return;
    }

    this._deck    = deck;
    this._idx     = 0;
    this._flipped = false;
    this._session = { total: deck.length, done: 0, correct: 0 };

    Router.go('flashcards');
    this.renderCard();
  },

  renderCard() {
    const cont = document.getElementById('fc-content');
    if (!cont) return;

    if (this._idx >= this._deck.length) {
      this.renderDone();
      return;
    }

    const card    = this._deck[this._idx];
    const total   = this._deck.length;
    const current = this._idx + 1;
    const pct     = (current / total) * 100;
    const srsData = Session.getSRSCard(card.key);

    // Due/New label
    const isNew = srsData.reps === 0;
    const dueLabel = isNew
      ? `<span class="fc-tag new">جديدة</span>`
      : `<span class="fc-tag due">للمراجعة</span>`;

    cont.innerHTML = `
      <div class="fc-header">
        <div class="fc-prog-bar"><div style="width:${pct}%;background:${card.chAccent}"></div></div>
        <div class="fc-meta">
          <span class="fc-counter">${current} / ${total}</span>
          <span class="fc-chapter" style="color:${card.chAccent}">${card.chTitle}</span>
          ${dueLabel}
        </div>
        <div class="fc-session-stats">
          <span class="fc-ss correct">✓ ${this._session.correct}</span>
          <span class="fc-ss wrong">✗ ${this._session.done - this._session.correct}</span>
          <span class="fc-ss remaining">⏳ ${total - this._idx}</span>
        </div>
      </div>

      <div class="fc-card ${this._flipped ? 'flipped' : ''}" id="fc-card" onclick="FlashcardsUI.flip()">
        <div class="fc-front">
          <div class="fc-hint">اضغط للكشف عن الترجمة</div>
          <div class="fc-word-en">${Router.sanitize(card.en)}</div>
          <div class="fc-phonetic">/ ${Router.sanitize(card.ph)} /</div>
          <button class="fc-speak" onclick="event.stopPropagation();App.speak('${card.en.replace(/'/g,"\\'")}','en-US')">🔊 استمع</button>
        </div>
        <div class="fc-back">
          <div class="fc-word-en-small">${Router.sanitize(card.en)}</div>
          <div class="fc-word-ar">${Router.sanitize(card.ar)}</div>
          <div class="fc-phonetic">/ ${Router.sanitize(card.ph)} /</div>
        </div>
      </div>

      ${this._flipped ? `
        <div class="fc-rating">
          <div class="fc-rating-label">كيف كانت معرفتك؟</div>
          <div class="fc-rating-btns">
            <button class="fc-r-btn fc-r-wrong"  onclick="FlashcardsUI.rate(0)">❌<span>لم أعرف</span></button>
            <button class="fc-r-btn fc-r-hard"   onclick="FlashcardsUI.rate(1)">😓<span>صعبة</span></button>
            <button class="fc-r-btn fc-r-ok"     onclick="FlashcardsUI.rate(2)">👍<span>أعرفها</span></button>
            <button class="fc-r-btn fc-r-easy"   onclick="FlashcardsUI.rate(3)">⭐<span>سهلة</span></button>
          </div>
        </div>
      ` : `
        <div class="fc-tap-hint">👆 اضغط على البطاقة للكشف</div>
      `}

      <button class="fc-skip" onclick="FlashcardsUI.skip()">تخطي →</button>
    `;
  },

  flip() {
    this._flipped = !this._flipped;
    const card = document.getElementById('fc-card');
    if (card) card.classList.toggle('flipped', this._flipped);

    // Re-render to show rating buttons
    if (this._flipped) this.renderCard();
  },

  rate(quality) {
    // quality: 0=wrong, 1=hard, 2=ok, 3=easy
    const card = this._deck[this._idx];
    Session.reviewSRS(card.key, quality);
    Session.markVocab(card.key, quality >= 1);

    this._session.done++;
    if (quality >= 2) this._session.correct++;

    this._idx++;
    this._flipped = false;
    this.renderCard();
  },

  skip() {
    this._idx++;
    this._flipped = false;
    this.renderCard();
  },

  renderDone() {
    const cont = document.getElementById('fc-content');
    const { total, done, correct } = this._session;
    const pct = done > 0 ? Math.round(correct / done * 100) : 0;

    cont.innerHTML = `
      <div class="fc-done">
        <div class="fc-done-icon">🎉</div>
        <h2>انتهت الجلسة!</h2>
        <div class="fc-done-stats">
          <div class="fds"><div class="fds-n">${total}</div><div class="fds-l">بطاقة راجعتها</div></div>
          <div class="fds"><div class="fds-n">${correct}</div><div class="fds-l">عرفتها ✓</div></div>
          <div class="fds"><div class="fds-n">${pct}%</div><div class="fds-l">نسبة الحفظ</div></div>
        </div>
        <div class="fc-done-msg">
          ${pct >= 80
            ? '🌟 ممتاز! استمر في المراجعة لتثبيت الحفظ'
            : pct >= 50
            ? '💪 جيد! راجع البطاقات الصعبة مرة أخرى'
            : '📚 لا تستسلم! كل مراجعة تقوي الذاكرة'}
        </div>
        <div class="fc-done-next">
          <p class="fc-next-label">موعد المراجعة القادمة محسوب تلقائياً بناءً على أدائك</p>
        </div>
        <div class="fc-done-actions">
          <button class="btn-outline" onclick="FlashcardsUI.start('due')">🔄 جلسة جديدة</button>
          <button class="btn-primary" onclick="Router.go('home')">🏠 الرئيسية</button>
        </div>
      </div>
    `;
  },

  // Show mode selection screen
  renderModeSelect(chapterId = null) {
    const cont = document.getElementById('fc-content');
    if (!cont) return;

    const allVocab = this._buildVocabList(chapterId);
    const due  = Session.getDueCards(allVocab).length;
    const newC = Session.getNewCards(allVocab).length;

    const s    = Session.get();
    const weak = allVocab.filter(v => {
      const saved = s?.progress?.vocab?.[v.key];
      return saved && !saved.known;
    }).length;

    cont.innerHTML = `
      <div class="fc-mode-wrap">
        <div class="fc-mode-header">
          <div class="fc-mode-icon">🧠</div>
          <h2>بطاقات التكرار المتباعد</h2>
          <p>النظام يختار البطاقات التي تحتاج مراجعة بناءً على أدائك السابق</p>
        </div>

        <div class="fc-modes">
          <button class="fc-mode-btn" onclick="FlashcardsUI.start('due',${chapterId || 'null'})">
            <span class="fcm-icon">📅</span>
            <div class="fcm-body">
              <div class="fcm-title">مراجعة اليوم</div>
              <div class="fcm-desc">البطاقات المستحقة للمراجعة الآن</div>
              <div class="fcm-count">${due} بطاقة</div>
            </div>
          </button>
          <button class="fc-mode-btn" onclick="FlashcardsUI.start('new',${chapterId || 'null'})">
            <span class="fcm-icon">✨</span>
            <div class="fcm-body">
              <div class="fcm-title">بطاقات جديدة</div>
              <div class="fcm-desc">مصطلحات لم تراجعها بعد</div>
              <div class="fcm-count">${newC} بطاقة</div>
            </div>
          </button>
          <button class="fc-mode-btn" onclick="FlashcardsUI.start('weak',${chapterId || 'null'})">
            <span class="fcm-icon">💪</span>
            <div class="fcm-body">
              <div class="fcm-title">نقاط الضعف</div>
              <div class="fcm-desc">المصطلحات التي علّمتها "أراجعها"</div>
              <div class="fcm-count">${weak} بطاقة</div>
            </div>
          </button>
          <button class="fc-mode-btn" onclick="FlashcardsUI.start('all',${chapterId || 'null'})">
            <span class="fcm-icon">📚</span>
            <div class="fcm-body">
              <div class="fcm-title">كل البطاقات</div>
              <div class="fcm-desc">مراجعة شاملة لجميع المصطلحات</div>
              <div class="fcm-count">${allVocab.length} بطاقة</div>
            </div>
          </button>
        </div>
      </div>
    `;
  }
};
