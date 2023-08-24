
'use strict'


function onInitGallery(){
    renderImages()
}

function renderGallery(){
    addClass('hidden', '.meme-editor')
    removeClass('hidden', '.img-gallery')
    renderImages()
}

function renderImages(){
    const imgs = getImages()
    let strHtml = ''
    imgs.forEach(img => strHtml += `<img src=${img.url} onclick="renderImg(this)">`)
    setElHtml('.images-container', strHtml)
}