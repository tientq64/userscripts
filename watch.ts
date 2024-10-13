import { readFileSync, Stats, statSync, writeFileSync } from 'fs'
import { sync } from 'glob-concat'
import GlobWatcher from 'glob-watcher'
import { dirname, join } from 'path'
import { format, resolveConfig } from 'prettier'
import { transpile } from 'typescript'

function joinPath(...paths: string[]): string {
	return join(...paths).replace(/\\/g, '/')
}

async function handleWatch(path: string, stat: Stats): Promise<void> {
	if (!stat.isFile()) return

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const tsconfig: any = JSON.parse(readFileSync('tsconfig.json', 'utf-8'))
	const dirPath: string = dirname(path).replace(/\\/g, '/')
	const code: string = readFileSync(path, 'utf-8')

	const matches = code.match(/\/\/ ==UserScript==\n.+?\n\/\/ ==\/UserScript==/s)
	if (matches === null) return

	const meta: string = matches[0]
	const ts: string = code.replace(meta, '')

	const prodPath: string = joinPath(dirPath, 'script.user.js')
	const devPath: string = joinPath(dirPath, 'dev.user.js')

	const metaPadLength: number = meta.match(/^\/\/ @([a-z:]+ {2,})/m)?.[1].length || 13

	const bothMeta: string = meta.replace(
		endMetaTagRegex,
		`// @${'homepage'.padEnd(metaPadLength)}https://github.com/tientq64/userscripts/tree/main/${encodeURI(dirPath)}\n$&`
	)

	const prettierConfig = await resolveConfig('.prettierrc')

	const prodMeta: string = bothMeta.replace(
		tailwindcssMetaRegex,
		`$& https://raw.githubusercontent.com/tientq64/userscripts/main/.resources/tailwind.min.css`
	)
	let prodJs: string = ts.replace(/^$/gm, '//nLYZuEnVSEZXt0S9O_dhH//')
	prodJs = transpile(prodJs, tsconfig.compilerOptions)
	prodJs = prodJs
		.replace(/^\s*\/\/nLYZuEnVSEZXt0S9O_dhH\/\/$/gm, '')
		.replace(/^\t+/gm, (tabs) => '    '.repeat(tabs.length))
	prodJs = await format(prodJs, {
		...prettierConfig,
		useTabs: false,
		parser: 'typescript'
	})
	const prodCode: string = `${prodMeta}\n\n${prodJs}`
	writeFileSync(prodPath, prodCode)

	const devMeta: string = bothMeta
		.replace(/^\/\/ @name(:[a-zA-Z-]+)? .+(?<! \(DEV\))$/gm, '$& (DEV)')
		.replace(
			tailwindcssMetaRegex,
			`$& file:///${joinPath(__dirname, '.resources/tailwind.min.css')}`
		)
		.replace(
			endMetaTagRegex,
			`// @${'require'.padEnd(metaPadLength)}file:///${joinPath(__dirname, encodeURI(prodPath))}\n$&`
		)
	writeFileSync(devPath, devMeta)
}

const endMetaTagRegex: RegExp = /^\/\/ ==\/UserScript==$/m
const tailwindcssMetaRegex: RegExp = /^\/\/ @resource {5}TAILWINDCSS$/m
const watcherBlobs: string[] = ['scripts/*/script.user.{ts,tsx}', 'scripts/*/tracking.ts']

;(async () => {
	const paths: string[] = sync(watcherBlobs)
	for (const path of paths) {
		const stat: Stats = statSync(path)
		await handleWatch(path, stat)
	}

	const watcher = GlobWatcher(watcherBlobs, {
		events: ['add', 'change']
	})
	watcher.on('add', handleWatch)
	watcher.on('change', handleWatch)

	console.log('Watching...')
})()
