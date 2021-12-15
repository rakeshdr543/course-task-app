const { calculateTip, fToC, cToF, add } = require("../playground/math")

test('test1 ', () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test('test2 ', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('test fToC', () => {
    expect(fToC(32)).toBe(0)
})

test('test cToF', () => {
    expect(cToF(0)).toBe(32)
})

// test('async test case', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 2000)
// })

test('test async add', async () => {
    const sum = await add(3, 2)
    expect(sum).toBe(5)
})