'use strict'

function onInitGallery(){
    renderImages()
}

function renderGallery(){
    hideEditor()
    showGallery()
    renderImages()
}

function renderImages(){
    const imgs = getImages()
    let strHtml = ''
    imgs.forEach(img => strHtml += `<img src=${img.url} onclick="renderImg(this)">`)
    setElHtml('.images-container', strHtml)
}

function showGallery(){
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
    }
    reader.readAsDataURL(ev.target.files[0]) 
}
