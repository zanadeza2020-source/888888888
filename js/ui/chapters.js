// ═══════════════════════════════════════
// CHAPTERS LIST & DETAIL
// ═══════════════════════════════════════
const ChaptersUI = {

  renderList() {
    const stats = Session.getStats();
    const cont = document.getElementById('chapters-list');
    if (!cont) return;

    cont.innerHTML = DB.chapters.map(ch => {
      const totalSlides = ch.slides.length;
      const doneSlides = Object.keys(stats?.slides?.[ch.id] || {}).length;
      const pct = totalSlides > 0 ? Math.round(doneSlides / totalSlides * 100) : 0;
      const locked = ch.slides.length === 0;

      return `
        <div class="chapter-card ${locked ? 'locked' : ''}"
             style="--accent:${ch.accent}"
             onclick="${!locked ? `ChaptersUI.openDetail(${ch.id})` : ''}">
          <div class="cc-left"><div class="cc-icon">${ch.icon}</div></div>
          <div class="cc-body">
            <div class="cc-num">الفصل ${ch.id}</div>
            <div class="cc-title">${Router.sanitize(ch.title)}</div>
            <div class="cc-en">${Router.sanitize(ch.titleEn)}</div>
            <div class="cc-meta">
              <span>📖 ${totalSlides} شريحة</span>
              <span>📝 ${ch.vocab.length} مصطلح</span>
              <span>🎯 ${ch.quiz.length} سؤال</span>
            </div>
            <div class="cc-progress">
              <div class="cc-prog-bar"><div style="width:${pct}%;background:${ch.accent}"></div></div>
              <span>${pct}%</span>
            </div>
          </div>
          <div class="cc-arrow">${locked ? '🔒' : '→'}</div>
        </div>
      `;
    }).join('');
  },

  openDetail(chId) {
    Router.go('chapter-detail', chId);
  },

  renderDetail(chId) {
    const ch = DB.chapters.find(c => c.id === chId);
    if (!ch || ch.slides.length === 0) return;

    App.state.chapter = ch;
    App.state.slideIdx = 0;

    // Header
    const hdr = document.getElementById('ch-detail-header');
    hdr.style.setProperty('--accent', ch.accent);
    hdr.innerHTML = `
      <button class="back-btn" onclick="Router.go('chapters')">← رجوع</button>
      <div class="ch-hdr-icon">${ch.icon}</div>
      <div class="ch-hdr-title">${Router.sanitize(ch.title)}</div>
      <div class="ch-hdr-en">${Router.sanitize(ch.titleEn)}</div>
      <div class="ch-hdr-actions">
        <button class="ch-action-btn" onclick="VocabUI.openChapter(${ch.id})">📖 المصطلحات</button>
        ${ch.quiz.length > 0
          ? `<button class="ch-action-btn quiz-btn" style="background:${ch.accent}" onclick="QuizUI.start(${ch.id})">🎯 الاختبار</button>`
          : ''}
      </div>
    `;

    SlideUI.render();
  }
};
