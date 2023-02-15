function throwCoin(){
    return new Promise((resolve, reject) => {
        const side = Math.floor(Math.random() * 2)
        const randomTime = Math.floor((Math.random() * 4) + 1) * 1000
        if (randomTime > 3000) {
            setTimeout(() => {
                reject(new Error("Coin was thrown too high!"))
            }, randomTime)
        } else {
            if(side == 1){
                setTimeout(() => {
                    resolve('tails')
                }, randomTime)
            } else {
                setTimeout(() => {
                    resolve('heads')
                }, randomTime)
            }
        }
    })
}

throwCoin().then((result) => {
    console.log('You got ' + result)
}).catch((error) => {
    console.log(error)
})
