// // Review of Callbacks
// // A normal function
// function myDisplayer(some){
//     console.log("####~~~~"+some+"~~~~####")
// }

// // A normal function
// function myRepresentation(some){
//     console.log("####----"+some+"----####")
// }

// // Calling a function
// myRepresentation("Hello")
// // Defining a function to do summation
// function myCalculator(num1, num2){
//     let result = num1 + num2
//     return result
// }

// // Calling the function to make summation between two numbers
// // and printing with specific format
// let sum = myCalculator(5, 5)
// myRepresentation(sum)

// // Defining a function to do summation
// // and calling a funtion from inside it
// function myCalculator2(num1, num2){
//     let result = num1 + num2
//     myRepresentation(result)
// }
// myCalculator2(6, 4)


// // Defining a function to do summation
// // with callback
// function myCalculator3(num1, num2, myCallback){
//     let result = num1 + num2
//     myCallback(result)
// }

// myCalculator3(6, 4, myDisplayer)

// myCalculator3(6, 4, (some) => {
//     console.log("%%%%%*****"+some+"*****%%%%%")
// })


// We use callbacks to do something after an asynchronous action
// All async functions accept a callback.
// The callback allows us to do something after the async action

let callback = () => {
    console.log('Hey Everybody')
}

console.log("How is going?")

setTimeout(callback,1000)

console.log("We are all good")

const fs = require('fs')

fs.readFile('./file-to-read/file1.txt', 'utf8', (err, data) => {
    console.log(data)
})

console.log('print first')


console.log('print second')

// The async function will be triggered as the code is read from top to bottom
// but it won't block code. The console.logs will print out first while the
// async action is happening in the background
// When the async action is done, it will trigger the callback function
// and the text file's text will be printed out







