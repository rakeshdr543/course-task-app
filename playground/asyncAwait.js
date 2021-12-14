const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Number should be greater than 0')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doChainSum = async () => {
    const sum1 = await add(2, -3)
    const sum2 = await add(sum1, 4)
    const sum3 = await add(sum2, 5)
    return sum3
}

doChainSum().then((total) => console.log(total)).catch((e) => console.log('e', e))