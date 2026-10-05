let number = 1

const interval = setInterval(() =>{
    console.log(number)

    if (number === 5) {
        process.exit()
    }

    number++
}, 1000)