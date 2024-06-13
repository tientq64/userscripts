// ==UserScript==
// @name         Google Translate Keyboard Shortcuts
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  keyboard shortcuts for Google Translate.
// @author       https://github.com/tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @match        https://translate.google.com/*
// @match        https://translate.google.com.vn/*
// @grant        none
// @license      MIT
// @noframes
// ==/UserScript==

document.addEventListener('keydown', (event) => {
	const { repeat, code, altKey, ctrlKey, shiftKey, metaKey } = event
	if (repeat) return
	const inputEl = document.querySelector('textarea')
	function click(selector) {
		const el = document.querySelector(selector)
		el?.click()
	}
	function clickSourceLanguage(languageCode) {
		click(
			`[role=listbox]:has([data-language-code=auto]) [role=option][data-language-code=${languageCode}][aria-selected=false]`
		)
	}
	function clickDestinationLanguage(languageCode) {
		click(
			`[role=listbox]:not(:has([data-language-code=auto])) [role=option][data-language-code=${languageCode}][aria-selected=false]`
		)
	}
	if (altKey) {
		switch (code) {
			case 'KeyS':
				click('[aria-label*="(Ctrl+Shift+S)"]')
				break
			case 'KeyA':
				clickSourceLanguage('en')
				clickDestinationLanguage('vi')
				break
			case 'KeyV':
				clickSourceLanguage('vi')
				clickDestinationLanguage('en')
				break
			case 'Backspace':
				inputEl.value = ''
				inputEl.focus()
				break
		}
	}
	if (event.location === 0 && !altKey && !ctrlKey && !shiftKey && !metaKey) {
		inputEl.focus()
	}
})
