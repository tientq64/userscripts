// ==UserScript==
// @name         Miến AI Music
// @namespace    https://github.com/tientq64/userscripts
// @version      1.0.0
// @description  Các tiện ích cho kênh Youtube Miến AI Music.
// @author       tientq64
// @icon         https://i.ytimg.com/an/-Eg4rifYD_EBCC_tp_eJwQ/featured_channel.jpg?v=6657867e
// @match        https://suno.com/*
// @match        https://accounts.suno.com/sign-in?*
// @match        https://accounts.google.com/o/oauth2/**
// @match        https://translate.google.com.vn/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @license      MIT
// @noframes
// @homepage     https://github.com/tientq64/userscripts/tree/main/scripts/Mien-AI-Music
// ==/UserScript==

;(async function () {
    let accountEmails = []
    let accountEmailsInput = await GM_getValue('accountEmails', '')

    async function wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    function click(selector) {
        const el = document.querySelector(selector)
        el?.click()
    }

    function queryContentIncludes(selector, text, isIncludes = false) {
        const els = document.querySelectorAll(selector)
        for (const el of els) {
            if (el.textContent === null) continue
            if (
                (isIncludes && el.textContent.includes(text)) ||
                (!isIncludes && el.textContent === text)
            ) {
                if (el instanceof HTMLElement) {
                    return el
                }
            }
        }
        return null
    }

    function clickIfContentIncludes(selector, text, isIncludes = false) {
        const el = queryContentIncludes(selector, text, isIncludes)
        el?.click()
    }

    async function switchAccount(accountEmail) {
        await GM_setValue('accountEmail', accountEmail)
        clickIfContentIncludes('.chakra-menu__menuitem', 'Sign Out')
        await wait(600)
        clickIfContentIncludes('button:has(> span)', 'Sign In')
        await wait(200)
        click('.cl-socialButtonsIconButton__google')
    }

    async function inputEmails() {
        while (accountEmailsInput === '') {
            accountEmailsInput =
                prompt(
                    'Nhập danh sách email đăng nhập, không bao gồm "@gmail.com", phân tách bởi dấu phẩy:'
                ) ?? ''
            accountEmailsInput = accountEmailsInput.trim()
            if (accountEmailsInput === '') continue
            GM_setValue('accountEmails', accountEmailsInput)
        }
        accountEmails = accountEmailsInput.split(/, */)
    }

    function css(strs, ...vals) {
        let result = ''
        for (let i = 0; i < strs.length - 1; i++) {
            result += strs[i] + String(vals[i])
        }
        result += strs.at(-1)
        return result
    }

    await inputEmails()

    window.addEventListener('keydown', async (event) => {
        if (event.repeat) return
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return
        if (document.activeElement.matches('input, textarea, select')) return

        const audio = document.querySelector('audio#active-audio-play')

        const { code } = event
        switch (code) {
            case 'F1':
            case 'F2':
            case 'F3':
            case 'F4':
            case 'F5':
            case 'F6':
                {
                    event.preventDefault()
                    const accountIndex = Number(code.slice(-1)) - 1
                    const accountEmail = accountEmails[accountIndex]
                    switchAccount(accountEmail)
                }
                break

            case 'Backquote':
            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6':
            case 'Digit7':
            case 'Digit8':
            case 'Digit9':
            case 'Digit0':
                if (audio) {
                    if (audio.src) {
                        let part = 0
                        if (code.startsWith('Digit')) {
                            part = Number(code.slice(-1))
                        }
                        audio.currentTime = audio.duration * (part / 10)
                    }
                }
                break

            case 'ArrowLeft':
            case 'ArrowRight':
                if (audio) {
                    if (audio.src) {
                        const amount = code === 'ArrowLeft' ? -5 : 5
                        audio.currentTime += amount
                    }
                }
                break
        }
    })

    if (location.href === 'https://suno.com/') {
        location.pathname = '/me'
    }
    //
    else if (location.href === 'https://suno.com/me') {
        await GM_deleteValue('accountEmail')
        await wait(2000)
        clickIfContentIncludes('button', 'Liked')
        document.activeElement.blur()
        const siblingEl = document.querySelector('a[href="/search"]')
        const emailName = queryContentIncludes('.chakra-text', '@gmail.com', true)
            ?.textContent?.replace('@gmail.com', '')
            .toLowerCase()
        for (const accountEmail of accountEmails.slice().reverse()) {
            const el = document.createElement('button')
            el.style.paddingLeft = '40px'
            el.style.textAlign = 'left'
            el.textContent = accountEmail
            if (accountEmail === emailName) {
                el.style.color = 'limegreen'
                el.style.paddingLeft = '26px'
                el.textContent = `> ${accountEmail}`
            }
            el.addEventListener('click', () => {
                switchAccount(accountEmail)
            })
            siblingEl.after(el)
        }
    }
    //
    else if (location.href.startsWith('https://accounts.suno.com/sign-in')) {
        await wait(500)
        click('.cl-socialButtonsIconButton__google')
    }
    //
    else if (location.href.startsWith('https://accounts.google.com/o/oauth2/')) {
        const accountEmail = await GM_getValue('accountEmail')
        if (typeof accountEmail === 'string') {
            await GM_deleteValue('accountEmail')
            const emailText = `${accountEmail}@gmail.com`
            await wait(600)
            click(`[data-identifier="${emailText}"]`)
        }
    }

    GM_addStyle(css`
        body {
            font-family: sans-serif;
        }
    `)
})()
