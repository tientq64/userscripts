// ==UserScript==
// @name         No Fullscreen Dropdown
// @namespace    https://github.com/tientq64/userscripts
// @version      0.2.0
// @description  Real fullscreen instead of fullscreen dropdown, very annoying when playing games. Useful for Microsoft Edge. Press Shift+F11 to toggle fullscreen.
// @author       https://github.com/tientq64
// @match        https://*
// @license      MIT
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', (event) => {
	if (event.repeat) return

	const { key, shiftKey, ctrlKey, altKey, metaKey } = event

	if (key === 'F11' && shiftKey && !ctrlKey && !altKey && !metaKey) {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			document.body.requestFullscreen()
		}
	}
})
