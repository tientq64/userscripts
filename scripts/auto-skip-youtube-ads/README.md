# ⏩ Auto Skip YouTube Ads

Auto skip YouTube ads almost instantly. Very lightweight and efficient.

Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Rất nhẹ và hiệu quả.

## 📑 Changelog

### 3.1.0 (2024-07-02)

#### ✨ Features

- Skip ads faster when the tab is active.

#### 🐛 Bug Fixes

- Fixed bug when set time to end of ad video without the video duration being available.

#### 🎨 Style

- Change icon.

### 3.0.2 (2024-06-28)

#### ♻️ Refactoring

- Rewriting to only use `setInterval` simplifies things, and fix some bugs.

### 2.1.3 (2024-06-21)

#### 🐛 Bug Fixes

- Fix `popupContainer` not found error.

### 2.1.0 (2024-06-20)

#### ✨ Features

- Auto close YouTube's ad blocker warning popup.

### 2.0.1 (2024-06-19)

#### 🛠 Improvements

- Improved skip ad button detection.
- Fall back to `setInterval` when `MutationObserver` is not supported.

### 2.0.0 (2024-06-18)

#### ♻️ Refactoring

- Rewrite the entire code, use `MutationObserver` instead of `setInterval`.

### 1.0.0 (2024-06-17)

#### 🔖 Release

- Stable release.
