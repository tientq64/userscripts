# 📜 UserScripts

<p>
	<img src="https://img.shields.io/greasyfork/dt/498197">
	<img src="https://img.shields.io/greasyfork/dd/498197">
	<img src="https://img.shields.io/github/license/tientq64/userscripts?color=blue">
</p>

The userscript collection I wrote makes life easier and better. I use the browser extension [TamperMonkey](https://www.tampermonkey.net) to run and manage userscripts. You need to install it first to use userscript.

## 📖 Usage

### Install on GreasyFork (Recommended)

Visit a list of some of my userscripts on the GreasyFork website [here](https://greasyfork.org/en/users/1306283-tientq64).

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

The `script.user.js` file is compiled from the `script.user.ts` file, so do not modify it.

While developing, instead of having to reinstall the `script.user.js` file every time it changes, installing the `dev.user.js` file solves that problem. But note, if you change in the metadata block, you have to reinstall the `dev.user.js` file.

## ⚖️ License

All scripts are licensed under the [MIT](./LICENSE) license.
