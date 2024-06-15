// ==UserScript==
// @name         Auto Skip Youtube Ads
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  Auto skip Youtube ads.
// @author       https://github.com/tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @license      MIT
// @noframes
// ==/UserScript==

function skipAd(): void {
	const adVideo = document.querySelector<HTMLVideoElement>('.ad-showing video')
	if (adVideo === null) return

	const skipAdButton = document.querySelector<HTMLElement>('.ytp-skip-ad-button')

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
