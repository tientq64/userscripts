// ==UserScript==
// @name         Tetr.io Improvements
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  Provides improvements for Tetr.io game.
// @author       tientq64
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tetr.io
// @match        https://tetr.io/*
// @match        https://ch.tetr.io/*
// @grant        GM_addStyle
// @license      MIT
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/Tetr-io-Improvements
// ==/UserScript==

const adElsSelectors = ['#ceriad-auth-return-lb', '#ceriad-menus-persistent-mpu', 'iframe']
const adElsSelector = adElsSelectors.join(',')

function removeAds() {
    const adEls = document.querySelectorAll(adElsSelector)
    for (const adEl of adEls) {
        adEl.remove()
    }
}

function handleWindowKeyDown(event) {
    if (event.code === 'Escape') {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
    }
}

window.setInterval(removeAds, 5000)
window.addEventListener('keydown', handleWindowKeyDown)

GM_addStyle(`
    * {
        transition: none !important;
    }
`)
