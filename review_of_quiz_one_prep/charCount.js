function charCount(name) {
    return new Promise((resolve, reject) => {
        resolve(name.length);
        if(name === undefined || name === null || typeof name === 'object')
        {
            reject({reason: "It should be a string"})
        }
    })
}

module.exports = charCount;