'use strict'

const STORAGE_URL_KEY = 'urlDB'
const STORAGE_MEME_KEY = 'memesDB'

let gStorageMemes = []
let gCountId = 1
let gOnDownLineIdx

let gMeme = {
    selectedImg: '',
    selectedLineIdx: 0,
    lines: []
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

_createLines()

function _createLines() {
    gMeme.lines = [createLine('', 0)]
}

function createLine(x, y) {
    const line = {
        txt: '',
        size: 0,
        color: '#ffffff',
        strokeColor: '#000000',
        width: 0,
        fontSize: 45,
        fontType: 'Impact',
        x,
        y,
        leftTop: {},
        rightBottom: {}
    }
    gMeme.lines.push(line)
    return line
}

function getMeme() {
    return gMeme
}

function setMemeImg(img) {
    gMeme.selectedImg = img
}

function setLine(txt, x, y) {
    let line = getSelectedLine()
    line.txt = txt
    line.x = x
    line.y = y
    line.width = gCtx.measureText(txt).width
    line.leftTop = { x: line.x - line.width / 2, y: line.y - line.fontSize }
    line.rightBottom = { x: line.x + line.width / 2, y: line.y + line.fontSize / 5 }
}

function isTextClicked(pos) {
    let ans = false
    gMeme.lines.forEach((line, idx) => {
        if (pos.x <= line.rightBottom.x && pos.x >= line.leftTop.x && pos.y <= line.rightBottom.y && pos.y >= line.leftTop.y) {
            ans = true
            gOnDownLineIdx = idx
        }
    })
    return ans
}

function getLineByPos(pos) {
    return gMeme.lines
        .find(line => (pos.x <= line.rightBottom.x && pos.x >= line.leftTop.x && pos.y <= line.rightBottom.y && pos.y >= line.leftTop.y))
}

function moveText(dx, dy) {
    let line = getSelectedLine()
    line.x += dx
    line.y += dy

    setLine(line.txt, line.x, line.y)
}

function setTextColor(color) {
    getSelectedLine().color = color
}

function setStrokeColor(color) {
    getSelectedLine().strokeColor = color
}

function setFontBigger(deltaPx) {
    getSelectedLine().fontSize += deltaPx
    const line = getSelectedLine()
    setLine(line.txt, line.x, line.y) 
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--
    else if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    if (gMeme.lines.length === 0) createLine(0, 0)
}

function setSelectedIdx(currLine) {
    gMeme.selectedLineIdx = currLine
}

function isLineExist() {
    if (!getSelectedLine().txt) return false
    return true
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setFontType(fontType) {
    getSelectedLine().fontType = fontType
}

function saveMeme(canvasURL) {
    createLine() 
    gMeme.selectedLineIdx += 1 
    let savedCanvas = loadFromStorage(STORAGE_URL_KEY)
    if (!savedCanvas) {
        saveToStorage(STORAGE_URL_KEY, [canvasURL])
        gMeme.selectedImg = gMeme.selectedImg.src
        saveToStorage(STORAGE_MEME_KEY, [gMeme])
    }
    else {
        savedCanvas = loadFromStorage(STORAGE_URL_KEY)
        savedCanvas.push(canvasURL)
        saveToStorage(STORAGE_URL_KEY, savedCanvas)

        let savedMemes = loadFromStorage(STORAGE_MEME_KEY)
        gMeme.selectedImg = gMeme.selectedImg.src
        savedMemes.push(gMeme)
        saveToStorage(STORAGE_MEME_KEY, savedMemes)
    }
}

function setMeme(idx) {
    if (idx === undefined || idx === null) return
    const meme = loadFromStorage(STORAGE_MEME_KEY)[idx]
    gMeme = meme
}

function deleteSaveMeme(idx){
    let urls = loadFromStorage(STORAGE_URL_KEY)
    let memes = loadFromStorage(STORAGE_MEME_KEY)
    urls.splice(idx,1)
    memes.splice(idx,1)
    saveToStorage(STORAGE_URL_KEY, urls)
    saveToStorage(STORAGE_MEME_KEY, memes)
}