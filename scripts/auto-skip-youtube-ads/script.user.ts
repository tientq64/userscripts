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
// @name:th            ข้ามโฆษณา YouTube อัตโนมัติ
// @namespace          https://github.com/tientq64/userscripts
// @version            4.0.1
// @description        Automatically skip YouTube ads almost instantly. Very lightweight and efficient.
// @description:vi     Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Rất nhẹ và hiệu quả.
// @description:zh-CN  几乎立即自动跳过 YouTube 广告。非常轻量且高效。
// @description:zh-TW  幾乎立即自動跳過 YouTube 廣告。非常輕巧且高效。
// @description:ja     YouTube 広告をほぼ瞬時に自動的にスキップします。非常に軽量で効率的です。
// @description:ko     YouTube 광고를 거의 즉시 자동으로 건너뜁니다. 매우 가볍고 효율적입니다.
// @description:es     Omita automáticamente los anuncios de YouTube casi al instante. Muy ligero y eficiente.
// @description:ru     Автоматически пропускайте рекламу на YouTube практически мгновенно. Очень легкий и эффективный.
// @description:id     Lewati iklan YouTube secara otomatis hampir seketika. Sangat ringan dan efisien.
// @description:hi     YouTube विज्ञापनों को लगभग तुरंत ही स्वचालित रूप से छोड़ दें। बहुत हल्का और कुशल।
// @description:th     ข้ามโฆษณา YouTube โดยอัตโนมัติเกือบจะในทันที น้ำหนักเบามากและมีประสิทธิภาพ
// @author             tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/2504/2504965.png
// @match              https://www.youtube.com
// @match              https://www.youtube.com/*
// @grant              none
// @license            MIT
// @compatible         firefox
// @compatible         chrome
// @compatible         opera
// @compatible         safari
// @compatible         edge
// @noframes
// ==/UserScript==

function skipAd(): void {
	setTimeout(skipAd, document.hidden ? 1000 : 500)

	const adPlayer = document.querySelector<HTMLDivElement>('#movie_player.ad-showing')
	if (adPlayer) {
		const skipButton = document.querySelector<HTMLElement>(`
			.ytp-skip-ad-button,
			.ytp-ad-skip-button,
			.ytp-ad-skip-button-modern
		`)
		if (skipButton) {
			skipButton.click()
			log('Skip button clicked')
		} else {
			const adVideo: HTMLVideoElement = getVideo()
			adVideo.currentTime = 9999
			log('Unskippable ad video have been skipped')
		}
	}

	const dismissButton = document.querySelector<HTMLElement>('tp-yt-paper-dialog #dismiss-button')
	if (dismissButton) {
		log('Reload the page to bypass the ad blocker warning and the initially paused video')
		location.reload()
	}
}

function getVideo(): HTMLVideoElement {
	return document.querySelector('#movie_player video.html5-main-video')
}

function log(text: string): void {
	const date: Date = new Date()
	console.log(
		`\x1B[41;97m Auto Skip YouTube Ads \x1B[m\x1B[47;30m ${date.toLocaleTimeString()} \x1B[m\n${text}`
	)
}

skipAd()

const style: HTMLStyleElement = document.createElement('style')
style.textContent = `
	#player-ads,
	#masthead-ad,
	#panels:has(ytd-ads-engagement-panel-content-renderer),
	ytd-ad-slot-renderer,
	ytd-rich-item-renderer:has(.ytd-ad-slot-renderer),
	ytd-reel-video-renderer:has(.ytd-ad-slot-renderer),
	tp-yt-paper-dialog:has(#dismiss-button) {
		display: none !important;
	}`
document.head.appendChild(style)

log(`Initialized`)
