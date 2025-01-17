// ==UserScript==
// @name         Tetr.io Improvements
// @namespace    https://github.com/tientq64/userscripts
// @version      0.0.1
// @description  Provides improvements for Tetr.io game.
// @author       tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tetr.io
// @match        https://tetr.io/*
// @match        https://ch.tetr.io/*
// @grant        GM_addStyle
// @license      MIT
// @noframes
// ==/UserScript==

const adElsSelectors: string[] = [
	'#ceriad-auth-return-lb',
	'#ceriad-menus-persistent-mpu',
	'iframe'
]
const adElsSelector: string = adElsSelectors.join(',')

function removeAds(): void {
	const adEls = document.querySelectorAll(adElsSelector)
	for (const adEl of adEls) {
		adEl.remove()
	}
}

window.setInterval(removeAds, 5000)

GM_addStyle(`
	* {
		transition: none !important;
	}
`)
