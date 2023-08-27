'use strict'

function makeId(length = 6) {
    var id = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(getRandomInt(0, possible.length))
    }

    return id
}

function getEl(selector){
    return document.querySelector(selector)
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function handleClassEl(className, selector, isAdd) {
    isAdd ?
        document.querySelector(`.${selector}`).classList.add(className) :
        document.querySelector(`.${selector}`).classList.remove(className)
}

function removeClass(className, selector) {
    document.querySelector(`.${selector}`).classList.remove(className)
}

function setElText(selector, txt) {
    const el = document.querySelector(`.${selector}`)
    el.innerText = txt
}

function setElHtml(selector, html) {
    const el = document.querySelector(`.${selector}`)
    el.innerHTML = html
}

function navigateToPage(page) {
    window.location = `${page}.html`;
}

function handleClassEl(className, selector, isAdd) {
    isAdd
        ? document.querySelector(selector).classList.add(className)
        : document.querySelector(selector).classList.remove(className)
}

function removeClass(className, selector) {
    document.querySelector(selector).classList.remove(className)
}

function addClass(className, selector) {
    document.querySelector(selector).classList.add(className)
}

function setElText(selector, txt) {
    const el = document.querySelector(selector)
    el.innerText = txt
}

function setElHtml(selector, html) {
    const el = document.querySelector(selector)
    el.innerHTML = html
}

function navigateToPage(page) {
    window.location = `${page}.html`;
}