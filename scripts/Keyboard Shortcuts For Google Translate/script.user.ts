// ==UserScript==
// @name         Keyboard Shortcuts For Google Translate
// @name:vi      Phím Tắt Bàn Phím Cho Google Dịch
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  keyboard shortcuts for Google Translate.
// @description:vi  Các phím tắt bàn phím cho Google Dịch.
// @author       tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @match        https://translate.google.com/*
// @match        https://translate.google.com.vn/*
// @grant        none
// @license      MIT
// @noframes
// ==/UserScript==

function click(selector: string): void {
	const el: HTMLElement = document.querySelector(selector)
	el?.click()
}

function clickSourceLanguage(languageCode: string): void {
	click(
		`[role=listbox]:has([data-language-code=auto]) [role=option][data-language-code=${languageCode}][aria-selected=false]`
	)
}

function clickDestinationLanguage(languageCode: string): void {
	click(
		`[role=listbox]:not(:has([data-language-code=auto])) [role=option][data-language-code=${languageCode}][aria-selected=false]`
	)
}

document.addEventListener('keydown', (event) => {
	const { repeat, code, altKey, ctrlKey, shiftKey, metaKey } = event
	if (repeat) return

	const inputEl = document.querySelector<HTMLTextAreaElement>('textarea')

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
