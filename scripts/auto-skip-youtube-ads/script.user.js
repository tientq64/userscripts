// ==UserScript==
// @name         Auto Skip YouTube Ads
// @name:vi      Tự Động Bỏ Qua Quảng Cáo YouTube
// @namespace    https://github.com/tientq64/userscripts
// @version      2.1.0
// @description  Auto skip YouTube ads instantly. Very lightweight and efficient.
// @description:vi  Tự động bỏ qua quảng cáo YouTube ngay lập tức. Rất nhẹ và hiệu quả.
// @author       https://github.com/tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match        https://www.youtube.com/*
// @grant        none
// @license      MIT
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/auto-skip-youtube-ads
// ==/UserScript==

function skipAd() {
	const hasAd = player.classList.contains('ad-showing')
	if (hasAd) {
		const skipButton = document.querySelector('.ytp-skip-ad-button, .ytp-ad-skip-button')
		if (skipButton) {
			skipButton.click()
		} else {
			const video = getVideo()
			video.currentTime = video.duration
		}
	}
	const dismissButton = popupContainer.querySelector('tp-yt-paper-dialog #dismiss-button')
	if (dismissButton) {
		dismissButton.click()
		const dialog = dismissButton.closest('tp-yt-paper-dialog')
		dialog.remove()
		const video = getVideo()
		video.play()
	}
}
function getVideo() {
	return player.querySelector('video')
}
const player = document.querySelector('.html5-video-player')
const popupContainer = document.querySelector('ytd-popup-container')
if (window.MutationObserver) {
	const adObserver = new MutationObserver(skipAd)
	adObserver.observe(player, { attributeFilter: ['class'] })
	const warningObserver = new MutationObserver(skipAd)
	warningObserver.observe(popupContainer, { childList: true })
} else {
	setInterval(skipAd, 1000)
}
skipAd()
const style = document.createElement('style')
style.textContent = `
	#player-ads,
	#masthead-ad,
	ytd-rich-item-renderer:has(.ytd-ad-slot-renderer),
	ytd-reel-video-renderer:has(.ytd-ad-slot-renderer),
	tp-yt-paper-dialog:has(#dismiss-button) {
		display: none !important;
	}
`
document.head.appendChild(style)
