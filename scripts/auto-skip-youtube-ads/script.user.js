// ==UserScript==
// @name         Auto Skip Youtube Ads
// @name:vi      Tự Động Bỏ Qua Quảng Cáo YouTube
// @namespace    https://github.com/tientq64/userscripts
// @version      1.0.0
// @description  Auto skip ads on YouTube.
// @author       https://github.com/tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @license      MIT
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/auto-skip-youtube-ads
// @updateURL    https://github.com/tientq64/userscripts/raw/main/scripts/auto-skip-youtube-ads/script.user.js
// @downloadURL  https://github.com/tientq64/userscripts/raw/main/scripts/auto-skip-youtube-ads/script.user.js
// ==/UserScript==

function skipAd() {
	const adVideo = document.querySelector('.ad-showing video')
	if (adVideo === null) return
	const skipAdButton = document.querySelector('.ytp-skip-ad-button')
	if (skipAdButton) {
		skipAdButton.click()
	} else {
		adVideo.currentTime = adVideo.duration
	}
}
GM_addStyle(`
	#player-ads {
		display: none !important;
	}
`)
setInterval(skipAd, 1000)
