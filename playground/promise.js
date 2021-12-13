
const promiseEx = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject([1, 3, 6])
        resolve([66, 77])
    }, 2000)
})

promiseEx.then((data) => console.log(data)).catch((err) => console.log(err))