// ═══════════════════════════════════════════════
// SEARCH ENGINE — بحث شامل في كل محتوى الموقع
// Searches: slides, vocab, quiz questions
// ═══════════════════════════════════════════════
const SearchEngine = {

  // ── Build full search index from DB ──────────
  _buildIndex() {
    const index = [];

    DB.chapters.forEach(ch => {

      // ── Slides / lessons ──
      ch.slides.forEach(slide => {
        const texts = [];
        (slide.body || []).forEach(block => {
          if (block.en)  texts.push(block.en);
          if (block.ar)  texts.push(block.ar);
          if (block.def_en) texts.push(block.def_en);
          if (block.def_ar) texts.push(block.def_ar);
          if (block.items) {
            block.items.forEach(item => {
              if (item.en) texts.push(item.en);
              if (item.ar) texts.push(item.ar);
            });
          }
          if (block.rows) {
            block.rows.forEach(row => {
              if (row.a_en) texts.push(row.a_en);
              if (row.a_ar) texts.push(row.a_ar);
              if (row.b_en) texts.push(row.b_en);
              if (row.b_ar) texts.push(row.b_ar);
            });
          }
        });

        index.push({
          type:     'slide',
          chId:     ch.id,
          chTitle:  ch.title,
          chIcon:   ch.icon,
          chAccent: ch.accent,
          slideId:  slide.id,
          title:    slide.heading,
          texts:    texts,
          fullText: (slide.heading + ' ' + texts.join(' ')).toLowerCase(),
          action:   () => {
            const idx = ch.slides.findIndex(s => s.id === slide.id);
            App.state.chapter   = ch;
            App.state.slideIdx  = idx >= 0 ? idx : 0;
            App.state.visitedSlides = new Set();
            Router.go('chapter-detail', ch.id);
          }
        });
      });

      // ── Vocabulary ──
      ch.vocab.forEach(v => {
        index.push({
          type:     'vocab',
          chId:     ch.id,
          chTitle:  ch.title,
          chIcon:   ch.icon,
          chAccent: ch.accent,
          title:    v.en,
          subtitle: v.ar,
          phonetic: v.ph,
          fullText: (v.en + ' ' + v.ar + ' ' + v.ph).toLowerCase(),
          action:   () => VocabUI.openChapter(ch.id)
        });
      });

      // ── Quiz questions ──
      ch.quiz.forEach(q => {
        index.push({
          type:     'quiz',
          chId:     ch.id,
          chTitle:  ch.title,
          chIcon:   ch.icon,
          chAccent: ch.accent,
          title:    q.q,
          answer:   q.o[q.c],
          explain:  q.ex,
          fullText: (q.q + ' ' + q.o.join(' ') + ' ' + q.ex).toLowerCase(),
          action:   () => QuizUI.start(ch.id)
        });
      });
    });

    this._index = index;
    return index;
  },

  _index: null,

  // ── Main search function ──────────────────────
  search(query) {
    if (!query || query.trim().length < 2) return [];
    if (!this._index) this._buildIndex();

    const q   = query.trim().toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length >= 2);

    const results = [];
    const seen = new Set();

    this._index.forEach(item => {
      // Score = how many words match
      let score = 0;
      words.forEach(word => {
        if (item.fullText.includes(word)) score++;
        if (item.title?.toLowerCase().includes(word)) score += 2; // title match = higher score
        if (item.subtitle?.toLowerCase().includes(word)) score += 1;
      });

      if (score === 0) return;

      // Deduplicate
      const key = `${item.type}-${item.chId}-${item.title}`;
      if (seen.has(key)) return;
      seen.add(key);

      results.push({ ...item, score });
    });

    // Sort by score desc, then by type priority
    const typePriority = { vocab: 3, slide: 2, quiz: 1 };
    return results
      .sort((a, b) => (b.score - a.score) || (typePriority[b.type] - typePriority[a.type]))
      .slice(0, 40); // max 40 results
  },

  // ── Highlight matching text ───────────────────
  highlight(text, query) {
    if (!text || !query) return Router.sanitize(text || '');
    const safe   = Router.sanitize(text);
    const words  = query.trim().split(/\s+/).filter(w => w.length >= 2);
    if (!words.length) return safe;

    let result = safe;
    words.forEach(word => {
      const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    });
    return result;
  }
};


