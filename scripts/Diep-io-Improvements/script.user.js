// ==UserScript==
// @name         [Diep.io] Improvements
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.1
// @description  Provides improvements for Diep.io game.
// @author       tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @match        https://diep.io/*
// @require      https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js
// @require      https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js
// @resource     TAILWINDCSS https://raw.githubusercontent.com/tientq64/userscripts/main/.resources/tailwind.min.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @license      MIT
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/Diep-io-Improvements
// ==/UserScript==

var diepIO
;(function (diepIO) {
    const seconds = 1000
    const minutes = 60 * seconds

    const css = `
        ${GM_getResourceText('TAILWINDCSS')}
        body {
            color: unset;
        }
    `
    GM_addStyle(css)

    let grantRewardTimeoutId = undefined

    function App() {
        return React.createElement('div', null)
    }

    function removeEls(delay) {
        window.setTimeout(() => {
            const els = document.querySelectorAll(
                '#ad-holders, #aa-video-holder, #diep-io_300x250, iframe'
            )
            for (const el of els) {
                el.remove()
            }
        }, delay)
    }
    removeEls()
    removeEls(5000)
    removeEls(10000)
    removeEls(15000)

    const gameOverContinueEl = document.querySelector('#game-over-continue')
    gameOverContinueEl?.addEventListener('click', () => {
        if (grantRewardTimeoutId !== undefined) return

        input.grantReward()
        grantRewardTimeoutId = window.setTimeout(
            () => {
                grantRewardTimeoutId = undefined
            },
            2 * minutes + 10 * seconds
        )
    })

    const rootEl = document.createElement('div')
    rootEl.className = 'absolute inset-0 pointer-events-none z-[999]'
    document.body.appendChild(rootEl)

    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(React.createElement(App, null), rootEl)
})(diepIO || (diepIO = {}))
