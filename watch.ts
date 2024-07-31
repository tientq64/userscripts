import fs, { Stats } from 'fs'
import GlobWatcher from 'glob-watcher'
import { transpile } from 'typescript'
import { join, dirname } from 'path'
import { format, resolveConfig } from 'prettier'

function joinPath(...paths: string[]): string {
	return join(...paths).replace(/\\/g, '/')
}

const endMetaTagRegex: RegExp = /^\/\/ ==\/UserScript==$/m
const tailwindcssMetaRegex: RegExp = /^\/\/ @resource {5}TAILWINDCSS$/m

const watcher = GlobWatcher('scripts/*/script.user.{ts,tsx}', {
	events: ['add', 'change']
})
watcher.on('add', watch)
watcher.on('change', watch)

async function watch(path: string, stat: Stats): Promise<void> {
	if (!stat.isFile()) return

	const code: string = fs.readFileSync(path, 'utf-8')
	const matches = code.match(/\/\/ ==UserScript==\n.+?\n\/\/ ==\/UserScript==/s)
	if (matches === null) return

	const meta: string = matches[0]
	const ts: string = code.replace(meta, '')

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const tsconfig: any = JSON.parse(fs.readFileSync('tsconfig.json', 'utf-8'))

	const dirPath: string = dirname(path).replace(/\\/g, '/')
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
	let prodJs: string = transpile(ts, tsconfig.compilerOptions)
	prodJs = await format(prodJs, {
		...prettierConfig,
		parser: 'typescript'
	})
	prodJs = prodJs.replace(/^\t+/gm, (tabs) => '    '.repeat(tabs.length))
	const prodCode: string = `${prodMeta}\n\n${prodJs}`

	fs.writeFileSync(prodPath, prodCode)

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
	fs.writeFileSync(devPath, devMeta)
}
