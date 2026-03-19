// ═══════════════════════════════════════════
// QUIZ v2 — Final Exam + Speed Mode + Weak Q
// ═══════════════════════════════════════════
const QuizUI = {

  showModeSelect() {
    Router.go('quiz-select');
    this._renderModeSelect();
  },

  _renderModeSelect() {
    const cont = document.getElementById('quiz-select-content');
    if (!cont) return;
    const weakQs  = Session.getWeakQuestions();
    const allCount= DB.chapters.reduce((a, c) => a + c.quiz.length, 0);

    cont.innerHTML = `
      <div class="qs-modes">
        <button class="qs-mode-card" onclick="QuizUI.startFinalExam()" style="--qc:#f59e0b">
          <span class="qs-icon">🏆</span>
          <div class="qs-body">
            <div class="qs-title">الاختبار النهائي الشامل</div>
            <div class="qs-desc">أسئلة عشوائية من كل الفصول</div>
            <div class="qs-meta">${allCount} سؤال متاح</div>
          </div>
        </button>
        <button class="qs-mode-card" onclick="QuizUI.startSpeedMode()" style="--qc:#ef4444">
          <span class="qs-icon">⚡</span>
          <div class="qs-body">
            <div class="qs-title">وضع المذاكرة السريعة</div>
            <div class="qs-desc">20 سؤال بدون شرح — قبل الامتحان</div>
            <div class="qs-meta">⏱️ ~5 دقائق</div>
          </div>
        </button>
        <button class="qs-mode-card ${weakQs.length === 0 ? 'qs-disabled' : ''}"
                onclick="${weakQs.length > 0 ? 'QuizUI.startWeakMode()' : ''}" style="--qc:#8b5cf6">
          <span class="qs-icon">💪</span>
          <div class="qs-body">
            <div class="qs-title">أسئلتي الضعيفة</div>
            <div class="qs-desc">ركّز على ما أخطأت فيه</div>
            <div class="qs-meta">${weakQs.length > 0 ? `${weakQs.length} سؤال` : 'أكمل اختبارات أولاً'}</div>
          </div>
        </button>
        <div class="qs-divider">اختبار فصل محدد</div>
        ${DB.chapters.map(ch => `
          <button class="qs-ch-btn ${ch.quiz.length === 0 ? 'qs-disabled' : ''}"
                  onclick="${ch.quiz.length > 0 ? `QuizUI.start(${ch.id})` : ''}"
                  style="--qc:${ch.accent}">
            <span>${ch.icon}</span>
            <span class="qs-ch-name">${Router.sanitize(ch.title)}</span>
            <span class="qs-ch-count">${ch.quiz.length} سؤال</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  start(chId) {
    const ch = DB.chapters.find(c => c.id === chId);
    if (!ch || !ch.quiz.length) { App.toast('لا يوجد اختبار لهذا الفصل بعد', 'info'); return; }
    this._launch(ch.quiz, ch, 'chapter');
  },

  startFinalExam() {
    const allQ = [];
    DB.chapters.forEach(ch => {
      if (!ch.quiz.length) return;
      const shuffled = [...ch.quiz].sort(() => Math.random() - 0.5).slice(0, 10);
      shuffled.forEach(q => allQ.push({ ...q, _chAccent: ch.accent }));
    });
    this._launch(allQ.sort(() => Math.random() - 0.5),
      { id:'final', title:'الاختبار النهائي الشامل', icon:'🏆', accent:'#f59e0b' }, 'final');
  },

  startSpeedMode() {
    const allQ = [];
    DB.chapters.forEach(ch => ch.quiz.forEach(q => allQ.push({ ...q, _chAccent: ch.accent })));
    this._launch(allQ.sort(() => Math.random() - 0.5).slice(0, 20),
      { id:'speed', title:'⚡ المذاكرة السريعة', icon:'⚡', accent:'#ef4444' }, 'speed');
  },

  startWeakMode() {
    const weakQs = Session.getWeakQuestions();
    if (!weakQs.length) { App.toast('لا توجد أسئلة ضعيفة بعد!', 'info'); return; }
    this._launch(weakQs,
      { id:'weak', title:'💪 أسئلتي الضعيفة', icon:'💪', accent:'#8b5cf6' }, 'weak');
  },

  _launch(questions, meta, mode) {
    App.state.quiz = {
      meta, mode,
      questions: [...questions].sort(() => Math.random() - 0.5),
      idx: 0,
      answers: new Array(questions.length).fill(null),
      startTime: Date.now(),
      isSpeed: mode === 'speed'
    };
    Router.go('quiz');
    this.renderQuestion();
  },

  renderQuestion() {
    const { meta, questions, idx, answers, isSpeed } = App.state.quiz;
    const q = questions[idx], total = questions.length;
    const pct = ((idx + 1) / total) * 100;

    document.getElementById('quiz-ch-title').innerHTML =
      `<span style="color:${meta.accent}">${meta.icon}</span> ${Router.sanitize(meta.title)}`;

    const cont = document.getElementById('quiz-content');
    if (!cont) return;

    cont.innerHTML = `
      <div class="qz-prog"><div style="width:${pct}%;background:${meta.accent}"></div></div>
      <div class="qz-toprow">
        <span class="qz-counter">${idx + 1} / ${total}</span>
        ${isSpeed ? '<span class="qz-speed-badge">⚡ سريع</span>' : ''}
        ${q._chAccent ? `<span class="qz-ch-dot" style="background:${q._chAccent}"></span>` : ''}
      </div>
      <div class="qz-card" style="--accent:${meta.accent}">
        <div class="qz-q">${Router.sanitize(q.q)}</div>
        <div class="qz-opts">
          ${q.o.map((opt, i) => `
            <button class="qz-opt" onclick="QuizUI.select(${i})">
              <span class="qz-letter">${['أ','ب','ج','د'][i]}</span>
              <span>${Router.sanitize(opt)}</span>
            </button>
          `).join('')}
        </div>
        ${!isSpeed ? `<div class="qz-ex hidden" id="qz-ex"><span>💡</span><span>${Router.sanitize(q.ex)}</span></div>` : ''}
      </div>
      <div class="qz-nav">
        ${idx > 0 ? `<button class="qzn-btn" onclick="QuizUI.nav(-1)">← السابق</button>` : '<div></div>'}
        <div class="qz-dots">
          ${questions.map((_, i) => {
            let c = i === idx ? 'cur' : '';
            if (answers[i] !== null) c += answers[i] === questions[i].c ? ' right' : ' wrong';
            return `<div class="qdot ${c}"></div>`;
          }).join('')}
        </div>
        ${answers[idx] !== null
          ? (idx < total - 1
              ? `<button class="qzn-btn next" style="background:${meta.accent}" onclick="QuizUI.nav(1)">التالي →</button>`
              : `<button class="qzn-btn next" style="background:${meta.accent}" onclick="QuizUI.showResults()">النتائج 🏆</button>`)
          : '<div></div>'}
      </div>
    `;
    if (answers[idx] !== null) this._showState(answers[idx], q.c, isSpeed);
  },

  select(sel) {
    const { questions, idx, answers, isSpeed } = App.state.quiz;
    if (answers[idx] !== null) return;
    answers[idx] = sel;
    this._showState(sel, questions[idx].c, isSpeed);
    this.renderQuestion();
  },

  _showState(sel, correct, isSpeed) {
    document.querySelectorAll('.qz-opt').forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) btn.classList.add('correct');
      else if (i === sel && sel !== correct) btn.classList.add('wrong');
    });
    if (!isSpeed) { const ex = document.getElementById('qz-ex'); if (ex) ex.classList.remove('hidden'); }
  },

  nav(dir) {
    const { questions } = App.state.quiz;
    const next = App.state.quiz.idx + dir;
    if (next >= 0 && next < questions.length) {
      App.state.quiz.idx = next;
      this.renderQuestion();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  },

  showResults() {
    const { meta, questions, answers, startTime } = App.state.quiz;
    const total   = questions.length;
    const correct = answers.filter((a, i) => a === questions[i].c).length;
    const pct     = Math.round(correct / total * 100);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const mm = Math.floor(elapsed / 60), ss = String(elapsed % 60).padStart(2, '0');

    const questionResults = questions.map((q, i) => ({ qId: q.id, correct: answers[i] === q.c }));
    Session.saveQuiz(meta.id, correct, total, questionResults);
    HomeUI.render();

    const grade = pct >= 90 ? { lbl:'🌟 ممتاز', col:'#22c55e' }
                : pct >= 80 ? { lbl:'✨ جيد جداً', col:'#3b82f6' }
                : pct >= 70 ? { lbl:'👍 جيد', col:'#f59e0b' }
                : pct >= 60 ? { lbl:'⚠️ مقبول', col:'#f97316' }
                :             { lbl:'📚 راجع المادة', col:'#ef4444' };

    document.getElementById('quiz-content').innerHTML = `
      <div class="res-wrap">
        <div class="res-ring" style="--pct:${pct};--col:${grade.col}">
          <div class="res-inner"><div class="res-pct">${pct}%</div><div class="res-grade">${grade.lbl}</div></div>
        </div>
        <div class="res-stats">
          <div class="rs correct"><div class="rs-n">${correct}</div><div class="rs-l">صحيح ✓</div></div>
          <div class="rs wrong"><div class="rs-n">${total - correct}</div><div class="rs-l">خطأ ✗</div></div>
          <div class="rs time"><div class="rs-n">${mm}:${ss}</div><div class="rs-l">الوقت</div></div>
        </div>
        <button class="share-btn" onclick="QuizUI.shareResult(${pct},'${Router.sanitize(meta.title).replace(/'/g,"\\'")}')">
          📤 مشاركة النتيجة على الواتساب
        </button>
        <h3 class="sec-title">مراجعة الإجابات</h3>
        ${questions.map((q, i) => `
          <div class="rv ${answers[i] === q.c ? 'rv-ok' : 'rv-no'}">
            <div class="rv-q">${i + 1}. ${Router.sanitize(q.q)}</div>
            <div class="rv-a">إجابتك: <strong>${Router.sanitize(q.o[answers[i]] || '—')}</strong>
              ${answers[i] !== q.c ? ` | الصحيح: <strong style="color:#22c55e">${Router.sanitize(q.o[q.c])}</strong>` : ''}
            </div>
            <div class="rv-ex">💡 ${Router.sanitize(q.ex)}</div>
          </div>
        `).join('')}
        <div class="res-actions">
          <button class="btn-outline" onclick="QuizUI.showModeSelect()">🔄 اختبار آخر</button>
          <button class="btn-primary" onclick="Router.go('home')">🏠 الرئيسية</button>
        </div>
      </div>
    `;
  },

  shareResult(pct, title) {
    const emoji = pct >= 90 ? '🌟' : pct >= 80 ? '✨' : pct >= 70 ? '👍' : '📚';
    const text  = `${emoji} نتيجتي في: ${title}\n✅ ${pct}%\n\nأساسيات التمريض العملي 1 🏥`;
    if (navigator.share) {
      navigator.share({ title: 'نتيجة الاختبار', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      App.toast('✅ تم نسخ النتيجة!', 'success');
    }
  }
};
