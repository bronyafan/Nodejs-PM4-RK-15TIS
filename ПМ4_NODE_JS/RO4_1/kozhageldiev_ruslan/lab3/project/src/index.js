const path = require('path')
const cfgPath = path.join(__dirname, '..', "cfg", "app.json")

console.log(cfgPath)
console.log(path.basename(cfgPath))
console.log(path.extname(cfgPath))