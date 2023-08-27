'use strict'

let gImg = [
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
    { id: gCountId, url: `'img/${gCountId++}.jpg'`, keywords: [] },
]

function onInitGallery() {
    renderImages()
}

function renderGallery() {
    hideEditor()
    showGallery()
    renderImages()
}

function renderImages() {
    let strHtml = ''
    gImg.forEach((img, idx) => strHtml += `<img src=${img.url} data-id=${idx + 1} onclick="renderImg(this)">`)
    setElHtml('.images-container', strHtml)
}

function showGallery() {
    removeClass('hidden', '.img-gallery')
}

function hideGallery() {
    addClass('hidden', '.img-gallery')
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
        img.dataset.id = gCountId++
        document.querySelector('.img-gallery').appendChild(img)/////////////////////
    }
    reader.readAsDataURL(ev.target.files[0])
}
