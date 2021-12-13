const express = require('express')
require('dotenv').config();

const User = require('./model/User')
const Task = require('./model/Task');
const connectDB = require('./db/mongoose');

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

// Controller Routes
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => res.send(user)).catch((e) => res.status(400).send(e))
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => res.send(users)).catch((e) => res.status(400).send(e))
})

app.post('/users/:id', (req, res) => {
    const { id } = req.query.param
    User.findOne({ _id: id }).then((user) => res.send(user)).catch((e) => res.status(404).send(e))
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => res.send(task)).catch((e) => res.status(400).send(e))
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => res.send(tasks)).catch((e) => res.status(400).send(e))
})

app.post('/tasks/:id', (req, res) => {
    const { id } = req.query.param
    Task.findOne({ _id: id }).then((task) => res.send(task)).catch((e) => res.status(404).send(e))
})

app.listen(port, () => {
    connectDB()
    console.log(`Listening on port ${port}`)
})