// ==UserScript==
// @name         Auto Skip Youtube Ads
// @name:vi      Tự Động Bỏ Qua Quảng Cáo YouTube
// @namespace    https://github.com/tientq64/userscripts
// @version      2.0.0
// @description  Auto skip ads on YouTube. Very lightweight and efficient.
// @description:vi  Tự động bỏ qua quảng cáo trên YouTube. Rất nhẹ và hiệu quả.
// @author       https://github.com/tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match        https://www.youtube.com/*
// @grant        none
// @license      MIT
// @noframes
// ==/UserScript==

function skipAd(): void {
	const hasAd: boolean = player.classList.contains('ad-showing')
	if (!hasAd) return

	const skipButton = document.querySelector<HTMLElement>('.ytp-skip-ad-button')
	if (skipButton) {
		skipButton.click()
		return
	}

	const video = player.querySelector<HTMLVideoElement>('video')
	video.currentTime = video.duration
}

const player = document.querySelector<HTMLVideoElement>('.html5-video-player')

const observer: MutationObserver = new MutationObserver(skipAd)
observer.observe(player, { attributeFilter: ['class'] })

skipAd()

const style: HTMLStyleElement = document.createElement('style')
style.textContent = `
	#player-ads {
		display: none !important;
	}
`
document.head.appendChild(style)
