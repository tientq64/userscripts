// ==UserScript==
// @name               Auto Skip YouTube Ads
// @name:vi            Tự Động Bỏ Qua Quảng Cáo YouTube
// @name:zh-CN         自动跳过 YouTube 广告
// @name:zh-TW         自動跳過 YouTube 廣告
// @name:ja            YouTube 広告を自動スキップ
// @name:ko            YouTube 광고 자동 건너뛰기
// @name:es            Saltar Automáticamente Anuncios De YouTube
// @name:ru            Автоматический Пропуск Рекламы На YouTube
// @name:id            Lewati Otomatis Iklan YouTube
// @name:hi            YouTube विज्ञापन स्वचालित रूप से छोड़ें
// @namespace          https://github.com/tientq64/userscripts
// @version            4.3.11
// @description        Automatically skip YouTube ads instantly. Remove the ad blocker warning pop-up. Very lightweight and efficient.
// @description:vi     Tự động bỏ qua quảng cáo YouTube ngay lập tức. Loại bỏ cửa sổ bật lên cảnh báo trình chặn quảng cáo. Rất nhẹ và hiệu quả.
// @description:zh-CN  自动立即跳过 YouTube 广告。删除广告拦截器警告弹出窗口。非常轻量且高效。
// @description:zh-TW  立即自動跳過 YouTube 廣告。刪除廣告攔截器警告彈出視窗。非常輕巧且高效。
// @description:ja     YouTube 広告を即座に自動的にスキップします。広告ブロッカーの警告ポップアップを削除します。非常に軽量で効率的です。
// @description:ko     YouTube 광고를 즉시 자동으로 건너뜁니다. 광고 차단 경고 팝업을 제거하세요. 매우 가볍고 효율적입니다.
// @description:es     Omita automáticamente los anuncios de YouTube al instante. Elimine la ventana emergente de advertencia del bloqueador de anuncios. Muy ligero y eficiente.
// @description:ru     Автоматически пропускайте рекламу YouTube мгновенно. Удалите всплывающее окно с предупреждением о блокировке рекламы. Очень легкий и эффективный.
// @description:id     Lewati iklan YouTube secara otomatis secara instan. Hapus pop-up peringatan pemblokir iklan. Sangat ringan dan efisien.
// @description:hi     YouTube विज्ञापनों को तुरंत स्वचालित रूप से छोड़ें। विज्ञापन अवरोधक चेतावनी पॉप-अप को हटाएँ। बहुत हल्का और कुशल।
// @author             tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/2504/2504965.png
// @match              https://www.youtube.com/*
// @grant              none
// @license            MIT
// @compatible         firefox
// @compatible         chrome
// @compatible         opera
// @compatible         safari
// @compatible         edge
// @noframes
// @homepage           https://github.com/tientq64/userscripts/tree/main/scripts/Auto-Skip-YouTube-Ads
// ==/UserScript==

function skipAd() {
    video = document.querySelector('#movie_player video.html5-main-video')

    const adPlayer = document.querySelector('#movie_player.ad-showing')
    if (adPlayer) {
        const skipButton = document.querySelector(`
            .ytp-skip-ad-button,
            .ytp-ad-skip-button,
            .ytp-ad-skip-button-modern
        `)
        if (skipButton) {
            skipButton.click()
            skipButton.remove()
        } else if (
            video &&
            video.src &&
            Number.isFinite(video.duration) &&
            video.currentTime < video.duration / 2
        ) {
            video.currentTime = 9999
        }
    }

    const adBlockerWarningDialog = document.querySelector(`
        tp-yt-paper-dialog:has(#feedback.ytd-enforcement-message-view-model)
    `)
    if (adBlockerWarningDialog) {
        adBlockerWarningDialog.remove()
    }

    const playButton = document.querySelector('button.ytp-play-button')
    if (playButton) {
        playButton.addEventListener('click', allowPauseVideo)
    }

    fineScrubbing = document.querySelector('.ytp-fine-scrubbing')

    const adShortVideos = document.querySelectorAll(
        'ytd-reel-video-renderer:has(.ytd-ad-slot-renderer)'
    )
    for (const adShortVideo of adShortVideos) {
        adShortVideo.remove()
    }

    if (video) {
        video.addEventListener('pause', handlePauseVideo)
        video.addEventListener('mouseup', allowPauseVideo)
        video.addEventListener('timeupdate', handleTimeUpdateVideo)

        if (video.src !== oldVideoSrc) {
            const currentTime = videosCurrentTime[video.src]
            if (currentTime !== undefined) {
                video.currentTime = currentTime
            }
            oldVideoSrc = video.src
        }
    }
}

function allowPauseVideo() {
    isAllowPauseVideo = true
    window.clearTimeout(allowPauseVideoTimeoutId)
    allowPauseVideoTimeoutId = window.setTimeout(disallowPauseVideo, 500)
}

function disallowPauseVideo() {
    isAllowPauseVideo = false
    window.clearTimeout(allowPauseVideoTimeoutId)
}

function handlePauseVideo() {
    if (isAllowPauseVideo) {
        disallowPauseVideo()
        return
    }
    if (fineScrubbing?.checkVisibility()) return
    if (video) {
        if (video.duration - video.currentTime < 0.1) return
        video.play()
    }
}

function handleTimeUpdateVideo() {
    if (video) {
        videosCurrentTime[video.src] = video.currentTime
    }
}

function handleGlobalKeyDownKeyUp(event) {
    if (document.activeElement?.matches('input, textarea, select')) return
    if (event.type === 'keydown') {
        if (event.code === 'KeyK') {
            allowPauseVideo()
        }
    } else {
        if (event.code === 'Space') {
            allowPauseVideo()
        }
    }
}

let video = null
let fineScrubbing = null
let isAllowPauseVideo = false
let allowPauseVideoTimeoutId = 0
const videosCurrentTime = {}
let oldVideoSrc = ''

if (window.MutationObserver) {
    const observer = new MutationObserver(skipAd)
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'src'],
        childList: true,
        subtree: true
    })
} else {
    window.setInterval(skipAd, 500)
}
skipAd()

window.addEventListener('keydown', handleGlobalKeyDownKeyUp)
window.addEventListener('keyup', handleGlobalKeyDownKeyUp)

const style = document.createElement('style')
style.textContent = `
    #player-ads,
    #masthead-ad,
    #panels:has(ytd-ads-engagement-panel-content-renderer),
    ytd-ad-slot-renderer,
    ytd-rich-item-renderer:has(.ytd-ad-slot-renderer),
    ytd-reel-video-renderer:has(.ytd-ad-slot-renderer),
    tp-yt-paper-dialog:has(#feedback.ytd-enforcement-message-view-model),
    .yt-mealbar-promo-renderer {
        display: none !important;
    }`
document.head.appendChild(style)
