// ==UserScript==
// @name               Auto Skip YouTube Ads
// @name:vi            Tự Động Bỏ Qua Quảng Cáo YouTube
// @name:zh-CN         自动跳过 YouTube 广告
// @name:zh-TW         自動跳過 YouTube 廣告
// @name:ja            YouTube 広告を自動スキップ
// @name:ko            YouTube 광고 자동 건너뛰기
// @name:es            Saltar Automáticamente Anuncios De YouTube
// @name:pt-BR         Pular Automaticamente Anúncios Do YouTube
// @name:ru            Автоматический Пропуск Рекламы На YouTube
// @name:id            Lewati Otomatis Iklan YouTube
// @name:hi            YouTube विज्ञापन स्वचालित रूप से छोड़ें
// @namespace          https://github.com/tientq64/userscripts
// @version            4.8.2
// @description        Automatically skip YouTube ads almost instantly. Remove the ad blocker warning pop-up.
// @description:vi     Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Loại bỏ cửa sổ bật lên cảnh báo trình chặn quảng cáo.
// @description:zh-CN  几乎立即自动跳过 YouTube 广告。删除广告拦截器警告弹出窗口。
// @description:zh-TW  幾乎立即自動跳過 YouTube 廣告。刪除廣告攔截器警告彈出視窗。
// @description:ja     YouTube 広告をほぼ瞬時に自動的にスキップします。広告ブロッカーの警告ポップアップを削除します。
// @description:ko     YouTube 광고를 거의 즉시 자동으로 건너뜁니다. 광고 차단 경고 팝업을 제거합니다.
// @description:es     Omite automáticamente los anuncios de YouTube casi al instante. Elimina la ventana emergente de advertencia del bloqueador de anuncios.
// @description:pt-BR  Pule automaticamente os anúncios do YouTube quase instantaneamente. Remova o pop-up de aviso do bloqueador de anúncios.
// @description:ru     Автоматически пропускайте рекламу YouTube почти мгновенно. Уберите всплывающее предупреждение о блокировщике рекламы.
// @description:id     Lewati iklan YouTube secara otomatis hampir seketika. Hapus pop-up peringatan pemblokir iklan.
// @description:hi     YouTube विज्ञापनों को लगभग तुरंत ही स्वचालित रूप से छोड़ दें। विज्ञापन अवरोधक चेतावनी पॉप-अप हटाएँ।
// @author             tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/2504/2504965.png
// @match              https://www.youtube.com/*
// @match              https://music.youtube.com/*
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @license            MIT
// @compatible         firefox
// @compatible         chrome
// @compatible         opera
// @compatible         safari
// @compatible         edge
// @noframes
// ==/UserScript==

interface Config {
	/**
	 * Allow page reload if there is no other way to skip ads.
	 */
	allowedReloadPage: boolean
	/**
	 * Don't reload while you're doing something, like reading comments, or entering text.
	 */
	dontReloadWhileBusy: boolean
}

/**
 * Skip ads. Remove ad blocker warning.
 */
