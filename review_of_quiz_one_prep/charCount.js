function charCount(name) {
    return new Promise((resolve, reject) => {
        if(name === undefined || name === null || typeof name === 'object')
        {
            reject({reason: "It should be a string"})
        }
        else resolve(name.length);
    })
}

module.exports = charCount;