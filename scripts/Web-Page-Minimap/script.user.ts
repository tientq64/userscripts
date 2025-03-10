// ==UserScript==
// @name         Web Page Minimap
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  A minimap for the current web page.
// @author       tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/718/718994.png
// @match        *://*/*
// @run-at       document-idle
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @license      MIT
// @noframes
// ==/UserScript==

interface El {
	el: Element
	style: CSSStyleDeclaration
}

const namesp: string = '__Web-Page-Minimap__userscript__'

const scroller: HTMLElement = document.createElement('div')
scroller.className = namesp
document.documentElement.appendChild(scroller)

const note: HTMLDivElement = document.createElement('div')
note.className = `${namesp}-note`
note.textContent = 'Ctrl+M to show/hide'
note.addEventListener('click', () => setIsShow(false))
scroller.appendChild(note)

const canvas: HTMLCanvasElement = document.createElement('canvas')
canvas.className = `${namesp}-canvas`
scroller.appendChild(canvas)

const pageWidth: number = 180
const factor: number = pageWidth / (innerWidth - pageWidth)

let isShow: boolean = GM_getValue('isShow', true)

function setIsShow(value: boolean): void {
	isShow = value
	GM_setValue('isShow', isShow)
	if (isShow) {
		scroller.removeAttribute('hidden')
		render()
	} else {
		scroller.setAttribute('hidden', '')
	}
}

function render(loop?: number): void {
	if (loop) {
		setTimeout(render, loop, loop)
		// requestAnimationFrame(render)
	}
	if (!isShow) return

	const pageHeight: number = Math.round(document.documentElement.scrollHeight * factor)
	canvas.width = pageWidth
	canvas.height = pageHeight

	const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
	if (ctx === null) return

	ctx.imageSmoothingEnabled = false
	ctx.fillStyle = '#fff'
	ctx.fillRect(0, 0, pageWidth, pageHeight)
	ctx.scale(factor, factor)

	const htmlRect: DOMRect = document.documentElement.getBoundingClientRect()
	ctx.translate(-htmlRect.x, -htmlRect.y)

	const draw = ({ el, style }: El): void => {
		if (el.classList.contains(namesp)) return

		const isVisible: boolean = el.checkVisibility({
			opacityProperty: true,
			visibilityProperty: true
		})
		if (!isVisible) return

		const name: string = el.nodeName

		ctx.fillStyle = style.backgroundColor

		const rects: DOMRectList = el.getClientRects()
		for (const rect of rects) {
			const x: number = Math.round(rect.x)
			const y: number = Math.round(rect.y)
			const width: number = Math.round(rect.width)
			const height: number = Math.round(rect.height)

			ctx.fillRect(x, y, width, height)

			switch (name) {
				case 'IMG':
				case 'SVG':
				case 'CANVAS':
				case 'VIDEO':
					{
						const img = el as CanvasImageSource
						try {
							ctx.drawImage(img, x, y, width, height)
						} catch {
							//
						}
					}
					break
			}
		}

		const subEls = Array.from<Element, El>(el.children, (subEl) => ({
			el: subEl,
			style: getComputedStyle(subEl)
		}))

		subEls.sort((subElA, subElB) => {
			const zA: number = subElA.style.zIndex === 'auto' ? 0 : Number(subElA.style.zIndex)
			const zB: number = subElB.style.zIndex === 'auto' ? 0 : Number(subElB.style.zIndex)
			return zA - zB
		})

		for (const subEl of subEls) {
			draw(subEl)
		}
	}

	draw({
		el: document.documentElement,
		style: getComputedStyle(document.documentElement)
	})
}

window.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.repeat) return
	if (document.activeElement?.matches('input,textarea,select')) return

	const { ctrlKey: ctrl, shiftKey: shift, altKey: alt, code } = event

	if (!ctrl && !shift && alt && code === 'KeyM') {
		setIsShow(!isShow)
	}
})

GM_addStyle(`
	.${namesp} {
		position: fixed;
		top: 50%;
		right: 0;
		max-height: calc(100% - 16px);
		padding: 8px;
		overflow: auto;
		transform: translate(0, -50%);
		scrollbar-width: thin;
		z-index: 99999;
	}
	.${namesp}-note {
		font: 13px sans-serif;
		line-height: 1.3;
		text-align: center;
		cursor: pointer;
	}
	.${namesp}-canvas {
		border-radius: 8px;
		box-shadow: 0 4px 8px #3338;
		image-rendering: pixelated;
	}
`)

setIsShow(isShow)

setTimeout(render, 1000)
setTimeout(render, 2000)
setTimeout(render, 3000)
setTimeout(render, 4000)

render(5000)
