// ═══════════════════════════════════════
// PROGRESS UI
// ═══════════════════════════════════════
const ProgressUI = {

  BADGES: {
    first_quiz:    '🏅 أول اختبار',
    five_quizzes:  '🥈 5 اختبارات',
    ten_quizzes:   '🏆 10 اختبارات',
    three_streak:  '🔥 3 أيام متتالية',
    week_streak:   '💎 أسبوع متتالي',
    perfect_score: '⭐ إجابة مثالية'
  },

  render() {
    const stats = Session.getStats();
    if (!stats) return;
    const cont = document.getElementById('progress-content');
    if (!cont) return;

    cont.innerHTML = `
      <!-- Session -->
      <div class="prog-session">
        <div class="ps-label">معرّف جلستك الفريد</div>
        <div class="ps-id">${Router.sanitize(stats.id)}</div>
        <button class="ps-copy" onclick="ProgressUI.copyId('${stats.id}')">نسخ 📋</button>
      </div>

      <!-- Stats grid -->
      <div class="prog-grid">
        <div class="pg"><div class="pg-n">${stats.totalQuizzes}</div><div class="pg-l">اختبار مكتمل</div></div>
        <div class="pg"><div class="pg-n">${stats.accuracy}%</div><div class="pg-l">دقة الإجابات</div></div>
        <div class="pg"><div class="pg-n">${stats.streak}</div><div class="pg-l">أيام متتالية</div></div>
        <div class="pg"><div class="pg-n">${stats.studyDays}</div><div class="pg-l">أيام دراسة</div></div>
      </div>

      <!-- Badges -->
      <h3 class="sec-title">🏆 الشارات</h3>
      <div class="badges-grid">
        ${Object.entries(this.BADGES).map(([id, name]) => `
          <div class="badge ${stats.badges.includes(id) ? 'earned' : 'locked'}">
            ${name} ${!stats.badges.includes(id) ? '🔒' : ''}
          </div>
        `).join('')}
      </div>

      <!-- Chapter progress -->
      <h3 class="sec-title">📚 تقدمك في الفصول</h3>
      ${DB.chapters.map(ch => {
        const done  = Object.keys(stats.slides[ch.id] || {}).length;
        const total = ch.slides.length;
        const pct   = total > 0 ? Math.round(done / total * 100) : 0;
        return `
          <div class="ch-prog">
            <span>${ch.icon} ${Router.sanitize(ch.title)}</span>
            <div class="cp-bar"><div style="width:${pct}%;background:${ch.accent}"></div></div>
            <span class="cp-pct">${pct}%</span>
          </div>
        `;
      }).join('')}

      <!-- Quiz history -->
      <h3 class="sec-title">📊 سجل الاختبارات</h3>
      ${Object.entries(stats.quizHistory).length === 0
        ? `<p class="no-data">لم تُكمل أي اختبار بعد 📝</p>`
        : Object.entries(stats.quizHistory).map(([chId, results]) => {
            const ch = DB.chapters.find(c => c.id == chId);
            return results.slice(-5).reverse().map(r => `
              <div class="hist-row">
                <span>${ch?.icon} ${Router.sanitize(ch?.title || '')}</span>
                <span class="hr-pct" style="color:${r.pct >= 70 ? '#22c55e' : '#ef4444'}">${r.pct}%</span>
                <span class="hr-date">${new Date(r.at).toLocaleDateString('ar')}</span>
              </div>
            `).join('');
          }).join('')
      }

      <!-- Export button -->
      <button class="export-btn" onclick="ProgressUI.exportData()">📤 تصدير بياناتي</button>
    `;
  },

  copyId(id) {
    navigator.clipboard?.writeText(id).then(() => App.toast('✅ تم نسخ المعرّف!', 'success'))
      .catch(() => App.toast('يمكنك نسخه يدوياً', 'info'));
  },

  exportData() {
    try {
      const data = localStorage.getItem('nursing_session_v3');
      const blob = new Blob([data], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = 'nursing-progress.json'; a.click();
      URL.revokeObjectURL(url);
      App.toast('✅ تم تصدير البيانات!', 'success');
    } catch {
      App.toast('❌ فشل التصدير', 'info');
    }
  }
};
