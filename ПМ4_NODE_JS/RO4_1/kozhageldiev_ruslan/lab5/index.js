// task1
const fs = require('fs').promises
const path = require('path')
const folderPath = path.join(__dirname, 'storage')

async function setup() {
    const filePath = path.join(folderPath, 'status.txt')

    try{
        const createdFolder = await fs.mkdir(folderPath, {recursive: true})

        if(createdFolder){
            console.log(`Created the "storage" folder`)
        } else{
            console.log(`The folder already exists`)
        }
        await fs.writeFile(filePath, 'System ready', 'utf-8')
        console.log(`Created/overwrote "status.txt"`)
    } catch(err){
        console.log(err)
    }
} 

//task2
async function readText() {
    const filePath2 = path.join(__dirname, 'tasks.txt')

    try{
        const readPath2 = await fs.readFile(filePath2, 'utf-8')
        console.log(readPath2.toUpperCase())
    } catch(err){
        if (err.code === 'ENOENT'){
            console.log("File not found")
        } else{
            console.log(err)
        }
    }
}

//task3
async function addMsg(){
    const activityPath = path.join(folderPath, 'activity.log')
    let msg = process.argv[2] || 'Empty msg' 
    const date = new Date()
    const readableTime = new Date().toISOString();
    const logMsg = `[${readableTime}]: ${msg}\n`

    try{
        await fs.appendFile(activityPath, logMsg, 'utf-8')
        console.log(`Created/Appended the "activity.log" file`)
        console.log(`Added a message to log: ${msg}`)
    } catch(err){
        console.log(err)
    }
}

//task4
async function copyDelete() {
    const sourcePath = path.join(__dirname, 'source.txt')
    const copyPath = path.join(__dirname, 'copy.txt')
    
    try{
        const sourceMsg = await fs.readFile(sourcePath, 'utf-8')
        await fs.writeFile(copyPath, sourceMsg, 'utf-8')
        await fs.unlink(sourcePath)
        console.log('Deleted source.txt and created copy.txt')
    } catch(err){
        if (err.code === 'ENOENT'){
            console.log("File not found")
        } else{
            console.log(err)
        }
    }
}

//task5
async function checkFiles() {
    const fileNames = [
        {name: 'status.txt', dir: folderPath}, 
        {name: 'activity.log', dir: folderPath}, 
        {name: 'tasks.txt', dir: __dirname}, 
        {name: 'source.txt', dir: __dirname}
    ];
    const checkPromises = fileNames.map(async (file)=>{
        const checkFilesPath = path.join(file.dir, file.name)

        try{
            await fs.access(checkFilesPath)
            return{fileName: file.name, exists: true}
        } catch{
            return{fileName: file.name, exists: false}
        }
    })
    const results = await Promise.all(checkPromises);
    results.forEach(result =>{
        if(result.exists){
            console.log(`${result.fileName} found`)
        } else{
            console.log(`${result.fileName} not found`)
        }
    })
}

async function run() {
    console.log('---------------------------------------');
    console.log('Task 1');
    await setup();

    console.log('---------------------------------------');
    console.log('Task 2');
    await readText();

    console.log('---------------------------------------');
    console.log('Task 3');
    await addMsg();

    console.log('---------------------------------------');
    console.log('Task 4');
    await copyDelete();

    console.log('---------------------------------------');
    console.log('Task 5');
    await checkFiles();
}
run()