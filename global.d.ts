type GMValue = string | number | boolean

declare var GM_addStyle: (css: string) => void
declare var GM_getResourceText: (name: string) => string
declare var GM_getValue: (name?: string, defaultValue?: GMValue) => Promise<GMValue>
declare var GM_setValue: (name: string, value: GMValue) => Promise<void>
declare var GM_deleteValue: (name: string) => Promise<void>
declare var GM_listValues: () => Promise<string[]>
declare var GM_setClipboard: (text: string) => void

declare type Immer = import('immer').Immer
declare var immer: Immer

declare type Lodash = import('lodash').LoDashStatic
declare var _: Lodash
