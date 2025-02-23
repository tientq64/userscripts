# 📜 UserScripts

<p>
	<img src="https://img.shields.io/greasyfork/dt/498197">
	<img src="https://img.shields.io/greasyfork/dd/498197">
	<img src="https://img.shields.io/github/license/tientq64/userscripts?color=blue">
</p>

The userscript collection I wrote makes life easier and better. I use the browser extension [TamperMonkey][1] to run and manage userscripts. You need to install it first to use userscript.

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Daily installs</th>
			<th>Total installs</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<a href="https://greasyfork.org/en/scripts/498197-auto-skip-youtube-ads">Auto Skip YouTube Ads</a>
			</td>
			<td>
				Automatically skip YouTube ads instantly. Undetected by YouTube ad blocker warnings.
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dd/498197?label">
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dt/498197?label">
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://greasyfork.org/en/scripts/504848-youtube-shorts-to-normal-video">YouTube Shorts To Normal Video</a>
			</td>
			<td>
				Instantly redirect YouTube Shorts videos to normal video view, allowing you to save, download, choose quality, etc.
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dd/504848?label">
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dt/504848?label">
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://greasyfork.org/en/scripts/495945-no-fullscreen-dropdown">No Fullscreen Dropdown</a>
			</td>
			<td>
				Real fullscreen instead of fullscreen dropdown, very annoying when playing games. Useful for Microsoft Edge. Press Shift+F11 to toggle fullscreen.
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dd/495945?label">
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dt/495945?label">
			</td>
		</tr>
		<tr>
			<td>
				<a href="https://greasyfork.org/en/scripts/495945-no-fullscreen-dropdown">Tetr.io Improvements</a>
			</td>
			<td>
				Provides improvements for Tetr.io game.
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dd/525485?label">
			</td>
			<td>
				<img src="https://img.shields.io/greasyfork/dt/525485?label">
			</td>
		</tr>
	</tbody>
</table>

## 📖 Usage

### Install on GreasyFork (Recommended)

Visit a list of some of my userscripts on the GreasyFork website [here][2].

### Install on GitHub

Each folder in the [scripts](./scripts) folder contains a `script.user.js` file, which contains the script code. Click on that file, then click `Raw` button to install it.

## 🐛 Bug report

Report bugs [here](https://github.com/tientq64/userscripts/issues).

## 🛠️ Development guide

> This section is for developers. If you are a user, you can skip this section.

Clone this repository:

```cmd
git clone https://github.com/tientq64/userscripts.git
cd userscripts
```

Install `pnpm` if not installed:

```cmd
npm i -g pnpm
```

Install dependencies:

```cmd
pnpm install
```

Start:

```cmd
pnpm run watch
```

The `script.user.js` file is compiled from the `script.user.ts` or `script.user.tsx` file, so do not modify it.

While developing, instead of having to reinstall the `script.user.js` file every time it changes, installing the `dev.user.js` file solves that problem. But note, if you change in the metadata block, you have to reinstall the `dev.user.js` file.

Built-in Tailwind CSS integration, just declare in the metadata block and use:

```tsx
// ==UserScript==
// @resource     TAILWINDCSS
// @grant        GM_addStyle
// ==/UserScript==

const tailwindCss: string = GM_getResourceText('TAILWINDCSS')
GM_addStyle(tailwindCss)

const el: ReactElement = <div className="flex p-4 text-rose-700" />
```

Common type definitions are written in [`.resources/global.d.ts`](.resources/global.d.ts) file.

## ⚖️ License

All scripts are licensed under the [MIT](./LICENSE) license.

[1]: https://www.tampermonkey.net
[2]: https://greasyfork.org/en/users/1306283-tientq64
