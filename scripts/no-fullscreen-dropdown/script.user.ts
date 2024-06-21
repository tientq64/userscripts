// ==UserScript==
// @name         No Fullscreen Dropdown
// @namespace    https://github.com/tientq64/userscripts
// @version      0.3.1
// @description  Real fullscreen instead of fullscreen dropdown, very annoying when playing games. Useful for Microsoft Edge. Press Shift+F11 to toggle fullscreen.
// @author       https://github.com/tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/4785/4785776.png
// @match        *://*/*
// @license      MIT
// @grant        none
// @noframes
// ==/UserScript==

window.addEventListener('keydown', (event): void => {
	if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return

	if (event.code === 'F11' && event.shiftKey) {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			document.documentElement.requestFullscreen()
		}
	}
})
