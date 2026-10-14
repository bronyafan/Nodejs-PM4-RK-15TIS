const fs = require('fs')
const path = require('path')
require('dotenv').config()

const EventEmitter = require('events')

const EEm = new EventEmitter()
const port = process.env.PORT
// Convert environment variable string to a number!
const limit = Number(process.env.LIMIT) 

EEm.on('transfer', (money) => {
    console.log(`Transfered ${money} dillas`)
})

EEm.on('fraud_alert', (money) => {
    console.log(`${money} is higher than ${limit}`)
})

setInterval(() => {
    const steps = Math.floor(Math.random() * 10)
    const money = steps * 1000 + 1000

    if (money >= limit) {
        EEm.emit('fraud_alert', money)
    } else {
        EEm.emit('transfer', money)
    }
}, 3000)