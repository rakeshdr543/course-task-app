
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(3, 4).then((sum1) => add(sum1, 6).then(total => console.log(total)).catch(err => console.log(err))).catch(err => console.log(err))

add(3, 4).then((sum1) => add(sum1, 6)).then(total => console.log(total)).catch(err => console.log(err))