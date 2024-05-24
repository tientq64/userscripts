// ==UserScript==
// @name         No Fullscreen Dropdown
// @namespace    https://github.com/tientq64/userscripts
// @version      0.3.0
// @description  Real fullscreen instead of fullscreen dropdown, very annoying when playing games. Useful for Microsoft Edge. Press Shift+F11 to toggle fullscreen.
// @author       https://github.com/tientq64
// @match        *://*/*
// @license      MIT
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', (event) => {
	if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return

	if (event.key === 'F11' && event.shiftKey) {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			document.documentElement.requestFullscreen()
		}
	}
})
