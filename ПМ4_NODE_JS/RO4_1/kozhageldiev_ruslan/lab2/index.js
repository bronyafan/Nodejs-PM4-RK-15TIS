import {greet} from "./greet.js"
import {add, subtract} from "./math.js"
import os from "os"
import { isPositive, isEven } from "./validator.js"
import chalk from "chalk"

greet()

console.log(`${add(1,2)}, ${subtract(2,1)}`)

console.log(os.platform())
console.log(os.hostname())
console.log(os.homedir())
const ramGb = os.totalmem() / (1024 ** 3)
console.log(ramGb.toFixed(2))

console.log(`${isPositive(0)}, ${isEven(2)}`)

console.log(chalk.green("App launched"));
console.log(chalk.yellow(process.platform));
console.log(chalk.red.bold("App ended"));