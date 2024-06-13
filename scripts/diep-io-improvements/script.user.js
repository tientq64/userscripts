// ==UserScript==
// @name         [Diep.io] Improvements
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  Provides improvements for Diep.io game.
// @author       https://github.com/tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @match        https://diep.io/*
// @require      https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js
// @require      https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js
// @require      https://cdn.jsdelivr.net/npm/immer@9.0.21/dist/immer.umd.production.min.js
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @resource     TAILWINDCSS https://raw.githubusercontent.com/tientq64/userscripts/main/.resources/tailwind.min.css')}
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @license      MIT
// @noframes
// ==/UserScript==

Event.prototype.preventDefault = () => {}
const css = `
	${GM_getResourceText('TAILWINDCSS')}
	:focus {
		outline: none;
	}
	#canvas {
		cursor: crosshair !important;
	}
`
GM_addStyle(css)
const { useState, useEffect } = React
const { produce } = immer
const { countBy, some } = _
function App() {
	const [stats] = useState([
		{
			key: 1,
			color: '#eeb690'
		},
		{
			key: 2,
			color: '#ec6cf0'
		},
		{
			key: 3,
			color: '#9466ea'
		},
		{
			key: 4,
			color: '#6c96f0'
		},
		{
			key: 5,
			color: '#f0d96c'
		},
		{
			key: 6,
			color: '#f06c6c'
		},
		{
			key: 7,
			color: '#98f06c'
		},
		{
			key: 8,
			color: '#6cf0ec'
		}
	])
	const [upgrade, setUpgrade] = useState('')
	const [isUpgradeShown, setIsUpgradeShown] = useState(false)
	const handleUpgradeChange = (event) => {
		const { value } = event.target
		if (/[^1-8]/.test(value) || some(countBy(value), (v) => v > 7)) {
			const selectionStart = event.target.selectionStart - 1
			setTimeout(() => {
				event.target.selectionStart = selectionStart
				event.target.selectionEnd = selectionStart
			})
			return
		}
		setUpgrade(value)
	}
	const handleUpgradeKeyDown = (event) => {
		if (/^((Digit|Numpad)[1-8]|Arrow(Up|Down|Left|Right))$/.test(event.code)) {
			event.stopPropagation()
		}
		if (event.code === 'Enter') {
			event.stopPropagation()
			input.execute(`game_stats_build ${upgrade}`)
			setIsUpgradeShown(false)
		}
	}
	const handleGlobalKeyDown = (event) => {
		if (event.repeat || event.ctrlKey || event.shiftKey || event.metaKey) return
		if (document.activeElement.localName === 'd-base') return
		switch (event.code) {
			case 'KeyT':
				setIsUpgradeShown((prev) => !prev)
				break
			case 'KeyG':
				input.grantReward()
				break
		}
	}
	useEffect(() => {
		window.addEventListener('keydown', handleGlobalKeyDown)
	}, [])
	return React.createElement(
		'div',
		{ className: 'h-full' },
		isUpgradeShown &&
			React.createElement(
				'div',
				{
					className:
						'flex absolute bottom-7 left-72 p-4 gap-4 rounded-lg bg-gray-800/90 pointer-events-auto'
				},
				React.createElement(
					'div',
					{ className: 'flex flex-col gap-3' },
					React.createElement(
						'div',
						{ className: 'flex-1 w-60' },
						stats.map((stat) =>
							React.createElement(
								'div',
								{ className: 'flex items-center gap-2' },
								React.createElement('div', { className: 'font-mono' }, stat.key),
								React.createElement(
									'div',
									{ className: 'flex-1 flex gap-1 rounded-lg overflow-hidden' },
									Array(7)
										.fill(0)
										.map((_, index) =>
											React.createElement('div', {
												className: 'flex-1 h-5',
												style: {
													backgroundColor:
														index < countBy(upgrade)[stat.key] ? stat.color : '#111827'
												}
											})
										)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'relative flex font-mono' },
						React.createElement('input', {
							className: 'min-w-0 px-2 py-1 rounded-lg bg-gray-900 cursor-text',
							autoFocus: true,
							maxLength: 33,
							size: 31,
							value: upgrade,
							onChange: handleUpgradeChange,
							onKeyDown: handleUpgradeKeyDown
						}),
						React.createElement(
							'div',
							{ className: 'absolute inset-0 px-2 py-1 text-gray-500 pointer-events-none' },
							Array(33).fill('\xa0').fill('\xb7', upgrade.length).join('')
						)
					)
				)
			)
	)
}
const rootEl = document.createElement('div')
rootEl.className = 'absolute inset-0 pointer-events-none z-[999]'
document.body.appendChild(rootEl)
ReactDOM.render(React.createElement(App, null), rootEl)
