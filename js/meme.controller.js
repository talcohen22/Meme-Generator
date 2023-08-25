'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx
let gIsDrag = false
let gStartPos
let gCurrLineIdx

function onInitMeme() {
    gElCanvas = getEl('.main-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
}

function addListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function renderImg(elImg) {
    setMemeImg(elImg)
    hideGallery()
    showEditor()
    resizeCanvas(elImg)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const elImg = meme.selectedImg
    renderImg(elImg)
    renderExistTexts()
    addTextLine(selectedLine.txt , selectedLine.fontSize, selectedLine.x, selectedLine.y , selectedLine.color, selectedLine.strokeColor)
}

function hideGallery() {
    addClass('hidden', '.img-gallery')
}

function showEditor() {
    removeClass('hidden', '.meme-editor')
}

function onAddText(txt) {

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(getMeme().selectedImg, 0, 0, gElCanvas.width, gElCanvas.height)
    
    renderExistTexts()

    const { x, y } = getTxtLocation()

    addTextLine(txt, undefined, x, y) //change the text
    setLine(txt, x, y)
}

function getTxtLocation() {
    const lineIdx = getMeme().selectedLineIdx

    const x = gElCanvas.width / 2
    let y
    if (lineIdx === 0) y = 45 //initial font size = 45
    else if (lineIdx === 1) y = gElCanvas.height - 15
    else y = gElCanvas.width / 2
    
    return { x, y }
}

function renderExistTexts() { //render all texts that already enter
    getMeme().lines.forEach((line, idx) => {
        if (getMeme().selectedLineIdx !== idx) addTextLine(line.txt, line.fontSize, line.x, line.y, line.color, line.strokeColor)
    })
}

function addTextLine(txt, fontSize = 45, x, y, color = "white", strokeColor = "black") {
    gCtx.font = fontSize + 'px ' + 'Comic Sans MS';
    gCtx.fillStyle = color
    gCtx.textAlign = "center"
    gCtx.strokeStyle = strokeColor
    gCtx.lineWidth = 6
    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
}

function resizeCanvas(elImg) {
    const elContainer = getEl('.meme-editor-layout')
    gElCanvas.width = elContainer.offsetWidth
    const IH = elImg.height
    const IW = elImg.width
    const CW = gElCanvas.width
    gElCanvas.height = IH * CW / IW //CH 
}

function onDown(ev) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    const pos = getEvPos(ev)
    gCurrLineIdx = getMeme().selectedLineIdx

    if (!isTextClicked(pos)) return
    setTextDrag(true)

    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    let pos = { x: ev.offsetX, y: ev.offsetY }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function setTextDrag(isDrag) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    gIsDrag = isDrag
}

function onUp() { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    setTextDrag(false)
    document.body.style.cursor = 'grab'
    getMeme().selectedLineIdx = gCurrLineIdx
}

function onMove(ev) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    if (!gIsDrag) return
    const pos = getEvPos(ev)
    if (isTextClicked(pos) && !gIsDrag) {
        document.body.style.cursor = 'grab'
        // onSetSquareAround()
    }
    
    else document.body.style.cursor = 'default'

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveText(dx, dy)
    renderMeme()
    gStartPos = pos
} 

function onSetSquareAround() {
    let line = getMeme().lines[gMeme.selectedLineIdx]
    gCtx.beginPath();
    gCtx.rect(line.leftTop.x, line.leftTop.y, line.width, line.fontSize);
    gCtx.stroke();
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onSetTextColor(color) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    setTextColor(color)
    renderMeme()
}

function onSetStrokeColor(color) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    setStrokeColor(color)
    renderMeme()
}

function onSetFontBigger(isBigger) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    const deltaPx = isBigger ? 2 : -2
    setFontBigger(deltaPx)
    renderMeme()
}

function onDeleteLine() { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    deleteLine()
    getEl('.text-input').value = getMeme().lines[getMeme().selectedLineIdx].txt
    renderMeme()
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    const XHR = new XMLHttpRequest()

    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function onAddLine() { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    createLine('', 0)
    setSelectedIdx(getMeme().lines.length - 1)
    getEl('.text-input').value = ''
}

function onRowUp(isUp) { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    var currLine = getMeme().selectedLineIdx
    if (isUp && currLine - 1 < 0 || !isUp && currLine + 1 > getMeme().lines.length - 1) return
    if (isUp) setSelectedIdx(currLine - 1)
    if (!isUp) setSelectedIdx(currLine + 1)

    getEl('.text-input').value = getMeme().lines[getMeme().selectedLineIdx].txt
}