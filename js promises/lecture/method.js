const wait = require('./wait')

// const red = wait('red', 1000)

// Promise.resolve(red).then((val) =>  console.log(val))

// Parallel vs Sequential

console.time('timeA')
const red = wait('red', 1000)
const green = wait('green', 1000)
const blue = wait('blue', 1000)

red.then((val) => {
    console.log(val)
    console.timeLog('timeA')
})

green.then((val) => {
    console.log(val)
    console.timeLog('timeA')
})

blue.then((val) => {
    console.log(val)
    console.timeLog('timeA')
})

console.time('timeB')

Promise.all([
    wait('red', 1000),
    wait('green', 1000),
    wait('blue', 1000), 
]).then((val) => {
    console.log(val)
    console.timeLog('timeB')
}).catch((err) => {
    console.log(err)
})





