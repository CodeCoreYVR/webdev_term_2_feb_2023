
const fs = require('fs')

// should return a promisified version of fs.readFile
// fs.readFile arguments:
// 1) Path
// 2) Options object
// 3) Callback

function pReadFile(path, option) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, option, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

let p = pReadFile('./file-to-read/file1.txt', 'utf-8')
p.then((data) => {
    console.log(data)
    return pReadFile('./file-to-read/file2.txt', 'utf-8')
}).then((data) => {
    console.log(data)
    return pReadFile('./file-to-read/file3.txt', 'utf-8')
}).then((data) => {
    console.log(data)
})

