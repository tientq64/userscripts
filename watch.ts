import fs, { Stats } from 'fs'
import GlobWatcher from 'glob-watcher'
import { transpile } from 'typescript'
import { join, dirname } from 'path'
import { format, resolveConfig } from 'prettier'

function joinPath(...paths: string[]): string {
	return join(...paths).replace(/\\/g, '/')
}

const endMetaTagRegex: RegExp = /^\/\/ ==\/UserScript==$/m
const tailwindcssMetaRegex: RegExp = /^\/\/ @resource     TAILWINDCSS$/m

const watcher = GlobWatcher('scripts/*/script.user.{ts,tsx}', {
	events: ['add', 'change']
})
watcher.on('add', watch)
watcher.on('change', watch)

async function watch(path: string, stat: Stats): Promise<void> {
	if (!stat.isFile()) return

	let code: string = fs.readFileSync(path, 'utf-8')
	let matches = code.match(/\/\/ ==UserScript==\n.+?\n\/\/ ==\/UserScript==/s)
	if (matches === null) return

	let meta: string = matches[0]
	let ts: string = code.replace(meta, '')

	let tsconfig: any = JSON.parse(fs.readFileSync('tsconfig.json', 'utf-8'))

	let dirPath: string = dirname(path).replace(/\\/g, '/')
	let prodPath: string = joinPath(dirPath, 'script.user.js')
	let devPath: string = joinPath(dirPath, 'dev.user.js')

	let bothMeta: string = meta.replace(
		endMetaTagRegex,
		`// @homepage     https://github.com/tientq64/userscripts/tree/main/${dirPath}\n$&`
	)

	let prodMeta: string = bothMeta
		.replace(
			tailwindcssMetaRegex,
			`$& https://raw.githubusercontent.com/tientq64/userscripts/main/.resources/tailwind.min.css`
		)
		.replace(
			endMetaTagRegex,
			`// @updateURL    https://github.com/tientq64/userscripts/raw/main/${dirPath}/script.user.js\n$&`
		)
		.replace(
			endMetaTagRegex,
			`// @downloadURL  https://github.com/tientq64/userscripts/raw/main/${dirPath}/script.user.js\n$&`
		)
	let prodJs: string = transpile(ts, tsconfig.compilerOptions)
	let prettierConfig = await resolveConfig('.prettierrc')
	let prodFormatedJs: string = await format(prodJs, {
		...prettierConfig,
		parser: 'typescript'
	})

	let prodCode: string = `${prodMeta}\n\n${prodFormatedJs}`
	fs.writeFileSync(prodPath, prodCode)

	let devMeta: string = bothMeta
		.replace(/^\/\/ @name .+(?<! \(DEV\))$/m, '$& (DEV)')
		.replace(
			tailwindcssMetaRegex,
			`$& file:///${joinPath(__dirname, '.resources/tailwind.min.css')}`
		)
		.replace(endMetaTagRegex, `// @require      file:///${joinPath(__dirname, prodPath)}\n$&`)
	fs.writeFileSync(devPath, devMeta)
}
