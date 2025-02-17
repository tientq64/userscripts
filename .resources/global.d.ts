declare function GM_addStyle(css: string): void

declare function GM_getResourceText(name: string): string

type GMValue<T = string | number | boolean | object | GMValue[]> = T
declare function GM_getValue<T = GMValue>(name: string): T | undefined
declare function GM_getValue<T = GMValue>(name: string, defaultValue: T): T
declare function GM_setValue(name: string, value: GMValue): void
declare function GM_deleteValue(name: string): void
declare function GM_listValues(): string[]

declare function GM_setClipboard(text: string): void

declare function GM_registerMenuCommand(
	caption: string,
	commandFunc: (event: MouseEvent | KeyboardEvent) => void,
	accessKey?: string
): number
interface GMRegisterMenuCommandOptions {
	id?: number | string
	accessKey?: string
	autoClose?: boolean
	title?: string
}
declare function GM_registerMenuCommand(
	caption: string,
	commandFunc: (event: MouseEvent | KeyboardEvent) => void,
	options?: GMRegisterMenuCommandOptions
): number

declare function GM_openInTab(url: string, loadInBackground?: boolean): void
type GMOpenInTabOptions = {
	active?: boolean
	insert?: boolean
	setParent?: boolean
	incognito?: boolean
	loadInBackground?: boolean
}
declare function GM_openInTab(url: string, options?: GMOpenInTabOptions): void

declare type ChangeEvent<T> = import('react').ChangeEvent<T>

declare type Immer = import('immer').Immer
declare const immer: Immer

declare type Lodash = import('lodash').LoDashStatic
declare const _: Lodash

interface UnsafeWindow extends Window {}
declare const unsafeWindow: UnsafeWindow

interface YtdPlayerElement extends HTMLElement {
	loadVideoWithPlayerVars(options: { videoId: string; start?: number }): void
	getPlayer: () => YouTubePlayer
}

interface YouTubeMoviePlayerElement extends HTMLElement, YouTubePlayer {
	loadVideoByPlayerVars(options: { videoId: string; start?: number }): void
}

interface YouTubePlayer {
	getVideoData: () => YouTubeVideoData
	getCurrentTime: () => number
	loadVideoById: (videoId: string, startTime?: number) => void
}

interface YouTubeVideoData {
	title: string
	video_id: string
}

interface YouTubeMoviePlayerElement extends HTMLElement {
	loadVideoByPlayerVars(options: { videoId: string; start?: number }): void
}
