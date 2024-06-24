// ==UserScript==
// @name         Ads Remover
// @namespace    https://github.com/tientq64/userscripts
// @version      0.3.1
// @description  Remove all ads.
// @author       https://github.com/tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match        *://*/*
// @license      MIT
// @grant        none
// @noframes
// ==/UserScript==

const css = (strs: TemplateStringsArray): string => strs.join('')

const matchers: Matchers = {
	'diep.io/*': {
		css: css`
			.definitive-ad {
				display: none !important;
			}
		`
	},
	'tetr.io/*': {
		css: css`
			.ceriad {
				display: none !important;
			}
		`
	}
}

for (const pattern in matchers) {
	const matcher = matchers[pattern]
	console.log(matcher)
	if (matchURL(pattern)) {
		if (matcher.css) {
			const styleEl: HTMLStyleElement = document.createElement('style')
			styleEl.textContent = matcher.css
			document.head.appendChild(styleEl)
		}
		matcher.js?.()
	}
}

function matchURL(pattern: string): boolean {
	const regexStr: string = pattern
		.replace(/^(?!([a-z]+|\*):\/\/)/, 'https://')
		.replace(/(?<!\\)[*+?^$]/g, (ch) => {
			switch (ch) {
				case '*':
					return '[^/]*'
				case '+':
					return '[^/]+'
				case '?':
					return '[^/]'
				case '^':
				case '$':
					return `\\${ch}`
			}
		})
	const regex: RegExp = RegExp(`^${regexStr}$`)
	return regex.test(location.href)
}

type Matcher = {
	css?: string
	js?: () => void
}

type Matchers = Record<string, Matcher>
