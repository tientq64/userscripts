## 📰 Introduction

Automatically skip YouTube ads almost instantly. Remove the ad blocker warning pop-up.

几乎立即自动跳过 YouTube 广告。删除广告拦截器警告弹出窗口。

Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Loại bỏ cửa sổ bật lên cảnh báo trình chặn quảng cáo.

## 📑 Changelog

### 5.3.0 - 2025-01-23

-   Supports older browser versions.

### 5.2.0 - 2025-01-21

-   Support for **YouTube mobile** version 🎉
-   Revisit fix for issue [#2]: Fully resolved the problem where videos couldn't be paused on mobile. The previous fix was incomplete.

### 5.1.3 - 2025-01-18

-   Fix ad skipping issue.

### 5.1.2 - 2025-01-17

-   Fix issue [#2] where video can't be paused on mobile.

### 5.1.1 - 2024-12-27

-   Hide the survey to rate suggested content, located at bottom right.

### 5.1.0 - 2024-12-26

-   Skip pie countdown ads 🎉

### 5.0.0 - 2024-12-25

_Merry Christmas!_

-   **No need to reload the page** when there is no way to skip the ad anymore 🤯
-   Configuration removed, no longer needed.

### 4.8.2 - 2024-12-21

-   Fix timestamp loss when reloading.

### 4.8.1 - 2024-12-03

-   Hide survey dialog on home page.

### 4.8.0 - 2024-11-26

-   The current video's timestamp will be preserved when the page is reloaded ([#267857]).

### 4.7.4 - 2024-11-20

-   Improved ad skipping.

### 4.7.0 - 2024-10-26

-   Add option "Don't reload while the user is busy" in Tampermonkey's menu to avoid reloading page when user is busy doing something, like reading comments, entering text. Enabled by default.

### 4.6.2 - 2024-10-13

-   Improve hiding of ad banners.

### 4.6.0 - 2024-10-07

-   Support skipping ads on **YouTube Music** (PR [#1]).

### 4.5.2 - 2024-09-30

-   Fix Shorts reload infinitely ([#258626], [#259545], [#261679]).

### 4.5.0 - 2024-09-26

-   Add option to enable/disable "Reload the page when there is no other way to skip ads" feature in Tampermonkey's menu. Enabled by default.\
    ![Screenshot-001]

### 4.4.0 - 2024-08-30

-   Automatically reload web page when ad blocker warnings appear.

### 4.3.13 - 2024-08-26

-   Fixed bug where video could not be paused using pause/play key on keyboard or media controls ([#257424]).
-   Improve the performance.

### 4.3.9 - 2024-08-21

-   Fix `@match` invalid syntax ([#256841]).

### 4.3.8 - 2024-08-20

-   Fix the issue of removing ad videos in Shorts.

### 4.3.6 - 2024-08-07

-   Fix bug where video rewinds a segment after skipping an ad ([#254113]).

### 4.3.4 - 2024-08-02

-   Improve the performance.

### 4.2.1 - 2024-07-30

-   Fixed video automatically replay when ended.

### 4.2.0 - 2024-07-30

-   Videos will now no longer occasionally pause due to ad blocker use.
-   Faster ad video skipping speed.

### 4.1.0 - 2024-07-10

-   No need to reload the page when the ad blocker warning dialog appears.

### 4.0.0 - 2024-07-09

-   The page will now reload if an ad blocker warning dialog appears. Because YouTube now pauses the video at first if an ad blocker is detected.
-   Write to the Console every time skip an ad video, etc. Purpose to help debug. To open the Console, press `Ctrl+Shift+J`.

### 3.1.2 - 2024-07-06

-   Playing video after clicking dismiss the ad blocker warning popup.

### 3.1.1 - 2024-07-04

-   Add a few CSS that hides the ads.

### 3.1.0 - 2024-07-02

-   Skip ads faster when the tab is active.
-   Fixed bug when set time to end of ad video without the video duration being available.
-   Change icon.

### 3.0.2 - 2024-06-28

-   Rewriting to only use `setInterval` simplifies things, and fix some bugs.

### 2.1.3 - 2024-06-21

-   Fix `popupContainer` not found error.

### 2.1.0 - 2024-06-20

-   Auto close YouTube's ad blocker warning popup.

### 2.0.1 - 2024-06-19

-   Improved skip ad button detection.
-   Fall back to `setInterval` when `MutationObserver` is not supported.

### 2.0.0 - 2024-06-18

-   Rewrite the entire code, use `MutationObserver` instead of `setInterval`.

### 1.0.0 - 2024-06-17

-   Stable release.

## 💳 Credits

<a href="https://www.flaticon.com/free-icons/youtube" title="youtube icons">Youtube icons created by Ruslan Babkin - Flaticon</a>.

[#2]: https://github.com/tientq64/userscripts/issues/2
[#267857]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/267857
[#258626]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/258626
[#259545]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/259545
[#261679]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/261679
[#257424]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/257424
[#256841]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/256841
[#254113]: https://greasyfork.org/scripts/498197-auto-skip-youtube-ads/discussions/254113
[#1]: https://github.com/tientq64/userscripts/pull/1
[Screenshot-001]: https://cdn.jsdelivr.net/gh/tientq64/userscripts/scripts/Auto-Skip-YouTube-Ads/assets/screenshot-001.png
