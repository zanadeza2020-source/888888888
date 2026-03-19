// ═══════════════════════════════════════
// SLIDE RENDERER
// ═══════════════════════════════════════
const SlideUI = {

  render() {
    const { chapter: ch, slideIdx: idx } = App.state;
    if (!ch) return;

    const slide = ch.slides[idx];
    if (!slide) return;

    const total = ch.slides.length;
    const pct   = ((idx + 1) / total) * 100;

    // mark visited
    Session.markSlide(ch.id, slide.id);

    const cont = document.getElementById('ch-detail-content');
    if (!cont) return;

    cont.innerHTML = `
      <div class="slide-prog-bar"><div style="width:${pct}%;background:${ch.accent}"></div></div>
      <div class="slide-counter">${idx + 1} / ${total}</div>

      <div class="slide-card" style="--accent:${ch.accent}">
        <h2 class="slide-heading">${Router.sanitize(slide.heading)}</h2>
        <div class="slide-body">${this.renderBody(slide.body, ch.accent)}</div>
      </div>

      <div class="slide-nav">
        ${idx > 0
          ? `<button class="snav-btn prev" onclick="SlideUI.go(-1)">← السابق</button>`
          : `<div></div>`}
        <div class="slide-dots">
          ${ch.slides.map((_, i) => `
            <div class="sdot ${i === idx ? 'active' : ''} ${App.state.visitedSlides.has(i) ? 'visited' : ''}"></div>
          `).join('')}
        </div>
        ${idx < total - 1
          ? `<button class="snav-btn next" style="background:${ch.accent}" onclick="SlideUI.go(1)">التالي →</button>`
          : `<button class="snav-btn next" style="background:${ch.accent}" onclick="QuizUI.start(${ch.id})">اختبار 🎯</button>`}
      </div>
    `;

    App.state.visitedSlides.add(idx);
  },

  go(dir) {
    const { chapter, slideIdx } = App.state;
    const next = slideIdx + dir;
    if (next >= 0 && next < chapter.slides.length) {
      App.state.slideIdx = next;
      this.render();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  },

  renderBody(bodyArr, accent) {
    if (!bodyArr?.length) return '';
    return bodyArr.map(b => this.renderBlock(b, accent)).join('');
  },

  renderBlock(b, accent) {
    const s = Router.sanitize.bind(Router);

    switch (b.type) {

      case 'term':
        return `
          <div class="term-block">
            <div class="term-top-row">
              <span class="term-en">${s(b.en)}</span>
              <button class="speak-btn" onclick="App.speak('${b.en.replace(/'/g,"\\'").replace(/"/g,'&quot;')}','en-US')" title="استمع للنطق">🔊</button>
            </div>
            ${b.phonetic ? `<div class="term-ph">/ ${s(b.phonetic)} /</div>` : ''}
            <div class="term-ar">${s(b.ar)}</div>
            ${b.def_en ? `<div class="term-def"><em class="def-tag">EN</em> ${s(b.def_en)}</div>` : ''}
            ${b.def_ar ? `<div class="term-def"><em class="def-tag">AR</em> ${s(b.def_ar)}</div>` : ''}
          </div>`;

      case 'bilingual':
        return `
          <div class="bil-block">
            <div class="bil-en" dir="ltr">${s(b.en)}</div>
            <div class="bil-ar">${s(b.ar)}</div>
          </div>`;

      case 'highlight':
        return `
          <div class="hl-block" style="border-color:${accent}40">
            <div class="hl-en" dir="ltr">${s(b.en)}</div>
            <div class="hl-ar">${s(b.ar)}</div>
          </div>`;

      case 'numbered-bilingual':
      case 'lettered-bilingual': {
        const isLettered = b.type === 'lettered-bilingual';
        const ENG = ['A','B','C','D','E','F','G','H','I','J'];
        return `
          <div class="list-block">
            ${b.items.map((item, i) => `
              <div class="list-item">
                <span class="list-badge" style="border-color:${accent}40;color:${accent}">
                  ${isLettered ? ENG[i] : (b.start || 1) + i}
                </span>
                <div class="list-body">
                  <div class="list-en" dir="ltr">${s(item.en)}</div>
                  <div class="list-ar">${s(item.ar)}</div>
                </div>
              </div>
            `).join('')}
          </div>`;
      }

      case 'checkmarks':
        return `
          <div class="list-block">
            ${b.items.map(item => `
              <div class="list-item">
                <span class="list-check" style="color:${accent}">✓</span>
                <div class="list-body">
                  <div class="list-en" dir="ltr">${s(item.en)}</div>
                  <div class="list-ar">${s(item.ar)}</div>
                </div>
              </div>
            `).join('')}
          </div>`;

      case 'compare':
        return `
          <div class="cmp-block">
            <div class="cmp-head">
              <div class="cmp-h" style="color:${accent}">${s(b.label_a)}</div>
              <div class="cmp-vs">VS</div>
              <div class="cmp-h" style="color:${accent}">${s(b.label_b)}</div>
            </div>
            ${b.rows.map(row => `
              <div class="cmp-row">
                <div class="cmp-cell"><div class="cmp-cell-en" dir="ltr">${s(row.a_en)}</div><div>${s(row.a_ar)}</div></div>
                <div class="cmp-div"></div>
                <div class="cmp-cell"><div class="cmp-cell-en" dir="ltr">${s(row.b_en)}</div><div>${s(row.b_ar)}</div></div>
              </div>
            `).join('')}
          </div>`;

      default: return '';
    }
  }
};
