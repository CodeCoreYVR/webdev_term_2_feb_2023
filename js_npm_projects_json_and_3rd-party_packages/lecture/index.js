const fs = require("fs")

const logHaveANiceDay = () => {
    console.log("Have a nice day")
}

module.exports = logHaveANiceDay

/// Step-1: Project creation 
// 1. Create a directory
// 2. Go inside the directory in the terminal
// 3. Write "npm init" (Finishing all subsequent steps will generate package.json)

/// Step-2: Create a module
// 1. Create a file "index.js"
// 2. Write a function similar like "logHaveANiceDay"  
// 3. Export as a module

const main = async () => {
    // We can read our config file with the fs module
    fs.readFile("package.json",  {encoding: "utf-8"}, (err, data) => {
        // But this will be text by default
        console.log("data", data)
        // But we can convert json text into js object using JSON.parse()
        const convertedData = JSON.parse(data)
        // Then we have access to all properties.
        console.log("convertedData", convertedData.version)
    })
}

main().catch((err) => console.err)