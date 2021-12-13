const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose.connect("mongodb+srv://root:root@cluster0.oxvs2.mongodb.net/task-manager?retryWrites=true&w=majority")
}

module.exports = connectDB