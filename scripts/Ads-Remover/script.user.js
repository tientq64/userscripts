// ==UserScript==
// @name         Ads Remover
// @namespace    https://github.com/tientq64/userscripts
// @version      0.3.1
// @description  Remove all ads.
// @author       tientq64
// @icon         https://cdn-icons-png.flaticon.com/64/9639/9639954.png
// @match        *://*/*
// @license      MIT
// @grant        unsafeWindow
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/Ads-Remover
// ==/UserScript==

const css = (strs) => strs.join('')

const matchers = {
    'diep.io/**': {
        css: css`
            .definitive-ad {
                display: none !important;
            }
        `
    },

    'tetr.io/**': {
        css: css`
            .ceriad,
            #pw-oop-left_rail {
                display: none !important;
            }
        `
    },

    'quora.com/**': {
        css: css`
            .spacing_log_question_page_ad,
            .dom_annotate_related_questions + .q-sticky {
                display: none !important;
            }
        `
    },

    'facebook.com/**': {
        js() {
            const els = document.querySelectorAll(
                'div > div > div > div > div > div > h3 > span > span'
            )
            for (const el of els) {
                if (el.textContent === 'Được tài trợ') {
                    const parentEl = getParentElement(el, 8)
                    parentEl.remove()
                }
            }
        }
    },

    'bravedown.com/**': {
        css: css`
            #dontfoid {
                display: none !important;
            }
        `,
        js() {
            setInterval(() => {
                const els = document.querySelectorAll('div:empty')
                for (const el of els) {
                    if (el.shadowRoot) {
                        el.remove()
                    }
                }
            }, 1000)
        }
    },

    'fdownloader.net/**': {
        js() {
            setInterval(() => {
                const els = document.querySelectorAll('#dlModal, .adsbygoogle')
                for (const el of els) {
                    el.remove()
                }
            }, 1000)
        }
    }
}

for (const pattern in matchers) {
    const matcher = matchers[pattern]
    if (matchURL(pattern)) {
        if (matcher.css) {
            const styleEl = document.createElement('style')
            styleEl.textContent = matcher.css
            document.head.appendChild(styleEl)
        }
        matcher.js?.()
    }
}

function getParentElement(el, level) {
    let parentEl = el
    for (let i = 0; i < level; i++) {
        parentEl = parentEl.parentElement
    }
    return parentEl
}

function matchURL(pattern) {
    const regexStr = pattern
        .replace(/^(?!([a-z]+|\*):\/\/)/, 'https://')
        .replace(/(?<!\\)(\*\*|\+\+|\?\?|[*+?.^$])/g, (ch) => {
            switch (ch) {
                case '**':
                    return '.*'
                case '*':
                    return '[^/]*'
                case '++':
                    return '.+'
                case '+':
                    return '[^/]+'
                case '??':
                    return '.'
                case '?':
                    return '[^/]'
                default:
                    return `\\${ch}`
            }
        })
        .replace(/^https:\/\//, '$&(?:www\\.)?')
    const regex = RegExp(`^${regexStr}$`)
    return regex.test(location.href)
}
