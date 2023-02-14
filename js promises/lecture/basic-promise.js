let p = new Promise((resolve, reject) => {
    let a = 1 + 3
    if(a == 2) {
        resolve("complete")
    } else {
        reject("fail")
    }
})

p.then((winMessage) => {
    console.log('This is the then ->' + winMessage)
}).catch((failMessage) => {
    console.log('This is the then ->' + failMessage)
})