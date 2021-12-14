const express = require('express')

const connectDB = require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

// Controller Routes
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    connectDB()
    console.log(`Listening on port ${port}`)
})