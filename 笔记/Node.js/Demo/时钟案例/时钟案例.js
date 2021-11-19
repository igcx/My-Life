const fs = require('fs')
const path = require('path')

const cssReg = /<style>([\s\S]+)<\/style>/
const jsReg = /<script>([\s\S]+)<\/script>/

fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
    if (err) return console.log('读取文件失败', err)
    // console.log(data);

    // 处理css内容
    // 提取内容
    makeCss(data)

    // 处理js内容 
    makeJS(data)

    // 处理html内容
    makeHtml(data)
})

function makeCss(data) {
    const cssData = cssReg.exec(data)[1]

    // 将提取出来的css内容写入到clock/index.css文件中
    fs.writeFile(path.join(__dirname, 'clock', 'index.css'), cssData, err => {
        if (err) return console.error('写入css失败', err)
        // console.log('写入css成功');
    })
}

function makeJS(data) {
    const jsData = jsReg.exec(data)[1]
    console.log(jsData);

    // 将提取出来的js内容写入到clock/index.js文件中
    fs.writeFile(path.join(__dirname, 'clock', 'index.js'), jsData, err => {
        if (err) return console.error('写入js失败', err)
        // console.log('写入js成功');
    })
}

function makeHtml(data) {
    data = data.replace(cssReg, '<link rel="stylesheet" href="./index.css">')
    data = data.replace(jsReg, '<script src="./index.js"></script>')

    // 将处理过后的html内容写入到clock/index.html中
    fs.writeFile(path.join(__dirname, 'clock', 'index.html'), data, err => {
        if (err) return console.error('写入html失败', err)
        console.log('写入html成功');
    })
}