function skipAd(): void {
	video = null
	fineScrub = document.querySelector<HTMLDivElement>('.ytp-fine-scrubbing')

	// Check if the current URL is a YouTube Shorts URL and exit the function if true.
	if (window.location.pathname.startsWith('/shorts/')) return

	const player = document.querySelector<HTMLDivElement>('#movie_player')

	if (player) {
		hasAd = player.classList.contains('ad-showing')
		video = player.querySelector<HTMLVideoElement>('video.html5-main-video')
	}

	if (hasAd) {
		const skipButton = document.querySelector<HTMLElement>(`
			.ytp-skip-ad-button,
			.ytp-ad-skip-button,
			.ytp-ad-skip-button-modern,
			.ytp-ad-survey-answer-button
		`)
		// Click the skip ad button if available.
		if (skipButton) {
			skipButton.click()
			skipButton.remove()
		}
		// Otherwise, fast forward to the end of the ad video.
		// Use `9999` instead of `video.duration` to avoid errors when `duration`
		// is not a number.
		else if (video && video.src) {
			video.currentTime = 9999
		}
	}

	if (video) {
		video.addEventListener('pause', handleVideoPause)
		video.addEventListener('mouseup', allowPauseVideo)
		video.addEventListener('timeupdate', handleVideoTimeUpdate)
	}

	// Remove ad blocker warning dialog if it appears.
	const adBlockerWarningDialog = document.querySelector<HTMLElement>(
		'tp-yt-paper-dialog:has(#feedback.ytd-enforcement-message-view-model)'
	)
	if (adBlockerWarningDialog) {
		adBlockerWarningDialog.remove()
	}

	// Handle when ad blocker warning appears inside video player.
	// Currently there is NO WAY TO REMOVE it.
	// Temporary workaround is to reload the page.
	const adBlockerWarningInner = document.querySelector<HTMLElement>(
		'.yt-playability-error-supported-renderers:has(.ytd-enforcement-message-view-model)'
	)
	if (adBlockerWarningInner) {
		if (checkCanReloadPage()) {
			adBlockerWarningInner.remove()
			const params: URLSearchParams = new URLSearchParams(location.search)
			if (currentVideoTime > 0) {
				params.set('t', Math.floor(currentVideoTime) + 's')
			}
			const newUrl: string = location.origin + location.pathname + '?' + params.toString()
			location.replace(newUrl)
		}
	}

	// Video pause button.
	const playButton = document.querySelector<HTMLButtonElement>('button.ytp-play-button')
	if (playButton) {
		playButton.addEventListener('click', allowPauseVideo)
	}

	// Remove short video ads.
	// Can't just use CSS to hide it, because it will cause problems when scrolling
	// to the next video.
	const adShortVideos = document.querySelectorAll<HTMLElement>(
		'ytd-reel-video-renderer:has(.ytd-ad-slot-renderer)'
	)
	for (const adShortVideo of adShortVideos) {
		adShortVideo.remove()
	}
}

/**
 * Check if the user is focused on the input.
 */
function checkEnteringInput(): boolean {
	if (document.activeElement === null) {
		return false
	}
	return document.activeElement.matches('input, textarea, select')
}

/**
 * Check if the page can be reloaded.
 */
function checkCanReloadPage(): boolean {
	if (!config.allowedReloadPage) {
		return false
	}
	if (!config.dontReloadWhileBusy) {
		return true
	}
	if (checkEnteringInput()) {
		return false
	}
	// Do not reload while the user is reading comments.
	if (document.documentElement.scrollTop > 200) {
		return false
	}
	return true
}

/**
 * Temporarily allows the video to be paused, for a short period of time.
 */
function allowPauseVideo(): void {
	pausedByUser = true
	window.clearTimeout(allowPauseVideoTimeoutId)
	allowPauseVideoTimeoutId = window.setTimeout(disallowPauseVideo, 500)
}

/**
 * Pausing the video is not allowed.
 * The purpose is to prevent video from being paused, against the behavior of pausing
 * video when YouTube ad blocking warning dialog appears. Unless certain conditions,
 * such as pausing by user, etc.
 */
function disallowPauseVideo(): void {
	pausedByUser = false
	window.clearTimeout(allowPauseVideoTimeoutId)
}

function handleGlobalBlur(): void {
	isTabBlurred = true
}

function handleGlobalFocus(): void {
	isTabBlurred = false
}

/**
 * Handle when video is paused.
 * If certain conditions are not met, it will continue playing.
 */
function handleVideoPause(): void {
	if (isYouTubeMusic) return
	if (pausedByUser) {
		disallowPauseVideo()
		return
	}
	if (document.hidden) return
	if (isTabBlurred) return
	if (fineScrub && fineScrub.style.display !== 'none') return
	if (video === null) return
	if (video.duration - video.currentTime < 0.1) return
	video.play()
}

function handleVideoTimeUpdate(): void {
	if (hasAd || video === null) return
	currentVideoTime = video.currentTime
}

/**
 * Handle both keyboard press or release events.
 */
function handleGlobalKeyDownAndKeyUp(event: KeyboardEvent): void {
	if (isYouTubeMusic) return
	if (checkEnteringInput()) return
	const code: string = event.code
	if (event.type === 'keydown') {
		if (code === 'KeyK' || code === 'MediaPlayPause') {
			allowPauseVideo()
		}
	} else {
		if (code === 'Space') {
			allowPauseVideo()
		}
	}
}

/**
 * Save current configuration.
 */
function saveConfig(): void {
	GM_setValue('config', config)
}

