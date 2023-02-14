function delay(value, delay){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value)
        }, delay)
    })
}

delay('blue', 3000).then((val) => {
    console.log(val)
})