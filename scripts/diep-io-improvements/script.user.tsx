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
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @resource     TAILWINDCSS
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @license      MIT
// @noframes
// ==/UserScript==

namespace diepIO {
	type Stat = {
		key: number
		color: string
	}

	type Preset = {
		text: string
		upgrade: string
	}

	const preventDefault = Event.prototype.preventDefault
	Event.prototype.preventDefault = () => {}

	const css: string = `
		${GM_getResourceText('TAILWINDCSS')}
		:focus {
			outline: none;
		}
		#canvas {
			cursor: crosshair !important;
		}
	`
	GM_addStyle(css)

	const { useState, useEffect, useRef } = React
	const { countBy, some } = _

	function App() {
		const [stats] = useState<Stat[]>([
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

		const [presets] = useState<Preset[]>([
			{
				text: '010-7757-6',
				upgrade: '456782456784567847586884756457475'
			},
			{
				text: '000-7777-5',
				upgrade: '456788456784567847586664756457475'
			},
			{
				text: '000-7757-7',
				upgrade: '456788456784567847586884756457475'
			},
			{
				text: '020-5757-7',
				upgrade: '456788825678856784758264756457475'
			}
		])

		const [upgrade, setUpgrade] = useState<string>('')
		const [isUpgradeShown, setIsUpgradeShown] = useState<boolean>(false)
		const [statsStr, setStatsStr] = useState<string>('')
		const upgradeInputRef = useRef<HTMLInputElement>(null)

		const handleUpgradeChange = (event): void => {
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

		const handleUpgradeKeyDown = (event): void => {
			if (/^((Digit|Numpad)[1-8]|Arrow(Up|Down|Left|Right))$/.test(event.code)) {
				event.stopPropagation()
			}
			if (event.code === 'Enter') {
				event.stopPropagation()
				input.execute(`game_stats_build ${upgrade}`)
				setIsUpgradeShown(false)
			}
		}

		const handlePresetClick = (preset: Preset): void => {
			setUpgrade(preset.upgrade)
			upgradeInputRef.current.focus()
		}

		const handleGlobalKeyDown = (event): void => {
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

		const handleGlobalContextMenu = (event): void => {
			if (['input', 'textarea'].includes(event.target.localName)) return
			preventDefault.call(event)
		}

		const updateUI = (): void => {
			const newStatStr: string = ui.__playerAttributes.attributes
				.map((attr) => attr.slotsFilled)
				.join('/')
			if (newStatStr !== statsStr) {
				setStatsStr(newStatStr)
			}
		}

		useEffect(() => {
			window.addEventListener('keydown', handleGlobalKeyDown)
			window.addEventListener('contextmenu', handleGlobalContextMenu)
			setInterval(updateUI, 1000)
		}, [])

		return (
			<div className="h-full">
				{isUpgradeShown && (
					<div className="flex absolute bottom-7 left-72 p-4 gap-4 rounded-lg bg-gray-800/90 pointer-events-auto">
						{/* Cột trái */}
						<div className="flex flex-col gap-3">
							{/* Các thanh chỉ số */}
							<div className="flex-1 w-60">
								{stats.map((stat) => (
									<div className="flex items-center gap-2">
										<div className="font-mono text-sm">{stat.key}</div>
										<div className="flex-1 flex gap-1 rounded-lg overflow-hidden">
											{Array(7)
												.fill(0)
												.map((_, index) => (
													<div
														className="flex-1 h-4"
														style={{
															backgroundColor:
																index < countBy(upgrade)[stat.key] ? stat.color : '#111827'
														}}
													></div>
												))}
										</div>
									</div>
								))}
							</div>
							{/* Ô nhập */}
							<div className="relative flex font-mono">
								<input
									ref={upgradeInputRef}
									className="min-w-0 px-2 py-1 rounded-lg bg-gray-900 text-transparent caret-white selection:bg-blue-700 selection:text-transparent cursor-text"
									autoFocus
									maxLength={33}
									size={31}
									value={upgrade}
									onChange={handleUpgradeChange}
									onKeyDown={handleUpgradeKeyDown}
								/>
								<div className="absolute inset-0 px-2 py-1 pointer-events-none">
									{Array(33)
										.fill(undefined)
										.map((_, i) => (
											<div
												className={`inline-block ${i <= 13 ? 'text-gray-400' : i <= 26 ? 'text-sky-400' : i <= 27 ? 'text-yellow-400' : 'text-rose-400'}`}
											>
												{upgrade[i] ?? '\xb7'}
											</div>
										))}
								</div>
							</div>
						</div>
						{/* Cột phải */}
						<div className="flex flex-col gap-1">
							<div className="px-2">Presets</div>
							<div className="flex-1 flex flex-col overflow-x-hidden">
								{presets.map((preset) => (
									<button
										className="px-2 rounded font-sans hover:bg-gray-600"
										onClick={() => handlePresetClick(preset)}
									>
										{preset.text}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
				{ui && (
					<div className="absolute bottom-7 left-0 flex flex-col">
						{ui.__playerAttributes.attributes.toReversed().map((attr, i) => {
							const stat: Stat = stats[i]
							return (
								<div className="px-1 text-black" style={{ background: `${stat.color}cc` }}>
									{attr.slotsFilled || '\xa0'}
								</div>
							)
						})}
					</div>
				)}
			</div>
		)
	}

	const rootEl = document.createElement('div')
	rootEl.className = 'absolute inset-0 pointer-events-none z-[999]'
	document.body.appendChild(rootEl)

	ReactDOM.render(<App />, rootEl)
}
