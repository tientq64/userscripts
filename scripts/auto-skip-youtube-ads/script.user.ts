// ==UserScript==
// @name               Auto Skip YouTube Ads
// @name:vi            Tự Động Bỏ Qua Quảng Cáo YouTube
// @name:zh-CN         自动跳过 YouTube 广告
// @name:zh-TW         自動跳過 YouTube 廣告
// @name:ja            YouTube 広告を自動スキップ
// @name:ko            YouTube 광고 자동 건너뛰기
// @name:es            Saltar Automáticamente Anuncios De YouTube
// @name:ru            Автоматический Пропуск Рекламы На YouTube
// @name:id            Lewati Otomatis Iklan YouTube
// @name:hi            YouTube विज्ञापन स्वचालित रूप से छोड़ें
// @namespace          https://github.com/tientq64/userscripts
// @version            3.0.4
// @description        Auto skip YouTube ads almost instantly. Very lightweight and efficient.
// @description:vi     Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Rất nhẹ và hiệu quả.
// @description:zh-CN  几乎立即自动跳过 YouTube 广告。非常轻量且高效。
// @description:zh-TW  幾乎立即自動跳過 YouTube 廣告。非常輕巧且高效。
// @description:ja     YouTube 広告をほぼ瞬時に自動スキップします。非常に軽量で効率的です。
// @description:ko     YouTube 광고를 거의 즉시 자동으로 건너뜁니다. 매우 가볍고 효율적입니다.
// @description:es     Salta automáticamente los anuncios de YouTube casi al instante. Muy ligero y eficiente.
// @description:ru     Автоматический пропуск рекламы на YouTube почти мгновенно. Очень легкий и эффективный.
// @description:id     Lewati otomatis iklan YouTube hampir seketika. Sangat ringan dan efisien.
// @description:hi     YouTube विज्ञापनों को लगभग तुरंत ही ऑटो स्किप कर दें। बहुत हल्का और कुशल।
// @author             https://github.com/tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match              https://www.youtube.com
// @match              https://www.youtube.com/*
// @grant              none
// @license            MIT
// @compatible         chrome
// @compatible         edge
// @compatible         safari
// @compatible         firefox
// @compatible         opera
// @noframes
// ==/UserScript==

function skipAd(): void {
	const adPlayer = document.querySelector<HTMLElement>('.html5-video-player.ad-showing')
	if (adPlayer) {
		const skipButton = document.querySelector<HTMLElement>(`
			.ytp-skip-ad-button,
			.ytp-ad-skip-button,
			.ytp-ad-skip-button-modern
		`)
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
