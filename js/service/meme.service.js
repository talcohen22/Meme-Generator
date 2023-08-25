'use strict'

let gCountId = 1

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
        color: 'white',
        strokeColor: 'black',
        width: 0,
        fontSize: 45,
        x,
        y,
        leftTop: {},
        rightBottom: {}
    }
    gMeme.lines.push(line)
    return line
}


function getImages() {
    return gImg
}

function getMeme() {
    return gMeme
}

function setMemeImg(img) {
    gMeme.selectedImg = img
}

// function isTxtExist(txt) {
//     gMeme.lines.forEach(line => {
//         if (gMeme.lines[0].txt === txt.substring(0, txt.length - 1)) return true
//     })
//     return false
// }


function setLine(txt, x, y) {
    let line = getSelectedLine()
    line.txt = txt
    line.x = x
    line.y = y
    line.width = gCtx.measureText(txt).width
    line.leftTop = { x: line.x - line.width / 2, y: line.y - line.fontSize }
    line.rightBottom = { x: line.x + line.width / 2, y: line.y }
}

function isTextClicked(pos) {
    let ans = false
    gMeme.lines.forEach((line, idx) => { ////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        if (pos.x <= line.rightBottom.x && pos.x >= line.leftTop.x && pos.y <= line.rightBottom.y && pos.y >= line.leftTop.y) {
            ans = true
            gMeme.selectedLineIdx = idx
            // gMeme.selectedLineIdx = idx
        }
    })
    return ans
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