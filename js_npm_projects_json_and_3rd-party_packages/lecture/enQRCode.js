const qr = require("qrcode")
const fs = require("fs/promises")
const entryString = process.argv[2]
// https://www.npmjs.com/package/qrcode
// We can use method toString from qrCode library

// and it will return a promise so we can use .then
qr.toString(entryString).then((qrCode) => {
    // And as a result of the promise we will get a string with our qr code
    // So we can display it or save it to file
    console.log(qrCode)
    // We can use the fs module to create txt fi.e with our string
    fs.writeFile("qrCode.txt", qrCode).then(()=> {
        // And then console log message for our user
        console.log("QR code file was generated")
    })
})

// Or we can use method .toFile from qrcode library
// And  this will save qr code to file directly
qr.toFile("qrCode2.png", entryString, (err) => {
    if(err) {
        console.error(err)
    }
})
