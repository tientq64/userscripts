type GMValue<T = string | number | boolean> = T

declare function GM_addStyle(css: string): void
declare function GM_getResourceText(name: string): string
declare function GM_getValue<T = GMValue>(name: string): Promise<T | undefined>
declare function GM_getValue<T = GMValue>(name: string, defaultValue: T): Promise<T>
declare function GM_setValue(name: string, value: GMValue): Promise<void>
declare function GM_deleteValue(name: string): Promise<void>
declare function GM_listValues(): Promise<string[]>
declare function GM_setClipboard(text: string): void

declare type ChangeEvent<T> = import('react').ChangeEvent<T>

declare type Immer = import('immer').Immer
declare const immer: Immer

declare type Lodash = import('lodash').LoDashStatic
declare const _: Lodash

declare const unsafeWindow: Window