/**
 * Register menu commands, or update the menu.
 */
function registerMenuCommands(): void {
	{
		const status: string = config.allowedReloadPage ? 'Yes' : 'No'
		GM_registerMenuCommand(
			`Reload page if ad cannot be skipped: ${status}`,
			() => {
				config.allowedReloadPage = !config.allowedReloadPage
				saveConfig()
				updateMenuCommands()
			},
			{
				id: 0,
				autoClose: false
			}
		)
	}
	{
		const status: string = config.dontReloadWhileBusy ? 'Yes' : 'No'
		GM_registerMenuCommand(
			`Don't reload while the user is busy: ${status}`,
			() => {
				config.dontReloadWhileBusy = !config.dontReloadWhileBusy
				saveConfig()
				updateMenuCommands()
			},
			{
				id: 1,
				autoClose: false
			}
		)
	}
}

/**
 * Update menu commands.
 * @alias registerMenuCommands
 */
function updateMenuCommands(): void {
	registerMenuCommands()
}

/**
 * Add CSS hides some ad elements on the page.
 */
function addCSSHideAds(): void {
	const selectors: string[] = [
		// Ad banner in the upper right corner, above the video playlist.
		'#player-ads',
		'#panels:has(ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"])',
		//
		'#masthead-ad',
		// Temporarily comment out this selector to fix issue [#265124](https://greasyfork.org/en/scripts/498197-auto-skip-youtube-ads/discussions/265124).
		// '#panels:has(ytd-ads-engagement-panel-content-renderer)',
		'ytd-ad-slot-renderer',
		// Sponsored ad video items on home page.
		'ytd-rich-item-renderer:has(.ytd-ad-slot-renderer)',
		//
		'ytd-rich-section-renderer:has(.ytd-statement-banner-renderer)',
		// Ad videos on YouTube Short.
		'ytd-reel-video-renderer:has(.ytd-ad-slot-renderer)',
		// Ad blocker warning dialog.
		'tp-yt-paper-dialog:has(#feedback.ytd-enforcement-message-view-model)',
		// Survey dialog on home page, located at bottom right.
		'tp-yt-paper-dialog:has(> ytd-checkbox-survey-renderer)',
		//
		'.ytp-suggested-action',
		'.yt-mealbar-promo-renderer',
		// YouTube Music Premium trial promotion dialog, bottom left corner.
		'ytmusic-mealbar-promo-renderer',
		// YouTube Music Premium trial promotion banner on home page.
		'ytmusic-statement-banner-renderer'
	]
	const css: string = `${selectors.join(',')}{display:none!important}`
	const style: HTMLStyleElement = document.createElement('style')
	style.textContent = css
	document.head.appendChild(style)
}

/**
 * Default configuration.
 */
const defaultConfig: Config = {
	allowedReloadPage: true,
	dontReloadWhileBusy: true
}

// Load configuration.
const config: Config = GM_getValue('config', defaultConfig)
for (const key in defaultConfig) {
	if (config[key] == null) {
		config[key] = defaultConfig[key]
	}
}

/**
 * Is the current page YouTube Music.
 */
const isYouTubeMusic: boolean = location.hostname === 'music.youtube.com'
/**
 * Current video element.
 */
let video: HTMLVideoElement | null = null
let fineScrub: HTMLDivElement | null = null
let hasAd: boolean = false
let currentVideoTime: number = 0
/**
 * Is the video paused by the user, not paused by YouTube's ad blocker warning dialog.
 */
let pausedByUser: boolean = false
/**
 * Is the current tab blurred.
 */
let isTabBlurred: boolean = false
let allowPauseVideoTimeoutId: number = 0

// Observe DOM changes to detect ads.
if (window.MutationObserver) {
	const observer: MutationObserver = new MutationObserver(skipAd)
	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ['class', 'src'],
		childList: true,
		subtree: true
	})
}
// If DOM observation is not supported. Detect ads every 500ms (2 times per second).
else {
	window.setInterval(skipAd, 500)
}

window.addEventListener('blur', handleGlobalBlur)
window.addEventListener('focus', handleGlobalFocus)
window.addEventListener('keydown', handleGlobalKeyDownAndKeyUp)
window.addEventListener('keyup', handleGlobalKeyDownAndKeyUp)

addCSSHideAds()
registerMenuCommands()
skipAd()
