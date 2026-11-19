// ==========================================
// Date Formatter - Core Application Logic
// ==========================================

(() => {
  // 1. 地域設定（Locale）の決定
  // ブラウザ設定に従い、取得不可時のデフォルトは 'en-US'
  const getBrowserLocale = () => {
    if (typeof navigator !== 'undefined') {
      if (navigator.language) return navigator.language;
      if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        return navigator.languages[0];
      }
    }
    return 'en-US';
  };

  const currentLocale = getBrowserLocale();

  // 2. 定数・初期設定
  const STORAGE_KEY = 'date_formatter_custom_format';
  const THEME_KEY = 'date_formatter_theme';
  const DEFAULT_FORMAT = 'YYYY-MM-DD';

  const PRESETS = [
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'YYYY-MM-DD (ddd)',
    'YYYY年M月D日 (ddd)',
    'gggM月D日 (ddd)',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DDTHH:mm:ss.SSSZ',
    'YYYYMMDD_HHmmss',
    'X',
    'ddd, DD MMM YYYY'
  ];

  // 3. アプリの状態管理 (State)
  const state = {
    selectedDate: new Date(),
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(), // 0-indexed (0 = Jan, 11 = Dec)
    formatPattern: DEFAULT_FORMAT
  };

  // 4. DOM要素の取得
  const elements = {
    localeBadge: document.getElementById('localeBadge'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    resultText: document.getElementById('resultText'),
    relativeTimeBadge: document.getElementById('relativeTimeBadge'),
    copyBtn: document.getElementById('copyBtn'),
    copyBtnText: document.getElementById('copyBtnText'),
    calTitle: document.getElementById('calTitle'),
    prevMonthBtn: document.getElementById('prevMonthBtn'),
    nextMonthBtn: document.getElementById('nextMonthBtn'),
    todayBtn: document.getElementById('todayBtn'),
    shiftTodayBtn: document.getElementById('shiftTodayBtn'),
    weekdaysRow: document.getElementById('weekdaysRow'),
    daysGrid: document.getElementById('daysGrid'),
    timeInput: document.getElementById('timeInput'),
    nowTimeBtn: document.getElementById('nowTimeBtn'),
    formatInput: document.getElementById('formatInput'),
    resetFormatBtn: document.getElementById('resetFormatBtn'),
    presetChips: document.getElementById('presetChips')
  };

  // 5. テーマ（ダークモード）管理
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      elements.themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme);
    } else {
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  // 6. 日付フォーマット処理エンジン
  function formatDate(date, pattern, locale) {
    if (!pattern || typeof pattern !== 'string') return '';

    // 角括弧 [literal] のエスケープ処理
    const literals = [];
    const escapedPattern = pattern.replace(/\[([^\]]+)\]/g, (_, p1) => {
      literals.push(p1);
      return `\x00${literals.length - 1}\x00`;
    });

    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    // Intl.DateTimeFormat によるロケール対応の曜日・月名
    let dddd = '', ddd = '', MMMM = '', MMM = '';
    try {
      dddd = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
      ddd = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
      MMMM = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
      MMM = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
    } catch (e) {
      // フォールバック
      const enDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const enDaysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      ddd = enDays[date.getDay()];
      dddd = enDaysLong[date.getDay()];
      MMM = enMonths[month];
      MMMM = enMonths[month];
    }

    // 和暦（元号）の取得 (ggg: 令和8年 / 令和元年, gg: 令和, g: R)
    let ggg = '', gg = '', g = '';
    try {
      const eraParts = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { era: 'long', year: 'numeric' }).formatToParts(date);
      const eraNarrowParts = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { era: 'narrow', year: 'numeric' }).formatToParts(date);
      const eraLong = eraParts.find(p => p.type === 'era')?.value || '';
      const eraYear = eraParts.find(p => p.type === 'year')?.value || '';
      const eraNarrow = eraNarrowParts.find(p => p.type === 'era')?.value || '';
      gg = eraLong;
      ggg = eraLong ? `${eraLong}${eraYear}年` : `${year}年`;
      g = eraNarrow;
    } catch (e) {
      gg = '';
      ggg = `${year}年`;
      g = '';
    }

    const pad = (n, len = 2) => String(n).padStart(len, '0');

    // タイムゾーンオフセット (Z: +09:00, ZZ: +0900)
    const tzOffset = -date.getTimezoneOffset();
    const tzSign = tzOffset >= 0 ? '+' : '-';
    const tzAbs = Math.abs(tzOffset);
    const tzHours = pad(Math.floor(tzAbs / 60));
    const tzMins = pad(tzAbs % 60);
    const Z = `${tzSign}${tzHours}:${tzMins}`;
    const ZZ = `${tzSign}${tzHours}${tzMins}`;

    // トークン変換マップ
    const tokenMap = {
      YYYY: String(year),
      YY: String(year).slice(-2),
      MMMM: MMMM,
      MMM: MMM,
      MM: pad(month + 1),
      M: String(month + 1),
      DD: pad(day),
      D: String(day),
      dddd: dddd,
      ddd: ddd,
      HH: pad(hours),
      H: String(hours),
      hh: pad(hours % 12 || 12),
      h: String(hours % 12 || 12),
      mm: pad(minutes),
      m: String(minutes),
      ss: pad(seconds),
      s: String(seconds),
      SSS: pad(milliseconds, 3),
      ggg: ggg,
      gg: gg,
      g: g,
      X: String(Math.floor(date.getTime() / 1000)),
      x: String(date.getTime()),
      ZZ: ZZ,
      Z: Z,
      A: hours >= 12 ? 'PM' : 'AM',
      a: hours >= 12 ? 'pm' : 'am'
    };

    // 最長一致でトークンを置換
    const tokenRegex = /(YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|SSS|ss|s|ggg|gg|g|ZZ|Z|X|x|A|a)/g;
    let formatted = escapedPattern.replace(tokenRegex, (match) => {
      return tokenMap[match] !== undefined ? tokenMap[match] : match;
    });

    // エスケープした文字列の復元
    formatted = formatted.replace(/\x00(\d+)\x00/g, (_, idx) => {
      return literals[Number(idx)] || '';
    });

    return formatted;
  }

  // 7. 相対時間の描画更新 (例: "今日", "昨日", "3日後", "2時間前")
  function updateRelativeTime() {
    if (!elements.relativeTimeBadge) return;
    try {
      const now = new Date();
      const diffSec = Math.round((state.selectedDate.getTime() - now.getTime()) / 1000);
      const rtf = new Intl.RelativeTimeFormat(currentLocale, { numeric: 'auto' });
      const abs = Math.abs(diffSec);

      let text = '';
      if (abs < 45) {
        text = rtf.format(0, 'second');
      } else if (abs < 3600) {
        text = rtf.format(Math.round(diffSec / 60), 'minute');
      } else if (abs < 86400) {
        text = rtf.format(Math.round(diffSec / 3600), 'hour');
      } else if (abs < 86400 * 30) {
        text = rtf.format(Math.round(diffSec / 86400), 'day');
      } else if (abs < 86400 * 365) {
        text = rtf.format(Math.round(diffSec / (86400 * 30)), 'month');
      } else {
        text = rtf.format(Math.round(diffSec / (86400 * 365)), 'year');
      }
      elements.relativeTimeBadge.textContent = text;
    } catch (e) {
      elements.relativeTimeBadge.textContent = '';
    }
  }

  // 8. UIの描画更新
  function updateResult() {
    const formatted = formatDate(state.selectedDate, state.formatPattern, currentLocale);
    elements.resultText.textContent = formatted || '(empty)';

    // 相対時間の更新
    updateRelativeTime();

    // プリセットチップのアクティブ状態更新
    const chips = elements.presetChips.querySelectorAll('.preset-chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-format') === state.formatPattern) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  // カレンダーの描画
  function renderCalendar() {
    const { viewYear, viewMonth, selectedDate } = state;

    // カレンダーヘッダーの年月表示（ロケール準拠）
    const monthFormatter = new Intl.DateTimeFormat(currentLocale, {
      year: 'numeric',
      month: 'long'
    });
    const headerDate = new Date(viewYear, viewMonth, 1);
    elements.calTitle.textContent = monthFormatter.format(headerDate);

    // 曜日行の生成（日曜始まり: 0=Sun ... 6=Sat）
    elements.weekdaysRow.innerHTML = '';
    const sampleSunday = new Date(2026, 10, 15); // 日曜日の基準日
    const dayFormatter = new Intl.DateTimeFormat(currentLocale, { weekday: 'narrow' });
    for (let i = 0; i < 7; i++) {
      const d = new Date(sampleSunday);
      d.setDate(sampleSunday.getDate() + i);
      const dayName = dayFormatter.format(d);
      const span = document.createElement('span');
      span.textContent = dayName;
      elements.weekdaysRow.appendChild(span);
    }

    // 日付グリッドの生成
    elements.daysGrid.innerHTML = '';

    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 当月1日の曜日 (0-6)
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate(); // 当月の日数
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate(); // 前月の日数

    const today = new Date();
    const isSameDate = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    // 前月のはみ出し日
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const cell = document.createElement('div');
      cell.className = 'day-cell other-month';
      cell.textContent = dayNum;
      cell.addEventListener('click', () => {
        state.selectedDate.setFullYear(viewYear, viewMonth - 1, dayNum);
        state.viewMonth -= 1;
        if (state.viewMonth < 0) {
          state.viewMonth = 11;
          state.viewYear -= 1;
        }
        renderCalendar();
        updateResult();
      });
      elements.daysGrid.appendChild(cell);
    }

    // 当月の日
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(viewYear, viewMonth, d);
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.textContent = d;

      if (isSameDate(cellDate, today)) {
        cell.classList.add('today');
      }
      if (isSameDate(cellDate, selectedDate)) {
        cell.classList.add('selected');
      }

      cell.addEventListener('click', () => {
        state.selectedDate.setFullYear(viewYear, viewMonth, d);
        renderCalendar();
        updateResult();
      });

      elements.daysGrid.appendChild(cell);
    }

    // 次月のはみ出し日（グリッドのマス目を整える: 35または42マス）
    const totalRendered = firstDayIndex + daysInMonth;
    const nextDaysNeeded = (totalRendered <= 35 ? 35 : 42) - totalRendered;
    for (let n = 1; n <= nextDaysNeeded; n++) {
      const cell = document.createElement('div');
      cell.className = 'day-cell other-month';
      cell.textContent = n;
      cell.addEventListener('click', () => {
        state.selectedDate.setFullYear(viewYear, viewMonth + 1, n);
        state.viewMonth += 1;
        if (state.viewMonth > 11) {
          state.viewMonth = 0;
          state.viewYear += 1;
        }
        renderCalendar();
        updateResult();
      });
      elements.daysGrid.appendChild(cell);
    }
  }

  // 時刻入力欄の同期
  function syncTimeInputFromDate(date) {
    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    elements.timeInput.value = timeStr;
  }

  // 日付のオフセット変更 (±1日, ±7日など)
  function shiftDate(days) {
    state.selectedDate.setDate(state.selectedDate.getDate() + days);
    state.viewYear = state.selectedDate.getFullYear();
    state.viewMonth = state.selectedDate.getMonth();
    renderCalendar();
    syncTimeInputFromDate(state.selectedDate);
    updateResult();
  }

  // 「今日」にジャンプ
  function jumpToToday() {
    const now = new Date();
    state.selectedDate = new Date(now);
    state.viewYear = now.getFullYear();
    state.viewMonth = now.getMonth();
    syncTimeInputFromDate(now);
    renderCalendar();
    updateResult();
  }

  // トークンのカーソル位置挿入
  function insertToken(token) {
    const input = elements.formatInput;
    const start = input.selectionStart !== null ? input.selectionStart : input.value.length;
    const end = input.selectionEnd !== null ? input.selectionEnd : input.value.length;
    const currentVal = input.value;
    const newVal = currentVal.substring(0, start) + token + currentVal.substring(end);

    input.value = newVal;
    state.formatPattern = newVal;
    localStorage.setItem(STORAGE_KEY, newVal);
    updateResult();

    input.focus();
    const newPos = start + token.length;
    input.setSelectionRange(newPos, newPos);
  }

  // クリップボードへのコピー処理
  async function copyResultToClipboard() {
    const textToCopy = elements.resultText.textContent;
    if (!textToCopy || textToCopy === '(empty)') return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // フォールバック
        const tempInput = document.createElement('textarea');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // コピー成功演出
      elements.copyBtn.classList.add('copied');
      elements.copyBtnText.textContent = 'Copied!';
      setTimeout(() => {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtnText.textContent = 'Copy';
      }, 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  // 9. イベントハンドラ
  function setupEventListeners() {
    // テーマ切り替え
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // コピーボタン処理
    elements.copyBtn.addEventListener('click', copyResultToClipboard);

    // ショートカットキー: Ctrl + C / Cmd + C で日付をコピー
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        // ユーザーがテキストを選択している場合は通常のテキストコピーを許可
        const selection = window.getSelection ? window.getSelection().toString() : '';
        const activeEl = document.activeElement;
        const isInputFocusedWithSelection = activeEl &&
          (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') &&
          typeof activeEl.selectionStart === 'number' &&
          activeEl.selectionStart !== activeEl.selectionEnd;

        if (selection.length > 0 || isInputFocusedWithSelection) {
          return;
        }

        // 選択範囲がない場合は日付をクリップボードにコピー
        e.preventDefault();
        copyResultToClipboard();
      }
    });

    // カレンダー月送り
    elements.prevMonthBtn.addEventListener('click', () => {
      state.viewMonth -= 1;
      if (state.viewMonth < 0) {
        state.viewMonth = 11;
        state.viewYear -= 1;
      }
      renderCalendar();
    });

    elements.nextMonthBtn.addEventListener('click', () => {
      state.viewMonth += 1;
      if (state.viewMonth > 11) {
        state.viewMonth = 0;
        state.viewYear += 1;
      }
      renderCalendar();
    });

    // Today ボタン
    elements.todayBtn.addEventListener('click', jumpToToday);
    if (elements.shiftTodayBtn) {
      elements.shiftTodayBtn.addEventListener('click', jumpToToday);
    }

    // クイックシフトボタン (-7d, -1d, +1d, +7d)
    const shiftButtons = document.querySelectorAll('.shift-btn[data-shift-days]');
    shiftButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const days = parseInt(btn.getAttribute('data-shift-days'), 10);
        if (!isNaN(days)) {
          shiftDate(days);
        }
      });
    });

    // 時刻入力変更
    elements.timeInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (!val) return;
      const parts = val.split(':');
      if (parts.length >= 2) {
        const h = parseInt(parts[0], 10) || 0;
        const m = parseInt(parts[1], 10) || 0;
        const s = parts[2] ? parseInt(parts[2], 10) : 0;
        state.selectedDate.setHours(h, m, s);
        updateResult();
      }
    });

    // 「Current Time」ボタン
    elements.nowTimeBtn.addEventListener('click', () => {
      const now = new Date();
      state.selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      syncTimeInputFromDate(state.selectedDate);
      updateResult();
    });

    // フォーマット入力変更
    elements.formatInput.addEventListener('input', (e) => {
      const newPattern = e.target.value;
      state.formatPattern = newPattern;
      localStorage.setItem(STORAGE_KEY, newPattern);
      updateResult();
    });

    // フォーマットリセット（デフォルトへ）
    elements.resetFormatBtn.addEventListener('click', () => {
      state.formatPattern = DEFAULT_FORMAT;
      elements.formatInput.value = DEFAULT_FORMAT;
      localStorage.setItem(STORAGE_KEY, DEFAULT_FORMAT);
      updateResult();
    });

    // トークンクリックによる挿入
    const tokenElements = document.querySelectorAll('.tokens-table code.clickable-token');
    tokenElements.forEach(tokenEl => {
      tokenEl.addEventListener('click', () => {
        const token = tokenEl.textContent.trim();
        if (token) {
          insertToken(token);
          tokenEl.classList.add('token-clicked');
          setTimeout(() => tokenEl.classList.remove('token-clicked'), 300);
        }
      });
    });
  }

  // プリセットチップの生成
  function renderPresets() {
    elements.presetChips.innerHTML = '';
    PRESETS.forEach(pattern => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'preset-chip';
      chip.setAttribute('data-format', pattern);
      chip.textContent = pattern;
      chip.addEventListener('click', () => {
        state.formatPattern = pattern;
        elements.formatInput.value = pattern;
        localStorage.setItem(STORAGE_KEY, pattern);
        updateResult();
      });
      elements.presetChips.appendChild(chip);
    });
  }

  // 10. アプリ初期化 (Initialize)
  function init() {
    // テーマ初期化
    initTheme();

    // ロケール表示
    elements.localeBadge.textContent = `Locale: ${currentLocale}`;

    // localStorageから保存されたフォーマットを復元
    const savedFormat = localStorage.getItem(STORAGE_KEY);
    if (savedFormat !== null) {
      state.formatPattern = savedFormat;
    } else {
      state.formatPattern = DEFAULT_FORMAT;
    }
    elements.formatInput.value = state.formatPattern;

    // 現在時刻のセット
    syncTimeInputFromDate(state.selectedDate);

    // プリセットの生成
    renderPresets();

    // カレンダーの初期描画
    renderCalendar();

    // 初期結果の描画
    updateResult();

    // イベントリスナーのセットアップ
    setupEventListeners();
  }

  // 実行開始
  init();
})();
