const fs = require('fs')

fs.readFile('./file-to-read/file1.txt', 'utf8', (err, data) => {
    console.log(data)
})

fs.readFile('./file-to-read/file2.txt', 'utf8', (err, data) => {
    console.log(data)
})

fs.readFile('./file-to-read/file3.txt', 'utf8', (err, data) => {
    console.log(data)
})


// This could get really messy, especially if the nested async functions are not similar (as it is in this example)
// It can also get very difficult to read all the lines and indented code with nested functions
// This is know as "callback hell"
// When handling errors in the exact same way, it could be difficult to keep track of where the error is happening

// As developers we need to write code that is easily maintained
// and callback hell is not easily maintained

fs.readFile('./file-to-read/file1.txt', 'utf8', (err, data) => {
    console.log(data)
    fs.readFile('./file-to-read/file2.txt', 'utf8', (err, data) => {
        console.log(data)
        fs.readFile('./file-to-read/file3.txt', 'utf8', (err, data) => {
            console.log(data)
        })
    })
})






