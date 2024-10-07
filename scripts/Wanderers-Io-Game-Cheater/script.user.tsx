// ==UserScript==
// @name         [Wanderers.io] Game Cheater
// @namespace    https://github.com/tientq64/userscripts
// @version      0.1.0
// @description  Become an asshole in this game.
// @author       tientq64
// @icon         https://cdn-icons-png.flaticon.com/128/1922/1922111.png
// @match        https://wanderers.io/*
// @require      https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js
// @require      https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @resource     TAILWINDCSS
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        unsafeWindow
// @grant        window.close
// @grant        window.focus
// @license      MIT
// @noframes
// ==/UserScript==

namespace Wanderers {
	interface CLIENT {
		Game: Game
	}

	interface Game {
		camera: Camera
		entities: Entities
		player: Tribe | undefined
	}

	interface Camera {
		follow: Totem
		setFollow(totem: Totem): void
	}

	interface Entities {
		groups: EntitiesGroups
	}

	interface EntitiesGroups {
		tribes: Tribe[]
		tribesman: Tribeman[]
	}

	interface Totem {
		id: number
		level: number
		player: boolean
		group: Tribe
		prevX: number
		prevY: number
		x: number
		y: number
	}

	interface Tribe {
		id: number
		color: number
		shared: TribeShared
		members: Tribeman[]
		tx: number
		ty: number
		prevX: number
		prevY: number
		x: number
		y: number
	}

	interface TribeShared {
		name: string
		stay: boolean
		team: number
		remove: boolean
	}

	interface Tribeman {
		sid: number
		team: number
		maxHealth: number
		dead: boolean
		group: Tribe
		prevX: number
		prevY: number
		x: number
		y: number
	}
}
