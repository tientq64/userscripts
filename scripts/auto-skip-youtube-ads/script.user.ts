// ==UserScript==
// @name               Auto Skip YouTube Ads
// @name:vi            Tự Động Bỏ Qua Quảng Cáo YouTube
// @name:zh-CN         自动跳过 YouTube 广告
// @name:es            Saltar automáticamente anuncios de YouTube
// @name:ru            Автоматический пропуск рекламы на YouTube
// @namespace          https://github.com/tientq64/userscripts
// @version            3.0.2
// @description        Auto skip YouTube ads almost instantly. Very lightweight and efficient.
// @description:vi     Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Rất nhẹ và hiệu quả.
// @description:zh-CN  几乎立即自动跳过 YouTube 广告。非常轻量且高效。
// @description:es     Salta automáticamente los anuncios de YouTube casi al instante. Muy ligero y eficiente.
// @description:ru     Автоматический пропуск рекламы на YouTube почти мгновенно. Очень легкий и эффективный.
// @author             https://github.com/tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match              https://www.youtube.com
// @match              https://www.youtube.com/*
// @grant              none
// @license            MIT
// @noframes
// ==/UserScript==

function skipAd(): void {
	const adPlayer = document.querySelector<HTMLElement>('.html5-video-player.ad-showing')
	if (adPlayer) {
		const skipButton = document.querySelector<HTMLElement>(
			'.ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern'
		)
		if (skipButton) {
			skipButton.click()
		} else {
			const video = adPlayer.querySelector<HTMLVideoElement>('video')
			video.currentTime = video.duration
		}
	}

	const dismissButton = document.querySelector<HTMLElement>('tp-yt-paper-dialog #dismiss-button')
	if (dismissButton) {
		dismissButton.click()
		const dialog: HTMLElement = dismissButton.closest('tp-yt-paper-dialog')
		dialog.remove()
	}
}

setInterval(skipAd, 1000)
skipAd()

const style: HTMLStyleElement = document.createElement('style')
style.textContent = `
	#player-ads,
	#masthead-ad,
	#panels:has(ytd-ads-engagement-panel-content-renderer),
	ytd-rich-item-renderer:has(.ytd-ad-slot-renderer),
	ytd-reel-video-renderer:has(.ytd-ad-slot-renderer),
	tp-yt-paper-dialog:has(#dismiss-button) {
		display: none !important;
	}`
document.head.appendChild(style)
