const express = require('express')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');

const app = express()

app.use(express.static('./public'));
app.use(express.json())

// Controller Routes
app.use(userRouter)
app.use(taskRouter)

module.exports = app