// ═══════════════════════════════════════════════
// SEARCH UI
// ═══════════════════════════════════════════════
const SearchUI = {
  _query:    '',
  _debounce: null,

  render() {
    const cont = document.getElementById('search-content');
    if (!cont) return;

    cont.innerHTML = `
      <div class="srch-bar-wrap">
        <div class="srch-bar">
          <span class="srch-icon">🔍</span>
          <input
            class="srch-input"
            type="search"
            id="srch-input"
            placeholder="ابحث في كل شيء... (عربي أو إنجليزي)"
            autocomplete="off"
            autofocus
            oninput="SearchUI.onInput(this.value)"
          >
          <button class="srch-clear hidden" id="srch-clear" onclick="SearchUI.clear()">✕</button>
        </div>
        <div class="srch-filters" id="srch-filters" style="display:none">
          <button class="sf-btn active" data-filter="all"   onclick="SearchUI.setFilter('all',this)">الكل</button>
          <button class="sf-btn"        data-filter="vocab" onclick="SearchUI.setFilter('vocab',this)">📖 مصطلحات</button>
          <button class="sf-btn"        data-filter="slide" onclick="SearchUI.setFilter('slide',this)">📄 شرائح</button>
          <button class="sf-btn"        data-filter="quiz"  onclick="SearchUI.setFilter('quiz',this)">🎯 أسئلة</button>
        </div>
      </div>
      <div class="srch-results" id="srch-results">
        <div class="srch-empty">
          <div class="se-icon">🔍</div>
          <div class="se-title">ابحث عن أي شيء</div>
          <div class="se-sub">مصطلحات • شرائح • أسئلة • شروحات</div>
        </div>
      </div>
    `;

    this._filter = 'all';
    this._query  = '';
  },

  _filter: 'all',

  onInput(val) {
    this._query = val.trim();
    const clearBtn = document.getElementById('srch-clear');
    if (clearBtn) clearBtn.classList.toggle('hidden', !this._query);

    const filtersEl = document.getElementById('srch-filters');
    if (filtersEl) filtersEl.style.display = this._query ? 'flex' : 'none';

    // Debounce 250ms
    clearTimeout(this._debounce);
    this._debounce = setTimeout(() => this.runSearch(), 250);
  },

  setFilter(filter, btn) {
    this._filter = filter;
    document.querySelectorAll('.sf-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.runSearch();
  },

  clear() {
    const input = document.getElementById('srch-input');
    if (input) { input.value = ''; input.focus(); }
    this.onInput('');
  },

  runSearch() {
    const resultsEl = document.getElementById('srch-results');
    if (!resultsEl) return;

    if (!this._query || this._query.length < 2) {
      resultsEl.innerHTML = `
        <div class="srch-empty">
          <div class="se-icon">🔍</div>
          <div class="se-title">ابحث عن أي شيء</div>
          <div class="se-sub">مصطلحات • شرائح • أسئلة • شروحات</div>
        </div>`;
      return;
    }

    let results = SearchEngine.search(this._query);

    // Apply filter
    if (this._filter !== 'all') {
      results = results.filter(r => r.type === this._filter);
    }

    if (results.length === 0) {
      resultsEl.innerHTML = `
        <div class="srch-empty">
          <div class="se-icon">😔</div>
          <div class="se-title">لا نتائج لـ "${Router.sanitize(this._query)}"</div>
          <div class="se-sub">جرب كلمة أخرى أو بالعربي / الإنجليزي</div>
        </div>`;
      return;
    }

    // Group by chapter
    const grouped = {};
    results.forEach(r => {
      const key = r.chId;
      if (!grouped[key]) grouped[key] = { ch: { id: r.chId, title: r.chTitle, icon: r.chIcon, accent: r.chAccent }, items: [] };
      grouped[key].items.push(r);
    });

    let html = `<div class="srch-count">${results.length} نتيجة</div>`;

    Object.values(grouped).forEach(group => {
      html += `<div class="srch-group-hdr" style="--accent:${group.ch.accent}">${group.ch.icon} ${Router.sanitize(group.ch.title)}</div>`;
      html += `<div class="srch-group">`;
      group.items.forEach((item, idx) => {
        html += this._renderResult(item, idx);
      });
      html += `</div>`;
    });

    resultsEl.innerHTML = html;
  },

  _renderResult(item, idx) {
    const q = this._query;
    const typeLabel = { vocab: '📖 مصطلح', slide: '📄 شريحة', quiz: '🎯 سؤال' }[item.type];
    const typeCls   = { vocab: 'sr-vocab', slide: 'sr-slide', quiz: 'sr-quiz' }[item.type];

    let body = '';

    if (item.type === 'vocab') {
      body = `
        <div class="sr-en">${SearchEngine.highlight(item.title, q)}</div>
        <div class="sr-ph">/ ${Router.sanitize(item.phonetic)} /</div>
        <div class="sr-ar">${SearchEngine.highlight(item.subtitle, q)}</div>
        <button class="sr-speak" onclick="event.stopPropagation();App.speak('${item.title.replace(/'/g,"\\'")}','en-US')" title="استمع">🔊</button>
      `;
    } else if (item.type === 'slide') {
      body = `
        <div class="sr-heading">${SearchEngine.highlight(item.title, q)}</div>
        ${item.texts.slice(0, 3).map(t => {
          const lower = t.toLowerCase();
          const words = q.split(/\s+/);
          const relevant = words.some(w => w.length >= 2 && lower.includes(w));
          if (!relevant) return '';
          const snippet = this._snippet(t, q, 120);
          return snippet ? `<div class="sr-snippet">${SearchEngine.highlight(snippet, q)}</div>` : '';
        }).filter(Boolean).join('')}
      `;
    } else if (item.type === 'quiz') {
      body = `
        <div class="sr-q">${SearchEngine.highlight(item.title, q)}</div>
        <div class="sr-ans">✓ ${SearchEngine.highlight(item.answer, q)}</div>
      `;
    }

    return `
      <div class="srch-result ${typeCls}" onclick="SearchUI.openResult(${idx},this)">
        <div class="sr-type-badge">${typeLabel}</div>
        <div class="sr-body">${body}</div>
        <div class="sr-go">→</div>
      </div>
    `;
  },

  _snippet(text, query, maxLen) {
    const lower  = text.toLowerCase();
    const words  = query.toLowerCase().split(/\s+/).filter(w => w.length >= 2);
    let   pos    = -1;
    for (const w of words) { pos = lower.indexOf(w); if (pos >= 0) break; }
    if (pos < 0) return text.slice(0, maxLen);
    const start  = Math.max(0, pos - 40);
    const end    = Math.min(text.length, pos + maxLen - 40);
    return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  },

  openResult(idx, el) {
    // Find the result by position in DOM — re-run search to get action
    let results = SearchEngine.search(this._query);
    if (this._filter !== 'all') results = results.filter(r => r.type === this._filter);

    // Get all result elements to find which one was clicked
    const allResults = document.querySelectorAll('.srch-result');
    let globalIdx = 0;
    allResults.forEach((r, i) => { if (r === el) globalIdx = i; });

    const item = results[globalIdx];
    if (item && item.action) item.action();
  }
};
