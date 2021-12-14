const express = require('express')
require('dotenv').config();

const User = require('./model/User')
const Task = require('./model/Task');
const connectDB = require('./db/mongoose');

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

// Controller Routes
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    const { id } = req.query.param
    try {
        const user = await User.findOne({ _id: id })
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.query.param
    try {
        const task = await Task.findOne({ _id: id })
        res.status(200).send(task)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.listen(port, () => {
    connectDB()
    console.log(`Listening on port ${port}`)
})