const fs = require('fs/promises');


charCountOfFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./a.txt", { encoding: 'utf-8'})
            .then(result => {
                resolve(result.length);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = charCountOfFile;