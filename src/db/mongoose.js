const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect("mongodb+srv://root:root@cluster0.oxvs2.mongodb.net/task-manager?retryWrites=true&w=majority")

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Provide a valid email')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Dont include password')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age cannot be nagative')
//             }
//         },
//         default: 121
//     }
// })

// const newUser = new User({ name: 'raman', email: "raki@gmail.com", password: "12345678" })

// newUser.save().then((data) => console.log(data)).catch((err) => console.log(error))

const Task = new mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const walkTak = new Task({ description: "Daily walk", completed: false })

walkTak.save().then((data) => console.log(data)).catch((err) => console.log(err))
