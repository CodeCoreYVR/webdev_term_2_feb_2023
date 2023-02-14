function wait(value, delay){
    return new Promise((resolve, reject) => {
        if (!value) {
            reject("no value")
        } else {
            setTimeout(() => {
                resolve(value)
            }, delay)
        }
    })
}

module.exports = wait