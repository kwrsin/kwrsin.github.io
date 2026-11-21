# DATE STAMP

An intuitive web-based date and time formatting tool with interactive calendar controls, versatile format presets, and dark mode support.

[English](#english) | [日本語](#日本語)

---

## English

### Credits & Authorship

This application is a collaborative creation developed jointly by **kwrsin** and **Antigravity**.

- **kwrsin**: Project Owner, System Architecture, UI/UX Design & Direction
- **Antigravity**: AI Pair Programmer & Co-developer (Google DeepMind)

### Key Features

- **Interactive Calendar & Quick Shift**: Instant jump to "Today", visual day picker, month navigation, and quick offset buttons (`-7d`, `-1d`, `Today`, `+1d`, `+7d`).
- **Dark Mode Support**: Seamless toggle between light and dark themes with system preference detection (`prefers-color-scheme`) and persistent storage.
- **Relative Time Indicator**: Real-time display of relative difference (e.g., "Just now", "Yesterday", "In 3 days") using `Intl.RelativeTimeFormat`.
- **Extended Token Formatting**: Full support for standard and advanced date/time tokens:
  - Date & Time: `YYYY`, `YY`, `MMMM`, `MMM`, `MM`, `M`, `DD`, `D`, `dddd`, `ddd`, `HH`, `H`, `hh`, `h`, `mm`, `m`, `ss`, `s`, `SSS`, `A`/`a`
  - Unix Timestamps: `X` (seconds), `x` (milliseconds)
  - Japanese Era (和暦): `ggg` (e.g. `令和8年`), `gg` (`令和`), `g` (`R`)
  - Timezone: `Z` (e.g. `+09:00`), `ZZ` (e.g. `+0900`)
  - Literal brackets: `[...]`
- **Click-to-Insert Tokens**: Tap any token code in the reference sheet to immediately insert it into the format pattern at the cursor position.
- **Preset Chips**: Instant one-tap presets (ISO 8601, Japanese era format, Unix timestamp, slash date, compact format, etc.).
- **Time Picker**: Second-level precision with a quick "Current Time" button.
- **One-Click & Keyboard Copy**: Instantly copy formatted strings with visual feedback or via global shortcut `Ctrl+C` / `Cmd+C`.
- **Mobile Responsive Design**: Fully optimized for mobile portrait viewports with zero horizontal overflow and adaptive touch controls.
- **Custom Favicon**: Distinctive calendar-themed SVG favicon.
- **Live Locale Detection**: Displays detected browser locale and formats month/day names accordingly.

### Collaboration & Commit Setup

This repository is configured with a commit message template (`.gitmessage`) so that contributions made through human-AI pair programming include:
```gitcommit
Co-authored-by: Antigravity <antigravity@google.com>
```

---

## 日本語

### クレジット / 開発体制

本アプリケーションは、**kwrsin** と **Antigravity** の共同作業によって開発されました。

- **kwrsin**: プロジェクトオーナー、設計・UI/UX仕様策定、開発ディレクション
- **Antigravity**: AIペアプログラマー、実装支援・コード生成（Google DeepMind）

### 主な機能

- **インタラクティブなカレンダー ＆ クイック日付調整**: 月送りナビゲーション、日付ピッカーに加え、素早く日付を変更できるクイックシフトボタン（`-7d`, `-1d`, `Today`, `+1d`, `+7d`）を搭載。
- **ダークモード対応**: OSの設定（`prefers-color-scheme`）に連動しつつ、ヘッダーのトグルボタンでライト/ダークを自由に変更・保存可能。
- **相対時間表示**: 選択中の日時と現在日時の差分を「今日」「昨日」「3日後」「2時間前」のようにリアルタイム表示（`Intl.RelativeTimeFormat`）。
- **トークン大幅拡張**:
  - 日時: `YYYY`, `YY`, `MMMM`, `MMM`, `MM`, `M`, `DD`, `D`, `dddd`, `ddd`, `HH`, `H`, `hh`, `h`, `mm`, `m`, `ss`, `s`, `SSS`, `A`/`a`
  - Unix タイムスタンプ: `X`（秒単位: 1763587400）、`x`（ミリ秒単位: 1763587400123）
  - 和暦（元号）: `ggg`（例: `令和8年` / `令和元年`）、`gg`（例: `令和`）、`g`（例: `R`）
  - タイムゾーン: `Z`（例: `+09:00`）、`ZZ`（例: `+0900`）
  - エスケープ文字: `[...]`
- **トークンクリック挿入**: リファレンス表内のトークンコードをクリックするだけで、フォーマット入力欄のカーソル位置に素早く挿入。
- **プリセット機能**: よく使われるフォーマット（ISO 8601、和暦表記、Unixタイムスタンプ、スラッシュ区切りなど）をワンタップで切り替え。
- **時刻ピッカー**: 秒単位の入力および「Current Time」ボタンによる現在時刻セット。
- **ワンクリック ＆ キーボードショートカットコピー**: フォーマットされた文字列をクリップボードに素早くコピー（ボタン押下または `Ctrl+C` / `Cmd+C` キーに対応）。
- **モバイル・ポートレート完全対応**: スマートフォンの縦向き画面でもボタンやラベルのコンテンツはみ出しを防止し、快適なタッチ操作を実現。
- **ファビコン設定**: アプリの世界観に合わせたカレンダーモチーフのSVGファビコンを装備。
- **ブラウザロケール自動認識**: 現在のロケールバッジ表示と適切な言語表現。

### コミット設定

本リポジトリではコミットメッセージテンプレート（`.gitmessage`）が設定されており、コミット時に `Co-authored-by` を通じて共同作成者情報が自動で記録されます。
