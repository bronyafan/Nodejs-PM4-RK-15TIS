// task1
console.log(__dirname)
console.log(__filename)

const path = require('path')
const filePath = path.join(__filename)

console.log(path.basename(filePath))
console.log(path.extname(filePath))
console.log(path.dirname(filePath))

// ------
console.log("--------------------------------------------------------------------------------")
// ------

// task2
const infoPath = path.join(__dirname, 'data', 'info.txt')
console.log(infoPath)
console.log(path.parse(infoPath))

// ------
console.log("--------------------------------------------------------------------------------")
// ------

// task3
let file2 = process.argv[2] || 'report.txt'
const file2Path = path.join(__dirname, 'files', file2)
console.log(file2Path)

// ------
console.log("--------------------------------------------------------------------------------")
// ------

// task4
const files = ['photo.jpg', 'document.pdf', 'music.mp3', 'script.js']

files.forEach(element => {
    const elementPath = path.join(__dirname, element)
    console.log(path.extname(element))
    console.log(elementPath)
});