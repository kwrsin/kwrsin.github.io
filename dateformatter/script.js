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
  const DEFAULT_FORMAT = 'YYYY-MM-DD';

  const PRESETS = [
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'YYYY-MM-DD (ddd)',
    'YYYY年M月D日 (ddd)',
    'YYYY-MM-DD HH:mm:ss',
    'YYYYMMDD_HHmmss',
    'ddd, DD MMM YYYY',
    'dddd, MMMM D, YYYY'
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
    resultText: document.getElementById('resultText'),
    copyBtn: document.getElementById('copyBtn'),
    copyBtnText: document.getElementById('copyBtnText'),
    calTitle: document.getElementById('calTitle'),
    prevMonthBtn: document.getElementById('prevMonthBtn'),
    nextMonthBtn: document.getElementById('nextMonthBtn'),
    todayBtn: document.getElementById('todayBtn'),
    weekdaysRow: document.getElementById('weekdaysRow'),
    daysGrid: document.getElementById('daysGrid'),
    timeInput: document.getElementById('timeInput'),
    nowTimeBtn: document.getElementById('nowTimeBtn'),
    formatInput: document.getElementById('formatInput'),
    resetFormatBtn: document.getElementById('resetFormatBtn'),
    presetChips: document.getElementById('presetChips')
  };

  // 5. 日付フォーマット処理エンジン
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

    const pad = (n, len = 2) => String(n).padStart(len, '0');

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
      A: hours >= 12 ? 'PM' : 'AM',
      a: hours >= 12 ? 'pm' : 'am'
    };

    // 最長一致でトークンを置換
    const tokenRegex = /(YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|A|a)/g;
    let formatted = escapedPattern.replace(tokenRegex, (match) => {
      return tokenMap[match] !== undefined ? tokenMap[match] : match;
    });

    // エスケープした文字列の復元
    formatted = formatted.replace(/\x00(\d+)\x00/g, (_, idx) => {
      return literals[Number(idx)] || '';
    });

    return formatted;
  }

  // 6. UIの描画更新
  function updateResult() {
    const formatted = formatDate(state.selectedDate, state.formatPattern, currentLocale);
    elements.resultText.textContent = formatted || '(empty)';

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

  // 7. イベントハンドラ
  function setupEventListeners() {
    // コピー処理
    elements.copyBtn.addEventListener('click', async () => {
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
    elements.todayBtn.addEventListener('click', () => {
      const now = new Date();
      state.selectedDate = new Date(now);
      state.viewYear = now.getFullYear();
      state.viewMonth = now.getMonth();
      syncTimeInputFromDate(now);
      renderCalendar();
      updateResult();
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

  // 8. アプリ初期化 (Initialize)
  function init() {
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
