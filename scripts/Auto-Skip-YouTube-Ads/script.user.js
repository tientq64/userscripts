// ==UserScript==
// @name               Auto Skip YouTube Ads
// @name:ar            تخطي إعلانات YouTube تلقائيًا
// @name:es            Saltar Automáticamente Anuncios De YouTube
// @name:fr            Ignorer Automatiquement Les Publicités YouTube
// @name:hi            YouTube विज्ञापन स्वचालित रूप से छोड़ें
// @name:id            Lewati Otomatis Iklan YouTube
// @name:ja            YouTube 広告を自動スキップ
// @name:ko            YouTube 광고 자동 건너뛰기
// @name:nl            YouTube-Advertenties Automatisch Overslaan
// @name:pt-BR         Pular Automaticamente Anúncios Do YouTube
// @name:ru            Автоматический Пропуск Рекламы На YouTube
// @name:vi            Tự Động Bỏ Qua Quảng Cáo YouTube
// @name:zh-CN         自动跳过 YouTube 广告
// @name:zh-TW         自動跳過 YouTube 廣告
// @namespace          https://github.com/tientq64/userscripts
// @version            6.0.2
// @description        Automatically skip YouTube ads instantly. Undetected by YouTube ad blocker warnings.
// @description:ar     تخطي إعلانات YouTube تلقائيًا على الفور. دون أن يتم اكتشاف ذلك من خلال تحذيرات أداة حظر الإعلانات في YouTube.
// @description:es     Omite automáticamente los anuncios de YouTube al instante. Sin que te detecten las advertencias del bloqueador de anuncios de YouTube.
// @description:fr     Ignorez automatiquement et instantanément les publicités YouTube. Non détecté par les avertissements du bloqueur de publicités YouTube.
// @description:hi     YouTube विज्ञापनों को स्वचालित रूप से तुरंत छोड़ दें। YouTube विज्ञापन अवरोधक चेतावनियों द्वारा पता नहीं लगाया गया।
// @description:id     Lewati iklan YouTube secara otomatis secara instan. Tidak terdeteksi oleh peringatan pemblokir iklan YouTube.
// @description:ja     YouTube 広告を即座に自動的にスキップします。YouTube 広告ブロッカーの警告には検出されません。
// @description:ko     YouTube 광고를 즉시 자동으로 건너뜁니다. YouTube 광고 차단 경고에 감지되지 않습니다.
// @description:nl     Sla YouTube-advertenties direct automatisch over. Ongemerkt door YouTube-adblockerwaarschuwingen.
// @description:pt-BR  Pule anúncios do YouTube instantaneamente. Não detectado pelos avisos do bloqueador de anúncios do YouTube.
// @description:ru     Автоматически пропускать рекламу YouTube мгновенно. Не обнаруживается предупреждениями блокировщиков рекламы YouTube.
// @description:vi     Tự động bỏ qua quảng cáo YouTube ngay lập tức. Không bị phát hiện bởi cảnh báo trình chặn quảng cáo của YouTube.
// @description:zh-CN  立即自动跳过 YouTube 广告。不会被 YouTube 广告拦截器警告检测到。
// @description:zh-TW  立即自動跳過 YouTube 廣告。 YouTube 廣告攔截器警告未被偵測到。
// @author             tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/2504/2504965.png
// @match              https://www.youtube.com/*
// @match              https://m.youtube.com/*
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
    const isYouTubeShorts = checkIsYouTubeShorts()
    if (isYouTubeShorts) return

    const hasAd = checkHasAd()
    if (!hasAd) return

    const player = getYouTubePlayer()
    if (player === null) return

    const videoData = player.getVideoData()
    const videoId = videoData.video_id
    const startTime = Math.floor(player.getCurrentTime())
    player.loadVideoById(videoId, startTime)

    console.log('Ad skipped!', videoId, startTime, videoData.title)
}

/**
 * Check if there are any ads interrupting the video.
 */
function checkHasAd() {
    // This element appears when a video ad appears.
    const adShowing = document.querySelector('.ad-showing')
    if (adShowing !== null) return true

    // Timed pie countdown ad.
    const pieCountdown = document.querySelector('.ytp-ad-timed-pie-countdown-container')
    if (pieCountdown !== null) return true

    return false
}

function checkIsYouTubeShorts() {
    return location.pathname.startsWith('/shorts/')
}

/**
 * Finds and returns the current YouTube video player.
 *
 * @returns The current YouTube video player, or `null` if not found.
 */
function getYouTubePlayer() {
    let player
    if (isYouTubeMobile) {
        const playerEl = document.querySelector('#movie_player')
        player = playerEl
    } else {
        const playerEl = document.querySelector('#ytd-player')
        if (playerEl === null) return null
        player = playerEl.getPlayer()
    }
    return player
}

function addCss() {
    const adsSelectors = [
        // Ad banner in the upper right corner, above the video playlist.
        '#player-ads',

        // Masthead ad on home page.
        '#masthead-ad',

        // Sponsored ad video items on home page.
        // 'ytd-ad-slot-renderer',

        // '.ytp-suggested-action',
        '.yt-mealbar-promo-renderer',

        // Featured product ad banner at the bottom left of the video.
        '.ytp-featured-product',

        // Products shelf ad banner below the video description.
        'ytd-merch-shelf-renderer',

        // YouTube Music Premium trial promotion dialog, bottom left corner.
        'ytmusic-mealbar-promo-renderer',

        // YouTube Music Premium trial promotion banner on home page.
        'ytmusic-statement-banner-renderer'
    ]
    const adsSelector = adsSelectors.join(',')
    const css = `${adsSelector} { display: none !important; }`
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
}

/**
 * Remove ad elements using JavaScript because these selectors require the use of the CSS
 * `:has` selector which is not supported in older browser versions.
 */
function removeAdElements() {
    const adSelectors = [
        // Ad banner in the upper right corner, above the video playlist.
        ['#panels', 'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]'],

        // Sponsored ad video items on home page.
        // ['ytd-rich-item-renderer', '.ytd-ad-slot-renderer'],

        // ['ytd-rich-section-renderer', '.ytd-statement-banner-renderer'],

        // Ad videos on YouTube Short.
        ['ytd-reel-video-renderer', '.ytd-ad-slot-renderer']

        // Ad blocker warning dialog.
        // ['tp-yt-paper-dialog', '#feedback.ytd-enforcement-message-view-model'],

        // Survey dialog on home page, located at bottom right.
        // ['tp-yt-paper-dialog', ':scope > ytd-checkbox-survey-renderer'],

        // Survey to rate suggested content, located at bottom right.
        // ['tp-yt-paper-dialog', ':scope > ytd-single-option-survey-renderer']
    ]
    for (const adSelector of adSelectors) {
        const adEl = document.querySelector(adSelector[0])
        if (adEl === null) continue
        const neededEl = adEl.querySelector(adSelector[1])
        if (neededEl === null) continue
        adEl.remove()
    }
}

const isYouTubeMobile = location.hostname === 'm.youtube.com'

window.setInterval(skipAd, 500)
window.setInterval(removeAdElements, 1000)

addCss()
removeAdElements()
skipAd()
