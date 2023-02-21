// We start by importing the jimp module
const Jimp = require("jimp")
// https://www.npmjs.com/package/jimp

// We will get our fileName from runtime arguements
const filename = process.argv[2]
// An we will get blur radius as another runtime argument
// But we have to convert this arguement which is a sting by default
// Into an integer
const blurRadius = parseInt(process.argv[3])

// Then we will read our file
// And this will use our callback
// Which has two arguements
// First is an error object
// second one qrCode is Jimp object
// Jimp.read(filename, (err, qrCode) => {
//     // Then we check if we have an error
//     if(err) {
//         console.error(err)
//     } else {
//         // Else we will blur our image
//         qrCode.blur(blurRadius, (err, newQrCode) => {
//             // And then write it into new file
//             newQrCode.write("qrCode2-blurred.png")
//         })
//     }
// })

// We can use callback or we can use .then .catch

// This is the same code as above
// But we are using .then and .catch
// So, we will read the file 
Jimp.read(filename)
    // If read was successful, we will blur the image
    .then((qrCode) => {
        // This will return anaother promise
        return qrCode.blur(blurRadius)
    })
    // So we can use .then again
    .then((qrCode) => {
        // And write the result of blur into a new file
        // This will also return a new promist
        return qrCode.writeAsync("qrCode2-blurred-new.png")
    })
    // Therefore we can use .then again
    .then(() => {
        console.log("New file was created")
    })
    // And if one of these promises will fail
    // We will excute console.error to show out the error of that promise
    .catch((err) =>{
        console.error(err)
    })