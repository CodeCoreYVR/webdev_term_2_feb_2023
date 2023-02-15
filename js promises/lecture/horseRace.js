const wait = require('./wait')

const randomTime1 = Math.floor((Math.random() * 4) + 1) * 1000
const randomTime2 = Math.floor((Math.random() * 4) + 1) * 1000
const randomTime3 = Math.floor((Math.random() * 4) + 1) * 1000
const randomTime4 = Math.floor((Math.random() * 4) + 1) * 1000
const randomTime5 = Math.floor((Math.random() * 4) + 1) * 1000

Promise.race([
    wait('BC', randomTime1),
    wait('MB', randomTime2),
    wait('AB', randomTime3),
    wait('SK', randomTime4),
    wait('ON', randomTime5)
]).then((val) => {
    console.log(val)
}).catch((err) => {
    console.log(err)
})