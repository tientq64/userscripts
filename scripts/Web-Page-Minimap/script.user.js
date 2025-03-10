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
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/Web-Page-Minimap
// ==/UserScript==

const namesp = '__Web-Page-Minimap__userscript__'

const scroller = document.createElement('div')
scroller.className = namesp
document.documentElement.appendChild(scroller)

const note = document.createElement('div')
note.className = `${namesp}-note`
note.textContent = 'Ctrl+M to show/hide'
note.addEventListener('click', () => setIsShow(false))
scroller.appendChild(note)

const canvas = document.createElement('canvas')
canvas.className = `${namesp}-canvas`
scroller.appendChild(canvas)

const pageWidth = 180
const factor = pageWidth / (innerWidth - pageWidth)

let isShow = GM_getValue('isShow', true)

function setIsShow(value) {
    isShow = value
    GM_setValue('isShow', isShow)
    if (isShow) {
        scroller.removeAttribute('hidden')
        render()
    } else {
        scroller.setAttribute('hidden', '')
    }
}

function render(loop) {
    if (loop) {
        setTimeout(render, loop, loop)
        // requestAnimationFrame(render)
    }
    if (!isShow) return

    const pageHeight = Math.round(document.documentElement.scrollHeight * factor)
    canvas.width = pageWidth
    canvas.height = pageHeight

    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, pageWidth, pageHeight)
    ctx.scale(factor, factor)

    const htmlRect = document.documentElement.getBoundingClientRect()
    ctx.translate(-htmlRect.x, -htmlRect.y)

    const draw = ({ el, style }) => {
        if (el.classList.contains(namesp)) return

        const isVisible = el.checkVisibility({
            opacityProperty: true,
            visibilityProperty: true
        })
        if (!isVisible) return

        const name = el.nodeName

        ctx.fillStyle = style.backgroundColor

        const rects = el.getClientRects()
        for (const rect of rects) {
            const x = Math.round(rect.x)
            const y = Math.round(rect.y)
            const width = Math.round(rect.width)
            const height = Math.round(rect.height)

            ctx.fillRect(x, y, width, height)

            switch (name) {
                case 'IMG':
                case 'SVG':
                case 'CANVAS':
                case 'VIDEO':
                    {
                        const img = el
                        try {
                            ctx.drawImage(img, x, y, width, height)
                        } catch {
                            //
                        }
                    }
                    break
            }
        }

        const subEls = Array.from(el.children, (subEl) => ({
            el: subEl,
            style: getComputedStyle(subEl)
        }))

        subEls.sort((subElA, subElB) => {
            const zA = subElA.style.zIndex === 'auto' ? 0 : Number(subElA.style.zIndex)
            const zB = subElB.style.zIndex === 'auto' ? 0 : Number(subElB.style.zIndex)
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

window.addEventListener('keydown', (event) => {
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
