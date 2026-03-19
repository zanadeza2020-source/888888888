// ═══════════════════════════════════════════════════════
// TELEGRAM ANALYTICS — GitHub Pages Compatible
// Sends notifications with user consent
//
// ⚠️ SECURITY NOTE:
// Bot token in client-side code IS visible in source.
// For a public educational app with user consent, this
// is acceptable. To fully secure: use a Cloudflare Worker.
//
// HOW TO CONFIGURE:
// 1. Create a Telegram bot via @BotFather
// 2. Get your Chat ID via @userinfobot
// 3. Replace TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID below
// ═══════════════════════════════════════════════════════

const TelegramAnalytics = {

  // ── CONFIGURE HERE ──────────────────────────────────
  BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',   // من @BotFather
  CHAT_ID:   'YOUR_CHAT_ID_HERE',     // من @userinfobot
  // ────────────────────────────────────────────────────

  _isConfigured() {
    return this.BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE' &&
           this.CHAT_ID   !== 'YOUR_CHAT_ID_HERE';
  },

  // ── Main init — called after user consent ────────────
  async init() {
    if (!this._isConfigured()) return;

    const isNewDevice = this._checkNewDevice();
    if (isNewDevice) {
      await this._sendNewDeviceNotif();
    }
  },

  // ── Check if this is first visit ─────────────────────
  _checkNewDevice() {
    const KEY = 'nursing_tg_registered';
    if (localStorage.getItem(KEY)) return false;
    localStorage.setItem(KEY, Date.now().toString());
    return true;
  },

  // ── Gather non-personal device info ─────────────────
  _getDeviceInfo() {
    const ua     = navigator.userAgent;
    const lang   = navigator.language || 'unknown';
    const screen = `${window.screen.width}×${window.screen.height}`;
    const hour   = new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' });
    const date   = new Date().toLocaleDateString('ar');
    const tz     = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

    // Detect device type
    const isMobile  = /iPhone|iPad|Android/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isIOS     = /iPhone|iPad/i.test(ua);
    const deviceType = isIOS ? '📱 iOS' : isAndroid ? '📱 Android' : isMobile ? '📱 Mobile' : '💻 Desktop';

    // Detect browser
    const browser = /Chrome/i.test(ua) ? 'Chrome'
                  : /Firefox/i.test(ua) ? 'Firefox'
                  : /Safari/i.test(ua)  ? 'Safari'
                  : /Edge/i.test(ua)    ? 'Edge'
                  : 'Unknown';

    // Get session count
    const stats = Session.getStats();

    return { deviceType, browser, lang, screen, hour, date, tz, stats, isMobile };
  },

  // ── Send new device notification ─────────────────────
  async _sendNewDeviceNotif() {
    const info = this._getDeviceInfo();
    const msg = [
      `🏥 *تمريض عملي 1 — زيارة جديدة*`,
      ``,
      `📅 التاريخ: ${info.date}`,
      `⏰ الوقت: ${info.hour}`,
      `🌍 المنطقة: ${info.tz}`,
      ``,
      `${info.deviceType}`,
      `🌐 المتصفح: ${info.browser}`,
      `🖥️ الشاشة: ${info.screen}`,
      `🗣️ اللغة: ${info.lang}`,
      ``,
      `📊 إحصائيات الجلسة:`,
      `• جلسة: \`${info.stats?.id || 'جديد'}\``,
    ].join('\n');

    await this._send(msg);
  },

  // ── Send PWA install notification ─────────────────────
  async sendPWAInstall() {
    if (!this._isConfigured()) return;
    const info = this._getDeviceInfo();
    const msg = [
      `📲 *تمريض عملي 1 — تثبيت PWA*`,
      ``,
      `✅ قام مستخدم بتثبيت التطبيق!`,
      ``,
      `${info.deviceType}`,
      `🌐 المتصفح: ${info.browser}`,
      `📅 ${info.date} الساعة ${info.hour}`,
      `🌍 ${info.tz}`,
    ].join('\n');

    await this._send(msg);
  },

  // ── Core send function ────────────────────────────────
  async _send(text) {
    if (!this._isConfigured()) return;
    try {
      const url  = `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`;
      const body = JSON.stringify({
        chat_id:    this.CHAT_ID,
        text,
        parse_mode: 'Markdown'
      });
      await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    } catch (err) {
      // Silently fail — never block the app
      console.warn('Telegram analytics error:', err.message);
    }
  }
};
