const Task = require('../src/model/Task')

// Task.find({ _id: "61b729a919e8175a971b0fc4" })
//     .then(
//         () => {
//             return Task.find({ completed: false })
//         })
//     .then(tasks => console.log(tasks))
//     .catch(e => console.log(e))

const findTaskAndCount = async (id) => {
    await Task.findOne({ _id: id })
    const tasks = await Task.find({ completed: true })
    return tasks
}

findTaskAndCount('61b729a919e8175a971b0fc4').then((res) => console.log(res)).catch((e) => console.log(e))