// ═══════════════════════════════════════════
// SESSION v2 — with SRS (Spaced Repetition)
// ═══════════════════════════════════════════
const Session = {
  _KEY: 'nursing_session_v3',
  _cache: null,

  _gen() {
    const t = Date.now().toString(36).toUpperCase();
    const r = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    return `NS-${t}-${r()}-${r()}`;
  },

  init() {
    let s = this._load();
    if (!s) {
      s = {
        id:        this._gen(),
        createdAt: new Date().toISOString(),
        lastSeen:  new Date().toISOString(),
        progress:  { slides: {}, vocab: {}, quizzes: {}, weakQuestions: {} },
        srs:       {}, // Spaced Repetition System data per vocab key
        stats:     { totalQuizzes: 0, correctTotal: 0, studyDays: [], streak: 0 },
        badges:    [],
        prefs:     { fontSize: 'md', theme: 'dark', notifTime: '20:00' }
      };
      this._save(s); this._cache = s;
    } else {
      s.lastSeen = new Date().toISOString();
      const today = new Date().toDateString();
      if (!s.stats.studyDays) s.stats.studyDays = [];
      if (!s.srs) s.srs = {};
      if (!s.progress.weakQuestions) s.progress.weakQuestions = {};
      if (!s.prefs) s.prefs = { fontSize: 'md', theme: 'dark', notifTime: '20:00' };
      if (!s.stats.studyDays.includes(today)) {
        s.stats.studyDays.push(today);
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        s.stats.streak = s.stats.studyDays.includes(yesterday) ? (s.stats.streak || 0) + 1 : 1;
      }
      this._save(s); this._cache = s;
    }
    return s;
  },

  _load() {
    if (this._cache) return this._cache;
    try { const d = localStorage.getItem(this._KEY); return d ? JSON.parse(d) : null; }
    catch { return null; }
  },

  _save(s) {
    this._cache = s;
    try { localStorage.setItem(this._KEY, JSON.stringify(s)); } catch {}
  },

  get() { return this._load(); },

  // ── SLIDES ──
  markSlide(chId, slideId) {
    const s = this._load(); if (!s) return;
    if (!s.progress.slides[chId]) s.progress.slides[chId] = {};
    s.progress.slides[chId][slideId] = true;
    this._save(s);
  },

  // ── VOCAB ──
  markVocab(key, known) {
    const s = this._load(); if (!s) return;
    s.progress.vocab[key] = { known, at: Date.now() };
    this._save(s);
  },

  // ── SRS (Spaced Repetition System) ──
  // Uses SM-2 algorithm simplified:
  // Each card has: interval (days), easeFactor, nextReview (timestamp)
  getSRSCard(key) {
    const s = this._load();
    return s?.srs?.[key] || { interval: 0, ease: 2.5, nextReview: 0, reps: 0 };
  },

  reviewSRS(key, quality) {
    // quality: 0=wrong, 1=hard, 2=ok, 3=easy
    const s = this._load(); if (!s) return;
    if (!s.srs) s.srs = {};
    const card = s.srs[key] || { interval: 0, ease: 2.5, nextReview: 0, reps: 0 };

    if (quality < 1) {
      card.interval = 1; card.reps = 0;
    } else {
      card.reps++;
      if (card.reps === 1)      card.interval = 1;
      else if (card.reps === 2) card.interval = 6;
      else card.interval = Math.round(card.interval * card.ease);

      card.ease = Math.max(1.3, card.ease + 0.1 - (3 - quality) * 0.08);
    }

    card.nextReview = Date.now() + card.interval * 86400000;
    s.srs[key] = card;
    this._save(s);
    return card;
  },

  // Get cards due for review today
  getDueCards(vocab) {
    const s = this._load();
    const now = Date.now();
    return vocab.filter(v => {
      const card = s?.srs?.[v.key];
      if (!card) return true; // never reviewed = due
      return card.nextReview <= now;
    });
  },

  // Get new cards (never reviewed)
  getNewCards(vocab) {
    const s = this._load();
    return vocab.filter(v => !s?.srs?.[v.key]);
  },

  // ── QUIZ ──
  saveQuiz(chId, correct, total, questionResults) {
    const s = this._load(); if (!s) return;
    if (!s.progress.quizzes[chId]) s.progress.quizzes[chId] = [];

    const entry = {
      correct, total,
      pct: Math.round(correct / total * 100),
      at: new Date().toISOString()
    };
    s.progress.quizzes[chId].push(entry);
    // Keep only last 10 per chapter
    if (s.progress.quizzes[chId].length > 10)
      s.progress.quizzes[chId] = s.progress.quizzes[chId].slice(-10);

    s.stats.totalQuizzes++;
    s.stats.correctTotal = (s.stats.correctTotal || 0) + correct;

    // Track weak questions
    if (questionResults) {
      questionResults.forEach(({ qId, correct: qCorrect }) => {
        if (!s.progress.weakQuestions[qId]) {
          s.progress.weakQuestions[qId] = { attempts: 0, wrongs: 0, chId };
        }
        s.progress.weakQuestions[qId].attempts++;
        if (!qCorrect) s.progress.weakQuestions[qId].wrongs++;
      });
    }

    this._checkBadges(s);
    this._save(s);
    return s;
  },

  // Get weak questions (wrong > 50% of attempts, min 1 wrong)
  getWeakQuestions() {
    const s = this._load();
    const weak = s?.progress?.weakQuestions || {};
    const result = [];
    Object.entries(weak).forEach(([qId, data]) => {
      if (data.wrongs === 0) return;
      const errorRate = data.wrongs / data.attempts;
      if (errorRate >= 0.5 || data.wrongs >= 2) {
        // Find the question
        const ch = DB.chapters.find(c => c.id == data.chId);
        const q  = ch?.quiz.find(q => q.id === qId);
        if (q) result.push({ ...q, errorRate, wrongs: data.wrongs, chId: data.chId });
      }
    });
    return result.sort((a, b) => b.errorRate - a.errorRate);
  },

  // ── PREFS ──
  setPref(key, val) {
    const s = this._load(); if (!s) return;
    if (!s.prefs) s.prefs = {};
    s.prefs[key] = val;
    this._save(s);
  },
  getPref(key) { return this._load()?.prefs?.[key]; },

  // ── BADGES ──
  _checkBadges(s) {
    const add = id => { if (!s.badges.includes(id)) s.badges.push(id); };
    if (s.stats.totalQuizzes >= 1)  add('first_quiz');
    if (s.stats.totalQuizzes >= 5)  add('five_quizzes');
    if (s.stats.totalQuizzes >= 10) add('ten_quizzes');
    if (s.stats.streak >= 3)        add('three_streak');
    if (s.stats.streak >= 7)        add('week_streak');
    const allPct = Object.values(s.progress.quizzes).flat().map(r => r.pct);
    if (allPct.some(p => p === 100)) add('perfect_score');
    const weak = s.progress.weakQuestions || {};
    const allFixed = Object.values(weak).every(w => w.wrongs === 0 || w.attempts - w.wrongs >= 3);
    if (Object.keys(weak).length >= 5 && allFixed) add('weakness_conquered');
  },

  // ── STATS ──
  getStats() {
    const s = this._load(); if (!s) return null;
    const allResults = Object.values(s.progress.quizzes || {}).flat();
    const accuracy = allResults.length
      ? Math.round(allResults.reduce((a, r) => a + r.pct, 0) / allResults.length)
      : 0;
    return {
      id:          s.id,
      streak:      s.stats.streak || 0,
      totalQuizzes:s.stats.totalQuizzes || 0,
      studyDays:   (s.stats.studyDays || []).length,
      accuracy,
      badges:      s.badges || [],
      slides:      s.progress.slides || {},
      quizHistory: s.progress.quizzes || {},
      weakCount:   Object.values(s.progress.weakQuestions || {}).filter(w => w.wrongs > 0).length,
      prefs:       s.prefs || {}
    };
  }
};
