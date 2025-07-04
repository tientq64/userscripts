// ==UserScript==
// @name         Miến AI Music
// @namespace    https://github.com/tientq64/userscripts
// @version      1.1.0
// @description  Các tiện ích cho kênh Youtube Miến AI Music.
// @author       tientq64
// @icon         https://i.ytimg.com/an/-Eg4rifYD_EBCC_tp_eJwQ/featured_channel.jpg?v=6657867e
// @match        https://suno.com/*
// @match        https://accounts.suno.com/sign-in?*
// @match        https://accounts.google.com/o/oauth2/**
// @match        https://translate.google.com.vn/*
// @match        https://www.google.com/search?*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        window.onurlchange
// @license      MIT
// @noframes
// ==/UserScript==

namespace MienAIMusic {
	const cleanupCbs = new Set<() => unknown>()

	function cleanup(cb: () => unknown): void {
		cleanupCbs.add(cb)
	}

	let accountEmails: string[] = []
	let accountEmailsInput = GM_getValue<string>('accountEmails', '')

	async function wait(ms: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms)
		})
	}

	function click(selector: string): void {
		const el = document.querySelector<HTMLElement>(selector)
		el?.click()
	}

	function queryContentIncludes<T = HTMLElement>(
		selector: string,
		text: string,
		isIncludes: boolean = false
	): T | null {
		const els: NodeList = document.querySelectorAll(selector)
		for (const el of els) {
			if (el.textContent === null) continue
			if (
				(isIncludes && el.textContent.includes(text)) ||
				(!isIncludes && el.textContent === text)
			) {
				if (el instanceof HTMLElement) {
					return el as T
				}
			}
		}
		return null
	}

	function clickIfContentIncludes(
		selector: string,
		text: string,
		isIncludes: boolean = false
	): void {
		const el = queryContentIncludes(selector, text, isIncludes)
		el?.click()
	}

	function embedCode(strs: TemplateStringsArray, ...vals: unknown[]): string {
		let result: string = ''
		for (let i = 0; i < strs.length - 1; i++) {
			result += strs[i] + String(vals[i])
		}
		result += strs.at(-1)
		return result
	}
	const css = embedCode

	let oldSimpleUrl: string = ''

	async function handleUrlChange(): Promise<void> {
		const simpleUrl: string = (location.hostname + location.pathname)
			.replace(/^www\./, '')
			.replace(/\/$/, '')
		if (simpleUrl === oldSimpleUrl) return

		oldSimpleUrl = simpleUrl

		cleanupCbs.forEach((cb) => {
			cb()
		})
		cleanupCbs.clear()

		async function switchAccount(accountEmail: string): Promise<void> {
			GM_setValue('accountEmail', accountEmail)
			clickIfContentIncludes('.chakra-menu__menuitem', 'Sign Out')
			await wait(2000)
			clickIfContentIncludes('button:has(> span)', 'Sign In')
			await wait(1000)
			click('.cl-socialButtonsIconButton__google')
		}

		async function inputEmails(): Promise<void> {
			while (accountEmailsInput === '') {
				accountEmailsInput =
					prompt(
						'Nhập danh sách email đăng nhập, không bao gồm "@gmail.com", phân tách bởi dấu phẩy:'
					) ?? ''
				accountEmailsInput = accountEmailsInput.trim()
				if (accountEmailsInput === '') continue
				GM_setValue('accountEmails', accountEmailsInput)
			}
			accountEmails = accountEmailsInput.split(/, */)
		}

		async function renderAccountEmails(): Promise<void> {
			if (!simpleUrl.startsWith('suno.com')) return
			if (document.body.dataset.renderedAccountEmails !== undefined) return

			document.body.dataset.renderedAccountEmails = '1'
			await wait(2000)
			const siblingEl = document.querySelector<HTMLAnchorElement>('a[href="/search"]')
			if (siblingEl === null) {
				document.body.dataset.renderedAccountEmails = undefined
				return
			}
			const emailName = queryContentIncludes('.chakra-text', '@gmail.com', true)
				?.textContent?.replace('@gmail.com', '')
				.toLowerCase()
			for (const accountEmail of accountEmails.slice().reverse()) {
				const el = document.createElement('button')
				el.style.paddingLeft = '40px'
				el.style.textAlign = 'left'
				el.textContent = accountEmail
				if (accountEmail === emailName) {
					el.style.color = 'limegreen'
					el.style.paddingLeft = '26px'
					el.textContent = `> ${accountEmail}`
				}
				el.addEventListener('click', () => {
					switchAccount(accountEmail)
				})
				siblingEl.after(el)
			}
		}

		await inputEmails()

		function handleWindowKeyDown(event: KeyboardEvent): void {
			if (event.repeat) return
			if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return
			if (document.activeElement!.matches('input, textarea, select')) return

			const audio = document.querySelector<HTMLAudioElement>('audio#active-audio-play')

			const { code } = event
			switch (code) {
				case 'F1':
				case 'F2':
				case 'F3':
				case 'F4':
				case 'F5':
				case 'F6':
					{
						event.preventDefault()
						const accountIndex: number = Number(code.slice(-1)) - 1
						const accountEmail: string = accountEmails[accountIndex]
						switchAccount(accountEmail)
					}
					break

				case 'Backquote':
				case 'Digit1':
				case 'Digit2':
				case 'Digit3':
				case 'Digit4':
				case 'Digit5':
				case 'Digit6':
				case 'Digit7':
				case 'Digit8':
				case 'Digit9':
				case 'Digit0':
					if (audio) {
						if (audio.src) {
							let part = 0
							if (code.startsWith('Digit')) {
								part = Number(code.slice(-1))
							}
							audio.currentTime = audio.duration * (part / 10)
						}
					}
					break

				case 'ArrowLeft':
				case 'ArrowRight':
					if (audio) {
						if (audio.src) {
							const amount = code === 'ArrowLeft' ? -5 : 5
							audio.currentTime += amount
						}
					}
					break
			}
		}
		window.addEventListener('keydown', handleWindowKeyDown)
		cleanup(() => {
			window.removeEventListener('keydown', handleWindowKeyDown)
		})

		if (simpleUrl.startsWith('suno.com')) {
			if (simpleUrl === 'suno.com') {
				location.pathname = '/me'
			} //
			else {
				if (simpleUrl === 'suno.com/me') {
					await wait(2000)
					clickIfContentIncludes('button.bg-transparent', 'Liked')
					;(document.activeElement as HTMLElement).blur()
				}
				renderAccountEmails()
			}
		} //
		else if (simpleUrl.startsWith('accounts.suno.com/sign-in')) {
			await wait(500)
			click('.cl-socialButtonsIconButton__google')
		} //
		else if (simpleUrl.startsWith('accounts.google.com/o/oauth2/')) {
			const accountEmail = await GM_getValue('accountEmail')
			if (typeof accountEmail === 'string') {
				GM_deleteValue('accountEmail')
				const emailText: string = `${accountEmail}@gmail.com`
				await wait(600)
				click(`[data-identifier="${emailText}"]`)
			}
		} //
		else if (simpleUrl.startsWith('google.com/search')) {
			const els = document.querySelectorAll<HTMLDivElement>(
				'[data-lyricid] > div > :nth-child(2) > div'
			)
			for (const el of els) {
				el.style.marginBottom = '-8px'
				const br: HTMLBRElement = document.createElement('br')
				el.after(br)
			}
		}
	}

	GM_addStyle(css`
		*,
		:before,
		:after {
			backdrop-filter: none !important;
			box-shadow: none !important;
		}
		body,
		.font-sans,
		[role='menuitem'] {
			font-family: 'IBM Plex Sans', sans-serif !important;
		}
		.font-serif {
			font-family: 'Palatino Linotype', serif;
			font-weight: 700;
		}
		.sticky {
			position: unset !important;
		}
		.css-1w1f2eu {
			white-space: normal !important;
		}
		.w-split-bar + :has(.bg-vinylBlack-darker) {
			width: 320px !important;
		}
	`)

	window.addEventListener('urlchange', handleUrlChange)
	handleUrlChange()
}
