import fs, { Stats } from 'fs'
import GlobWatcher from 'glob-watcher'
import { transpile } from 'typescript'
import { join, dirname } from 'path'
import { format, resolveConfig } from 'prettier'

function joinPath(...paths: string[]): string {
	return join(...paths).replace(/\\/g, '/')
}

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

	let dirPath: string = dirname(path)
	let prodPath: string = join(dirPath, 'script.user.js')
	let devPath: string = join(dirPath, 'dev.user.js')

	let prodMeta: string = meta.replace(
		/^\/\/ @resource     TAILWINDCSS$/m,
		`// @resource     TAILWINDCSS https://raw.githubusercontent.com/tientq64/userscripts/main/.resources/tailwind.min.css')}`
	)
	let prodJs: string = transpile(ts, tsconfig.compilerOptions)
	let prettierConfig = await resolveConfig('.prettierrc')
	let prodFormatedJs: string = await format(prodJs, {
		...prettierConfig,
		parser: 'typescript'
	})

	let prodCode: string = `${prodMeta}\n\n${prodFormatedJs}`
	fs.writeFileSync(prodPath, prodCode)

	let devMeta: string = meta
		.replace(
			/^\/\/ ==\/UserScript==$/m,
			`// @require      file:///${joinPath(__dirname, prodPath)}\n$&`
		)
		.replace(
			/^\/\/ @resource     TAILWINDCSS$/m,
			`$& file:///${joinPath(__dirname, '.resources/tailwind.min.css')}`
		)
		.replace(/^\/\/ @name .+(?<! \(DEV\))$/m, '$& (DEV)')
	fs.writeFileSync(devPath, devMeta)
}
