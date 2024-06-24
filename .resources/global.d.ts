type GMValue = string | number | boolean

declare const GM_addStyle: (css: string) => void
declare const GM_getResourceText: (name: string) => string
declare const GM_getValue: (name?: string, defaultValue?: GMValue) => Promise<GMValue>
declare const GM_setValue: (name: string, value: GMValue) => Promise<void>
declare const GM_deleteValue: (name: string) => Promise<void>
declare const GM_listValues: () => Promise<string[]>
declare const GM_setClipboard: (text: string) => void

declare type Immer = import('immer').Immer
declare const immer: Immer

declare type Lodash = import('lodash').LoDashStatic
declare const _: Lodash
