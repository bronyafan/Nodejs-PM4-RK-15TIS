const fs = require('fs')
const path = require('path')
const dataFolderPath = path.join(__dirname, "data")
const inventoryPath = path.join(__dirname, "data", 'inventory.txt')
const categoriesPath = path.join(__dirname, "data", 'categories.txt')
const suppliersPath = path.join(__dirname, "data", 'suppliers.txt')
const tempLogPath = path.join(__dirname, 'data', 'temp_log.txt')
const inventoryFinalPath = path.join(__dirname, 'data', 'inventory_final.txt')

//task 1
try{
    if(!fs.existsSync(dataFolderPath)){
        fs.mkdirSync(dataFolderPath)
        console.log(`Created "data" folder`)
    }
    fs.writeFileSync(inventoryPath, "Название товара: Количество", 'utf-8')
    console.log(`Created/Rewritten "inventory.txt"`)
}
catch(err){
    console.log(err)
}

// ---------------------------------------
console.log('---------------------------------------')
// ---------------------------------------

// task2
try{
    const inventoryRead = fs.readFileSync(inventoryPath, 'utf-8')

    if(!inventoryRead){
        console.log('Inventory not initialized')
    } else{
        console.log(inventoryRead)
    }
} catch(err){
    console.log('Inventory not initialized')
}

// ---------------------------------------
console.log('---------------------------------------')
// ---------------------------------------

// task3
try{
    fs.writeFileSync(inventoryPath, 'Мониторы: 10', {flag: 'a'})
    console.log('Данные добавлены')
} catch(err){
    console.log(err)
}

// ---------------------------------------
console.log('---------------------------------------')
// ---------------------------------------

// task4
try {
    fs.writeFileSync(categoriesPath, '')
    fs.writeFileSync(suppliersPath, '')

    const files = fs.readdirSync(dataFolderPath)

    files.forEach(file => {
        console.log(file)
    })
} catch(err) {
    console.log(err)
}

// ---------------------------------------
console.log('---------------------------------------')
// ---------------------------------------

// task5
try {
    if (fs.existsSync(tempLogPath)) {
        fs.unlinkSync(tempLogPath)
        console.log('temp_log.txt удалён')
    }

    fs.renameSync(inventoryPath, inventoryFinalPath)
    console.log(`"inventory.txt" переименован в "inventory_final.txt"`)
} catch(err) {
    console.log(err)
}