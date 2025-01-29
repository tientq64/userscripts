// ==UserScript==
// @name         Tetr.io Improvements
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  Provides improvements for Tetr.io game.
// @author       tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tetr.io
// @match        https://tetr.io/*
// @match        https://ch.tetr.io/*
// @grant        GM_addStyle
// @license      MIT
// @noframes
// ==/UserScript==

namespace TetrIOImprovements {
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

	function handleWindowKeyDown(event: KeyboardEvent): void {
		switch (event.code) {
			case 'Escape':
				if (document.activeElement instanceof HTMLElement) {
					document.activeElement.blur()
				}
				break

			case 'Home':
				{
					const joinBtn = document.querySelector<HTMLDivElement>('#return_button')
					if (joinBtn?.checkVisibility()) {
						joinBtn.click()
					}
					const playMultiBtn = document.querySelector<HTMLDivElement>('#play_multi')
					if (playMultiBtn?.checkVisibility()) {
						playMultiBtn.click()
					}
					const multiLeagueBtn = document.querySelector<HTMLDivElement>('#multi_league')
					if (multiLeagueBtn?.checkVisibility()) {
						multiLeagueBtn.click()
					}
					const enterMatchMakingBtn =
						document.querySelector<HTMLDivElement>('#enter_matchmaking')
					if (enterMatchMakingBtn?.checkVisibility()) {
						enterMatchMakingBtn.click()
					}
				}
				break

			case 'End':
				{
					const backToLeagueBtn = document.querySelector<HTMLDivElement>('#backtoleague')
					if (backToLeagueBtn?.checkVisibility()) {
						backToLeagueBtn.click()
					}
				}
				break
		}
	}

	window.setInterval(removeAds, 5000)
	window.addEventListener('keydown', handleWindowKeyDown)

	GM_addStyle(`
	* {
		transition: none !important;
	}
`)
}
