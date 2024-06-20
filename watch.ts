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

	const bothMeta: string = meta.replace(
		endMetaTagRegex,
		`// @homepage     https://github.com/tientq64/userscripts/tree/main/${dirPath}\n$&`
	)

	const prodMeta: string = bothMeta.replace(
		tailwindcssMetaRegex,
		`$& https://raw.githubusercontent.com/tientq64/userscripts/main/.resources/tailwind.min.css`
	)
	const prodJs: string = transpile(ts, tsconfig.compilerOptions)
	const prettierConfig = await resolveConfig('.prettierrc')
	const prodFormatedJs: string = await format(prodJs, {
		...prettierConfig,
		parser: 'typescript'
	})

	const prodCode: string = `${prodMeta}\n\n${prodFormatedJs}`
	fs.writeFileSync(prodPath, prodCode)

	const devMeta: string = bothMeta
		.replace(/^\/\/ @name(:[a-zA-Z-]+)? .+(?<! \(DEV\))$/gm, '$& (DEV)')
		.replace(
			tailwindcssMetaRegex,
			`$& file:///${joinPath(__dirname, '.resources/tailwind.min.css')}`
		)
		.replace(endMetaTagRegex, `// @require      file:///${joinPath(__dirname, prodPath)}\n$&`)
	fs.writeFileSync(devPath, devMeta)
}
