// ==UserScript==
// @name         YouTube Shorts To Normal Video
// @namespace    https://github.com/tientq64/userscripts
// @version      1.0.0
// @description  Redirect YouTube Shorts video to normal video viewing.
// @author       tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/3670/3670147.png
// @match        https://www.youtube.com/*
// @license      MIT
// @grant        none
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/YouTubeShortsToNormalVideo
// ==/UserScript==

function redirect() {
    const isShorts = location.pathname.startsWith('/shorts/')
    if (isShorts) {
        const newUrl = location.href.replace('/shorts/', '/watch?v=')
        location.replace(newUrl)
    }
}

document.addEventListener('yt-navigate-start', redirect)
redirect()
